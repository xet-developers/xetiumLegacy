using Medo;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Dal.Models.Repository;
using xetiumAPI.ServerApp.Service;
using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace Test;

public class ProjectTests
{
    private RoleManager<IdentityRole<Guid>> _roleManager;
    private UserManager<UserDal> _userManager;
    private AccountService _accountService;
    private UserDal _testUser;
    private ProjectRepository _projectRepository;
    private ProjectService _projectService;
    private Guid _id;
    private string _userPassword;

    [SetUp]
    public void Setup()
    {
        _userPassword = "Aboba12";
        _id = new Uuid7().ToGuid();
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
        _userManager = new UserManager<UserDal>(userStore, null, new PasswordHasher<UserDal>(), null, null, null, null, null, null);
        var roleStore = new RoleStore<IdentityRole<Guid>, ApplicationContextDb, Guid>(dbContext);
        _roleManager = new RoleManager<IdentityRole<Guid>>(roleStore, null, null, null, null);
        _accountService = new AccountService(null, _userManager, _roleManager);

        _projectRepository = new ProjectRepository(dbContext);
        _projectService = new ProjectService(_projectRepository, _userManager);
    }

    [Test]
    public async Task CreateProject()
    {
        var testProject = new ProjectModelCreate { Description = "Test", Name = "Test", Url = "https://www.youtube.com/" };
        await _userManager.CreateAsync(_testUser, _userPassword);

        var proj = await _projectService.CreateProjectAsync(testProject, _id);
        var result = _projectRepository.GetProjectByIdAsync(proj.ProjectId);

        IsNotNull(result);
        await _userManager.DeleteAsync(_testUser);
    }

    [Test]
    public async Task DeleteProject()
    {
        var testProject = new ProjectModelCreate { Description = "Test", Name = "Test", Url = "https://www.youtube.com/" };
        await _userManager.CreateAsync(_testUser, _userPassword);

        var proj = await _projectService.CreateProjectAsync(testProject, _id);
        var res = await _projectService.DeleteProjectAsync(_id, proj.ProjectId);
        await _userManager.DeleteAsync(_testUser);

        IsTrue(res);
    }
}

