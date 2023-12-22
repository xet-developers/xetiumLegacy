using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Models;

public class ProjectDto
{ 
        public string Name { get; set; } 
        public string Url { get; set; }
        public string Description { get; set; }
        public List<SearchDal> Searches { get; set; }
}