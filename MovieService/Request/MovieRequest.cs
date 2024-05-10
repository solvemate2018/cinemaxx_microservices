namespace MovieService.Request;

public class MovieRequest
{
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public DateOnly ReleaseDate { get; set; }

    public int Duration { get; set; }
    
    public int GenreId { get; set; }
    
    public int DirectorId { get; set; }
    
    public int[] ActorIds { get; set; }
}