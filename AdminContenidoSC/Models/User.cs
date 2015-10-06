using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminContenidoSC.Models
{
    public class User
    {
        public string id;
        public string name;
        public string email;
        public string pass;
        public string type;
        public string status;
        public DateTime registrationDate;
        public DateTime updateDate;
    }
}