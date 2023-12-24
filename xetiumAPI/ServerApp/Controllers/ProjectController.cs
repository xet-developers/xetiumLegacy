using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Extentions;
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
        var userID = GetUserId();
        var result = await _projectService.CreateProjectAsync(modelCreate, userID);
        return Created("Slon Kuplen",new {Id = result.projectId});
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProjects()
    {
        var userID = GetUserId();
        var result = await _projectService.GetAllProjectsAsync(userID);
        return Ok(result);
    }

    private Guid GetUserId()
    {
        var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
        var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);
        return userID;
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteProject(Guid projectId)
    {
        var userID = GetUserId();
        await _projectService.DeleteProjectAsync(userID);
        return NoContent();
    }

    [HttpPatch("modify/\"{id:guid}\"")]
    public Task<IActionResult> ModifyProject(Guid projectId, ModifyProject modifyProject)
    {
        return null;
    }
}