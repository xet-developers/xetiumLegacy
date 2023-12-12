using Microsoft.AspNetCore.Identity;
using xetiumAPI.Models;

namespace xetiumAPI.Interfaces
{
    public interface IRegisterService
    {
        public  Task<AuthenticateResponseDto> RegisterUser(UserRegisterModel userRegisterModel);
        public Task<string> GetJWTTokenAsync(UserRegisterModel userRegisterModel);
    }
}
