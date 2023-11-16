using xetiumAPI.Models;

namespace xetiumAPI.Interfaces
{
    public interface IRegisterService
    {
        public  Task<AuthenticateResponse> RegisterUser(UserRegisterModel userRegisterModel);
        public Task<AuthenticateResponse> LoginUser(UserLoginModel userLoginModel);
        public Task<string> GetJWTTokenAsync(UserRegisterModel userRegisterModel);
    }
}
