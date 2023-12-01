using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace xetiumAPI.ServerApp.Dal;

[Table("search")]
public class SearchDal
{
    [Key]
    [Column("searchid")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int SearchID { get; set; }

    [ForeignKey("Project")]
    [Column("projid")]
    public int ProjID { get; set; }

    [Required]
    [Column("date")]
    public DateTime Date { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("type")]
    public string Type { get; set; }

    public ProjectDal? Project { get; set; }
    public List<KeywordResultDal> KeywordResults { get; set; }
}