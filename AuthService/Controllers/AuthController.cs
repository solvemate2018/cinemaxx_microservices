using System.Diagnostics;
using AuthService.Models;
using AuthService.Services;
using Microsoft.AspNetCore.Mvc;
using Serilog.Core;

namespace AuthService.Controllers;

[ApiController]
[Route("auth")]
public class AuthController(IUserService _userService, Logger logger, ActivitySource activitySource) : ControllerBase
{
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel login)
    {
        using (var activity = activitySource.StartActivity())
        { 
            logger.Information("Logging user: {login.Email}", login.Email );
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userService.AuthenticateUser(login.Email, login.Password);
        if (user == null)
        {
            logger.Warning("Invalid user or password: {login.Email}", login.Email );
            return BadRequest("Invalid email or password");
        }

        var token = JwtUtils.GenerateJwtToken(user);
        var cookieOptions = new CookieOptions
        {
            HttpOnly = false,
            SameSite = SameSiteMode.Lax,
            Secure = false
        };

        return Ok(token);
        }
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel register)
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Registering user: {register.Email}", register.Email);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userService.RegisterUser(register.Email, register.Password, register.FirstName,
                register.LastName, false);
            if (user == null)
            {
                logger.Warning("Registration failed user: {register.Email}", register.Email);
                return BadRequest("Registration failed");
            }

            var login = new LoginModel();
            login.Email = register.Email;
            login.Password = register.Password;
            return Ok("User successfully registered!");
        }
    }
}