using AdminContenidoSC.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Web;

namespace AdminContenidoSC.Services
{
    public class PreviewService
    {
        /* -- Algoritmo de seguimiento 
            1.- Creamos las listas de banners por seccion 
            2.- creamos metodo que alimenta las listas de cada seccion desde la BD
            3.- Creamos un metodo de construccion por seccion 
            4.- Regresamos los resultados

        */
        private DataBase conexion = new DataBase("SQL");
        private List<Banner> bannerSliderList = new List<Banner>();
        private List<Banner> bannerNewsList = new List<Banner>();
        private List<Banner> bannerBannerList = new List<Banner>();
        private List<Banner> bannerTakeoverList = new List<Banner>();
        private string CLASSIFICATION_A_SLIDER = "A-Slider";
        private string CLASSIFICATION_B_BANNER = "B-Banner";
        private string CLASSIFICATION_C_NOTICIAS = "A-Noticias";

        public string buildHome()
        {
            clearBannerList();
            getBannerActive();
            // stringbuilder  sb.Append()
            string response = buildSliderSection();
            return response;
        }

        public string buildTakeOver()
        {
            string response = "";
            StringBuilder sb = new StringBuilder();
            sb.Clear();
            int i = 1;
            if (bannerTakeoverList.Count() > 0)
            {
                sb.Append("<div id=\"takeOver\">");
                foreach (Banner takeovers in bannerTakeoverList)
                {
                    if (i < 3) // solo podemos tener 2 takeover maximo por vez
                    {
                        sb.Append("<img class=\"img" + i + "\" src=\"" + takeovers.imgMainUrl + "\">");
                        i++;
                    }
                }
                sb.Append("<div class=\"takeOver_close closeM\">x</div>");
                sb.Append("</div>");
                response = sb.ToString();
            }
            return response;
        }

        public string buildModals()
        {
            string response = "";

            StringBuilder sb = new StringBuilder();
            sb.Clear();
            foreach(Banner modals in bannerSliderList)
            {
                if (modals.mode.ToLower() == "modal" || modals.mode.ToLower() == "slider")
                {
                    sb.Append("<div id=\"modalPromo" +modals.id+ "\" class=\"modalmask\">");
                    sb.Append("    <div class=\"modalbox14 movedown\">");
                    sb.Append("        <a href = \"#close\" title=\"Close\" class=\"close\">x</a>");
                    sb.Append("        <div id = \"container-modal\">");
                    sb.Append("            <div class=\"contenido-modal\">");
                    sb.Append("                <img src = \""+modals.imgModalUrl+"\" >");
                    sb.Append("            </div>");
                    sb.Append("        </div>");
                    sb.Append("    </div>");
                    sb.Append("</div>");
                }

            }
            foreach (Banner modals in bannerBannerList)
            {
                if (modals.mode.ToLower() == "modal" || modals.mode.ToLower() == "slider")
                {
                    sb.Append("<div id=\"modalPromo" + modals.id + "\" class=\"modalmask\">");
                    sb.Append("    <div class=\"modalbox14 movedown\">");
                    sb.Append("        <a href = \"#close\" title=\"Close\" class=\"close\">x</a>");
                    sb.Append("        <div id = \"container-modal\">");
                    sb.Append("            <div class=\"contenido-modal\">");
                    sb.Append("                <img src = \"" + modals.imgModalUrl + "\" >");
                    sb.Append("            </div>");
                    sb.Append("        </div>");
                    sb.Append("    </div>");
                    sb.Append("</div>");
                }

            }
            foreach (Banner modals in bannerNewsList)
            {
                if (modals.mode.ToLower() == "modal" || modals.mode.ToLower() == "slider")
                {
                    sb.Append("<div id=\"modalPromo" + modals.id + "\" class=\"modalmask\">");
                    sb.Append("    <div class=\"modalbox14 movedown\">");
                    sb.Append("        <a href = \"#close\" title=\"Close\" class=\"close\">x</a>");
                    sb.Append("        <div id = \"container-modal\">");
                    sb.Append("            <div class=\"contenido-modal\">");
                    sb.Append("                <img src = \"" + modals.imgModalUrl + "\" >");
                    sb.Append("            </div>");
                    sb.Append("        </div>");
                    sb.Append("    </div>");
                    sb.Append("</div>");
                }

            }
            response = sb.ToString();
            return response;

        }

