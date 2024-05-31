using MovieService.Models;

namespace MovieService.Data;

public static class InitialData
{
    public static List<Genre> GetGenres()
    {
        return new List<Genre>
        {
            new Genre { Id = 1, Name = "Action" },
            new Genre { Id = 2, Name = "Adventure" },
            new Genre { Id = 3, Name = "Animation" },
            new Genre { Id = 4, Name = "Biography" },
            new Genre { Id = 5, Name = "Comedy" },
            new Genre { Id = 6, Name = "Crime" },
            new Genre { Id = 7, Name = "Documentary" },
            new Genre { Id = 8, Name = "Drama" },
            new Genre { Id = 9, Name = "Family" },
            new Genre { Id = 10, Name = "Fantasy" },
            new Genre { Id = 11, Name = "Film-Noir" },
            new Genre { Id = 12, Name = "History" },
            new Genre { Id = 13, Name = "Horror" },
            new Genre { Id = 14, Name = "Music" },
            new Genre { Id = 15, Name = "Musical" },
            new Genre { Id = 16, Name = "Mystery" },
            new Genre { Id = 17, Name = "Romance" },
            new Genre { Id = 18, Name = "Sci-Fi" },
            new Genre { Id = 19, Name = "Sport" },
            new Genre { Id = 20, Name = "Thriller" },
            new Genre { Id = 21, Name = "War" },
            new Genre { Id = 22, Name = "Western" }
        };
    }

    public static List<Actor> GetActors()
    {
        return new List<Actor>
        { 
            new Actor { Id = 1, Name = "Tom Cruise" },
        new Actor { Id = 2, Name = "Brad Pitt" },
        new Actor { Id = 3, Name = "Jennifer Lawrence" },
        new Actor { Id = 4, Name = "Leonardo DiCaprio" },
        new Actor { Id = 5, Name = "Meryl Streep" },
        new Actor { Id = 6, Name = "Robert Downey Jr." },
        new Actor { Id = 7, Name = "Angelina Jolie" },
        new Actor { Id = 8, Name = "Johnny Depp" },
        new Actor { Id = 9, Name = "Emma Watson" },
        new Actor { Id = 10, Name = "Will Smith" },
        new Actor { Id = 11, Name = "Scarlett Johansson" },
        new Actor { Id = 12, Name = "Denzel Washington" },
        new Actor { Id = 13, Name = "Matt Damon" },
        new Actor { Id = 14, Name = "Natalie Portman" },
        new Actor { Id = 15, Name = "Robert De Niro" },
        new Actor { Id = 16, Name = "Chris Evans" },
        new Actor { Id = 17, Name = "Nicole Kidman" },
        new Actor { Id = 18, Name = "Harrison Ford" },
        new Actor { Id = 19, Name = "Cate Blanchett" },
        new Actor { Id = 20, Name = "Samuel L. Jackson" },
        new Actor { Id = 21, Name = "Kate Winslet" },
        new Actor { Id = 22, Name = "Chris Hemsworth" },
        new Actor { Id = 23, Name = "Charlize Theron" },
        new Actor { Id = 24, Name = "Mark Wahlberg" },
        new Actor { Id = 25, Name = "Jennifer Aniston" },
        new Actor { Id = 26, Name = "Daniel Radcliffe" },
        new Actor { Id = 27, Name = "Julia Roberts" },
        new Actor { Id = 28, Name = "Chris Pratt" },
        new Actor { Id = 29, Name = "Anne Hathaway" },
        new Actor { Id = 30, Name = "Jake Gyllenhaal" },
        new Actor { Id = 31, Name = "Hugh Jackman" },
        new Actor { Id = 32, Name = "Tom Hanks" },
        new Actor { Id = 33, Name = "Jennifer Lawrence" },
        new Actor { Id = 34, Name = "Ryan Reynolds" },
        new Actor { Id = 35, Name = "Eddie Redmayne" },
        new Actor { Id = 36, Name = "Joaquin Phoenix" },
        new Actor { Id = 37, Name = "Margot Robbie" },
        new Actor { Id = 38, Name = "Kevin Hart" },
        new Actor { Id = 39, Name = "Zoe Saldana" },
        new Actor { Id = 40, Name = "John Travolta" }

        };
    }

    public static List<Director> GetDirectors()
    {
        return new List<Director>
        {
            new Director { Id = 1, Name = "Steven Spielberg" },
            new Director { Id = 2, Name = "Christopher Nolan" },
            new Director { Id = 3, Name = "Quentin Tarantino" },
            new Director { Id = 4, Name = "Martin Scorsese" },
            new Director { Id = 5, Name = "Alfred Hitchcock" },
            new Director { Id = 6, Name = "James Cameron" },
            new Director { Id = 7, Name = "Stanley Kubrick" },
            new Director { Id = 8, Name = "Francis Ford Coppola" },
            new Director { Id = 9, Name = "Ridley Scott" },
            new Director { Id = 10, Name = "Peter Jackson" },
            new Director { Id = 11, Name = "Clint Eastwood" },
            new Director { Id = 12, Name = "Spike Lee" },
            new Director { Id = 13, Name = "Tim Burton" },
            new Director { Id = 14, Name = "Wes Anderson" },
            new Director { Id = 15, Name = "David Fincher" },
            new Director { Id = 16, Name = "Steven Soderbergh" },
            new Director { Id = 17, Name = "Michael Bay" },
            new Director { Id = 18, Name = "George Lucas" },
            new Director { Id = 19, Name = "Ang Lee" },
            new Director { Id = 20, Name = "Guy Ritchie" }
        };
    }
    
