using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DotNet_Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;

namespace DotNet_Ecommerce.Controllers
{
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly IConfiguration configuration;

        public CategoryController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        

        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult CreateCategory([FromBody] Category category)
        {
            string query = @"INSERT INTO categories (CategoryName,CategoryDesc,CategoryImage,CreatedAt,UpdatedAt) VALUES(@CategoryName,@CategoryDesc,@CategoryImage , NOW(), NOW());";
            string ? sqlDataSource = configuration.GetConnectionString("MysqlConnection");

            try{
                using(MySqlConnection connection = new MySqlConnection(sqlDataSource)){
                    connection.Open();
                    using(MySqlCommand command = new MySqlCommand(query, connection)){
                        command.Parameters.AddWithValue("@CategoryName", category.CategoryName);
                        command.Parameters.AddWithValue("@CategoryDesc", category.CategoryDesc);
                        command.Parameters.AddWithValue("@CategoryImage", category.CategoryImage);

                        var data = command.ExecuteNonQuery();

                        connection.Close();
                    }

                }


                return new JsonResult(new {status = "success", message = "Category created successfully", data = category});
            }catch(Exception ex)
            {
                return new JsonResult(new {status = "failed", message = ex.Message});
            }


            //return View();
        }












        
    }
}