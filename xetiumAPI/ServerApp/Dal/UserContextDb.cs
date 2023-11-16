using Microsoft.EntityFrameworkCore;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal.Models;

namespace xetiumAPI.ServerApp.Dal;

public class UserContextDb : DbContext
{
    public DbSet<UserRegisterModel> Users { get; set; }
    public DbSet<TokenDal> Tokens { get; set; }

    public UserContextDb(DbContextOptions<UserContextDb> options) : base(options)
    {
        //Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       // optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      //  modelBuilder.Entity<UserRegisterModel>().HasKey(u => u.UserID);
      //  modelBuilder.Entity<TokenDal>().HasKey(t => t.TokenID);

    //modelBuilder.Entity<TokenDal>()
    //        .HasOne(t => t.UserRegisterModel)
      //      .WithMany(u => u.Tokens)
      //      .HasForeignKey(t => t.UserID);
    }
}
