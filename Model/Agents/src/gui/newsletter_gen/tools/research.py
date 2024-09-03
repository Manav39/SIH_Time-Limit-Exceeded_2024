from crewai_tools import BaseTool
from exa_py import Exa
import os
from datetime import datetime, timedelta

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