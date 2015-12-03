using AdminContenidoSC.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdminContenidoSC.Controllers
{
    public class PreviewController : Controller
    {
        PreviewService previewService = new PreviewService();
        public ActionResult Index()
        {
            ViewBag.contenido = previewService.buildHome();
            ViewBag.modals = previewService.buildModals();
            ViewBag.takeOver = previewService.buildTakeOver();
            ViewBag.newsA = previewService.buildNewsSectionA();
            ViewBag.newsB = previewService.buildNewsSectionB();
            return View();
        }
    }
}