using Medo;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Dal.Models.Repository;
using xetiumAPI.ServerApp.Service;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace Test;

public class ReportTest
{
    private  UserManager<UserDal> _userManager;
    private UserDal _testUser;
    private Guid _id;
    private string _userPassword;
    private ProjectRepository _projectRepository;
    private AnalitycsRepository _analitycsRepository;
    private AnalysisService _analysisService;
    private ApplicationContextDb _dbContext;
    private ReportService _repotService;
    
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

        _dbContext = new ApplicationContextDb(options);
        _dbContext.Database.EnsureCreated();
        var userStore = new UserStore<UserDal, IdentityRole<Guid>, ApplicationContextDb, Guid>(_dbContext);
        _userManager = new UserManager<UserDal>(userStore, null, new PasswordHasher<UserDal>(), null, null, null, null, null, null);
        _projectRepository = new ProjectRepository(_dbContext);
        _analitycsRepository = new AnalitycsRepository(_dbContext);
        _analysisService = new AnalysisService(_analitycsRepository, _projectRepository);
        _repotService = new ReportService(_projectRepository);
    }

    [Test]
    public async Task GetReport()
    {
        await _userManager.CreateAsync(_testUser,_userPassword);
        var projId = new Uuid7().ToGuid();
        
        await _projectRepository.CreateProjectAsync(new ProjectDal()
        {
            ProjID = projId,
            Name = "test",
            URL = "test",
            Description = "ustal",
            UserID = _id
        });


        var analyticsData = new AnalysisData()
        {
            ProjId = projId,
            URI = "ustal228",
            Keywords = new[] { "test" },
            SearchSystem = 0
        };
        
        await _analysisService.GetPositionAsync(analyticsData, new HttpClient(), _id);

        var dateInfo = new ReportInfoDto()
        {
            FirstDate = DateTime.Parse("2024-01-08T00:00:00.00Z"),
            LastDate =  DateTime.Today.AddHours(23)
        };
        var result = await _repotService.GetReportAsync(dateInfo,_id);

        Assert.IsNotNull(result);
        
        await _userManager.DeleteAsync(_testUser);
    }
}