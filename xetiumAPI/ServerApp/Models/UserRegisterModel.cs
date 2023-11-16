namespace xetiumAPI.Models
{
    public class UserRegisterModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool CheckboxData { get; set; }
        public bool CheckboxConf { get; set; }
        public bool CheckboxSpam { get; set; }
    }
}
