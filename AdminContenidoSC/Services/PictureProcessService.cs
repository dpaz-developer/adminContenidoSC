﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminContenidoSC.Services
{
    public class PictureProcessService
    {
        public string loadPicture(string sectionName,string name, HttpFileCollectionBase FileCollection)
        {
            string result = "";
            string nameFile = "sportcity-banner-" + name+".png";            
            string dominio_raiz = "/uploads/images/"+ sectionName+"/";
            string path_raiz = "E:\\workspace\\dotNET\\AdminContenidoSC\\AdminContenidoSC\\uploads\\images\\"+ sectionName+"\\";
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