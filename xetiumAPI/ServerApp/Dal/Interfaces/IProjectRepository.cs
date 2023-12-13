using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Interfaces;

public interface IProjectRepository
{
    public Task<bool> CreateProjectAsync(ProjectDal userDal);
}