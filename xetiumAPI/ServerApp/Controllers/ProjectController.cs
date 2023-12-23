using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Interfaces;

namespace xetiumAPI.ServerApp.Controllers;


[Route("project")]
[ApiController]
public class ProjectController: Controller
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
        return Created("Slon Kuplen",new {Id = result.projectId});
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetAllProjects(Guid userId)
    {
        var result = await _projectService.GetAllProjectsAsync(userId);
        return Ok(result);
    }
    
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteProject(Guid projectId)
    {
        await _projectService.DeleteProjectAsync(projectId);
        return NoContent();
    }

    [HttpPatch("modify/\"{id:guid}\"")]
    public Task<IActionResult> ModifyProject(Guid projectId, ModifyProject modifyProject)
    {
        return null;
    }
}