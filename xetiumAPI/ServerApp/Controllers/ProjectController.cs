using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Controllers;


[Route("project")]
[ApiController]
public class ProjectController
{
    private IProjectService _projectService;
    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }
    
    [Route("create")]
    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] ProjectModelCreate modelCreate)
    {
        var result = await _projectService.CreateProjectAsync(modelCreate);
        return new ObjectResult(result) { StatusCode = StatusCodes.Status201Created };
    }

    [HttpDelete]
    public Task<IActionResult> DeleteProject()
    {
        return null;
    }

    [HttpPatch]
    public Task<IActionResult> ModifyProject()
    {
        return null;
    }
}