using xetiumAPI.Models;

namespace xetiumAPI.Interfaces
{
    public interface IAnalysisService
    {
        public Task<Dictionary<string, int>> GetPositionAsync(AnalysisData model, HttpClient client);
    }
}
