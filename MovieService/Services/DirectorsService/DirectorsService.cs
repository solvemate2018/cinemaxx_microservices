using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Models;

namespace MovieService.Services.DirectorsService;

public class DirectorsService(MovieServiceDbContext dbContext) : IDirectorsService
{
    public async Task<List<Director>> GetAllDirectorsAsync()
    {
        return await dbContext.Directors.ToListAsync();
    }
}