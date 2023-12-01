using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Dal.Models;

namespace xetiumAPI.Interfaces;

public interface IAnalyticsRepository
{
    Task<ProjectDal?> FindProjectAsync(int projectId);
    Task AddSearchInformation (KeywordDal keywordDal, KeywordResultDal keywordResultDal);
}