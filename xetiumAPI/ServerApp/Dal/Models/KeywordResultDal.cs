using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace xetiumAPI.ServerApp.Dal;

[Table("keywordresult")]
public class KeywordResultDal
{
    [Key, Column("searchid",Order = 0), ForeignKey("SearchDal")]
    public int SearchID { get; set; }

    [Key,Column("keywordid",Order = 1), ForeignKey("Keyword")]
    public int KeywordID { get; set; }

    [Required]
    [Column("position")]
    public int Position { get; set; }

    public SearchDal SearchDal { get; set; }
    public KeywordDal Keyword { get; set; }
}
