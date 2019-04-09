using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Area.Core.ViewModels;
using Area.Data.EntityFramework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Tweetinvi;
using static Area.Api.Helpers.TwitchHelper;
using static Area.Api.Helpers.WeatherHelper;

namespace Area.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TwitterController : ControllerBase
    {
        private readonly AreaContext _db;

        public TwitterController(AreaContext db)
        {
            _db = db;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Weather()//[FromBody]TwitterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mails = new Dictionary<string, List<string>>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 4
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
                    where souscription.UserId == id && souscription.AppletId == 4
                    select souscription.City
                    ).FirstOrDefault();

                var token = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 4
                    select souscription.TwitterToken
                    ).FirstOrDefault();

                var secret = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 4
                    select souscription.TwitterSecret
                    ).FirstOrDefault();

                list.Add(city);
                list.Add(token);
                list.Add(secret);

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

                Auth.SetUserCredentials("GchL7ZiVPOxn4S1ahVqr72tP3", "m4X3R69C5nHdSSKdAyg2TetLpTvypYwPrEYAmMd8pL8ShUYwBr", pair.Value[1], pair.Value[2]);
                var user = Tweetinvi.User.GetAuthenticatedUser();

                Console.WriteLine(user);

                var icon_url = "http://openweathermap.org/img/w/" + rootObject.weather[0].icon + ".png";
                var tweet = Tweet.PublishTweet("The weather of today in " + rootObject.name + " is: " + rootObject.weather[0].main + ", " + rootObject.weather[0].description + "\n" + icon_url);

                var timelineTweets = Timeline.GetUserTimeline(user, 5);

                foreach (var timelineTweet in timelineTweets)
                {
                    Console.WriteLine(timelineTweet);
                }
                Console.ReadKey();
                return Ok(new { message = "Tweet sent successfully", status = 200 });
            }
            return BadRequest(new { message = "Tweet not sent", status = 400 });
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
                where souscription.AppletId == 5
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
                    where souscription.UserId == id && souscription.AppletId == 5
                    select souscription.Streamer
                    ).FirstOrDefault();

                var token = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 5
                    select souscription.TwitterToken
                    ).FirstOrDefault();

                var secret = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == id && souscription.AppletId == 5
                    select souscription.TwitterSecret
                    ).FirstOrDefault();

                list.Add(streamer);
                list.Add(token);
                list.Add(secret);

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
                    Auth.SetUserCredentials("GchL7ZiVPOxn4S1ahVqr72tP3", "m4X3R69C5nHdSSKdAyg2TetLpTvypYwPrEYAmMd8pL8ShUYwBr", pair.Value[1], pair.Value[2]);
                    var user = Tweetinvi.User.GetAuthenticatedUser();

                    var tweet = Tweet.PublishTweet("The streamer " + rootObject.stream.channel.display_name + " is on live on the game " + rootObject.stream.game + " for " + rootObject.stream.viewers + " viewers\n" +
                        "clic on this link to follow " + rootObject.stream.channel.display_name + ": " + rootObject.stream.channel.url);

                    var timelineTweets = Timeline.GetUserTimeline(user, 5);

                    foreach (var timelineTweet in timelineTweets)
                    {
                        Console.WriteLine(timelineTweet);
                    }
                    Console.ReadKey();
                    return Ok(new { message = "Tweet sent successfully", status = 200 });
                }
                else
                {
                    return BadRequest(new { message = pair.Value[0] + " is not on live", status = 400 });
                }
            }
            return Ok(new { message = "Tweet sent successfully", status = 200 });
        }
    }
}