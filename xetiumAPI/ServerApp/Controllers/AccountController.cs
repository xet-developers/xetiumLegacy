using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.Controllers
{
    [Route("register")]
    [ApiController]
    public class AccountController : Controller
    {
        private IRegisterService _registerService;
        public AccountController(IRegisterService registerService)
        {
            _registerService = registerService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            return Ok();
        }
    }
}
