using Medo;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.ServerApp.Controllers
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
            var registerResult = await _registerService.RegisterUser(model);
            
            if (registerResult.Result.Succeeded)
            {
                return Created("Alyona Kupi", new { Id = registerResult.Id });
            }

            foreach (var error in registerResult.Result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            return Ok();
        }
    }
}
