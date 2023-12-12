using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace xetiumAPI.ServerApp.Dal;

[Table("users")]
public class UserDal : IdentityUser<Guid>
{
    [Required]
    [Column("passworhash")]
    public byte[] PasswordHash { get; set; }

    [Required]
    [Column("salt")]
    public Guid Salt { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("name")]
    public string Name { get; set; }
    
    // Остальные свойства класса
    
    public List<ProjectDal> Projects { get; set; }
}