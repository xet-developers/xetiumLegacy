using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace xetiumAPI.ServerApp.Dal;

[Table("users")]
public class UserDal
{
    [Key]
    [MaxLength(255)]
    [Column("username")]
    public string UserName { get; set; }

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

    [Required]
    [MaxLength(255)]
    [Column("email")]
    public string Email { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("phone")]
    public string Phone { get; set; }

    public TokenDal TokenDal { get; set; }
    public List<ProjectDal> Projects { get; set; }
}