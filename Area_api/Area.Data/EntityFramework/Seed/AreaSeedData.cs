using Area.Core.Models;
using Area.Data.EntityFramework;
using System.Collections.Generic;
using System.Linq;

namespace Area.Data.Seed
{
    public static class AreaSeedData
    {
        public static void EnsureSeedData(this AreaContext db)
        {
            if (!db.Services.Any())
            {
                List<Service> services = new List<Service>() {
                    new Service() { Name = "OpenWeatherMap" },
                    new Service() { Name = "Youtube" },
                    new Service() { Name = "Twitch" },
                    new Service() { Name = "Twitter" },
                    new Service() { Name = "Facebook" },
                    new Service() { Name = "Github" },
                    new Service() { Name = "Gmail" }
                };
                db.AddRange(services);
                db.SaveChanges();
            }
            if (!db.Applets.Any())
            {
                List<Applet> applets = new List<Applet>() {
                    new Applet() { description = "Envoyer un mail pour la météo courante", IdServiceIn = 1, IdServiceOut = 7 },
                    new Applet() { description = "Prévenir quand il pleut", IdServiceIn = 1, IdServiceOut = 7 },
                    new Applet() { description = "Envoie de mail quand un streamer est en live", IdServiceIn = 3, IdServiceOut = 7 },
                    new Applet() { description = "Tweeter la météo du jour", IdServiceIn = 1, IdServiceOut = 4 },
                    new Applet() { description = "Tweeter quand un streamer est en live", IdServiceIn = 3, IdServiceOut = 4 },
                    new Applet() { description = "Poster la météo du jour", IdServiceIn = 1, IdServiceOut = 5 },
                    new Applet() { description = "Poster quand un streamer est en live", IdServiceIn = 3, IdServiceOut = 5 },
                    new Applet() { description = "Envoyer un mail quand il y a un nouveau push etc", IdServiceIn = 6, IdServiceOut = 7 },
                    new Applet() { description = "Tweeter quand il y a un nouveau push etc", IdServiceIn = 6, IdServiceOut = 4 },
                    new Applet() { description = "Poster sur Facebook quand y a un nouveau push", IdServiceIn = 6, IdServiceOut = 5 },
                    new Applet() { description = "Poster sur Twitter quand y a un repo delete", IdServiceIn = 6, IdServiceOut = 4 },
                    new Applet() { description = "Poster sur Facebook quand y a un repo delete", IdServiceIn = 6, IdServiceOut = 5 },
                    new Applet() { description = "Liker le dernier post Facebook", IdServiceIn = 5, IdServiceOut = 5 },
                    new Applet() { description = "Répondre au dernier post Facebook", IdServiceIn = 5, IdServiceOut = 5 },
                    new Applet() { description = "envoyer un email quand un repo est deleted", IdServiceIn = 6, IdServiceOut = 7 }
                };
                db.AddRange(applets);
                db.SaveChanges();
            }
        }
    }
}
