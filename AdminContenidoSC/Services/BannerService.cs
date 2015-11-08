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
            banner.registrationDate = new DateTime();
            banner.updateDate = new DateTime();

            return banner;
        
       
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