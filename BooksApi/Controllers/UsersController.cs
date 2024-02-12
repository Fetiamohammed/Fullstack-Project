using BooksAndUsersApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace BooksAndUsersApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersRepo _usersRepo;

        public UsersController(UsersRepo usersRepo)
        {
            _usersRepo = usersRepo;
        }

        [HttpPost]
        public async Task<ActionResult> AddUsers([FromBody] User model)
        {
            await _usersRepo.AddUsersAsync(model);
            return Ok();
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult> GetUsersByUserName([FromRoute] string userName)
        {
            var user = await _usersRepo.GetUserByUserNameAsync(userName);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
