using Microsoft.AspNetCore.Mvc;
using MovieService.Models;
using MovieService.Services;
using MovieService.Services.MoviesService;

namespace MovieService.Controllers;

[ApiController]
[Route("actors")]
public class ActorsController(IActorsService actorsService, IMoviesService moviesService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllActors()
    {
        List<Actor> actors = await actorsService.GetAllActorsAsync();
        return Ok(actors);
    }
    
    [HttpGet]
    [Route("{actorId}/movies")]
    public async Task<IActionResult> GetAllMoviesForActor([FromRoute] int actorId)
    {
        List<Movie>? movies = await moviesService.GetMoviesByActorIdAsync(actorId);
        if (movies != null) return Ok(movies);
        return NotFound("No actor with that ID");
    }
}