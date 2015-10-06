using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminContenidoSC.Services
{
    public class PictureProcessService
    {
        public string loadPicture(string name, HttpFileCollectionBase FileCollection)
        {
            string result = "";
            string nameFile = "sportcity-banner-" + name+".png";            
            string dominio_raiz = "http://localhost/uploads/images/";
            string path_raiz = "E:\\workspace\\dotNET\\AdminContenidoSC\\AdminContenidoSC\\uploads\\images\\";
            string directorio = path_raiz;
            string url = dominio_raiz + nameFile;

            if (FileCollection.Count > 0)
            {
                for(int i=0; i<FileCollection.Count; i++)
                {
                    if(FileCollection[i].FileName.Length > 0)
                    {
                        FileCollection[i].SaveAs(directorio + nameFile);
                    }
                }
            }

            result = url;

            return result;
        }
    }
}