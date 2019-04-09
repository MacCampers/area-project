using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Area.Core.ViewModels;
using Area.Data.EntityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static Area.Api.Helpers.TwitchHelper;

namespace Area.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TwitchController : ControllerBase
    {
        private readonly AreaContext _db;

        public TwitchController(AreaContext db)
        {
            _db = db;
        }
        public IActionResult Live()//[FromBody] TwitchViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mails = new Dictionary<string, string>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 3
                select souscription.UserId
                ).ToList();

            foreach (var id in userIds)
            {
                var userName = (
                from user in _db.Users
                where user.Id == id
                select user.UserName
                ).FirstOrDefault();

                var streamer = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 3
                    select souscription.Streamer
                    ).FirstOrDefault();

                mails.Add(userName, streamer);
            }

            foreach (var pair in mails)
            {
                /*Calling API http://twitch/api */
                string apiKey = "wi4v1bglz74mehi3fo02mlx2cdu70y";
                HttpWebRequest apiRequest = WebRequest.Create("https://api.twitch.tv/kraken/streams/" + pair.Value + "?client_id=" + apiKey) as HttpWebRequest;

                string apiResponse = "";
                using (HttpWebResponse response = apiRequest.GetResponse() as HttpWebResponse)
                {
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    apiResponse = reader.ReadToEnd();
                }
                /*End*/

                /*http://json2csharp.com*/
                TwitchResponse rootObject = JsonConvert.DeserializeObject<TwitchResponse>(apiResponse);

                try
                {
                    if (rootObject.stream != null)
                    {
                        SmtpClient client = new SmtpClient("smtp.gmail.com");
                        client.EnableSsl = true;
                        client.UseDefaultCredentials = false;
                        client.Credentials = new NetworkCredential("oibwankenobi238@gmail.com", "Starkiller75");

                        MailMessage mailMessage = new MailMessage();
                        mailMessage.From = new MailAddress("benoit.bouton@epitech.eu");
                        mailMessage.To.Add(pair.Key);
                        mailMessage.Body = (
                            $"<h1 style=\"text-align: center;\">{rootObject.stream.channel.display_name} est en live sur {rootObject.stream.game}:</h1>" +
                            $"<h2 style=\"text-align: center;\">{rootObject.stream.channel.display_name} stream pour {rootObject.stream.viewers} viewers:</h2><br>" +
                            $"<h3 style=\"text-align: center;\">{rootObject.stream.channel.status}</h3><br>" +
                            $"<img style=\"text-align: center;\" src=\"{rootObject.stream.channel.logo}\" /><br>" +
                            $"<img style=\"text-align: center;\" src=\"{rootObject.stream.preview.medium}\" /><br>" +
                            $"<a href=\"{rootObject.stream.channel.url}\" style=\"text-align: center;\">Suivez {rootObject.stream.channel.display_name} en cliquant sur le lien suivant</a>"
                            );
                        mailMessage.IsBodyHtml = true;
                        mailMessage.Subject = $"{rootObject.stream.channel.display_name} est en Live!";
                        client.Send(mailMessage);
                    }
                    //else
                    //{
                        //return BadRequest(new { message = model.streamer + " is not in live", status = 400 });
                    //}
                }
                catch (SmtpFailedRecipientException ex)
                {
                    return BadRequest(ex);
                }
            }
            return Ok(new { message = "Mail sent successfully", status = 200 });
        }
    }
}