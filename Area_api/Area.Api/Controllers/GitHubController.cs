using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Area.Api.Helpers;
using Area.Data.EntityFramework;
using Facebook;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebHooks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Tweetinvi;

namespace Area.Api.Controllers
{
    public class GitHubController : ControllerBase
    {
        private readonly AreaContext _db;

        public GitHubController(AreaContext db)
        {
            _db = db;
        }

        [GitHubWebHook(EventName = "push", Id = "It")]
        public IActionResult HandlerForItsPushes(string[] events, JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [GitHubWebHook(Id = "It")]
        public IActionResult HandlerForIt(string[] events, JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [GitHubWebHook(EventName = "push")]
        public IActionResult HandlerForPush(string id, JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mails = new Dictionary<string, List<string>>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 9
                select souscription.UserId
                ).ToList();

            foreach (var ids in userIds)
            {
                var list = new List<string>();

                var userName = (
                from users in _db.Users
                where users.Id == ids
                select users.UserName
                ).FirstOrDefault();

                var token = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == ids && souscription.AppletId == 9
                    select souscription.TwitterToken
                    ).FirstOrDefault();

                var secret = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == ids && souscription.AppletId == 9
                    select souscription.TwitterSecret
                    ).FirstOrDefault();

                list.Add(token);
                list.Add(secret);

                mails.Add(userName, list);
            }

            foreach (var pair in mails)
            {
                Auth.SetUserCredentials("GchL7ZiVPOxn4S1ahVqr72tP3", "m4X3R69C5nHdSSKdAyg2TetLpTvypYwPrEYAmMd8pL8ShUYwBr", pair.Value[0], pair.Value[1]);
                var user = Tweetinvi.User.GetAuthenticatedUser();

                System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
                dtDateTime = dtDateTime.AddSeconds(Convert.ToDouble(data["repository"]["pushed_at"].ToString())).ToLocalTime();

                var tweet = Tweet.PublishTweet(data["pusher"]["name"].ToString() + " Pushed into the repository: " + data["repository"]["name"].ToString() + " at " + dtDateTime + "\n Commit message: " + data["head_commit"]["message"].ToString() + "\n"
                    + data["repository"]["html_url"].ToString());

                var timelineTweets = Timeline.GetUserTimeline(user, 5);
            }

            List<string> Mails = new List<string>();

            var userIdss = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 8
                select souscription.UserId
                ).ToList();

            foreach (var ids in userIdss)
            {
                var userName = (
                from user in _db.Users
                where user.Id == ids
                select user.UserName
                ).FirstOrDefault();

                Mails.Add(userName);
            }

            foreach (var mail in Mails)
            {
                SmtpClient client = new SmtpClient("smtp.gmail.com");
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("oibwankenobi238@gmail.com", "Starkiller75");

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("benoit.bouton@epitech.eu");
                mailMessage.To.Add(mail);
                mailMessage.Body = (
                    $"<h1 style=\"text-align: center;\">{data["pusher"]["name"].ToString()} Pushed into the repository: {data["repository"]["name"].ToString()}</h1>" +
                    $"<p style=\"text-align: center;\">{data["repository"]["html_url"].ToString()}</p>" +
                    $"<img style=\"text-align: center;\" src=\"{data["sender"]["avatar_url"].ToString()}\" />"
                    );
                mailMessage.IsBodyHtml = true;
                mailMessage.Subject = data["pusher"]["name"].ToString() + " vient de push dans le repository";
                client.Send(mailMessage);
            }

            var mails1 = new Dictionary<string, string>();

