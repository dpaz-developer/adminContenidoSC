using AdminContenidoSC.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Web;

namespace AdminContenidoSC.Services
{
    public class BannerService
    {
        DataBase conexion = new DataBase("SQL");

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


            string startDateProcess = processDateFormat(startDateActivation);
            string endDateProcess = processDateFormat(endDateActivation);
            Banner banner = new Banner();

            try { 
            string query = "SP_AdminContenido_INSUPDBANNER 0, '" + name + "','" + seccionId + "', '" + imgMainUrl + "', '" + imgButtonUrl + "'," +
                "'" + imgModalUrl + "', '" + mode + "', '" + link + "', '" + backgroundColor + "', '" + text + "', '" + startDateProcess + "', '" + endDateProcess + "', " + registrationUserId + ", " + registrationUserId + "," +
                " 0, 0, '" + status + "'";

            conexion.Conectar();
            conexion.CrearComando(query);
            DbDataReader DRConexion = conexion.EjecutarConsulta();
            while (DRConexion.Read())
            {

                banner = new Banner
                {
           
                    id = DRConexion.GetDecimal(0).ToString(),
                    name = DRConexion.GetString(1),
                    seccionId = DRConexion.GetString(2),
                    imgMainUrl = DRConexion.GetString(3),
                    imgButtonUrl = DRConexion.GetString(4),
                    imgModalUrl = DRConexion.GetString(5),
                    mode = DRConexion.GetString(6),
                    link = DRConexion.GetString(7),
                    backgroundColor = DRConexion.GetString(8),
                    text = DRConexion.GetString(9),
                    startDateActivation = DRConexion.GetDateTime(10),
                    endDateActivation = DRConexion.GetDateTime(11),
                    registrationUserId = DRConexion.GetInt32(14).ToString(),
                    status = DRConexion.GetString(18),
                    registrationDate = DRConexion.GetDateTime(12),
                    updateDate = DRConexion.GetDateTime(13)
                };

            }
            conexion.Desconectar();
            }
            catch
            {
                banner = new Banner
                {
                    id = null
                };
            }
    


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
            string activationUserId, string deactivationUserId, string status, int offset, int resultsForPage)
        {

            bannerId = validDataString(bannerId) == "" ? "0" : bannerId;
            sectionId = validDataString(sectionId);
            startDateActivation = validDataString(startDateActivation);
            endDateActivation = validDataString(endDateActivation);
            registrationUserId = validDataString(registrationUserId) == "" ? "0" : registrationUserId;
            updateUserId = validDataString(updateUserId) == "" ? "0" : updateUserId;
            activationUserId = validDataString(activationUserId) == "" ? "0" : activationUserId;
            deactivationUserId = validDataString(deactivationUserId) == "" ? "0" : deactivationUserId;
            status = validDataString(status);
            offset = validDataNumber(offset);
            resultsForPage = validDataNumber(resultsForPage) == 0 ? 20 : resultsForPage;

            List<Banner> banners = new List<Banner>();
            banners.Clear();
            Banner banner = new Banner();

            try
            {
                string query = "SP_AdminContenido_GETBNNR  "+bannerId+", '"+sectionId+"', '"+startDateActivation+"',"+
                    "'"+endDateActivation+"', "+registrationUserId+","+updateUserId+","+
                    " "+activationUserId+","+deactivationUserId+",'"+status+"',"+offset+","+resultsForPage;

                conexion.Conectar();
                conexion.CrearComando(query);
                DbDataReader DRConexion = conexion.EjecutarConsulta();
                while (DRConexion.Read())
                {

                    banner = new Banner
                    {
                        id = DRConexion.GetDecimal(1).ToString(),
                        name = DRConexion.GetString(2),
                        seccionId = DRConexion.GetString(3),
                        imgMainUrl = DRConexion.GetString(4),
                        imgButtonUrl = DRConexion.GetString(5),
                        imgModalUrl = DRConexion.GetString(6),
                        mode = DRConexion.GetString(7),
                        link = DRConexion.GetString(8),
                        backgroundColor = DRConexion.GetString(9),
                        text = DRConexion.GetString(10),
                        startDateActivation = DRConexion.GetDateTime(11),
                        endDateActivation = DRConexion.GetDateTime(12),
                        updateUserId = DRConexion.GetInt32(16).ToString(),
                        registrationUserId = DRConexion.GetInt32(15).ToString(),
                        activationUserId = DRConexion.GetInt32(17).ToString(),
                        deactivationUserId = DRConexion.GetInt32(18).ToString(),
                        status = DRConexion.GetString(19),
                        registrationDate = DRConexion.GetDateTime(13),
                        updateDate = DRConexion.GetDateTime(14)
                    };

                    banners.Add(banner);

                }
                conexion.Desconectar();
            }
            catch
            {
                banners.Clear();
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

        private string processDateFormat(DateTime fecha)
        {
            return fecha.Month.ToString() + "/" + fecha.Day.ToString() + "/" + fecha.Year.ToString();
        }

        private int validDataNumber(int num)
        {
            int result;
            try
            {
               result =  Int32.Parse(num.ToString());
            }
            catch
            {
                result = 0;
            }

            return result;
        }

        private string validDataString(string data)
        {
            return (string.IsNullOrEmpty(data)) ? "" : data;
        }
    }
}