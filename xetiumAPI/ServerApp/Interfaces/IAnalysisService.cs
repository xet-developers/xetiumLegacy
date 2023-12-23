using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Interfaces;

public interface IAnalysisService
{
    public Task<Dictionary<string, int>> GetPositionAsync(AnalysisData model, HttpClient client, Guid userId);
}

