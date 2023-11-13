using xetiumAPI.Models;

namespace xetiumAPI.Interfaces
{
    public interface IRegisterService
    {
        public Task<string> GetJWTTokenAsync(User user);
    }
}
