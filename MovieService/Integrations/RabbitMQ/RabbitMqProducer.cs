using EasyNetQ;
using MovieService.Models;

namespace MovieService.integrations.RabbitMQ;

public class RabbitMqProducer(RabbitMqBusFactory mqBusFactory)
{
    private readonly IBus _bus = mqBusFactory.CreateBus().Result;
    
    public async void DeleteMovie(Movie movie)
    {
        await _bus.Advanced.PublishAsync(mqBusFactory.GetExchange(), "cinema.movie.deleted", true, new Message<Movie>(movie));
    }
    
    public async void ChangeMovieDuration(Movie movie)
    {
        await _bus.Advanced.PublishAsync(mqBusFactory.GetExchange(), "cinema.movie.updateDuration", true,
            new Message<Movie>(movie));
    }
}