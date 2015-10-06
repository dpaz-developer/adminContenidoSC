using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminContenidoSC.Models
{
    public class Banner
    {
        public string id;
        public string seccionId; // [slider, noticia, banner]
        public string imgMainUrl;
        public string imgButtonUrl;
        public string imgModalUrl;
        public string mode; // [enlace, modal, ambos]
        public string link;
        public string backgroundColor;
        public string text;
        public DateTime startDateActivation;
        public DateTime endDateActivation;
        public DateTime registrationDate;
        public DateTime updateDate;
        public string registrationUserId;
        public string updateUserId;
        public string activationUserId;
        public string deactivationUserId;
        public string status;

    }
}