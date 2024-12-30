using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNet_Ecommerce.Models
{
    public class Category
    {
       public int Id { get; set; }
       public string CategoryName { get; set; } = "";
       public string CategoryDesc { get; set; } = "";
       public string CategoryImage { get; set; } = "";
       DateTime CreatedAt { get; set; }
       DateTime UpdatedAt { get; set; }
    }
}