using System.Security.Claims;
using API.Services;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name); 
            }
            return result;
        }

        public string GetMyRole(){
            var result= string.Empty;
            if(_httpContextAccessor.HttpContext!= null){
                result= _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
            }
            return result;
        }
    }
}