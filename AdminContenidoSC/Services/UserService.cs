using AdminContenidoSC.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Web;

namespace AdminContenidoSC.Services
{
    public class UserService
    {
        DataBase conexion = new DataBase("SQL");   //Creando objetos de la base de datos

        public User createUser(string _email, string _pass, string _name, string _type, int userIdModify  )
        {
            User newUser = new User();
            newUser.email   = _email;
            newUser.pass    = _pass;
            newUser.name    = _name;
            newUser.status  = Constants.STATUS_USER_ACTIVE;
            newUser.type    = _type;

            newUser = insUpdUserDB(newUser, userIdModify);


            return newUser;
        }

        public User updateUser(string _id, string _email, string _pass, string _name, string _type, string _status, int _idUserUpdate)
        {
            User updateUser = new User();

            updateUser.email    = _email;
            updateUser.pass     = _pass;
            updateUser.name     = _name;
            updateUser.status   = _status;
            updateUser.type     = _type;
            updateUser.id       = _id;

            updateUser = insUpdUserDB(updateUser, _idUserUpdate);

            return updateUser; 
        }

        public User login(string _email, string _pass)
        {
            User user = new User();
            user = loginDB(_email, _pass);
            return user;
        }

        private User insUpdUserDB(User newUser, int userIdModify)
        {
            User user = new User();
            try
            {
                String _query = "SP_AdminContenido_INSUPDUSER '" + newUser.email + "','"+newUser.pass
                    +"', '"+newUser.name+"', '"+newUser.type+"', '"+newUser.status+"',"+ userIdModify;
                conexion.Conectar();
                conexion.CrearComando(_query);
                DbDataReader DRConexion = conexion.EjecutarConsulta();
                while (DRConexion.Read())
                {

                    user = new User
                    {
                        id = DRConexion.GetInt32(0).ToString(),
                        email = DRConexion.GetString(1),
                        name = DRConexion.GetString(2),
                        type = DRConexion.GetString(3),
                        status = DRConexion.GetString(4)
                    };

                }
                conexion.Desconectar();
            }
            catch
            {
                user = new User
                {
                    id = null
                };
            }

            return user;
        }

        private User loginDB(string email, string pass)
        {
            User user = new User();
            try
            {
                String _query = "SP_AdminContenido_LOGIN '" + email + "','" + pass + "'";
                conexion.Conectar();
                conexion.CrearComando(_query);
                DbDataReader DRConexion = conexion.EjecutarConsulta();
                while (DRConexion.Read())
                {

                    user = new User
                    {
                        id = DRConexion.GetInt32(0).ToString(),
                        email = DRConexion.GetString(1),
                        name = DRConexion.GetString(2),
                        type = DRConexion.GetString(3),
                        status = DRConexion.GetString(4)
                    };

                }
                conexion.Desconectar();
            }
            catch
            {
                user = new User
                {
                    id = null
                };
            }

            return user;
        }
    }
}