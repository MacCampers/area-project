using Area.Core.Data;
using Area.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace Area.Data.EntityFramework.Repositories
{
    public class AreaRepository : IAreaRepository
    {
        private readonly AreaContext _db;

        public AreaRepository(AreaContext db)
        {
            _db = db;
        }

        #region ApplicationUser
        public async Task<ApplicationUser> GetUser(string id)
        {
            return await _db.Users.FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<List<ApplicationUser>> GetUsers()
        {
            return await _db.Users.ToListAsync();
        }

        public async Task<ApplicationUser> GetUserByName(string username)
        {
            return await _db.Users.FirstOrDefaultAsync(user => user.UserName == username);
        }
        #endregion

        #region Service
        public async Task<Service> GetService(int id)
        {
            return await _db.Services.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Service>> GetServices()
        {
            return await _db.Services.ToListAsync();
        }
        #endregion

        #region Applet
        public async Task<Applet> GetApplet(int Id)
        {
            return await _db.Applets.FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<List<Applet>> GetApplets()
        {
            return await _db.Applets.ToListAsync();
        }
        #endregion

        #region Souscription
        public async Task<Souscription> GetSouscription(int id)
        {
            return await _db.Souscriptions.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Souscription>> GetSouscriptions()
        {
            return await _db.Souscriptions.ToListAsync();
        }

        public async Task<List<Souscription>> GetSouscriptionByUserId(string id)
        {
            return await _db.Souscriptions.Where(x => x.UserId == id).ToListAsync();
        }

        public async Task<Souscription> AddSouscription(int idApplet, string idUser, string city = null, string streamer = null, string fbToken = null, string fbIdPage = null, string twitterToken = null, string twitterSecret = null)
        {
            _db.Souscriptions.Add(new Souscription { AppletId = idApplet, UserId = idUser, City = city, Streamer = streamer, FbToken = fbToken, FbPageId = fbIdPage, TwitterToken = twitterToken, TwitterSecret = twitterSecret });
            _db.SaveChanges();
            return await _db.Souscriptions.FirstOrDefaultAsync(x => x.AppletId == idApplet && x.UserId == idUser);
        }
        public async Task<bool> RemoveSouscription(int idApplet, string idUser)
        {
            var souscription = _db.Souscriptions.FirstOrDefault(x => x.AppletId == idApplet && x.UserId == idUser);
            if (souscription == null)
            {
                return false;
            }
            _db.Souscriptions.Remove(souscription);
            _db.SaveChanges();
            return true;
        }
        #endregion
    }
}
