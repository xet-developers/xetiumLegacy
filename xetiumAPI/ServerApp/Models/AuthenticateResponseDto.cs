using Microsoft.AspNetCore.Identity;

namespace xetiumAPI.Models;

public class AuthenticateResponseDto
{
    public IdentityResult Result { get; set; }
    public Guid Id { get; set; }
}