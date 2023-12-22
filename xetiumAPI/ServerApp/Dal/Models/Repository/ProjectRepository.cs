using Microsoft.EntityFrameworkCore;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;

public class ProjectRepository: IProjectRepository
{
    private ApplicationContextDb _applicationContextDb;
    public ProjectRepository(ApplicationContextDb applicationContextDb)
    {
        _applicationContextDb = applicationContextDb;
    }
    public async Task CreateProjectAsync(ProjectDal userDal)
    {
        var dbSet = _applicationContextDb.ProjectDbSet;
        await dbSet.AddAsync(userDal);
        await _applicationContextDb.SaveChangesAsync();
    }

    public async Task<List<ProjectDal>> GetAllUserProjectAsync(Guid id)
    {
        var dbSet = _applicationContextDb.ProjectDbSet;
        var projects = await dbSet
            .Where(p => p.ProjID == id)
            .Include(projectDal => projectDal.Searches)
            .ToListAsync();
        
        return projects;
    }

    public async Task<ProjectDal?> GetProjectByIdAsync(Guid id)
    {
        var dbSet = _applicationContextDb.ProjectDbSet;
        var project = await dbSet.FindAsync(id);
        
        return project;
    }

    public Task DeleteProjectAsync(Guid guid)
    {
        throw new NotImplementedException();
    }
}