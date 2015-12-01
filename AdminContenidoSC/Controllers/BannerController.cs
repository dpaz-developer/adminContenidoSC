using AdminContenidoSC.Models;
using AdminContenidoSC.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
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

        [HttpGet]
        public void SearchBanner(string bannerId, string sectionId, string startDateActivation,
            string endDateActivation, string registrationUserId, string updateUserId,
            string activationUserId, string deactivationUserId, string status)
        {
            List<Banner> results = new List<Banner>();
            results.Clear();

            results = bannerService.search(bannerId, sectionId, startDateActivation, endDateActivation,
                registrationUserId, updateUserId, activationUserId, deactivationUserId, status);

            //return Json(results, JsonRequestBehavior.AllowGet);
            Response.Write(JsonConvert.SerializeObject(results, new IsoDateTimeConverter()));

        }
        // agregamos la accion para preview
    }
}