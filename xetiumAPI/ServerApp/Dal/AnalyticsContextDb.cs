using Microsoft.EntityFrameworkCore;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;


// Штучка как раз для соединения с нашей бд, аналог репозитория
public class AnalyticsContextDb: DbContext
{

    public  DbSet<KeywordDal> KeywordsDbSet{ get; set; }
    public  DbSet<SearchDal> SearchDbSet  {get; set; }
    public  DbSet<ProjectDal> ProjectDbSet  {get; set; }
    public DbSet<KeywordResultDal> KeywordResultDal { get; set; }

    public AnalyticsContextDb(DbContextOptions<AnalyticsContextDb> options):
        base(options)
    {
        // проверит наличе бд и если нету создаст
        Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       // optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<KeywordResultDal>().HasKey(k => new { k.SearchID, k.KeywordID});
    }
}