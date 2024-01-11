using System.ComponentModel.DataAnnotations;

namespace xetiumAPI.Models
{
    public class UserRegisterModel
    {
        [MinLength(5)]
        public string UserName { get; set; }

        [MinLength(5)]
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool CheckboxData { get; set; }
        public bool CheckboxConf { get; set; }
        public bool CheckboxSpam { get; set; }
    }
}
