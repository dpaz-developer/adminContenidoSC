using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminContenidoSC.Services
{
    public static class SessionService
    {
        public static void creaSession(string userId, string email, string name, string rol)
        {
            HttpContext.Current.Session["userId"]    = userId;
            HttpContext.Current.Session["name"]     = name;
            HttpContext.Current.Session["rol"]      = rol;
            HttpContext.Current.Session["email"]    = email;
        }

        public static void cierraSession()
        {
            HttpContext.Current.Session["userId"]    = null;
            HttpContext.Current.Session["name"]     = null;
            HttpContext.Current.Session["rol"]      = null;
            HttpContext.Current.Session["email"]    = null;
        }
    }
}