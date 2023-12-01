using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace xetiumAPI.ServerApp.Dal;

[Table("project")]
public class ProjectDal
{
    [Key]
    [Column("projid")]
    public int ProjID { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("name")]
    public string Name { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("url")]
    public string URL { get; set; }

    [MaxLength(1000)]
    [Column("description")]
    public string Description { get; set; }

    [Required]
    [Column("username")]
    [ForeignKey("UserDal")]
    public string UserName { get; set; }

    public UserDal UserDal { get; set; }
    public List<SearchDal> Searches { get; set; }
}