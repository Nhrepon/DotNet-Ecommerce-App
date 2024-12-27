using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using DotNet_Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace DotNet_Ecommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandController : ControllerBase
    {
        private readonly IConfiguration _config;

        public BrandController(IConfiguration config)
        {
            _config = config;
        }




        [HttpGet]
        public JsonResult GetBrands(){
            string query = "SELECT * FROM brands";
            DataTable table = new DataTable();
            string? sqlDataSource = _config.GetConnectionString("MysqlConnection");
            MySqlDataReader myReader;
            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                connection.Open();
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    myReader = command.ExecuteReader();
                    table.Load(myReader);   
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(new {status = "success", message = "Brands fetched successfully", data = table});            
        }


        [HttpPost]
        public JsonResult CreateBrands([FromBody]Brands brands){
            string query = @"INSERT INTO brands (BrandName,BrandDesc,BrandImg,CreatedAt,UpdatedAt) VALUES(@BrandName,@BrandDesc,@BrandImg , NOW(), NOW());";
            string? sqlDataSource = _config.GetConnectionString("MysqlConnection");

            try
            {
                using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                connection.Open();
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@BrandName", brands.BrandName);
                    command.Parameters.AddWithValue("@BrandDesc", brands.BrandDesc);
                    command.Parameters.AddWithValue("@BrandImg", brands.BrandImg);

                    command.ExecuteNonQuery();
                    
                    connection.Close();
                }
            }

            return new JsonResult(new {status = "success", message = "Brands created successfully", data = brands});
            }
            catch (Exception ex)
            {
                return new JsonResult(new {status = "failed", message = ex.Message});
            }          
        }






        [HttpPut]
        public JsonResult UpdateBrands([FromBody]Brands brands){
            string query = @"UPDATE brands SET BrandName = @BrandName, BrandDesc = @BrandDesc, BrandImg = @BrandImg, UpdatedAt = NOW() WHERE Id = @Id;";
            string? sqlDataSource = _config.GetConnectionString("MysqlConnection");

            try
            {
                using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                connection.Open();
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {

                    command.Parameters.AddWithValue("@Id", brands.id);
                    command.Parameters.AddWithValue("@BrandName", brands.BrandName);
                    command.Parameters.AddWithValue("@BrandDesc", brands.BrandDesc);
                    command.Parameters.AddWithValue("@BrandImg", brands.BrandImg);

                    command.ExecuteNonQuery();
                    
                    connection.Close();
                }
            }

            return new JsonResult(new {status = "success", message = "Brands updated successfully", data = brands});
            }
            catch (Exception ex)
            {
                return new JsonResult(new {status = "failed", message = ex.Message});
            }          
        }






        [HttpDelete ("{id}")]
        public JsonResult DeleteBrands(int id){
            string query = @"DELETE FROM brands WHERE Id = @Id;";
            string? sqlDataSource = _config.GetConnectionString("MysqlConnection");

            try
            {
                using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                connection.Open();
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {

                    command.Parameters.AddWithValue("@Id", id);

                    command.ExecuteNonQuery();
                    
                    connection.Close();
                }
            }

            return new JsonResult(new {status = "success", message = "Brands deleted successfully"});
            }
            catch (Exception ex)
            {
                return new JsonResult(new {status = "failed", message = ex.Message});
            }          
        }









        
        








    }
}