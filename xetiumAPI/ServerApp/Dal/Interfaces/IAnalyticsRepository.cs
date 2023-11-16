using xetiumAPI.ServerApp.Dal.Models;

namespace xetiumAPI.Interfaces;

public interface IAnalyticsRepository
{
    IEnumerable<AnalyticsDal> GetProducts();
}