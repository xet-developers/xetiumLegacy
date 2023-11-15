using xetiumAPI.Interfaces;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;

public class AnalitycsRepository: IAnalyticsRepository
{
    private readonly AnalyticsContextDb _contextDb;
    public AnalitycsRepository(AnalyticsContextDb contextDb)
    {
        _contextDb = contextDb;
    }

    //example method. Вовзращает все данные
    public IEnumerable<AnalyticsDal> GetProducts()
    {
        return _contextDb.AnalyticsDals.ToList();
    }
}