
namespace Ecommerce_api.Models
{
public class Product{
    public Guid Id { get; set; } 
    public string? Name { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
};
}

