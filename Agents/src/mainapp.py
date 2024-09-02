import streamlit as st
from crewai import Agent, Crew, Process, Task
from crewai_tools import BaseTool
from newsletter_gen.tools.research import SearchAndContents, FindSimilar, GetContents
# from langchain_anthropic import ChatAnthropic
from langchain_groq import ChatGroq
from datetime import datetime
from typing import Union, List, Tuple, Dict
from langchain_core.agents import AgentFinish
import json
from exa_py import Exa
import os
from datetime import datetime, timedelta
from langchain_google_genai import ChatGoogleGenerativeAI
import os

class SearchAndContents(BaseTool):
    name: str = "Search and Contents Tool"
    description: str = (
        "Searches the web based on a search query for the latest results. "
        "Allows customization of the search period. Results can be filtered based on a user-defined time period."
    )

    def _run(self, search_query: str, days: int = 365) -> str:

        exa = Exa(api_key=os.getenv("EXA_API_KEY"))

        date_cutoff = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

        search_results = exa.search_and_contents(
            query=search_query,
            use_autoprompt=True,
            start_published_date=date_cutoff,
            text={"include_html_tags": False, "max_characters": 8000},
        )

        return search_results

class FindSimilar(BaseTool):
    name: str = "Find Similar Tool"
    description: str = (
        "Searches for similar articles to a given article using the Exa API. "
        "Takes in a URL of the article and allows customization of the search period."
    )

    def _run(self, article_url: str, days: int = 365) -> str:

        exa = Exa(api_key=os.getenv("EXA_API_KEY"))

        date_cutoff = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

        search_results = exa.find_similar(
            url=article_url, start_published_date=date_cutoff
        )

        return search_results


class GetContents(BaseTool):
    name: str = "Get Contents Tool"
    description: str = "Gets the contents of a specific article using the Exa API. Takes in the ID of the article in a list, like this: ['https://www.cnbc.com/2024/04/18/my-news-story']."
    
    def _run(self, article_ids: str) -> str:

        exa = Exa(api_key=os.getenv("EXA_API_KEY"))

        contents = exa.get_contents(article_ids)
        return contents

topic = st.text_input("Enter the name of the institute: ")
year = st.text_input("Enter the year: ")
personal_message = st.text_input("Personal Message: ")

