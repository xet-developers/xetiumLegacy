using System.Text.Json.Serialization;

namespace xetiumAPI.Models
{
    public class AnalysisData
    {
        public int ProjId { get; set; }
        public string URI { get; set; }
        public string[] Keywords { get; set; }
        public int Top { get; set; }
        public int SearchSystem { get; set; }
    }

    public enum SearchSystem
    {
        Yandex,
        Google
    }
}