    public static List<Movie> GetMovies()
    {
        return new List<Movie>
        {
        new Movie { Id = 1, Title = "Inception", Description = "A thief who enters the dreams of others to steal their secrets", ReleaseDate = new DateOnly(2010, 7, 16), Duration = 148, DirectorId = 2, GenreId = 18, },
        new Movie { Id = 2, Title = "The Dark Knight", Description = "A vigilante known as Batman sets out to dismantle the criminal organization", ReleaseDate = new DateOnly(2008, 7, 18), Duration = 152, DirectorId = 2, GenreId = 1, },
        new Movie { Id = 3, Title = "Pulp Fiction", Description = "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine", ReleaseDate = new DateOnly(1994, 10, 14), Duration = 154, DirectorId = 3, GenreId = 6, },
        new Movie { Id = 4, Title = "Forrest Gump", Description = "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart", ReleaseDate = new DateOnly(1994, 7, 6), Duration = 142, DirectorId = 4, GenreId = 3, },
        new Movie { Id = 5, Title = "The Shawshank Redemption", Description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency", ReleaseDate = new DateOnly(1994, 10, 14), Duration = 142, DirectorId = 5, GenreId = 3, },
        new Movie { Id = 6, Title = "The Godfather", Description = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son", ReleaseDate = new DateOnly(1972, 3, 24), Duration = 175, DirectorId = 6, GenreId = 6, },
        new Movie { Id = 7, Title = "Schindler's List", Description = "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans", ReleaseDate = new DateOnly(1993, 12, 15), Duration = 195, DirectorId = 7, GenreId = 4, },
        new Movie { Id = 8, Title = "The Lord of the Rings: The Return of the King", Description = "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring", ReleaseDate = new DateOnly(2003, 12, 17), Duration = 201, DirectorId = 8, GenreId = 10, },
        };
    }

    public static List<MovieActor> GetMovieActors()
    {
        return new List<MovieActor>
        {
            // Movie 1: Inception
            new MovieActor { MovieId = 1, ActorId = 6 }, // Leonardo DiCaprio
            new MovieActor { MovieId = 1, ActorId = 21 }, // Tom Hardy
            new MovieActor { MovieId = 1, ActorId = 16 }, // Joseph Gordon-Levitt

            // Movie 2: The Dark Knight
            new MovieActor { MovieId = 2, ActorId = 6 }, // Christian Bale
            new MovieActor { MovieId = 2, ActorId = 21 }, // Heath Ledger
            new MovieActor { MovieId = 2, ActorId = 16 }, // Aaron Eckhart

            // Movie 3: Pulp Fiction
            new MovieActor { MovieId = 3, ActorId = 8 }, // John Travolta
            new MovieActor { MovieId = 3, ActorId = 7 }, // Uma Thurman
            new MovieActor { MovieId = 3, ActorId = 12 }, // Samuel L. Jackson

            // Movie 4: Forrest Gump
            new MovieActor { MovieId = 4, ActorId = 15 }, // Tom Hanks
            new MovieActor { MovieId = 4, ActorId = 10 }, // Robin Wright
            new MovieActor { MovieId = 4, ActorId = 13 }, // Gary Sinise

            // Movie 5: The Shawshank Redemption
            new MovieActor { MovieId = 5, ActorId = 22 }, // Tim Robbins
            new MovieActor { MovieId = 5, ActorId = 23 }, // Morgan Freeman

            // Movie 6: The Godfather
            new MovieActor { MovieId = 6, ActorId = 24 }, // Marlon Brando
            new MovieActor { MovieId = 6, ActorId = 25 }, // Al Pacino
            new MovieActor { MovieId = 6, ActorId = 26 }, // James Caan

            // Movie 7: Schindler's List
            new MovieActor { MovieId = 7, ActorId = 27 }, // Liam Neeson
            new MovieActor { MovieId = 7, ActorId = 28 }, // Ben Kingsley
            new MovieActor { MovieId = 7, ActorId = 29 }, // Ralph Fiennes

            // Movie 8: The Lord of the Rings: The Return of the King
            new MovieActor { MovieId = 8, ActorId = 30 }, // Elijah Wood
            new MovieActor { MovieId = 8, ActorId = 31 }, // Viggo Mortensen
            new MovieActor { MovieId = 8, ActorId = 32 }, // Ian McKellen
        };
    }

    
}