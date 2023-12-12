using System.Runtime.InteropServices.JavaScript;
using Medo;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json.Linq;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Service
{
    public class AccountService : IRegisterService
    {
        private IUserRepository _userRepository;
        private  UserManager<UserDal> _userManager;
        public AccountService(IUserRepository userRepository, UserManager<UserDal> userManager)
        {
            _userRepository = userRepository;
            _userManager = userManager;
        }
        public async Task<AuthenticateResponseDto> RegisterUser(UserRegisterModel userRegisterModel)
        {
            var id = new Uuid7().ToGuid();
            var user = new UserDal { UserName = userRegisterModel.Name, Email = userRegisterModel.Email, Id = id };
            var createResult =  await _userManager.CreateAsync(user, userRegisterModel.Password);
            var result = new  AuthenticateResponseDto()
            {
                Result = createResult,
                Id = id
            };
            return result;
        }
        
        public async Task<string> GetJWTTokenAsync(UserRegisterModel userRegisterModel)
        {
            return @"
░░░░░░░░░░░░░░░░░░░░
░░░░░ЗАПУСКАЕМ░░░░░░░
░ГУСЯ░▄▀▀▀▄░РАБОТЯГИ░░
▄███▀░◐░░░▌░░░░░░░░░
░░░░▌░░░░░▐░░░░░░░░░
░░░░▐░░░░░▐░░░░░░░░░
░░░░▌░░░░░▐▄▄░░░░░░░
░░░░▌░░░░▄▀▒▒▀▀▀▀▄
░░░▐░░░░▐▒▒▒▒▒▒▒▒▀▀▄
░░░▐░░░░▐▄▒▒▒▒▒▒▒▒▒▒▀▄
░░░░▀▄░░░░▀▄▒▒▒▒▒▒▒▒▒▒▀▄
░░░░░░▀▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▀▄
░░░░░░░░░░░▌▌░▌▌░░░░░
░░░░░░░░░░░▌▌░▌▌░░░░░
░░░░░░░░░▄▄▌▌▄▌▌░░░░░";
        }
    }
}
