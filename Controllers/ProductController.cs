
using Ecommerce_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController:ControllerBase
    {
        private static List<Product> products = new List<Product>();

        [HttpGet]
        public IActionResult ProductList(){
            if(products.Count == 0){
                return NotFound(new {status = "failed", message = "No products found"});
            }
            return Ok(products);    
        }



        [HttpPost]
        public IActionResult CreateProduct([FromBody] Product product){
            if(string.IsNullOrEmpty(product.Name)){
                return BadRequest("Product name is required");
                }
                var newProduct = new Product(){
                    Id = Guid.NewGuid(),
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                };

                products.Add(newProduct);

            //return Created($"/api/product/{newProduct.Id}", newProduct);   
            return Created(nameof(GetProductById), newProduct);   
        }



        [HttpDelete("{id:Guid}")]
        public IActionResult DeleteProduct(Guid id){
            var product = products.FirstOrDefault(p => p.Id == id);
            if(product != null){
                products.Remove(product);
                return Ok();
            }
            return NotFound();
        }





        [HttpPut("{id:Guid}")]
        public IActionResult UpdateProduct(Guid id, [FromBody] Product product){
            if(product == null){
                return BadRequest("Product data is missing");
            }
            var existingProduct = products.FirstOrDefault(p => p.Id == id);
            if(existingProduct != null){
                existingProduct.Name = product.Name ?? existingProduct.Name;
                existingProduct.Description = product.Description ?? existingProduct.Description;
                existingProduct.Price = product.Price != 0 ? product.Price : existingProduct.Price;
                existingProduct.UpdatedDate = DateTime.Now;
                return Ok();
            }
            return NotFound();
        }


        [HttpGet("{id}")]
        public IActionResult GetProductById(string id){
            if(!Guid.TryParse(id, out Guid guid)){
                return BadRequest(new {status = "failed", message = "Invalid product id"});
            }

            var product = products.FirstOrDefault(p => p.Id == guid);
            if(product != null){
                return Ok(product);
            }
            return NotFound(new {status = "failed", message = "Product not found"});
        }



        [HttpGet("search")]
        public IActionResult SearchProduct([FromQuery] string query){
            if(string.IsNullOrEmpty(query)){
                return BadRequest(new  {status = "failed", message = "Query is required"});
            }
            var searchResults = products.Where(p => p.Name.Contains(query) || p.Description.Contains(query));
            return Ok(searchResults);
        }



    }
    
    




}