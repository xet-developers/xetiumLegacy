using System.Text;
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
        var jsonContent = $@"{{
                ""modelUri"": ""gpt://b1gnogno2l3gvm4bj8cg/yandexgpt/latest"",
                ""completionOptions"": {{
                    ""stream"": false,
                    ""temperature"": 0.1,
                    ""maxTokens"": 4000
                }},
                ""messages"": [
                    {{
                        ""role"": ""system"",
                        ""text"": ""Для каждого запроса из списка определить его интент (коммерческий, информационный, обучающий, навигационный или другой).""
                    }},
                    {{
                        ""role"": ""user"",
                        ""text"": ""Список:""{querie}""
                    }}
                ]
            }}";
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri("https://llm.api.cloud.yandex.net/foundationModels/v1/completion"),
            Content = new StringContent(jsonContent, Encoding.UTF8, "application/json")
        };

        request.Headers.Add("x-folder-id", FolderId);
        request.Headers.Add("Authorization", ApiKey);

        var response = await _httpClient.SendAsync(request);
        var responseBody = await response.Content.ReadAsStringAsync();

        return responseBody;
    }
}