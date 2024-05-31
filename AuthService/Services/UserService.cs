using AuthService.Data;
using AuthService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Services;

public class UserService : IUserService
{
    private readonly AuthDbContext _context;
    private readonly IPasswordHasher<User> _passwordHasher;

    public UserService(AuthDbContext context, IPasswordHasher<User> passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    public async Task<User> AuthenticateUser(string email, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password) == 0)
        {
            return null;
        }

        return user;
    }

    public async Task<User> RegisterUser(string email, string password, string firstName, string lastName, bool isAdmin)
    {
        var user = new User { Email = email, FirstName = firstName, LastName = lastName, Role = isAdmin ? "ADMIN" : "USER"};
        user.PasswordHash = _passwordHasher.HashPassword(user, password);
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }
}