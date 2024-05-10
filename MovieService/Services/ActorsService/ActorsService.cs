using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Models;

namespace MovieService.Services;

public class ActorsService(MovieServiceDbContext dbContext) : IActorsService
{
    public async Task<List<Actor>> GetAllActorsAsync()
    {
        return await dbContext.Actors.ToListAsync();
    }
}