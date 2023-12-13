using xetiumAPI.Models;

namespace xetiumAPI.Interfaces;

public interface IProjectService
{
    public Task<ProjectResponseDto> CreateProjectAsync(ProjectModelCreate modelCreate);
}