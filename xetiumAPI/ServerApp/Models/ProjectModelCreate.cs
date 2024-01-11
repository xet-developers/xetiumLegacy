using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.JavaScript;

namespace xetiumAPI.Models;

public class ProjectModelCreate
{
    [MaxLength(30)]
    public string Name { get; set; }
    
    [MaxLength(60)]
    public string Url { get; set; }
    
    [MaxLength(120)]
    public string Description { get; set; }
}