using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Models;

namespace MovieService.Services.GenresService;

public class GenresService(MovieServiceDbContext dbContext) : IGenresService
{
    public async Task<List<Genre>> GetAllGenresAsync()
    {
        return await dbContext.Genres.ToListAsync();
    }
}