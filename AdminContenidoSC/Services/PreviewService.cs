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
        private List<Banner> bannerNewsListA = new List<Banner>();
        private List<Banner> bannerNewsListB = new List<Banner>();
        private List<Banner> bannerNewsListC = new List<Banner>();
        private List<Banner> bannerBannerList = new List<Banner>();
        private List<Banner> bannerTakeoverList = new List<Banner>();
        private List<Banner> bannerOtherList = new List<Banner>();

        private string CLASSIFICATION_A_SLIDER = "A-Slider";
        private string CLASSIFICATION_B_BANNER = "B-Banner";
        private string CLASSIFICATION_C_NOTICIAS_A = "C-Noticias-A";
        private string CLASSIFICATION_C_NOTICIAS_B = "C-Noticias-B";
        private string CLASSIFICATION_C_NOTICIAS_C = "C-Noticias-C";
        private string CLASSIFICATION_D_TAKEOVER = "D-Takeover";

        public string buildHome()
        {
            clearBannerList();
            getBannerActive();
            // stringbuilder  sb.Append()
            string response = buildSliderSection();
            return response;
        }

        public string buildBannerSection()
        {
            StringBuilder sb = new StringBuilder();
            StringBuilder sbScript = new StringBuilder();
            sb.Clear();

            if (bannerBannerList.Count() > 0)
            {
                sbScript.Clear();
                sbScript.Append("<script>");
                sbScript.Append(" $(document).ready(function() {");
            }
            

            foreach (Banner banners in bannerBannerList)
            {
                sb.Append("<li>");
                sb.Append("    <div class=\"bannerEstatico" + banners.id + " bannerEstaticoGeneral\" style=\"background: transparent url("+banners.imgModalUrl+") repeat top left; \">");
                sb.Append("        <div class=\"bannerEstaticoCentro\">");
                sb.Append("            <img src=\"" + banners.imgMainUrl + "\" alt=\"\" /></a>");
                sb.Append("        </div>");
                sb.Append("    </div>");
                sb.Append("</li>");

                sbScript.Append("$('.bannerEstatico" + banners.id + "').click(function(){");
                sbScript.Append("        window.open(\"" + banners.link + "\", '_blank');");
                sbScript.Append("    });");
            }

            if (bannerBannerList.Count() > 0)
            {
                sbScript.Append("});");
                sbScript.Append("</script>");
            }

            return sb.ToString()+sbScript.ToString();

        }

        public string buildNewsSectionA()
        {

            StringBuilder sb = new StringBuilder();
            sb.Clear();

            if (bannerNewsListA.Count > 0) // solo podemos tener un elemento por vez
            {
                sb.Append("<div class=\"view view-first\">");
                sb.Append("    <ul class=\"bxslider1\">");
                sb.Append("        <li>");
                sb.Append("            <div class=\"textosNoticias\">"+bannerNewsListA[0].text+"</div>");
                sb.Append("            <img src=\""+bannerNewsListA[0].imgMainUrl+"\" />");
                sb.Append("            <div class=\"mask\">");
                sb.Append("                <a href=\""+bannerNewsListA[0].link+"\" target=\"_blank\" class=\"info\">Ver más</a>");
                sb.Append("            </div>");
                sb.Append("        </li>");
                sb.Append("    </ul>");
                sb.Append("</div>");                
            }
            
            return sb.ToString();
        }

        public string buildNewsSectionB()
        {
            StringBuilder sb = new StringBuilder();
            sb.Clear();
            if (bannerNewsListB.Count() > 0)
            {
                sb.Append("<div class=\"view view-first\">");
                sb.Append("    <div class=\"textosNoticias\">"+bannerNewsListB[0].text+"</div>");
                sb.Append("    <img src=\""+bannerNewsListB[0].imgMainUrl+"\" />");
                sb.Append("    <div class=\"mask\">");
                sb.Append("        <a href=\"#modalPromo"+bannerNewsListB[0].id+"\" class=\"info\">Ver más</a>");
                sb.Append("      </div>");
                sb.Append("</div>");
            }
            return sb.ToString();
        }

        public string buildTakeOver()
        {
            
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
            }
            return sb.ToString();
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
                    sb.Append(buildModal(modals.id, modals.imgModalUrl));
                }

            }
            foreach (Banner modals in bannerBannerList)
            {
                if (modals.mode.ToLower() == "modal" || modals.mode.ToLower() == "slider")
                {
                    sb.Append(buildModal(modals.id, modals.imgModalUrl));
                }

            }
            foreach (Banner modals in bannerNewsListA)
            {
                if (modals.mode.ToLower() == "modal" || modals.mode.ToLower() == "slider")
                {
                    sb.Append(buildModal(modals.id, modals.imgModalUrl));
                }

            }
            foreach (Banner modals in bannerNewsListB)
            {
                if (modals.mode.ToLower() == "modal" || modals.mode.ToLower() == "slider")
                {
                    sb.Append(buildModal(modals.id, modals.imgModalUrl));
                }

            }
            foreach (Banner modals in bannerNewsListC)
            {
                if (modals.mode.ToLower() == "modal" || modals.mode.ToLower() == "slider")
                {
                    sb.Append(buildModal(modals.id, modals.imgModalUrl));
                }

            }

            response = sb.ToString();
            return response;

        }

        public string buildSliderSection()
        {

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

            return sb.ToString();
        }

        private string buildModal(string id, string urlImage)
        {

            StringBuilder modalSb = new StringBuilder();

            modalSb.Clear();
            modalSb.Append("<div id=\"modalPromo" + id + "\" class=\"modalmask\">");
            modalSb.Append("    <div class=\"modalbox14 movedown\">");
            modalSb.Append("        <a href = \"#close\" title=\"Close\" class=\"close\">x</a>");
            modalSb.Append("        <div id = \"container-modal\">");
            modalSb.Append("            <div class=\"contenido-modal\">");
            modalSb.Append("                <img src = \"" + urlImage + "\" >");
            modalSb.Append("            </div>");
            modalSb.Append("        </div>");
            modalSb.Append("    </div>");
            modalSb.Append("</div>");

            return modalSb.ToString();
        }

        private void clearBannerList()
        {
            this.bannerSliderList.Clear();
            this.bannerNewsListA.Clear();
            this.bannerNewsListB.Clear();
            this.bannerNewsListC.Clear();
            this.bannerBannerList.Clear();
            this.bannerTakeoverList.Clear();
            this.bannerOtherList.Clear();
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
                        case "C-Noticias-A":
                            bannerNewsListA.Add(banner);
                            break;
                        case "C-Noticias-B":
                            bannerNewsListB.Add(banner);
                            break;
                        case "C-Noticias-C":
                            bannerNewsListC.Add(banner);
                            break;
                        case "D-Takeover":
                            bannerTakeoverList.Add(banner);
                            break;
                        default:
                            bannerOtherList.Add(banner);
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