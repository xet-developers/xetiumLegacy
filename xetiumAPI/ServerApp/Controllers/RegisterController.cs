using Microsoft.AspNetCore.Mvc;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.Controllers
{
    [Route("register")]
    [ApiController]
    public class RegisterController : Controller
    {
        [HttpPost]
        public async Task<ActionResult<string>> GetJWTToken([FromBody] User user, [FromServices] IRegisterService register)
        {
            return Ok(await register.GetJWTTokenAsync(user));
        }
    }
}
