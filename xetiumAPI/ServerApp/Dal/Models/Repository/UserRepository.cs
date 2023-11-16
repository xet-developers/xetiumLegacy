using xetiumAPI.Interfaces;
using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;

public class UserRepository: IUserRepository
{
    private readonly UserContextDb _contextDb;
    public UserRepository(UserContextDb userContextDb)
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