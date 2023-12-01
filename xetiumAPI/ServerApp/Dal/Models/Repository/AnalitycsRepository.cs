using xetiumAPI.Interfaces;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;

public class AnalitycsRepository: IAnalyticsRepository
{
    private AnalyticsContextDb _analyticsContextDb;
    public AnalitycsRepository(AnalyticsContextDb analyticsContextDb)
    {
        _analyticsContextDb = analyticsContextDb;
    }
    
    public async Task<ProjectDal?> FindProjectAsync(int projectId)
    {
        var dbSet = _analyticsContextDb.ProjectDbSet;
        var project = await dbSet.FindAsync(projectId);
        return project;
    }
    
    public async Task AddSearchInformation (KeywordDal keywordDal, KeywordResultDal keywordResultDal)
    {
        await _analyticsContextDb.KeywordsDbSet.AddAsync(keywordDal);
        await _analyticsContextDb.KeywordResultDal.AddAsync(keywordResultDal);
        await _analyticsContextDb.SaveChangesAsync();
    }
}