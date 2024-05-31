using EasyNetQ;
using EasyNetQ.Topology;

namespace MovieService.integrations.RabbitMQ;

public class RabbitMqBusFactory
{
    private IBus bus;

    private Exchange exchange;

    private List<Queue> queues;
    
    private readonly string _connectionString;

    public RabbitMqBusFactory(IConfiguration configuration)
    {
        _connectionString = configuration.GetSection("RABBITMQ_CONNECTION_STRING")?.Value
                            ?? "amqp://guest:guest@localhost:5672/";
    }
    
    public async Task<IBus> CreateBus()
    {
        var bus = RabbitHutch.CreateBus(_connectionString ?? "amqp://guest:guest@localhost:5672/");
        
        try
        {
            exchange = await bus.Advanced.ExchangeDeclareAsync("cinema.exchange", ExchangeType.Topic, true, false, new CancellationToken());
            var queues = new Dictionary<string, Queue>
            {
                { "cinema.movie.deleted.updateProjections", await bus.Advanced.QueueDeclareAsync("cinema.movie.deleted.updateProjections", true, false, false) },
                { "cinema.movie.deleted.updateSchedules", await bus.Advanced.QueueDeclareAsync("cinema.movie.deleted.updateSchedules", true, false, false) },
                { "cinema.movie.updateDuration", await bus.Advanced.QueueDeclareAsync("cinema.movie.updateDuration", true, false, false) }
            };

            var bindings = new Dictionary<string, string>
            {
                { "cinema.movie.deleted.updateProjections", "cinema.movie.deleted" },
                { "cinema.movie.deleted.updateSchedules", "cinema.movie.deleted" },
                { "cinema.movie.updateDuration", "cinema.movie.updateDuration" }
            };

            foreach (var queue in queues)
            {
                await bus.Advanced.BindAsync(exchange, queue.Value, bindings[queue.Key]);
            }

            return bus;
        }
        catch (Exception ex)
        {
            throw;
        }

    }

    public Exchange GetExchange()
    {
        return exchange;
    }
    
    public List<Queue> GetQueues()
    {
        return queues;
    }
}