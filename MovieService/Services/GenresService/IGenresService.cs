using MovieService.Models;

namespace MovieService.Services.GenresService;

public interface IGenresService
{
    Task<List<Genre>> GetAllGenresAsync();
}