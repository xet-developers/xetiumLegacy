using System.Text;
using Newtonsoft.Json;
using xetiumAPI.Interfaces;

namespace xetiumAPI.Service;

public class ClusteringService : IClusteringService
{
    private static readonly string FolderId = "aje8gb4fak8kgvlhgg42";
    private static readonly string ApiKey = "Api-Key AQVN2WKYnCn8f-vhljFQjlOU1vo-_4AMDfp3JItn";
    private readonly HttpClient _httpClient;

    public ClusteringService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    public async Task<string> GetClusterQueriesUsingAiAsync(string querie)         
    {
        _httpClient.DefaultRequestHeaders.Add("x-folder-id", "folder");
        _httpClient.DefaultRequestHeaders.Add("Content-Type", "application/json");
        _httpClient.DefaultRequestHeaders.Add("Authorization", "api");

        var data = new
        {
            modelUri = "gpt://b1gnogno2l3gvm4bj8cg/yandexgpt-lite",
            completionOptions = new
            {
                stream = false,
                temperature = 0.1,
                maxTokens = "1000"
            },
            messages = new object[]
            {
                new { role = "system", text = "Напиши кластеризацию запроса и выдай чисто варианты" },
                new { role = "user", text = @"Запрос: {querie} "}
            }
        };

        var json = JsonConvert.SerializeObject(data);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync("https://llm.api.cloud.yandex.net/foundationModels/v1/completion", content);
        var responseBody = await response.Content.ReadAsStringAsync();
            return responseBody;
    }
}
