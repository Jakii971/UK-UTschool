using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class PaketController : Controller
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public PaketController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // GET: api/Paket
    [HttpGet]
    public IActionResult GetPakets()
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            response.data = _dbManager.GetAllPakets();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // CREATE
    [HttpPost("/Paket/create")]
    public IActionResult CreatePaket([FromBody]Paket paket)
    {
        try
        {
            {
                response.status = 200;
                response.message = "Succes";
                _dbManager.CreatePaket(paket);
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
    [HttpPut("/Paket/update/{id}")]
    public IActionResult UpdatePaket(int id, [FromBody]Paket paket)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.UpdatePaket(id, paket);
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // DELETE
    [HttpDelete("/Paket/delete/{id}")]
    public IActionResult DeletePaket(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.DeletePaket(id);
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}