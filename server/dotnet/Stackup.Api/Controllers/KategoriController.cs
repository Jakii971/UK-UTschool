using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class KategoriController : Controller
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public KategoriController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // GET: api/Kategori
    [HttpGet]
    public IActionResult GetKategoris()
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            response.data = _dbManager.GetAllKategoris();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // CREATE
    [HttpPost("/Kategori/create")]
    public IActionResult CreateKategori([FromBody]Kategori kategori)
    {
        try
        {
            {
                response.status = 200;
                response.message = "Succes";
                _dbManager.CreateKategori(kategori);
            }
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // UPDATE
    [HttpPut("/Kategori/update/{id}")]
    public IActionResult UpdateKategori(int id, [FromBody]Kategori kategori)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.UpdateKategori(id, kategori);
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // DELETE
    [HttpDelete("/Kategori/delete/{id}")]
    public IActionResult DeleteKategori(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.DeleteKategori(id);
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}