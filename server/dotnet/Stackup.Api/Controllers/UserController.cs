using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
    private readonly DbManager _dbManager;
    Response response = new Response();

    public UserController(IConfiguration configuration)
    {
        _dbManager = new DbManager(configuration);
    }

    // GET: api/User
    [HttpGet]
    public IActionResult GetUsers()
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            response.data = _dbManager.GetAllUsers();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // CREATE
    [HttpPost("/User/create")]
    public IActionResult CreateUser([FromBody]User user)
    {
        try
        {
            // Memeriksa role pengguna
            if (user.role != "admin" && user.role != "customer")
            {
                response.status = 403;
                response.message = "Unauthorized role";
                return StatusCode(403, response);
            }

            // Jika role sesuai, lanjutkan dengan membuat pengguna
            System.Diagnostics.Debug.WriteLine(user);
            response.status = 200;
            response.message = "Success";
            _dbManager.CreateUser(user);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }

        return Ok(response);
    }


    // UPDATE
    [HttpPut("/User/update/{id}")]
    public IActionResult UpdateUser(int id, [FromBody]User user)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.UpdateUser(id, user);
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    // DELETE
    [HttpDelete("/User/delete/{id}")]
    public IActionResult DeleteUser(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.DeleteUser(id);
        }
        catch(Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}