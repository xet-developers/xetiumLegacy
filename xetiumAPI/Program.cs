using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Identity;
using xetiumAPI.Interfaces;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Dal.Models.Repository;
using xetiumAPI.Service;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();
builder.Services.AddScoped<IRegisterService, AccountService>();
builder.Services.AddScoped<IAnalysisService, AnalysisService>();
builder.Services.AddScoped<IClusteringService, ClusteringService>();
builder.Services.AddIdentity<UserDal, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<ApplicationContextDb>()
    .AddDefaultTokenProviders();
// Register UserManager
builder.Services.AddScoped<UserManager<UserDal>>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationContextDb>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddDbContext<UserContextDb>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAnalyticsRepository, AnalitycsRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContextDb>();
        await context.Database.MigrateAsync();
    }

}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();