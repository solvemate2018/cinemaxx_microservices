using AuthService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Data;

public class AuthDbContext : DbContext
{
    private readonly IPasswordHasher<User> _passwordHasher;
    public DbSet<User> Users { get; set; }
    
    public AuthDbContext(DbContextOptions<AuthDbContext> options, IPasswordHasher<User> passwordHasher) : base(options)
    {
        _passwordHasher = passwordHasher;
        Database.EnsureCreated();
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var admin = new User();
        admin.FirstName = "Admin";
        admin.LastName = "Admin";
        admin.Email = "some@email.com";
        admin.Role = "ADMIN";
        admin.Id = 1;
        admin.PasswordHash = _passwordHasher.HashPassword(admin, "admin123");
        modelBuilder.Entity<User>().HasData(admin);
    }
}