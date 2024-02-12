using Microsoft.EntityFrameworkCore;

namespace BooksAndUsersApi.Data
{
    public class UsersRepo
    {
        private readonly AppDbContext _appDbContext;

        public UsersRepo(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task AddUsersAsync(User user)
        {
            await _appDbContext.Set<User>().AddAsync(user);
            await _appDbContext.SaveChangesAsync();
        }

        internal async Task<User?> GetUserByUserNameAsync(string? userName)
        {
            return await _appDbContext.Users.FirstOrDefaultAsync(u => u.UserName == userName);

        }

    }
}
