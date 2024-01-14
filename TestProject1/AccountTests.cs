using Medo;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Dal.Models.Repository;
using xetiumAPI.ServerApp.Service;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
using Assert = NUnit.Framework.Assert;

namespace Test;

public class AccountTest
{
    private RoleManager<IdentityRole<Guid>> _roleManager;
    private  UserManager<UserDal> _userManager;
    private AccountService _accountService;
    private UserDal _testUser;
    private Guid _id;
    private string _userPassword;
    [SetUp]
    public void Setup()
    {
        _userPassword = "Aboba12";
        _id =  new Uuid7().ToGuid();
        _testUser = new UserDal
        {
            UserName = "Aboba",
            Email = "Aboba@mail.ru",
            Id = _id,
            Name = "Гусь"
        };
        var options = new DbContextOptionsBuilder<ApplicationContextDb>()
            .UseNpgsql("User ID=postgres;Password=123;Host=localhost;Port=5432;Database=test_seosite;Pooling=true;")
            .Options;

        var dbContext = new ApplicationContextDb(options);
        dbContext.Database.EnsureCreated();
        var userStore = new UserStore<UserDal, IdentityRole<Guid>, ApplicationContextDb, Guid>(dbContext);
        var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
        var logger = loggerFactory.CreateLogger<UserManager<UserDal>>();
        _userManager = new UserManager<UserDal>(userStore, null, new PasswordHasher<UserDal>(), null, null, null, null, null, logger);;
        var roleStore = new RoleStore<IdentityRole<Guid>, ApplicationContextDb, Guid>(dbContext);
        _roleManager = new RoleManager<IdentityRole<Guid>>(roleStore, null, null, null, null);
        
        _accountService = new AccountService(null, _userManager, _roleManager);
    }

    [Test]
    public async Task RegisterUser()
    {
        await _userManager.CreateAsync(_testUser,_userPassword);
        
        var createdUser = await _userManager.FindByIdAsync(_id.ToString());
        
        IsNotNull(createdUser);

        await _userManager.DeleteAsync(_testUser);
    }

    [Test]
    public async Task Login()
    {
        await _userManager.CreateAsync(_testUser,_userPassword);

        var userLogin = new UserLoginModel()
        {
            UserName = _testUser.UserName,
            Password = _userPassword
        };

        var result = await _accountService.LoginUserAsync(userLogin);
        
        IsNotNull(result);

        await _userManager.DeleteAsync(_testUser);
    }

    [Test]
    public async Task IncorectPaswordLogin()
    {
        await _userManager.CreateAsync(_testUser,_userPassword);
        
        var userLogin = new UserLoginModel()
        {
            UserName = _testUser.UserName,
            Password = "FakePasword"
        };

        var result = await _accountService.LoginUserAsync(userLogin);
        IsNull(result);
        
        await _userManager.DeleteAsync(_testUser);
    }

    [Test]
    public async Task DoesntExistUser()
    {
        var userLogin = new UserLoginModel()
        {
            UserName = _testUser.UserName,
            Password = "FakePasword"
        };
        var result = await _accountService.LoginUserAsync(userLogin);
        IsNull(result);
    }
}