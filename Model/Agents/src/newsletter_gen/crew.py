import streamlit as st
from crewai import Agent, Crew, Process, Task
from tools.research import SearchAndContents, FindSimilar, GetContents
# from langchain_anthropic import ChatAnthropic
from langchain_groq import ChatGroq
from datetime import datetime
from typing import Union, List, Tuple, Dict
from langchain_core.agents import AgentFinish
import json
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import yaml  # Add this import to handle YAML files

class NewsletterGenCrew:
    """NewsletterGen crew"""

    agents_config_path = "config/agents.yaml"
    tasks_config_path = "config/tasks.yaml"

    def __init__(self):
        # Load configurations from YAML files
        with open(self.agents_config_path, 'r') as file:
            self.agents_config = yaml.safe_load(file)

        with open(self.tasks_config_path, 'r') as file:
            self.tasks_config = yaml.safe_load(file)

        self.agents = {
            "researcher": self.researcher(),
            "editor": self.editor(),
            "designer": self.designer(),
        }
        self.tasks = {
            "research_task": self.research_task(),
            "edit_task": self.edit_task(),
            "newsletter_task": self.newsletter_task(),
        }

    def llm(self):
        # llm = ChatAnthropic(model_name="claude-3-sonnet-20240229", max_tokens=4096)
        llm = ChatGroq(model="llama3-70b-8192", api_key=os.getenv('GROQ_API_KEY'))
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
            config=self.agents_config["researcher"],
            tool=[SearchAndContents(), FindSimilar(), GetContents()],
            verbose=True,
            llm=self.llm(),
            step_callback=lambda step: self.step_callback(step, "Research Agent"),
        )

    def editor(self) -> Agent:
        return Agent(
            config=self.agents_config["editor"],
            verbose=True,
            tool=[SearchAndContents(), FindSimilar(), GetContents()],
            llm=self.llm(),
            step_callback=lambda step: self.step_callback(step, "Chief Editor"),
        )

    def designer(self) -> Agent:
        return Agent(
            config=self.agents_config["designer"],
            verbose=True,
            allow_delegation=False,
            llm=self.llm(),
            step_callback=lambda step: self.step_callback(step, "HTML Writer"),
        )

    def research_task(self) -> Task:
        return Task(
            config=self.tasks_config["research_task"],
            agent=self.researcher(),
            output_file=f"./logs/{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}_research_task.md",
        )

    def edit_task(self) -> Task:
        return Task(
            config=self.tasks_config["edit_task"],
            agent=self.editor(),
            output_file=f"./logs/{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}_edit_task.md",
        )

    def newsletter_task(self) -> Task:
        return Task(
            config=self.tasks_config["newsletter_task"],
            agent=self.designer(),
            output_file=f"./logs/{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}_newsletter_task.html",
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


def main():
    st.title("NewsletterGen Crew")

    st.sidebar.header("Tasks")
    crew = NewsletterGenCrew()

    # UI Buttons to trigger tasks
    if st.sidebar.button("Run Research Task"):
        st.subheader("Research Task")
        task = crew.research_task()
        crew.crew().run_task(task)

    if st.sidebar.button("Run Edit Task"):
        st.subheader("Edit Task")
        task = crew.edit_task()
        crew.crew().run_task(task)

    if st.sidebar.button("Run Newsletter Task"):
        st.subheader("Newsletter Task")
        task = crew.newsletter_task()
        crew.crew().run_task(task)

    # Display logs
    st.sidebar.header("Logs")
    log_files = [f for f in os.listdir('./logs') if os.path.isfile(os.path.join('./logs', f))]
    selected_log = st.sidebar.selectbox("Select a log file", log_files)
    
    if selected_log:
        with open(os.path.join('./logs', selected_log), 'r') as log_file:
            log_content = log_file.read()
            st.subheader(f"Log: {selected_log}")
            st.code(log_content)

if __name__ == "__main__":
    main()