class NewsletterGenCrew:
    """NewsletterGen crew"""
    def llm(self):
        # llm = ChatAnthropic(model_name="claude-3-sonnet-20240229", max_tokens=4096)
        llm = ChatGroq(model="llama3-70b-8192", api_key="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")
        # llm = ChatGroq(model="mixtral-8x7b-32768")
        # llm = ChatGoogleGenerativeAI(model='gemini-1.5-pro', google_api_key=os.getenv("GOOGLE_API_KEY"))
        return llm

    def step_callback(
        self,
        agent_output: Union[str, List[Tuple[Dict, str]], AgentFinish],
        agent_name,
        *args,
    ):
        with st.chat_message("AI"):
            # Try to parse the output if it is a JSON string
            if isinstance(agent_output, str):
                try:
                    agent_output = json.loads(agent_output)
                except json.JSONDecodeError:
                    pass

            if isinstance(agent_output, list) and all(
                isinstance(item, tuple) for item in agent_output
            ):

                for action, description in agent_output:
                    # Print attributes based on assumed structure
                    st.write(f"Agent Name: {agent_name}")
                    st.write(f"Tool used: {getattr(action, 'tool', 'Unknown')}")
                    st.write(f"Tool input: {getattr(action, 'tool_input', 'Unknown')}")
                    st.write(f"{getattr(action, 'log', 'Unknown')}")
                    with st.expander("Show observation"):
                        st.markdown(f"Observation\n\n{description}")

            # Check if the output is a dictionary as in the second case
            elif isinstance(agent_output, AgentFinish):
                st.write(f"Agent Name: {agent_name}")
                output = agent_output.return_values
                st.write(f"I finished my task:\n{output['output']}")

            # Handle unexpected formats
            else:
                st.write(type(agent_output))
                st.write(agent_output)

    def researcher(self) -> Agent:
        return Agent(
            role="Senior Researcher",
            goal=f"Research everything about {topic} for the {year}.",
            backstory=f"""You're a seasoned journalist with a nose for news. You're known for your great research skills and ability to dig up the most interesting stories about {topic}. Your reports are always thorough and well-researched, making you a trusted source of information.
    You always follow the rules and guidelines provided to you and you never forget to include the complete URL and valid links of the article where you found the news.""",
            tool=[SearchAndContents(), FindSimilar(), GetContents()],
            verbose=True,
            llm=self.llm(),
            step_callback=lambda step: self.step_callback(step, "Research Agent"),
        )

    def editor(self) -> Agent:
        return Agent(
            role="Editor-in-Chief",
            goal="Ensure the quality and accuracy of the final newsletter.",
            backstory="""You are the Editor-in-Chief of a prestigious news organization. You are responsible for overseeing the production of the newsletter and ensuring that it meets the highest standards of quality, that it is accurate, well-written, and engaging. 
            You review the news articles provided by the researcher, add context to each article (like why the news story is relevant), and have a great sense of what will resonate with the readers. You use this sense of judgment to reorder the news articles in a way that the most important news is at the top of the list.
""",
            verbose=True,
            tool=[SearchAndContents(), FindSimilar(), GetContents()],
            llm=self.llm(),
            step_callback=lambda step: self.step_callback(step, "Chief Editor"),
        )

    def designer(self) -> Agent:
        return Agent(
            role="Newsletter Compiler",
            goal="Fill the HTML template given to you with the news articles provided.",
            backstory="""You are responsible for compiling the HTML code of the newsletter, making sure that every news article is included in the final document.
    You do NOT modify the content and only update the design when necessary. You use the HTML template provided to you to create the newsletter.""",
tool=[SearchAndContents(), FindSimilar(), GetContents()],
            verbose=True,
            allow_delegation=False,
            llm=self.llm(),
            step_callback=lambda step: self.step_callback(step, "HTML Writer"),
        )

    def research_task(self) -> Task:
        return Task(
            description=f"""
    Conduct a thorough review of all academic activities and publications within the {topic}. Focus on significant achievements, research papers, conferences, seminars, workshops, collaborations, and any other academic events that occurred. Ensure that the sources of information are accurate, relevant, and directly related to the academic progress of the institute.

    Follow these rules:
    - Only include activities and publications that are directly related to the academic progress of the institute.
    - Exclude irrelevant activities or those not directly related to academics.
    - Summarize each event or publication succinctly, ensuring all important details are included.
    - Include a minimum of 7 and a maximum of 10 academic activities or publications in the report.
    - Ensure the accuracy of dates, names, and references.

    IMPORTANT INSTRUCTIONS ABOUT USING TOOLS: When using tools, DO NOT ESCAPE the underscore character "_", EVER. If you need to use a tool and pass in a parameter called 'search_query', you should write 'search_query', not 'search\_query'. THIS IS VERY IMPORTANT, else the tool will not work.
""",
            agent=self.researcher(),
            tool=[SearchAndContents(), FindSimilar(), GetContents()],
            expected_output="""
A markdown document with a summary of the most relevant academic activities and publications. Each entry should contain the following:
    - Title of the activity/publication
    - Summary of the event/publication
    - Date and location (if applicable)
    - URL or reference to the source (if applicable)

    Example format:
    <EXAMPLE>
      Entry 1:
      - Title: **Research Paper on AI in Education Published**
      - **Summary:** The Department of Computer Science published a groundbreaking research paper on the applications of AI in education. The paper discusses innovative methods to integrate AI into teaching practices.
      - **Date:** March 2024
      - **Location:** Journal of Educational Technology
      - **URL:** [Journal Link](https://example.com/paper)

      [... more entries ...]
    </EXAMPLE>

"""
        )

    def edit_task(self) -> Task:
        return Task(
            description=f"""Review the list of academic activities and publications that will be included in the report. Your tasks are:
    
    - Enhance the title of each entry to ensure it accurately reflects the importance of the event/publication.
    - Add a paragraph explaining the significance of each activity/publication and its impact on the institute or the academic community.
    - Reorder the entries, placing the most significant and impactful at the top of the list.
    - Verify the accuracy of dates, names, and references. Remove or correct any inaccuracies.
    - Ensure all entries are directly related to the academic focus of the report. Remove off-topic entries if necessary.

    IMPORTANT INSTRUCTIONS ABOUT USING TOOLS: When using tools, DO NOT ESCAPE the underscore character "_", EVER. If you need to use a tool and pass in a parameter called 'search_query', you should write 'search_query', not 'search\_query'. THIS IS VERY IMPORTANT, else the tool will not work.""",
            agent=self.editor(),
            tool=[SearchAndContents(), FindSimilar(), GetContents()],
            expected_output="""
A markdown document with the finalized list of academic activities and publications to be included in the report. Each entry should include:
    - Title:
    - Summary: 
    - Significance:
    - Date and location:
    - Reference or URL (if applicable)

    Example format:
    <EXAMPLE>
    Title of the report: Annual Academic Achievements

      - **Title:** Breakthrough in AI for Education
        **Summary:** The Department of Computer Science published a research paper that explores innovative methods for integrating AI into education. The paper has been recognized internationally for its contributions to the field.
        **Significance:** This research positions the institute as a leader in the application of AI to educational practices, potentially influencing curriculum design across the globe.
        **Date and Location:** March 2024, Journal of Educational Technology
        **Reference:** [Journal Link](https://example.com/paper)

        [... more entries ...]
    </EXAMPLE>
"""
        )

    def newsletter_task(self) -> Task:
        return Task(
            description=f"""
Compile the final academic report using the provided information. Include a personal message from the dean or head of the institute in the space provided. The report should be comprehensive and well-organized, covering all significant academic activities.

    {personal_message}

    (If there is no personal message, leave the space empty.)
    
    Follow these rules:
    - Include all the entries in the correct order as provided by the editor.
    - Do not modify or truncate the information.
    - Ensure that the formatting is consistent and professional.
    - Include any personal messages at the beginning of the report.
    - Do not add any additional information beyond what has been provided.

""",
            agent=self.designer(),
            tool=[SearchAndContents(), FindSimilar(), GetContents()],
            expected_output="""Return ONLY the contents of the report template, properly formatted as a professional academic report. Ensure all entries are included as provided, without any modifications.

    Example format:
    <EXAMPLE>
    [Insert Personal Message from the Dean]

    Title: Annual Academic Report for [Institute Name]

    [... Content ...]

    </EXAMPLE>
    """
        )

    def crew(self) -> Crew:
        """Creates the NewsletterGen crew"""
        return Crew(
            agents=[self.researcher(), self.editor(), self.designer()],
            tasks=[self.research_task(), self.edit_task(), self.newsletter_task()],
            process=Process.sequential,
            verbose=2,
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )
    

if topic != "" and year != "" and personal_message != "":
    result = NewsletterGenCrew().crew().kickoff()
    st.write(result)