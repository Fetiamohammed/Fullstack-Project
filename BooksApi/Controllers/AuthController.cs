using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BooksAndUsersApi.Data;
using BooksAndUsersApi.Models;
using System.Collections.Generic;





namespace BooksAndUsersApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UsersRepo _usersRepo;
        private readonly JwtOption _options;

        public AuthController(UsersRepo usersRepo, IOptions<JwtOption> options)
        {
            _usersRepo = usersRepo;
            _options = options.Value;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _usersRepo.GetUserByUserNameAsync(model.UserName);
            if (user is null)
            {
                return BadRequest(new { error = "User does not exist" });
            }

            if (user.Password != model.Password)
            {
                return BadRequest(new { error = "Invalid password" });
            }


            var token = GetJWTToken(user.UserName);

            return Ok(new { token });
        }

        private string GetJWTToken(string username)
        {
            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key));
            var crendential = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>()
            {
               new Claim("UserName", username!)
            };
            var sToken = new JwtSecurityToken(_options.Issuer, _options.Issuer, claims, expires: DateTime.Now.AddHours(5), signingCredentials: crendential);
            var token = new JwtSecurityTokenHandler().WriteToken(sToken);
            return token;
        }
    }
}