        public string buildSliderSection()
        {
            string response = "";
            StringBuilder sb = new StringBuilder();
            sb.Clear();
            sb.Append("<ul class=\"bxslider1\">");
            foreach(Banner sliders in bannerSliderList)
            {
                
                sb.Append("    <li>");
                sb.Append("        <div class=\"content_promo2\" style=\"background:"+sliders.backgroundColor+"\">");
                sb.Append("            <div class=\"content_promoCentro2\">");
                sb.Append("                <div class=\"anuncio\" style=\"background:"+sliders.backgroundColor+"\">");
                sb.Append("                    <div id = \"imagenAnuncio\">");
                sb.Append("                        <img src=\""+sliders.imgMainUrl+"\" height=\"250\" width=\"1920\">");
                sb.Append("                    </div>");
                sb.Append("                    <div id=\"botonAnuncio\">");
                sb.Append("                        <a href=\"#modalPromo"+sliders.id+"\"><img src=\""+sliders.imgButtonUrl+"\" width=\"70%\" height=\"70%\"></a>");
                sb.Append("                    </div>");
                sb.Append("                </div>");
                sb.Append("            </div>");
                sb.Append("        </div>");
                sb.Append("    </li>");
              
            }
            sb.Append("</ul>");

            response = sb.ToString();

            return response;
        }

        private void clearBannerList()
        {
            this.bannerSliderList.Clear();
            this.bannerNewsList.Clear();
            this.bannerBannerList.Clear();
            this.bannerTakeoverList.Clear();
        }

        private void getBannerActive()
        {
            try
            {
                Banner banner = new Banner();
                string query = " SP_AdminContenido_GETCONTENIDOACTIVO ";
                conexion.Conectar();
                conexion.CrearComando(query);
                DbDataReader DRConexion = conexion.EjecutarConsulta();
                while (DRConexion.Read())
                {

                    banner = new Banner
                    {
                        id = DRConexion.GetDecimal(0).ToString(),
                        //name = DRConexion.GetString(2),
                        seccionId = DRConexion.GetString(1),
                        imgMainUrl = DRConexion.GetString(2),
                        imgButtonUrl = DRConexion.GetString(3),
                        imgModalUrl = DRConexion.GetString(4),
                        mode = DRConexion.GetString(5),
                        link = DRConexion.GetString(6),
                        backgroundColor = DRConexion.GetString(7),
                        text = DRConexion.GetString(8)
                        /*startDateActivation = DRConexion.GetDateTime(11),
                        endDateActivation = DRConexion.GetDateTime(12),
                        updateUserId = DRConexion.GetInt32(16).ToString(),
                        registrationUserId = DRConexion.GetInt32(15).ToString(),
                        activationUserId = DRConexion.GetInt32(17).ToString(),
                        deactivationUserId = DRConexion.GetInt32(18).ToString(),
                        status = DRConexion.GetString(19),
                        registrationDate = DRConexion.GetDateTime(13),
                        updateDate = DRConexion.GetDateTime(14)*/
                    };

                    switch (banner.seccionId)
                    {
                        case "A-Slider" :
                            bannerSliderList.Add(banner);
                            break;
                        case "B-Banner":
                            bannerBannerList.Add(banner);
                            break;
                        case "D-Takeover":
                            bannerTakeoverList.Add(banner);
                            break;
                        default:
                            bannerNewsList.Add(banner);
                            break;
                    }




                }
                conexion.Desconectar();
            }
            catch
            {
                clearBannerList();
            }
        }
    }
}