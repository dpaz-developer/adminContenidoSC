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
    }
}