            var userIds1 = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 10
                select souscription.UserId
                ).ToList();

            foreach (var ids in userIds1)
            {
                var userName = (
                from users in _db.Users
                where users.Id == ids
                select users.UserName
                ).FirstOrDefault();

                var token = (
                    from souscription in _db.Souscriptions
                    where souscription.UserId == ids && souscription.AppletId == 10
                    select souscription.FbToken
                    ).FirstOrDefault();

                mails1.Add(userName, token);
            }

            foreach (var pair in mails1)
            {
                var access_token = pair.Value;

                var client = new FacebookClient(access_token);

                System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
                dtDateTime = dtDateTime.AddSeconds(Convert.ToDouble(data["repository"]["pushed_at"].ToString())).ToLocalTime();

                client.Post("/me/feed", new
                {
                    message = data["pusher"]["name"].ToString() + " Pushed into the repository: " + data["repository"]["name"].ToString() + " at " + dtDateTime + "\n Commit message: " + data["head_commit"]["message"].ToString() + "\n"
                    + data["repository"]["html_url"].ToString()
                });

                return Ok(new { message = "Facebook post sent and Tweet sent", status = 200 });
            }
            return BadRequest(new { message = "Facebook post not sent and Tweet not sent", status = 400 });
        }

        [GitHubWebHook(EventName = "repository")]
        public IActionResult HandlerForRepository(string[] events, JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (data["action"].ToString() == "deleted")
            {
                var mails = new Dictionary<string, List<string>>();

                var userIds = (
                    from souscription in _db.Souscriptions
                    where souscription.AppletId == 11
                    select souscription.UserId
                    ).ToList();

                foreach (var ids in userIds)
                {
                    var list = new List<string>();

                    var userName = (
                    from users in _db.Users
                    where users.Id == ids
                    select users.UserName
                    ).FirstOrDefault();

                    var token = (
                        from souscription in _db.Souscriptions
                        where souscription.UserId == ids && souscription.AppletId == 11
                        select souscription.TwitterToken
                        ).FirstOrDefault();

                    var secret = (
                        from souscription in _db.Souscriptions
                        where souscription.UserId == ids && souscription.AppletId == 11
                        select souscription.TwitterSecret
                        ).FirstOrDefault();

                    list.Add(token);
                    list.Add(secret);

                    mails.Add(userName, list);
                }

                foreach (var pair in mails)
                {
                    Auth.SetUserCredentials("GchL7ZiVPOxn4S1ahVqr72tP3", "m4X3R69C5nHdSSKdAyg2TetLpTvypYwPrEYAmMd8pL8ShUYwBr", pair.Value[0], pair.Value[1]);
                    var user = Tweetinvi.User.GetAuthenticatedUser();

                    var tweet = Tweet.PublishTweet(data["sender"]["login"].ToString() + " deleted the repository: " + data["repository"]["name"].ToString() + "\n"
                        + data["repository"]["url"].ToString());

                    var timelineTweets = Timeline.GetUserTimeline(user, 5);
                }

                List<string> Mails = new List<string>();

                var userIdss = (
                    from souscription in _db.Souscriptions
                    where souscription.AppletId == 15
                    select souscription.UserId
                    ).ToList();

                foreach (var ids in userIdss)
                {
                    var userName = (
                    from user in _db.Users
                    where user.Id == ids
                    select user.UserName
                    ).FirstOrDefault();

                    Mails.Add(userName);
                }

                foreach (var mail in Mails)
                {
                        SmtpClient client = new SmtpClient("smtp.gmail.com");
                        client.EnableSsl = true;
                        client.UseDefaultCredentials = false;
                        client.Credentials = new NetworkCredential("oibwankenobi238@gmail.com", "Starkiller75");

                        MailMessage mailMessage = new MailMessage();
                        mailMessage.From = new MailAddress("benoit.bouton@epitech.eu");
                        mailMessage.To.Add(mail);
                        mailMessage.Body = (
                            $"<h1 style=\"text-align: center;\">{data["sender"]["login"].ToString()} deleted the repository: {data["repository"]["name"].ToString()}</h1>" +
                            $"<p style=\"text-align: center;\">{data["repository"]["url"].ToString()}</p>"
                            );
                        mailMessage.IsBodyHtml = true;
                        mailMessage.Subject = data["sender"]["login"].ToString() + " vient de supprimer un repository";
                        client.Send(mailMessage);
                }

                var mails1 = new Dictionary<string, string>();

                var userIds1 = (
                    from souscription in _db.Souscriptions
                    where souscription.AppletId == 12
                    select souscription.UserId
                    ).ToList();

                foreach (var ids in userIds1)
                {
                    var userName = (
                    from users in _db.Users
                    where users.Id == ids
                    select users.UserName
                    ).FirstOrDefault();

                    var token = (
                        from souscription in _db.Souscriptions
                        where souscription.UserId == ids && souscription.AppletId == 12
                        select souscription.FbToken
                        ).FirstOrDefault();

                    mails1.Add(userName, token);
                }

                foreach (var pair in mails1)
                {
                    var access_token = pair.Value;

                    var client = new FacebookClient(access_token);

                    client.Post("/me/feed", new
                    {
                        message = data["sender"]["login"].ToString() + " deleted the repository: " + data["repository"]["name"].ToString() + "\n"
                        + data["repository"]["url"].ToString()
                    });

                    return Ok(new { message = "Facebook post sent and Tweet sent", status = 200 });
                }
                return BadRequest(new { message = "Facebook post not sent and Tweet not sent", status = 400 });
            }

            return Ok();
        }

        /*[GitHubWebHook(EventName = "repository")]
        public IActionResult HandlerForPushMail(string id, JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<string> Mails = new List<string>();

            var userIds = (
                from souscription in _db.Souscriptions
                where souscription.AppletId == 15
                select souscription.UserId
                ).ToList();

            foreach (var ids in userIds)
            {
                var userName = (
                from user in _db.Users
                where user.Id == ids
                select user.UserName
                ).FirstOrDefault();

                Mails.Add(userName);
            }

            foreach(var mail in Mails)
            {
                try
                {
                    SmtpClient client = new SmtpClient("smtp.gmail.com");
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("oibwankenobi238@gmail.com", "Starkiller75");

                    MailMessage mailMessage = new MailMessage();
                    mailMessage.From = new MailAddress("benoit.bouton@epitech.eu");
                    mailMessage.To.Add(mail);
                    mailMessage.Body = (
                        $"<h1 style=\"text-align: center;\">{data["pusher"]["name"].ToString()} Pushed into the repository: {data["repository"]["name"].ToString()}</h1>" +
                        $"<p style=\"text-align: center;\">{data["repository"]["html_url"].ToString()}</p>" +
                        $"<img style=\"text-align: center;\" src=\"{data["sender"]["avatar_url"].ToString()}\" />"
                        );
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Subject = data["pusher"]["name"].ToString() + " vient de push dans le repository";
                    client.Send(mailMessage);
                }
                catch (SmtpFailedRecipientException ex)
                {
                    return BadRequest(ex);
                }
            }
            return Ok();
        }*/

        [GitHubWebHook]
        public IActionResult GitHubHandler(string id, string @event, JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [GeneralWebHook]
        public IActionResult FallbackHandler(string receiverName, string id, string eventName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok();
        }
    }
}