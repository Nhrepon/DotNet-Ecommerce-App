using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Ecommerce_api.Controllers
{
    [Route("api/")]
    public class FileController : Controller
    {
        [Route("FileUpload")]
        [HttpPost]
        public JsonResult FileUpload(){
            try
            {
                var file = Request.Form;
                if (file.Files.Count == 0) { 
                    return new JsonResult(new { status = "failed", message = "No files uploaded" }); 
                    }

                var uploadedFile = file.Files[0];
                string fileName = DateTime.Now.Ticks.ToString() + "_" + "DonNet_ecommerce" + "_" + RandomNumberGenerator.GetInt32(100000).ToString() + Path.GetExtension(uploadedFile.FileName);

                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "uploads", fileName);
                //var filePath = Path.Combine(_env.ContentRootPath, "uploads", fileName);
                
                //var filePath = _env.ContentRootPath + "/uploads/" + fileName;

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadedFile.CopyTo(stream);
                }

                return new JsonResult(new {status = "success", message = "File uploaded successfully", data ="uploads/" + fileName});
            }catch (IndexOutOfRangeException ex) { 
                return new JsonResult(new { status = "failed", message = ex.Message }); 
            }catch (Exception ex)
            {
                return new JsonResult(new {status = "failed", message = ex.Message});
            }
        }
    }
}