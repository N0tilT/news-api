using Microsoft.AspNetCore.DataProtection;
using NewsAPI;
using NewsAPI.Services;

var builder = WebApplication.CreateBuilder(args);

//������������� ��������� ������ � ������� ����������� � postgreSQL
var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
var dbName = Environment.GetEnvironmentVariable("POSTGRES_DB");
var dbUser = Environment.GetEnvironmentVariable("POSTGRES_USER");
var dbPassword = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");
var connectionString = $"Server = {dbHost};Port=5432;Database={dbName};User Id ={dbUser};Password={dbPassword}";
builder.Services.AddScoped(provider => new DataContext(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<AuthorService>();
builder.Services.AddScoped<TopicService>();
builder.Services.AddScoped<ArticleService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

//������������� ��, ���������� ��������
await InitializeDataSources(app);

app.Run();

async Task InitializeDataSources(WebApplication application)
{
    using var scope = application.Services.CreateScope();
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    await dataContext.TryInitializeAsync();
}