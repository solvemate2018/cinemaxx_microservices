using System.ComponentModel.DataAnnotations;

namespace MovieService.Models;

public class Actor
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; }
}