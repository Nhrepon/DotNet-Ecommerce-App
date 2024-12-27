using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNet_Ecommerce.Models
{
    public class Brands
    {
        public int id { get; set; }
        public string? BrandName { get; set; }
        public string BrandDesc { get; set; } = string.Empty;
        public string BrandImg { get; set; } = string.Empty;
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
    
}