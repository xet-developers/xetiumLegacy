using Medo;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.ServerApp.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : Controller
    {
        private IAuthenticationService _authenticationService;
        public AccountController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            var registerResult = await _authenticationService.RegisterUser(model);
            
            if (registerResult.Succeeded)
            {
                return Created("Alyona Kupi", new { state = registerResult.Succeeded });
            }

            foreach (var error in registerResult.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            var token = await _authenticationService.LoginUser(model);
            if (token is null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }
    }
}
