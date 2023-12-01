using Microsoft.EntityFrameworkCore;

namespace xetiumAPI.ServerApp.Dal;

public class DbContext<TEntity> : DbContext 
    where TEntity : class
{
    public DbSet<TEntity> Entity { get; set; }
    public DbContext(DbContextOptions options) : base(options)
    {
        Database.EnsureCreated();
    }

    // Другие настройки DbContext...
}

