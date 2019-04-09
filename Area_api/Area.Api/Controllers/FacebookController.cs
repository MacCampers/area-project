using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Area.Core.ViewModels;
using Area.Data.EntityFramework;
using Facebook;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using static Area.Api.Helpers.FacebookHelper;
using static Area.Api.Helpers.TwitchHelper;
using static Area.Api.Helpers.WeatherHelper;

namespace Area.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FacebookController : ControllerBase
    {
        private readonly AreaContext _db;

        public  FacebookController(AreaContext db)
        {
            _db = db;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Like()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fb = new FacebookFunctions();

            var mails = new Dictionary<string, List<string>>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 13
                select souscription.UserId
                ).ToList();

            foreach (var id in userIds)
            {
                var list = new List<string>();

                var userName = (
                from users in _db.Users
                where users.Id == id
                select users.UserName
                ).FirstOrDefault();

                var token = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 13
                    select souscription.FbToken
                    ).FirstOrDefault();

                var pageId = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 13
                    select souscription.FbPageId
                    ).FirstOrDefault();

                list.Add(token);
                list.Add(pageId);

                mails.Add(userName, list);
            }

            foreach (var pair in mails)
            {
                HttpWebRequest apiRequest = WebRequest.Create("https://graph.facebook.com//v3.2/" + pair.Value[1] + "/feed") as HttpWebRequest;

                apiRequest.Headers.Add("Authorization", "Bearer " + pair.Value[0]);

                string apiResponse = "";
                using (HttpWebResponse response = apiRequest.GetResponse() as HttpWebResponse)
                {
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    apiResponse = reader.ReadToEnd();
                }
                /*End*/

                FacebookResponse rootObject = JsonConvert.DeserializeObject<FacebookResponse>(apiResponse);

                var access_token = pair.Value[0];

                fb.likeObject(access_token, rootObject.data[0].id);

                return Ok(new { message = "Facebook post liked", status = 200 });
            }
            return BadRequest(new { message = "Facebook post not liked", status = 400 });
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Comment()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fb = new FacebookFunctions();

            var mails = new Dictionary<string, List<string>>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 14
                select souscription.UserId
                ).ToList();

            foreach (var id in userIds)
            {
                var list = new List<string>();

                var userName = (
                from users in _db.Users
                where users.Id == id
                select users.UserName
                ).FirstOrDefault();

                var token = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 14
                    select souscription.FbToken
                    ).FirstOrDefault();

                var pageId = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 14
                    select souscription.FbPageId
                    ).FirstOrDefault();

                list.Add(token);
                list.Add(pageId);

                mails.Add(userName, list);
            }

            foreach (var pair in mails)
            {
                HttpWebRequest apiRequest = WebRequest.Create("https://graph.facebook.com//v3.2/" + pair.Value[1] + "/feed") as HttpWebRequest;

                apiRequest.Headers.Add("Authorization", "Bearer " + pair.Value[0]);

                string apiResponse = "";
                using (HttpWebResponse response = apiRequest.GetResponse() as HttpWebResponse)
                {
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    apiResponse = reader.ReadToEnd();
                }
                /*End*/

                FacebookResponse rootObject = JsonConvert.DeserializeObject<FacebookResponse>(apiResponse);

                var access_token = pair.Value[0];

                fb.replyComment(access_token, rootObject.data[0].id, "Merci pour votre réponse", null);

                return Ok(new { message = "Facebook comment posted", status = 200 });
            }
            return BadRequest(new { message = "Facebook comment not posted", status = 400 });
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Weather()//[FromBody]FacebookViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mails = new Dictionary<string, List<string>>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 6
                select souscription.UserId
                ).ToList();

            foreach (var id in userIds)
            {
                var list = new List<string>();

                var userName = (
                from users in _db.Users
                where users.Id == id
                select users.UserName
                ).FirstOrDefault();

                var city = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 6
                    select souscription.City
                    ).FirstOrDefault();

                var token = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 6
                    select souscription.FbToken
                    ).FirstOrDefault();

                list.Add(city);
                list.Add(token);

                mails.Add(userName, list);
            }

            foreach (var pair in mails)
            {
                /*Calling API http://openweathermap.org/api */
                string apiKey = "9b102e84793bf9c05da530b6612257ed";
                HttpWebRequest apiRequest = WebRequest.Create("http://api.openweathermap.org/data/2.5/weather?q=" + pair.Value[0] + "&appid=" + apiKey + "&units=metric") as HttpWebRequest;

                string apiResponse = "";
                using (HttpWebResponse response = apiRequest.GetResponse() as HttpWebResponse)
                {
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    apiResponse = reader.ReadToEnd();
                }
                /*End*/

                /*http://json2csharp.com*/
                ResponseWeather rootObject = JsonConvert.DeserializeObject<ResponseWeather>(apiResponse);

                var access_token = pair.Value[1];

                var icon_url = "http://openweathermap.org/img/w/" + rootObject.weather[0].icon + ".png";
                var client = new FacebookClient(access_token);
                client.Post("/me/feed", new { message = "The weather of today in " + rootObject.name + " is: " + rootObject.weather[0].main + ", " + rootObject.weather[0].description + "\n" + icon_url });

                return Ok(new { message = "Facebook post sent", status = 200 });
            }
            return BadRequest(new { message = "Facebook post not sent", status = 400 });
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult TwitchLive()//[FromBody]TwitterTwitchViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mails = new Dictionary<string, List<string>>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 7
                select souscription.UserId
                ).ToList();

            foreach (var id in userIds)
            {
                var list = new List<string>();

                var userName = (
                from users in _db.Users
                where users.Id == id
                select users.UserName
                ).FirstOrDefault();

                var streamer = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 7
                    select souscription.Streamer
                    ).FirstOrDefault();

                var token = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 7
                    select souscription.FbToken
                    ).FirstOrDefault();

                list.Add(streamer);
                list.Add(token);

                mails.Add(userName, list);
            }

            foreach (var pair in mails)
            {
                /*Calling API http://twitch/api */
                string apiKey = "wi4v1bglz74mehi3fo02mlx2cdu70y";
                HttpWebRequest apiRequest = WebRequest.Create("https://api.twitch.tv/kraken/streams/" + pair.Value[0] + "?client_id=" + apiKey) as HttpWebRequest;

                string apiResponse = "";
                using (HttpWebResponse response = apiRequest.GetResponse() as HttpWebResponse)
                {
                    StreamReader reader = new StreamReader(response.GetResponseStream());
                    apiResponse = reader.ReadToEnd();
                }
                /*End*/

                /*http://json2csharp.com*/
                TwitchResponse rootObject = JsonConvert.DeserializeObject<TwitchResponse>(apiResponse);

                if (rootObject.stream != null)
                {
                    var access_token = pair.Value[1];

                    var client = new FacebookClient(access_token);
                    client.Post("/me/feed", new
                    {
                        message = "The streamer " + rootObject.stream.channel.display_name + " is on live on the game " + rootObject.stream.game + " for " + rootObject.stream.viewers + " viewers\n" +
                        "clic on this link to follow " + rootObject.stream.channel.display_name + ": " + rootObject.stream.channel.url
                    });

                    return Ok(new { message = "Facebook post posted successfully", status = 200 });
                }
                else
                {
                    return BadRequest(new { message = pair.Value[1] + " is not on live", status = 400 });
                }
            }
            return BadRequest(new { message = "Facebook post not sent", status = 400 });
        }
    }
}