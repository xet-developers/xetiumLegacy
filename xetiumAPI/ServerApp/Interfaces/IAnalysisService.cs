using xetiumAPI.Models;

namespace xetiumAPI.Interfaces
{
    public interface IAnalysisService
    {
        public Task<int> GetPositionAsync(AnalysisData model, HttpClient client);
    }
}
