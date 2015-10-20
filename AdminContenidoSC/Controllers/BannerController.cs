using AdminContenidoSC.Models;
using AdminContenidoSC.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminContenidoSC.Controllers
{
    public class BannerController : Controller
    {
        BannerService bannerService = new BannerService();

        // GET: Banner
        public ActionResult Index()
        {
            return View();
        }   

        public void LoadPicture()
        {
            PictureProcessService pictureProcessService = new PictureProcessService();
            HttpFileCollectionBase Files;
            Files = Request.Files;
            Random r = new Random(DateTime.Now.Millisecond);

            Response.Write(pictureProcessService.loadPicture("test"+r.Next(1000, 9999).ToString(), Files));
        }

        [HttpPost]
        public ActionResult createBanner()
        {
            Banner newBanner = bannerService.createBanner(
                Request.Params["seccionId"],
                Request.Params["imgMainUrl"],
                Request.Params["imgButtonUrl"],
                Request.Params["imgModalUrl"],
                Request.Params["mode"],
                Request.Params["link"],
                Request.Params["backgroundColor"],
                Request.Params["text"],
                new DateTime(),//(Request.Params["startDateActivation"])
                new DateTime(), //Request.Params["endDateActivation"]
                Request.Params["registrationUserId"],
                Request.Params["status"]
                );

            return Json(newBanner, JsonRequestBehavior.AllowGet);

        }
        // aqui agregamos la accion para modificar Banner
        // agregamos la accion para guardar Banner
        // agregamos la accion para busqueda de banner por filtro 
        public void SearchBanner()
        {
            // fitros, por id, por status, por sección, fechaInicial, fechaTerminacion, 
            Response.Write("OK");
        }
        // agregamos la accion para preview
    }
}