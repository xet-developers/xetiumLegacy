using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Interfaces;

namespace xetiumAPI.ServerApp.Controllers;

[Route("cl")]
[ApiController]
public class ClusteringController: Controller
{
    private IClusteringService _clusteringService;

    public ClusteringController(IClusteringService clusteringService)
    {
        _clusteringService = clusteringService;
    }

    [HttpPost]
    public async Task<ActionResult> GetClustering([FromBody] ClusteringData clusteringData)
    {
        var clustering = await _clusteringService.GetClusterQueriesUsingAiAsync(clusteringData.query);
        return Ok(clustering);
    }
}