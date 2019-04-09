using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Area.Core.Models.AboutJson;

namespace Area.Api.Controllers
{
    public class AboutController : ControllerBase
    {
        public static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("No network adapters with an IPv4 address in the system!");
        }

        [HttpGet("about.json")]
        public JsonResult About()
        {
            var jsonAbout = new AboutJsonResponse();
            jsonAbout.client = new Client();
            jsonAbout.server = new Server();
            jsonAbout.server.services = new List<Service>();

            var weatherService = new Service();
            var TwitchService = new Service();
            var TwitterService = new Service();
            var FacebookService = new Service();
            var GithubService = new Service();
            var GmailService = new Service();

            var weatherAction = new Actions();
            var twitterAction = new Actions();
            var facebookAction1 = new Actions();
            var facebookAction2 = new Actions();
            var facebookAction3 = new Actions();
            var gmailAction = new Actions();

            weatherAction.name = "daily_weather_mail";
            weatherAction.description = "send daily mail of today weather";

            twitterAction.name = "daily_weather_tweet";
            twitterAction.description = "send daily tweet of today weather";

            facebookAction1.name = "daily_weather_post";
            facebookAction1.description = "send daily post of today weather";
            facebookAction2.name = "last_post_like";
            facebookAction2.description = "like the last facebook post";
            facebookAction3.name = "comment_last_post";
            facebookAction3.description = "comment the last facebook post";
            gmailAction.name = "daily_weather_mail";
            gmailAction.description = "send daily mail of today weather";

            var weatherReaction = new Reaction();
            var twitchReaction = new Reaction();
            var twitterReaction = new Reaction();
            var facebookReaction = new Reaction();
            var githubReaction1 = new Reaction();
            var githubReaction2 = new Reaction();
            var githubReaction3 = new Reaction();
            var githubReaction4 = new Reaction();
            var githubReaction5 = new Reaction();
            var githubReaction6 = new Reaction();
            var gmailReaction1 = new Reaction();
            var gmailReaction2 = new Reaction();
            var gmailReaction3 = new Reaction();
            var gmailReaction4 = new Reaction();

            weatherReaction.name = "mail_rain";
            weatherReaction.description = "send mail when it rains";
            twitchReaction.name = "online_streamer_mail";
            twitchReaction.description = "send mail when streamer is online";
            twitterReaction.name = "online_streamer_tweet";
            twitterReaction.description = "send tweet when streamer is online";
            facebookReaction.name = "online_streamer_post";
            facebookReaction.description = "send post when streamer is online";
            githubReaction1.name = "push_mail";
            githubReaction1.description = "send mail when someone pushed into repository";
            githubReaction2.name = "push_tweet";
            githubReaction2.description = "send tweet when someone pushed into repository";
            githubReaction3.name = "push_post";
            githubReaction3.description = "send post when someone pushed into repository";
            githubReaction4.name = "delete_mail";
            githubReaction4.description = "send mail when someone deleted into repository";
            githubReaction5.name = "delete_tweet";
            githubReaction5.description = "send tweet when someone deleted into repository";
            githubReaction6.name = "delete_post";
            githubReaction6.description = "send post when someone deleted into repository";
            gmailReaction1.name = "mail_rain";
            gmailReaction1.description = "send mail when it rains";
            gmailReaction2.name = "online_streamer_mail";
            gmailReaction2.description = "send mail when streamer is online";
            gmailReaction3.name = "push_mail";
            gmailReaction3.description = "send mail when someone pushed into repository";
            gmailReaction4.name = "delete_mail";
            gmailReaction4.description = "send mail when someone deleted into repository";

            weatherService.name = "openweathermap";
            TwitchService.name = "twitch";
            TwitterService.name = "twitter";
            FacebookService.name = "facebook";
            GithubService.name = "github";
            GmailService.name = "gmail";

            weatherService.actions = new List<Actions>();
            TwitterService.actions = new List<Actions>();
            FacebookService.actions = new List<Actions>();
            GmailService.actions = new List<Actions>();

            weatherService.reactions = new List<Reaction>();
            TwitchService.reactions = new List<Reaction>();
            TwitterService.reactions = new List<Reaction>();
            FacebookService.reactions = new List<Reaction>();
            GithubService.reactions = new List<Reaction>();
            GmailService.reactions = new List<Reaction>();

            weatherService.actions.Add(weatherAction);
            TwitterService.actions.Add(twitterAction);
            FacebookService.actions.Add(facebookAction1);
            FacebookService.actions.Add(facebookAction2);
            FacebookService.actions.Add(facebookAction3);
            GmailService.actions.Add(gmailAction);

            weatherService.reactions.Add(weatherReaction);
            TwitchService.reactions.Add(twitchReaction);
            TwitterService.reactions.Add(twitterReaction);
            FacebookService.reactions.Add(facebookReaction);
            GithubService.reactions.Add(githubReaction1);
            GithubService.reactions.Add(githubReaction2);
            GithubService.reactions.Add(githubReaction3);
            GithubService.reactions.Add(githubReaction4);
            GithubService.reactions.Add(githubReaction5);
            GithubService.reactions.Add(githubReaction6);
            GmailService.reactions.Add(gmailReaction1);
            GmailService.reactions.Add(gmailReaction2);
            GmailService.reactions.Add(gmailReaction3);
            GmailService.reactions.Add(gmailReaction4);

            jsonAbout.client.host = GetLocalIPAddress();
            jsonAbout.server.current_time = Convert.ToInt32(DateTimeOffset.UtcNow.ToUnixTimeSeconds());

            jsonAbout.server.services.Add(weatherService);
            jsonAbout.server.services.Add(TwitchService);
            jsonAbout.server.services.Add(TwitterService);
            jsonAbout.server.services.Add(FacebookService);
            jsonAbout.server.services.Add(GithubService);
            jsonAbout.server.services.Add(GmailService);

            return new JsonResult(jsonAbout);
        }
    }
}