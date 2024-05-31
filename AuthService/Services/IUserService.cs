using AuthService.Models;

namespace AuthService.Services;

public interface IUserService
{
    Task<User> AuthenticateUser(string email, string password);
    Task<User> RegisterUser(string email, string password, string firstName, string lastName, bool isAdmin);
}