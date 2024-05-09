using MovieService.Models;

namespace MovieService.Services;

public interface IActorsService
{
    Task<List<Actor>> GetAllActorsAsync();
}