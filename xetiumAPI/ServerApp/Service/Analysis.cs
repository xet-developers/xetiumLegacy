using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.Service
{
    public class Analysis : IAnalysisService
    {
        public async Task<int> GetPositionAsync(AnalysisData model, HttpClient client)
        {
            var response = await client.GetAsync($"https://google.com/search?q={model.Keyword}&num={model.Top}");
            var htmlContent = await response.Content.ReadAsStringAsync();
            var doc = new HtmlDocument();
            doc.LoadHtml(htmlContent);
            var searchResults = doc.DocumentNode.SelectNodes("//*[@id=\"main\"]/div/div/div/a/@href");

            var index = 1;
            foreach (var searchResult in searchResults)
            {
                if (searchResult.Attributes["href"].Value.Contains(model.URI))
                {
                    return index;
                }
                index++;
            }
            return -1;
        }
    }
}
