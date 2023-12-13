using System.Runtime.InteropServices.JavaScript;

namespace xetiumAPI.Models;

public class ProjectModelCreate
{
    public string Name { get; set; }
    public string Url { get; set; }
    public string Description { get; set; }
    public Guid userId { get; set; }
}