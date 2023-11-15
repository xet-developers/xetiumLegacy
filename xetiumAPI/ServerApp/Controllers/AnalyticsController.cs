﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.Controllers
{
    [Route("abc")]
    [ApiController]
    //[Authorize] после реализации авторизации раскоментировать
    public class AnalyticsController : Controller
    {
        private IAnalysisService _analysisService;
        private HttpClient _client;
        public AnalyticsController(IAnalysisService analysisService, HttpClient client)
        {
            _analysisService = analysisService;
            _client = client;
        }
        [HttpPost]
        public async Task<ActionResult<int>> GetSitePosition([FromBody] AnalysisData site)
        {
            var positionResult = await _analysisService.GetPositionAsync(site, _client);
            return Ok(positionResult);
        }
    }
}
