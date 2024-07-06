using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class SubkategoriController : Controller
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public SubkategoriController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // GET: api/Subkategori
    [HttpGet]
    public IActionResult GetSubkategoris()
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            response.data = _dbManager.GetAllSubkategoris();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // CREATE
    [HttpPost("/Subkategori/create")]
    public IActionResult CreateSubkategori([FromBody]Subkategori subkategori)
    {
        try
        {
            {
                response.status = 200;
                response.message = "Succes";
                _dbManager.CreateSubkategori(subkategori);
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
    [HttpPut("/Subkategori/update/{id}")]
    public IActionResult UpdateSubkategori(int id, [FromBody]Subkategori subkategori)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.UpdateSubkategori(id, subkategori);
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // DELETE
    [HttpDelete("/Subkategori/delete/{id}")]
    public IActionResult DeleteSubkategori(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.DeleteSubkategori(id);
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}