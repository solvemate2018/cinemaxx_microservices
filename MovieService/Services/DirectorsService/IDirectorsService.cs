using MovieService.Models;

namespace MovieService.Services.DirectorsService;

public interface IDirectorsService
{ 
    Task<List<Director>> GetAllDirectorsAsync();
}