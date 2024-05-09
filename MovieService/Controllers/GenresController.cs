using Microsoft.AspNetCore.Mvc;

namespace MovieService.Controllers;

[ApiController]
[Route("genres")]
public class GenresController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllGenres()
    {
        return Ok();
    }
    
    [HttpGet]
    [Route("{genreId}/movies")]
    public async Task<IActionResult> GetAllMoviesForGenre([FromRoute] int genreId)
    {
        return Ok();
    }
}