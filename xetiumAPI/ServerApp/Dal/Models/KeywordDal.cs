using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace xetiumAPI.ServerApp.Dal;

[Table("keyword")]
public class KeywordDal
{
    [Key]
    [Column("keywordid")]
    public Guid  KeywordID { get; set; }

    [Required]
    [Column("text")]
    [MaxLength(255)]
    public string Text { get; set; }

    public List<KeywordResultDal> KeywordResults { get; set; }
}