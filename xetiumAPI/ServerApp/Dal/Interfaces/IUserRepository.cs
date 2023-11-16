using xetiumAPI.Models;

namespace xetiumAPI.Interfaces;

public interface IUserRepository
{
    Task<AuthenticateResponse> RegisterUser(UserLoginModel model);
    Task<AuthenticateResponse> AuthenticateUser(UserRegisterModel model);
}