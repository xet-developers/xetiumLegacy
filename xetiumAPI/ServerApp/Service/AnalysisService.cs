using System.Xml;
using System.Xml.Linq;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Service
{
    public class AnalysisService : IAnalysisService
    {
        private const string ApiUrl = "https://yandex.ru/search/xml/";
        private const string YandexApiKey = "ajent6r8v2odhbmelt2v:AQVN1-m2j4sNiuzq9F8afgvJ2zroGSoIgXY0X4U5";
        private const string YandexUser = "zasrom";
        
        private Dictionary<SearchSystem, Func<AnalysisData, HttpClient, string, Task<int>>> _methods;
        private IAnalyticsRepository _analyticsRepository;
        public AnalysisService(IAnalyticsRepository analyticsRepository)
        {
            _methods = new Dictionary<SearchSystem, Func<AnalysisData, HttpClient, string, Task<int>>>
                    {
                        { SearchSystem.Yandex, GetYandexPositionAsync },
                        { SearchSystem.Google, GetGooglePositionAsync }
                    };
            _analyticsRepository = analyticsRepository;
        }

        public async Task<Dictionary<string, int>> GetPositionAsync(AnalysisData model, HttpClient client)
        {
            var statics = new Dictionary<string, int>();
            var project = await _analyticsRepository.FindProjectAsync(model.ProjId);
            if (project is null)
            {
                throw new KeyNotFoundException("Project doesn't found");
            }
            
            var searchDal = new SearchDal()
            {
                ProjID = project.ProjID,
                Date = DateTime.Now.ToUniversalTime(),
                Type = ((SearchSystem)model.SearchSystem).ToString(),
                Project =  project,
                KeywordResults = new List<KeywordResultDal>()
            };
            foreach(var keyword in  model.Keywords)
            {
                if (!_methods.TryGetValue((SearchSystem)model.SearchSystem, out var method))
                {
                    continue;
                }
                
                var keywordDal = new KeywordDal()
                {
                    Text = keyword
                };
                
                var position = await method(model, client, keyword);
                var keywordResult = new KeywordResultDal
                {
                    Position = position,
                    Keyword = keywordDal,
                    SearchDal = searchDal,
                    KeywordID = keywordDal.KeywordID
                };
                await _analyticsRepository.AddSearchInformation(keywordDal, keywordResult);
                statics.Add(keyword, position);
            }

            return statics;
        }

        private static async Task<int> GetGooglePositionAsync(AnalysisData model, HttpClient client, string keyword)
        {
            var response = await client.GetAsync($"https://google.com/search?q={keyword}&num={model.Top}");
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

        private static async Task<int> GetYandexPositionAsync(AnalysisData model, HttpClient client, string keyword)
        {
            var index = 1;
            var top = Math.Ceiling((double)model.Top / 10);
            for (var page = 0; page < top; page++)
            {
                var url = $"{ApiUrl}?user={YandexUser}&apikey={YandexApiKey}&query={model.Keywords}&page={page}";
                var response = await client.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                {
                    continue;
                }
                var result = await response.Content.ReadAsStringAsync();
                var xmlDocument = new XmlDocument();
                xmlDocument.LoadXml(result);
                
                var urls = xmlDocument.SelectNodes("//url");
                foreach (XmlNode urlNode in urls)
                {
                    var urlText = urlNode.InnerText;
                    if (urlText == model.URI)
                    {
                        return index;
                    }
                    index++;
                }
            }

            return -1;
        }


    }
}
