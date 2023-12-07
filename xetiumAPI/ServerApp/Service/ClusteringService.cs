using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using xetiumAPI.Interfaces;

namespace xetiumAPI.Service;

public class ClusteringService : IClusteringService
{
    private static readonly string FolderId = "b1gnogno2l3gvm4bj8cg";
    private static readonly string ApiKey = "Api-Key AQVN2WKYnCn8f-vhljFQjlOU1vo-_4AMDfp3JItn";
    private readonly HttpClient _httpClient;

    public ClusteringService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    public async Task<string> GetClusterQueriesUsingAiAsync(string querie)         
    {
           _httpClient.DefaultRequestHeaders.Add("x-folder-id", FolderId);
           _httpClient.DefaultRequestHeaders.Add("Authorization", ApiKey);
           
           var data = new
           {
               modelUri = "gpt://b1gnogno2l3gvm4bj8cg/yandexgpt-lite",
               completionOptions = new
               {
                   stream = false,
                   temperature = 0.1,
                   maxTokens = "4000"
               },
               messages = new object[]
               {
                   new { role = "system", text = "Разбей список ключевых фразы на кластеры по интенту запросов, не бери фразы из примера прям вообще,  чисто из списка из ключевых слов, используй все слова из ключивых фраз.Если не получится разбить, то выведи отдельно снизу в загаловке УВЫ. Пример: скачать музыку\nлучшие песни 2023 года\nкак научиться играть на гитаре\nсайт spotify\nкупить билеты на концерт\nчто такое рок-музыка\nподписаться на музыкальный сервис\nистория музыки\nсравнить цены на наушники\nпослушать радио онлайн\nА вот как я их кластеризую по интенту запросов:\n\nКоммерческий интент: запросы, которые выражают желание пользователя купить что-то или сравнить цены, характеристики, отзывы и т.д. Примеры: купить билеты на концерт, сравнить цены на наушники.\nИнформационный интент: запросы, которые выражают потребность пользователя в получении информации о чем-то или узнать ответ на вопрос. Примеры: лучшие песни 2023 года, как научиться играть на гитаре, что такое рок-музыка, история музыки.\nНавигационный интент: запросы, которые выражают намерение пользователя перейти на определенный сайт или страницу. Примеры: сайт spotify, послушать радио онлайн.\nТранзакционный интент: запросы, которые выражают желание пользователя выполнить какое-то действие на сайте или в приложении. Примеры: скачать музыку, подписаться на музыкальный сервис. " },
                   new { role = "user", text = $"Ключивые фраза: {querie}" }
               }
           };

           var json = JsonConvert.SerializeObject(data);
           var content = new StringContent(json, Encoding.UTF8, "application/json");

           var response = await _httpClient.PostAsync("https://llm.api.cloud.yandex.net/foundationModels/v1/completion", content);
           var responseBody = await response.Content.ReadAsStringAsync();
           
           var jsonData = JObject.Parse(responseBody);
           var text = jsonData["result"]["alternatives"][0]["message"]["text"].ToString();
           return text;
    }
}
