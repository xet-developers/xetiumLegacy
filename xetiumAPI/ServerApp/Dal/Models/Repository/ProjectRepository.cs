using Microsoft.EntityFrameworkCore;
using xetiumAPI.Interfaces;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;

public class ProjectRepository: IProjectRepository
{
    private ApplicationContextDb _applicationContextDb;
    public ProjectRepository(ApplicationContextDb applicationContextDb)
    {
        _applicationContextDb = applicationContextDb;
    }
    public async Task<bool> CreateProjectAsync(ProjectDal userDal)
    {
        var dbSet = _applicationContextDb.ProjectDbSet;
        var result = await dbSet.AddAsync(userDal);
        return result.State == EntityState.Added;
    }
}