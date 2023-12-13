using Medo;
using Microsoft.AspNetCore.Identity;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
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
            return new ProjectResponseDto()
            {
                CreationResult = false,
                projectId = Guid.Empty
            };
        }
        
        var projectId =  new Uuid7().ToGuid();
        var project = new ProjectDal()
        {
            ProjID = projectId,
            Name = modelCreate.Name,
            URL = modelCreate.Url,
            UserID = modelCreate.userId,
            User = userInfo,
            Searches = new List<SearchDal>()
        };

        var result =await _projectRepository.CreateProjectAsync(project);
        return new ProjectResponseDto()
        {
            CreationResult = result,
            projectId = projectId
        };
    }
    
}