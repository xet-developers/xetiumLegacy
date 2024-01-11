using System.ComponentModel.DataAnnotations;

namespace xetiumAPI.Models;

public class UserLoginModel
{
    public string UserName { get; set; }
    public string Password { get; set; }
}