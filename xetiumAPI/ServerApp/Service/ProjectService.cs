using Medo;
using Microsoft.AspNetCore.Identity;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp;
using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Service;

public class ProjectService: IProjectService
{
    private IProjectRepository _projectRepository;
    private UserManager<UserDal> _userManager;
    public ProjectService(IProjectRepository projectRepository, UserManager<UserDal> userManager)
    {
        _projectRepository = projectRepository;
        _userManager = userManager;
    }
    public async Task<ProjectResponseDto> CreateProjectAsync(ProjectModelCreate modelCreate)
    {
        var userInfo = await _userManager.FindByIdAsync(modelCreate.userId.ToString());
        if (userInfo is null)
        {
            throw new KeyNotFoundException("User not found");
        }
        
        var projectId =  new Uuid7().ToGuid();
        var project = new ProjectDal()
        {
            ProjID = projectId,
            Name = modelCreate.Name,
            URL = modelCreate.Url,
            UserID = modelCreate.userId,
            User = userInfo,
            Searches = new List<SearchDal>(),
            Description = modelCreate.Description
        };

        await _projectRepository.CreateProjectAsync(project);
        return new ProjectResponseDto()
        {
            projectId = projectId
        };
    }

    public async Task<List<ProjectDto>> GetAllProjectsAsync(Guid userId)
    {
        var projects = await _projectRepository.GetAllUserProjectAsync(userId);
        var allProjects = projects
            .Select(p => new ProjectDto()
        {
            Name = p.Name,
            Url = p.URL,
            Description = p.Description,
            Searches = p.Searches
        }).ToList();
        
        return allProjects;
    }

    public async Task DeleteProjectAsync(Guid userId)
    {
        throw new NotImplementedException();
    }
}