using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieService.Models;

public class Movie
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Title { get; set; }

    [MaxLength(500)]
    public string Description { get; set; }

    [Required]
    public DateOnly ReleaseDate { get; set; }
    
    [Required]
    public int Duration { get; set; } //In minutes

    [Required]
    [ForeignKey("Genre")]
    public int GenreId { get; set; }
    public Genre Genre { get; set; }
    
    [Required]
    [ForeignKey("Director")]
    public int DirectorId { get; set; }
    public Director Director { get; set; }
    
    public ICollection<MovieActor> MovieActors { get; set; }
}