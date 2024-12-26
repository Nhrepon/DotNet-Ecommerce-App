using Ecommerce_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


// builder.Services.AddDbContext<AppDbContext>(options => {
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
//     });

// "ConnectionStrings": {
//     "DefaultConnection": "Server=(localdb)\\mssqllocaldb;
//     Database=Ecommerce_api;
//     Trusted_Connection=True;
//     MultipleActiveResultSets=true"
//   }



// Add services to the container.

builder.Services.AddControllers();


// to show error message from controller 100
// builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>{
//     options.SuppressModelStateInvalidFilter = true;
//     });


builder.Services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);


// Swagger api
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddCors(options => {
//     options.AddDefaultPolicy(builder => {
//         builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
//     });
// });

var app = builder.Build();

if(app.Environment.IsDevelopment()){
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCors();
app.UseHttpsRedirection();

// web api Get, Post, Delete, Put
// app.MapGet("/", () => "Dotnet e-commerce api working fine ... ");



app.UseStaticFiles(new StaticFileOptions{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
    RequestPath = "/uploads"
});


// app.MapGet("/hello", () => {
//     //var response = new {Message = "Hello World! this is json", Success = true};
//     var response = "<h1>Hello World! this is html</h1>";
//     //return Results.Ok(response);
//     return Results.Content(response, "text/html");
//     });

// app.MapPost("/", () => {
//     return "This is post request ...";
//     });



// app.MapGet("/product", () => {

//     List<Product> products = new List<Product>(){
//         new Product(1, "Laptop", 1000),
//         new Product(2, "Mobile", 500),
//         new Product(3, "Tablet", 300),
//     };
    
//     return products;
//     });


// List<Product> products = new List<Product>();
// app.MapGet("/api/product", () => {
//     return Results.Ok(products);
//     });




// Product create
// app.MapPost("/api/product", ([FromBody] Product product) => {
//     if(string.IsNullOrEmpty(product.Name)){
//         return Results.BadRequest("Product name is required");
//     }
//     var newProduct = new Product(){
//         Id = Guid.NewGuid(),
//         Name = product.Name,
//         Description = product.Description,
//         Price = product.Price,
//         CreatedDate = DateTime.Now,
//         UpdatedDate = DateTime.Now
//     };

//     products.Add(newProduct);

//     return Results.Created($"/api/product/{newProduct.Id}", newProduct);
//     });




// Product delete
// app.MapDelete("/api/product/{id:Guid}", (Guid id) => {
//     var product = products.FirstOrDefault(p => p.Id == id);
//     if(product != null){
//         products.Remove(product);
//         return Results.Ok();
//     }
//     return Results.NotFound();
//     });


// Product update
// app.MapPut("/api/product/{id:Guid}", (Guid id, [FromBody] Product product) => {
//     if(product == null){
//         return Results.BadRequest("Product data is missing");
//     }
//     var existingProduct = products.FirstOrDefault(p => p.Id == id);
//     if(existingProduct != null){
//         existingProduct.Name = product.Name ?? existingProduct.Name;
//         existingProduct.Description = product.Description ?? existingProduct.Description;
//         existingProduct.Price = product.Price != 0 ? product.Price : existingProduct.Price;
//         existingProduct.UpdatedDate = DateTime.Now;
//         return Results.Ok();
//     }
//     return Results.NotFound();
//     });


// app.MapGet("/api/search", ([FromQuery] string query ) => {
//     if(string.IsNullOrEmpty(query)){
//         return Results.BadRequest("Query is required");
//     }
//     var searchResults = products.Where(p => p.Name.Contains(query) || p.Description.Contains(query));
//     return Results.Ok(searchResults);
//     });


// Route constraint /////////////////////////////////////////////////
// app.MapGet("/api/product/{id:int}")


// Serve static files from the "dist" folder 
var distPath = Path.Combine(Directory.GetCurrentDirectory(), "client", "dist"); 
Console.WriteLine($"Serving static files from: {distPath}");
app.UseStaticFiles(new StaticFileOptions { 
    FileProvider = new PhysicalFileProvider(distPath),
    RequestPath = "" 
    });



app.MapControllers();
//app.UseRouting();
// Fallback routing to index.html 
app.MapFallbackToFile("client/dist/index.html", new StaticFileOptions { 
    FileProvider = new PhysicalFileProvider(distPath) 
    });

// app.UseEndpoints(endpoints => 
// { endpoints.MapControllers(); 
// endpoints.MapFallbackToFile("index.html", new StaticFileOptions { 
//     FileProvider = new PhysicalFileProvider(distPath) 
//     }); 
//     });










app.Run();

//public record Product(int Id, string Name, decimal Price);



// public record Product{
//     public Guid Id { get; set; } 
//     public string? Name { get; set; }
//     public string Description { get; set; } = string.Empty;
//     public decimal Price { get; set; }

//     public DateTime CreatedDate { get; set; }
//     public DateTime UpdatedDate { get; set; }
// };