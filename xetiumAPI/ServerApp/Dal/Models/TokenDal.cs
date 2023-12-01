using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace xetiumAPI.ServerApp.Dal;

[Table("tokens")]
public class TokenDal
{
    [Key]
    [Column("tokenid")]
    public int TokenID { get; set; }

    [Required]
    [Column("tokenvalue")]
    public byte[] TokenValue { get; set; }

    [ForeignKey("UserDal")]
    [Column("username")]
    public string UserName { get; set; }

    [Required]
    [Column("expiresat")]
    public DateTime ExpiresAt { get; set; }

    [Column("lastusedat")]
    public DateTime LastUsedAt { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("type")]
    public string Type { get; set; }

    public UserDal UserDal { get; set; }
}