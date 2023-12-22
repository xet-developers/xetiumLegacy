using xetiumAPI.Models;

namespace xetiumAPI.Interfaces;

public interface IProjectService
{
    public Task<ProjectResponseDto> CreateProjectAsync(ProjectModelCreate modelCreate);
    public Task<List<ProjectDto>> GetAllProjectsAsync(Guid userId);
    public Task DeleteProjectAsync(Guid userId);
}