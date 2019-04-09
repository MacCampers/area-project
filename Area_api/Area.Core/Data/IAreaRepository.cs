using Area.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Area.Core.Data
{
    public interface IAreaRepository
    {
        #region ApplicationUser
        Task<ApplicationUser> GetUser(string id);
        Task<List<ApplicationUser>> GetUsers();
        Task<ApplicationUser> GetUserByName(string username);
        #endregion

        #region Service
        Task<Service> GetService(int id);
        Task<List<Service>> GetServices();
        #endregion

        #region Applet
        Task<Applet> GetApplet(int Id);
        Task<List<Applet>> GetApplets();
        #endregion

        #region Souscription
        Task<Souscription> GetSouscription(int Id);
        Task<List<Souscription>> GetSouscriptions();
        Task<List<Souscription>> GetSouscriptionByUserId(string id);
        Task<Souscription> AddSouscription(int idApplet, string idUser, string city, string streamer, string fbToken, string fbIdPage, string twitterToken, string twitterSecret);
        Task<bool> RemoveSouscription(int idApplet, string idUser);
        #endregion
    }
}
