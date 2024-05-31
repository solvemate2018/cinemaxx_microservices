using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthService.Models;
using Microsoft.IdentityModel.Tokens;

namespace AuthService.Services;

public class JwtUtils
{
    public static string GenerateJwtToken(User user)
    {
        var securityKey = GetSigningKey();
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.GivenName, user.FirstName),
            new Claim(ClaimTypes.Name, user.LastName),
            new Claim(ClaimTypes.Role, user.Role),
        };

        var token = new JwtSecurityToken(
            issuer: "auth-service",
            audience: "cinema-services",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(12),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static SymmetricSecurityKey GetSigningKey()
    {
        var jwt_secret = !String.IsNullOrEmpty(Environment.GetEnvironmentVariable("JWT_SECRET_KEY"))
            ? Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY"))
            : Encoding.UTF8.GetBytes("some_default_value_that_can_be_used_when_nothing_is_seted");
        return new SymmetricSecurityKey(jwt_secret);
    }
}