using AdminContenidoSC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminContenidoSC.Services
{
    public class BannerService
    {
        public Banner createBanner(
        string seccionId,
        string name,
        string imgMainUrl,
        string imgButtonUrl,
        string imgModalUrl,
        string mode,
        string link,
        string backgroundColor,
        string text,
        DateTime startDateActivation,
        DateTime endDateActivation,
        string registrationUserId,
        string status
            )
        {
            Banner banner = new Banner();
            banner.id = "1234";
            banner.name = name;
            banner.seccionId = seccionId;
            banner.imgMainUrl = imgMainUrl;
            banner.imgButtonUrl = imgButtonUrl;
            banner.imgModalUrl = imgModalUrl;
            banner.mode = mode;
            banner.link = link;
            banner.backgroundColor = backgroundColor;
            banner.text = text;
            banner.startDateActivation = startDateActivation;
            banner.endDateActivation = endDateActivation;
            banner.registrationUserId = registrationUserId;
            banner.status = status;
            banner.registrationDate = DateTime.Now;
            banner.updateDate = DateTime.Now;

            return banner;
        
       
        }

        public Banner updateBanner(string id,
        string name,
        string imgMainUrl,
        string imgButtonUrl,
        string imgModalUrl,
        string mode,
        string link,
        string backgroundColor,
        string text,
        DateTime startDateActivation,
        DateTime endDateActivation,
        string updateUserId,
        string status)
        {
            Banner banner = new Banner();
            banner.id = id;
            banner.name = name;
            banner.imgMainUrl = imgMainUrl;
            banner.imgButtonUrl = imgButtonUrl;
            banner.imgModalUrl = imgModalUrl;
            banner.mode = mode;
            banner.link = link;
            banner.backgroundColor = backgroundColor;
            banner.text = text;
            banner.startDateActivation = startDateActivation;
            banner.endDateActivation = endDateActivation;
            banner.updateUserId = updateUserId;
            banner.status = status;
            banner.registrationDate = DateTime.Now;
            banner.updateDate = DateTime.Now;

            return banner;
        }


        public List<Banner> search(string bannerId, string sectionId, string startDateActivation,
            string endDateActivation, string registrationUserId, string updateUserId,
            string activationUserId, string deactivationUserId, string status)
        {
            List<Banner> banners = new List<Banner>();
            banners.Clear();

            // TODO hacer la conexion a la BD
            if (bannerId == null)
            {
                bannerId = "0";
            }
            Banner banner = new Banner();

            for (int i = 0; i < int.Parse(bannerId); i++)
            {
                banner.id = "B"+i.ToString();
                banner.seccionId = "A-Slider";
                banner.name = "Banner de test";
                banner.imgMainUrl = "/uploads/images/A-slider/sportcity-banner-test3088.png";
                banner.imgButtonUrl = "/uploads/images/A-slider/sportcity-banner-test2946.png";
                banner.imgModalUrl = "/uploads/images/A-slider/sportcity-banner-test8949.png";
                banner.mode = "slider";
                banner.link = "sin_link";
                banner.backgroundColor = "#FEFEFE";
                banner.text = "sin_texto";
                banner.startDateActivation = DateTime.Now.AddDays(3);
                banner.endDateActivation = DateTime.Now.AddDays(15);
                banner.updateUserId = "1";
                banner.status = "pending";
                banner.registrationDate = DateTime.Now;
                banner.updateDate = DateTime.Now;
                banner.registrationUserId = "1";
                banner.activationUserId = "1";
                banner.deactivationUserId = "1";

                banners.Add(banner);
            }


            return banners;
        }


        public DateTime processDateFormat(string fecha)
        {
            int anio;
            int mes;
            int dia;

            string[] arrayFecha = fecha.Split('-');
            anio = int.Parse(arrayFecha[0]);
            mes = int.Parse(arrayFecha[1]);
            dia = int.Parse(arrayFecha[2]);

            DateTime dateProcess = new DateTime(anio, mes, dia);
            return dateProcess;
        }
    }
}