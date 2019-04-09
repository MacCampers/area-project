using Facebook;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Area.Api
{
    public class FacebookFunctions
    {
        public FacebookFunctions()
        {
        }

        /// <summary>
        /// Replies the comment.
        /// </summary>
        /// <returns>The comment.</returns>
        /// <param name="access_token">Access token.</param>
        /// <param name="objectId">Object identifier.</param>
        /// <param name="message">Message.</param>
        /// <param name="link">Link.</param>
        public dynamic replyComment(string access_token, string objectId, string message, string link)
        {
            var _fb = new FacebookClient(access_token);

            string postComment = "/" + objectId + "/comments";

            dynamic parameters = new ExpandoObject();

            if (message != null && !message.Trim().Equals(""))
                parameters.message = message;

            if (link != null && !link.Equals(""))
            {
                parameters.attachment_url = link;
            }

            dynamic result = null;

            result = _fb.Post(postComment, parameters);

            return result;
        }

        public void likeObject(string access_token, string objectId)
        {
            var fb = new FacebookClient(access_token);

            dynamic result = fb.Post("/" + objectId + "/likes", null);

        }
    }
}
