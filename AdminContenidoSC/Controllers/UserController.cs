using AdminContenidoSC.Models;
using AdminContenidoSC.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;


namespace AdminContenidoSC.Controllers
{
    public class UserController : Controller
    {
        UserService userService = new UserService();
        // GET: User
        /*
        public ActionResult Index()
        {
            return View();
        }*/

        public ActionResult Index()
        {
            Response.Redirect("/User/Login");
            return View();

        }

        public ActionResult Login()
        {
            ViewBag.error = "";
            if (HttpContext.Session["userId"] != null)
            {
                Response.Redirect("/Home/Dashboard");
            }
            if (Request.Params["error"] == "true")
            {
                ViewBag.error = "ERROR:usuario y/o password incorrectos";
            }
            return View();
        }

        [HttpPost]
        public ActionResult newUser()
        {
 
            try
            {
                
                if (string.IsNullOrEmpty(Request.Params["email"])) {
                    var resp = Error("Error:El email no puede ser nulo o vacio", "campo email nulo o vacio", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                if (string.IsNullOrEmpty(Request.Params["pass"]))
                {
                    var resp = Error("Error:El password no puede ser nulo o vacio", "campo password nulo o vacio", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                if (string.IsNullOrEmpty(Request.Params["type"]))
                {
                    var resp = Error("Error:El tipo usuario no puede ser nulo o vacio", "campo tipo usuario nulo o vacio", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                if (Request.Params["type"] != Constants.TYPE_USER_ADMIN && Request.Params["type"] != Constants.TYPE_USER_OPERATOR)
                {
                    var resp = Error("Error:El tipo usuario debe contener [admin, operator]", "campo tipo usuario debe contener [admin, operator]", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                


                User user = userService.createUser(

                    Request.Params["email"],
                    Request.Params["pass"],
                    Request.Params["name"],
                    Request.Params["type"], 0);

                return Json(user, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var resp = Error("Ocurrio un problema al crear el usuario", ex.Message, HttpStatusCode.BadRequest);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(resp, HttpStatusCode.NotFound.ToString());
            }

        }

        [HttpPost]
        public ActionResult updateUser()
        {
            try {

                if (string.IsNullOrEmpty(Request.Params["email"]))
                {
                    var resp = Error("Error:El email no puede ser nulo o vacio", "campo email nulo o vacio", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                if (string.IsNullOrEmpty(Request.Params["pass"]))
                {
                    var resp = Error("Error:El password no puede ser nulo o vacio", "campo password nulo o vacio", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                if (string.IsNullOrEmpty(Request.Params["type"]))
                {
                    var resp = Error("Error:El tipo usuario no puede ser nulo o vacio", "campo tipo usuario es nulo o vacio", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                if (Request.Params["type"] != Constants.TYPE_USER_ADMIN && Request.Params["type"] != Constants.TYPE_USER_OPERATOR)
                {
                    var resp = Error("Error:El tipo usuario debe contener [admin, operator]", "campo tipo usuario debe contener [admin, operator]", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                if (string.IsNullOrEmpty(Request.Params["status"]))
                {
                    var resp = Error("Error:El status no puede ser nulo o vacio", "campo status es nulo o vacio", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                if (Request.Params["status"] != Constants.STATUS_USER_ACTIVE && Request.Params["status"] != Constants.STATUS_USER_DEACTIVE )
                {
                    var resp = Error("Error:El status debe contener [active, deactive]", "campo status  debe contener [active, deactive]", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                int userIdSession = 1;

                User user = userService.updateUser(Request.Params["id"],
                Request.Params["email"],
                Request.Params["pass"],
                Request.Params["name"],
                Request.Params["type"],
                Request.Params["status"],
                userIdSession
                );

                return Json(user, JsonRequestBehavior.AllowGet);
            }catch(Exception ex)
            {
                var resp = Error("Ocurrio un problema al modificar el usuario", ex.Message, HttpStatusCode.BadRequest);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(resp, HttpStatusCode.NotFound.ToString());
            }
        }

        public void logOut()
        {
            SessionService.cierraSession();
            Response.Redirect("/Home");
        }

        [HttpPost]
        public void processLogin()
        {
            
            try
            {
                if (string.IsNullOrEmpty(Request.Params["email"]))
                {
                    var resp = Error("Error:El email no puede ser nulo o vacio", "campo email nulo o vacio", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                   // return Json(resp, HttpStatusCode.NotFound.ToString());
                }

                if (string.IsNullOrEmpty(Request.Params["pass"]))
                {
                    var resp = Error("Error:El password no puede ser nulo o vacio", "campo password nulo o vacio", HttpStatusCode.BadRequest);
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                   // return Json(resp, HttpStatusCode.NotFound.ToString());
                }
                User user = userService.login(Request.Params["email"], Request.Params["pass"]);
                /*
                User user = new User
                {
                    id = "1",
                    email = "davidpaz@test.com",
                    name = "David Paz",
                    type = "Admin",
                    status = Constants.STATUS_USER_ACTIVE
                };*/
                if (int.Parse(user.id) > 0 && user.status == Constants.STATUS_USER_ACTIVE)
                {
                    SessionService.creaSession(user.id, user.email, user.name, user.type);
                }

                Response.Write("LA session generadas es" + HttpContext.Session["userId"]);

                
                if (HttpContext.Session["userId"] != null)
                {
                    Response.Redirect("/Home/Dashboard");
                }
                else
                {
                    Response.Redirect("/User/Login?error=true");
                }
                
                //    return Json(user, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
               // var resp = Error("Ocurrio un problema al autenticar el usuario", ex.Message, HttpStatusCode.BadRequest);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                Response.Redirect("/User/Login?error=true");
                //return Json(resp, HttpStatusCode.NotFound.ToString());

            }
        }

        private HttpResponseMessage Error(string message, string cause, HttpStatusCode statusCode)
        {
            var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(message),
                ReasonPhrase = cause,
                StatusCode = statusCode
            };

            return resp;
        }
    }
}