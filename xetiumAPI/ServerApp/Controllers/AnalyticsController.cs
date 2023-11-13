using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.Controllers
{
    [Route("abc")]
    [ApiController]
    public class AnalyticsController : Controller
    {
        [HttpPost]
        public async Task<ActionResult<int>> GetSitePosition([FromBody] AnalysisData site, [FromServices] IAnalysisService analysis, [FromServices] HttpClient client)
        {
            return Ok(await analysis.GetPositionAsync(site, client));
        }
    }
}
