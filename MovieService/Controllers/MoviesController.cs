using Microsoft.AspNetCore.Mvc;

namespace MovieService.Controllers;

[ApiController]
[Route("movies")]
public class MoviesController : ControllerBase
{

    [HttpGet]
    public async Task<IActionResult> GetAllMovies()
    {
        return Ok();
    }

    [HttpGet]
    [Route("{movieId}")]
    public async Task<IActionResult> GetMovieDetails([FromRoute] int movieId)
    {
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> CreateMovie()
    {
        return Created();
    }

    [HttpPut]
    [Route("{movieId}")]
    public async Task<IActionResult> UpdateMovie([FromRoute] int movieId)
    {
        return NoContent();
    }
    
    [HttpDelete]
    [Route("{movieId}")]
    public async Task<IActionResult> DeleteMovie([FromRoute] int movieId)
    {
        return NoContent();
    }
}