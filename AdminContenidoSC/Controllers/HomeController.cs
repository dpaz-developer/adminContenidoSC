using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminContenidoSC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (HttpContext.Session["userId"] == null)
            {
                Response.Redirect("/User/Login");
            }
            else
            {
                Dashboard();
            }
            return View();
        }

        public ActionResult Dashboard()
        {
            
           /* if (HttpContext.Session["userId"] == null)
            {
                Response.Redirect("/User/Login");
            }
            */
            return View();
        }

    }
}