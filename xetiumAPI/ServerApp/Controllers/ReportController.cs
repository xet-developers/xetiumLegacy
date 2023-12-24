using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Extentions;
using xetiumAPI.ServerApp.Interfaces;

namespace xetiumAPI.ServerApp.Controllers;

[Route("report")]
[ApiController]
[Authorize]
public class ReportController : Controller
{
    IReportService _reportService;
    public ReportController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpPost]
    public async Task<FileStreamResult> GetReport([FromBody] ReportInfoDto reportDto)
    {
        var token = Request.Headers["Authorization"].FirstOrDefault().ParseJWT();
        var userID = Guid.Parse(token.Claims.FirstOrDefault(c => c.Type == "id").Value);

        var rep = await _reportService.GetReportAsync(reportDto, userID);

        return new FileStreamResult(rep, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        {
            FileDownloadName = "Report.xlsx"
        };
    }
}
