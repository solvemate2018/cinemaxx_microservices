using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MovieService.Models;
using MovieService.Services;
using MovieService.Services.MoviesService;
using Serilog.Core;

namespace MovieService.Controllers;

[ApiController]
[Route("actors")]
public class ActorsController(IActorsService actorsService, IMoviesService moviesService, Logger logger, ActivitySource activitySource) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllActors()
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Getting all actors.");
            return Ok(await actorsService.GetAllActorsAsync());
        }
    }
    
    [HttpGet]
    [Route("{actorId}/movies")]
    public async Task<IActionResult> GetAllMoviesForActor([FromRoute] int actorId)
    {
        using (var activity = activitySource.StartActivity())
        {
            logger.Information("Getting all movies for actor: {}.", actorId);
            List<Movie>? movies = await moviesService.GetMoviesByActorIdAsync(actorId);
            if (movies != null) return Ok(movies);
            return NotFound("No actor with that ID");
        }
    }
}