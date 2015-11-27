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
            String sectionName = Request.Params["sectionName"];
            Random r = new Random(DateTime.Now.Millisecond);

            Response.Write(pictureProcessService.loadPicture(sectionName,"test"+r.Next(1000, 9999).ToString(), Files));
        }

        [HttpPost]
        public ActionResult createBanner()
        {
            Banner newBanner = bannerService.createBanner(
                Request.Params["seccionId"],
                Request.Params["name"],
                Request.Params["imgMainUrl"],
                Request.Params["imgButtonUrl"],
                Request.Params["imgModalUrl"],
                Request.Params["mode"],
                Request.Params["link"],
                Request.Params["backgroundColor"],
                Request.Params["text"],
                bannerService.processDateFormat(Request.Params["startDateActivation"]),
                bannerService.processDateFormat(Request.Params["endDateActivation"]),
                Request.Params["registrationUserId"],
                Request.Params["status"]
                );

            return Json(newBanner, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult updateBanner()
        {
            Banner modifiedBanner = bannerService.updateBanner(
                Request.Params["Id"],
                Request.Params["name"],
                Request.Params["imgMainUrl"],
                Request.Params["imgButtonUrl"],
                Request.Params["imgModalUrl"],
                Request.Params["mode"],
                Request.Params["link"],
                Request.Params["backgroundColor"],
                Request.Params["text"],
                bannerService.processDateFormat(Request.Params["startDateActivation"]),
                bannerService.processDateFormat(Request.Params["endDateActivation"]),
                Request.Params["registrationUserId"],
                Request.Params["status"]
                );

            return Json(modifiedBanner, JsonRequestBehavior.AllowGet);
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