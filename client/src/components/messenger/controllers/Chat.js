export const ChatController = {
    getMessages: async (token, conversationId) => {
        if (conversationId) {
            // make request for the messages of conversationid and wait for the json response
            const data = await (await fetch("/api/messages/" + conversationId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })).json();
            // get the list of messages if successful
            return data ? data.messages : [];
        } else
            return [];
    },
    evaluateElapsed: sent => {
        // convert timestamp into an elapsed message
        let diff = Date.now() - (new Date(sent)).getTime();
        let min = 60 * 1000;
        if (diff < min)
            return "Less than a min ago";
        else if (diff < 60 * min) {
            let mins = Math.floor(diff / 60 / 1000);
            return mins + " min" + (mins !== 1 ? "s" : "") + " ago";
        } else if (diff <  60 * min * 24) {
            let hrs = Math.floor(diff / 60 / 60 / 1000);
            return hrs + " hr" + (hrs !== 1 ? "s" : "") + " ago";
        } else {
            let days = Math.floor(diff / 24 / 60 / 60 / 1000);
            return days + " day" + (days !== 1 ? "s" : "") + " ago";
        }
    }
};