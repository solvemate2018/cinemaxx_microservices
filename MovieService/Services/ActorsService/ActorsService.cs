using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Models;

namespace MovieService.Services;

public class ActorsService : IActorsService
{
    private readonly MovieServiceDbContext _dbContext;

    public ActorsService(MovieServiceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Actor>> GetAllActorsAsync()
    {
        return await _dbContext.Actors.ToListAsync();
    }
}