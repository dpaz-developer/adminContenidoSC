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

            Response.Write(pictureProcessService.loadPicture("test", Files));
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