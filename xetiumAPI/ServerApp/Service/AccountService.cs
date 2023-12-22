using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Claims;
using Medo;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp;
using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Service
{
    public class AccountService : IAuthenticationService
    {
        private IUserRepository _userRepository;
        private UserManager<UserDal> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountService(IUserRepository userRepository, UserManager<UserDal> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<IdentityResult> RegisterUser(UserRegisterModel userRegisterModel)
        {
            var id = new Uuid7().ToGuid();
            var user = new UserDal
            {
                UserName = userRegisterModel.UserName, Email = userRegisterModel.Email, Id = id,
                Name = userRegisterModel.Name
            };
            var createResult = await _userManager.CreateAsync(user, userRegisterModel.Password);
            if (!createResult.Succeeded)
            {
                return createResult;
            }

            var result = new AuthenticateResponseDto()
            {
                Result = createResult,
                Id = id
            };
            await _userManager.AddToRoleAsync(user, UserRoles.User);
            return createResult;
        }

        public async Task<JwtSecurityToken> LoginUser(UserLoginModel userLogin)
        {
            var user = await _userManager.FindByNameAsync(userLogin.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, userLogin.Password))
            {
                return null;
            }
            
            var userRoles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>()
            {
                new(ClaimTypes.Name, user.UserName),
                new("id", user.Id.ToString()),
                new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(nameof(IdentityUser.SecurityStamp), user.SecurityStamp)
            };
            claims.AddRange(userRoles.Select(userRole => 
                    new Claim(ClaimTypes.Role, userRole)));
            
            var token = GetToken(claims);
            return token;
        }
        
        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = AuthOptions.GetSymmetricSecurityKey();

            var token = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return token;
        }
    }
}
