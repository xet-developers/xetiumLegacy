using Microsoft.EntityFrameworkCore;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;


// Штучка как раз для соединения с нашей бд, аналог репозитория
public class AnalyticsContextDb: DbContext
{
    public DbSet<AnalyticsDal> AnalyticsDals { get; set; }

    public AnalyticsContextDb(DbContextOptions<AnalyticsContextDb> options):
        base(options)
    {
        // проверит наличе бд и если нету создаст
        //Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       // optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}