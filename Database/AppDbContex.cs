using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DotNet_Ecommerce.Database
{
    public class AppDbContex:DbContext
    {
        public AppDbContex(DbContextOptions options):base(options)
        {
            
        }
    }
}