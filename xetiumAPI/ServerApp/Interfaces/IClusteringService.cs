namespace xetiumAPI.Interfaces;

public interface IClusteringService
{
    public Task<string> GetClusterQueriesUsingAiAsync(string querie);
}