using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using xetiumAPI.Models;

namespace xetiumAPI.Interfaces
{
    public interface IAuthenticationService
    {
        public  Task<IdentityResult> RegisterUser(UserRegisterModel userRegisterModel);
        public Task<JwtSecurityToken> LoginUser(UserLoginModel userLogin);
    }
}
