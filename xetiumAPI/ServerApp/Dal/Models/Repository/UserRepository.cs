using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;

public class UserRepository: IUserRepository
{
    private readonly ApplicationContextDb _contextDb;
    public UserRepository(ApplicationContextDb userContextDb)
    {
        _contextDb = userContextDb;
    }
    public Task<AuthenticateResponse> RegisterUser(UserLoginModel model)
    {
        throw new NotImplementedException();
    }

    public Task<AuthenticateResponse> AuthenticateUser(UserRegisterModel model)
    {
        throw new NotImplementedException();
    }
}