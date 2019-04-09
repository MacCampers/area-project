using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Area.Core.ViewModels;
using Area.Data.EntityFramework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static Area.Api.Helpers.WeatherHelper;

namespace Area.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly AreaContext _db;

        public WeatherController(AreaContext db)
        {
            _db = db;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Current()//[FromBody]WeatherViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mails = new Dictionary<string, string>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 1
                select souscription.UserId
                ).ToList();

            foreach (var id in userIds)
            {
               var userName = (
               from user in _db.Users
               where user.Id == id
               select user.UserName
               ).FirstOrDefault();

                var city = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 1
                    select souscription.City
                    ).FirstOrDefault();

                mails.Add(userName, city);
            }

            foreach (var pair in mails)
            {
                /*Calling API http://openweathermap.org/api */
                string apiKey = "9b102e84793bf9c05da530b6612257ed";
                HttpWebRequest apiRequest = WebRequest.Create("http://api.openweathermap.org/data/2.5/weather?q=" + pair.Value + "&appid=" + apiKey + "&units=metric") as HttpWebRequest;

                string apiResponse = "";
                using (HttpWebResponse response = apiRequest.GetResponse() as HttpWebResponse)
                {
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    apiResponse = reader.ReadToEnd();
                }
                /*End*/

                /*http://json2csharp.com*/
                ResponseWeather rootObject = JsonConvert.DeserializeObject<ResponseWeather>(apiResponse);

                try
                {
                    var icon_url = "http://openweathermap.org/img/w/" + rootObject.weather[0].icon + ".png";
                    SmtpClient client = new SmtpClient("smtp.gmail.com");
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("oibwankenobi238@gmail.com", "Starkiller75");

                    MailMessage mailMessage = new MailMessage();
                    mailMessage.From = new MailAddress("benoit.bouton@epitech.eu");
                    mailMessage.To.Add(pair.Key);
                    mailMessage.Body = (
                        $"<h1 style=\"text-align: center;\">Voici la météo pour la ville de {rootObject.name}: </h1><br>" +
                        $"<h2 style=\"text-align: center;\">{rootObject.weather[0].main}, {rootObject.weather[0].description}</h2><br>" +
                        $"<p style=\"text-align: center;\"><img src=\"{icon_url}\"/></p>"
                        );
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Subject = "Météo du jour";
                    client.Send(mailMessage);
                }
                catch (SmtpFailedRecipientException ex)
                {
                    return BadRequest(ex);
                }
            }
            return Ok(new { message = "Mail sent successfully", status = 200 });
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Rain()//[FromBody]WeatherViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mails = new Dictionary<string, string>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 2
                select souscription.UserId
                ).ToList();

            foreach (var id in userIds)
            {
                var userName = (
                from user in _db.Users
                where user.Id == id
                select user.UserName
                ).FirstOrDefault();

                var city = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 2
                    select souscription.City
                    ).FirstOrDefault();

                mails.Add(userName, city);
            }

            foreach (var pair in mails)
            {
                /*Calling API http://openweathermap.org/api */
                string apiKey = "9b102e84793bf9c05da530b6612257ed";
                HttpWebRequest apiRequest = WebRequest.Create("http://api.openweathermap.org/data/2.5/weather?q=" + pair.Value + "&appid=" + apiKey + "&units=metric") as HttpWebRequest;

                string apiResponse = "";
                using (HttpWebResponse response = apiRequest.GetResponse() as HttpWebResponse)
                {
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    apiResponse = reader.ReadToEnd();
                }
                /*End*/

                /*http://json2csharp.com*/
                ResponseWeather rootObject = JsonConvert.DeserializeObject<ResponseWeather>(apiResponse);

                int[] rain_tab = new int[10];

                rain_tab[0] = 500;
                rain_tab[1] = 501;
                rain_tab[2] = 502;
                rain_tab[3] = 503;
                rain_tab[4] = 504;
                rain_tab[5] = 511;
                rain_tab[6] = 520;
                rain_tab[7] = 521;
                rain_tab[8] = 522;
                rain_tab[9] = 531;

                for (int i = 0; i < rain_tab.Length; i++)
                {
                    if (rain_tab[i] == rootObject.weather[0].id)
                    {
                        try
                        {
                            var icon_url = "http://openweathermap.org/img/w/" + rootObject.weather[0].icon + ".png";
                            SmtpClient client = new SmtpClient("smtp.gmail.com");
                            client.EnableSsl = true;
                            client.UseDefaultCredentials = false;
                            client.Credentials = new NetworkCredential("oibwankenobi238@gmail.com", "Starkiller75");

                            MailMessage mailMessage = new MailMessage();
                            mailMessage.From = new MailAddress("benoit.bouton@epitech.eu");
                            mailMessage.To.Add(pair.Key);
                            mailMessage.Body = (
                                $"<h1 style=\"text-align: center;\">Voici la météo pour la ville de {rootObject.name}: </h1><br>" +
                                $"<h2 style=\"text-align: center;\">{rootObject.weather[0].main}, {rootObject.weather[0].description}</h2><br>" +
                                $"<p style=\"text-align: center;\"><img src=\"{icon_url}\"/></p>"
                                );
                            mailMessage.IsBodyHtml = true;
                            mailMessage.Subject = "Alerte Météo - Pluie";
                            client.Send(mailMessage);
                        }
                        catch (SmtpFailedRecipientException ex)
                        {
                            return BadRequest(ex);
                        }
                    }
                    return Ok(new { message = "Mail sent successfully", status = 200 });
                }
            }
            return BadRequest();
        }
    }
}