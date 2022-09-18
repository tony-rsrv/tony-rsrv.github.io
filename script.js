/* Helpful information:

Clips
	Endpoint: https://api.twitch.tv/kraken/clips/ReliableSplendidInternPogChamp?on_site=1&api_version=5
	Exmpample Clip: https://clips.twitch.tv/ReliableSplendidInternPogChamp
	Missing thumbnail: https://clips-media-assets.twitch.tv/404-preview-86x45.jpg
	Broken thumbnail: https://clips-media-assets.twitch.tv/vod-153090723-offset-1928.5-60-preview-1920x1080.jpg

*/


const params = new URLSearchParams(window.location.search);
const chatchannel = params.get('channel') || ['bikeyboygang'];
console.log(chatchannel);

const chatEle = document.getElementById('chat');
const twitchBadgeCache = {
  data: { 
    global: {} } };

let channelBadges = {
  "bits": {
  "versions": {
  "1": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/51f978a3-64c8-4130-b63a-816505ec2eb2/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/51f978a3-64c8-4130-b63a-816505ec2eb2/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/51f978a3-64c8-4130-b63a-816505ec2eb2/3",
  "description": "cheer 1",
  "title": "cheer 1",
  "click_action": "visit_url",
  "click_url": "https://blog.twitch.tv/introducing-cheering-celebrate-together-da62af41fac6",
  "last_updated": "2022-06-29T00:31:00Z"
  },
  "100": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/7f07fec9-e796-4d7c-b2e1-2756d2aa6987/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/7f07fec9-e796-4d7c-b2e1-2756d2aa6987/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/7f07fec9-e796-4d7c-b2e1-2756d2aa6987/3",
  "description": "cheer 100",
  "title": "cheer 100",
  "click_action": "visit_url",
  "click_url": "https://blog.twitch.tv/introducing-cheering-celebrate-together-da62af41fac6",
  "last_updated": "2022-06-29T00:31:30Z"
  },
  "1000": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/7de95e3d-b209-42de-af89-db7f245d1d7d/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/7de95e3d-b209-42de-af89-db7f245d1d7d/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/7de95e3d-b209-42de-af89-db7f245d1d7d/3",
  "description": "cheer 1000",
  "title": "cheer 1000",
  "click_action": "visit_url",
  "click_url": "https://blog.twitch.tv/introducing-cheering-celebrate-together-da62af41fac6",
  "last_updated": "2022-06-29T00:31:43Z"
  },
  "5000": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/8da41526-dbcf-41f7-b2b4-21eb1e412287/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/8da41526-dbcf-41f7-b2b4-21eb1e412287/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/8da41526-dbcf-41f7-b2b4-21eb1e412287/3",
  "description": "cheer 5000",
  "title": "cheer 5000",
  "click_action": "visit_url",
  "click_url": "https://blog.twitch.tv/introducing-cheering-celebrate-together-da62af41fac6",
  "last_updated": "2022-06-29T00:32:00Z"
  },
  "10000": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/042c31e3-ffd4-49ca-89b2-0ec406090030/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/042c31e3-ffd4-49ca-89b2-0ec406090030/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/042c31e3-ffd4-49ca-89b2-0ec406090030/3",
  "description": "cheer 10000",
  "title": "cheer 10000",
  "click_action": "visit_url",
  "click_url": "https://blog.twitch.tv/introducing-cheering-celebrate-together-da62af41fac6",
  "last_updated": "2022-06-29T00:32:16Z"
  },
  "25000": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/b28b0b24-2bd6-4556-bd61-d1671b81b6fb/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/b28b0b24-2bd6-4556-bd61-d1671b81b6fb/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/b28b0b24-2bd6-4556-bd61-d1671b81b6fb/3",
  "description": "cheer 25000",
  "title": "cheer 25000",
  "click_action": "visit_url",
  "click_url": "https://blog.twitch.tv/introducing-cheering-celebrate-together-da62af41fac6",
  "last_updated": "2022-06-29T00:32:27Z"
  }
  }
  },
  "subscriber": {
  "versions": {
  "0": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/753a6fa8-9b2c-43e7-99d6-f8de090c563a/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/753a6fa8-9b2c-43e7-99d6-f8de090c563a/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/753a6fa8-9b2c-43e7-99d6-f8de090c563a/3",
  "description": "Subscriber",
  "title": "Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "2": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/6111ed30-0adb-4f98-9887-0e3353d52f0c/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/6111ed30-0adb-4f98-9887-0e3353d52f0c/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/6111ed30-0adb-4f98-9887-0e3353d52f0c/3",
  "description": "2-Month Subscriber",
  "title": "2-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "3": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/0a020a3d-4bb3-4cff-8a51-b0e58fb31f84/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/0a020a3d-4bb3-4cff-8a51-b0e58fb31f84/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/0a020a3d-4bb3-4cff-8a51-b0e58fb31f84/3",
  "description": "3-Month Subscriber",
  "title": "3-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "6": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/968dea8f-3f07-4b59-ab4b-2a8ae3e2ca91/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/968dea8f-3f07-4b59-ab4b-2a8ae3e2ca91/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/968dea8f-3f07-4b59-ab4b-2a8ae3e2ca91/3",
  "description": "6-Month Subscriber",
  "title": "6-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "9": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/989322aa-fa34-4d24-b738-5b659078135a/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/989322aa-fa34-4d24-b738-5b659078135a/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/989322aa-fa34-4d24-b738-5b659078135a/3",
  "description": "9-Month Subscriber",
  "title": "9-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "12": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/d1e756fc-df99-4c85-9734-44caa0b3b8d1/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/d1e756fc-df99-4c85-9734-44caa0b3b8d1/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/d1e756fc-df99-4c85-9734-44caa0b3b8d1/3",
  "description": "1-Year Subscriber",
  "title": "1-Year Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "18": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/54940728-6051-4b99-898f-ed46181bb277/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/54940728-6051-4b99-898f-ed46181bb277/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/54940728-6051-4b99-898f-ed46181bb277/3",
  "description": "1.5-Year Subscriber",
  "title": "1.5-Year Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "2000": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/0cd1e882-cd52-4bfd-bb47-a08d93715e17/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/0cd1e882-cd52-4bfd-bb47-a08d93715e17/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/0cd1e882-cd52-4bfd-bb47-a08d93715e17/3",
  "description": "Subscriber",
  "title": "Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "2002": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/0c7d6b28-efea-4fd0-9aeb-e6291807a312/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/0c7d6b28-efea-4fd0-9aeb-e6291807a312/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/0c7d6b28-efea-4fd0-9aeb-e6291807a312/3",
  "description": "2-Month Subscriber",
  "title": "2-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "2003": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/c1557d84-ed69-48e1-9798-2322d3fe5701/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/c1557d84-ed69-48e1-9798-2322d3fe5701/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/c1557d84-ed69-48e1-9798-2322d3fe5701/3",
  "description": "3-Month Subscriber",
  "title": "3-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "2006": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/ac3d7ecb-76ac-42ee-ad88-d1f40b267942/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/ac3d7ecb-76ac-42ee-ad88-d1f40b267942/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/ac3d7ecb-76ac-42ee-ad88-d1f40b267942/3",
  "description": "6-Month Subscriber",
  "title": "6-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "2009": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/40df26cc-4596-4164-af2a-30a302533cba/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/40df26cc-4596-4164-af2a-30a302533cba/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/40df26cc-4596-4164-af2a-30a302533cba/3",
  "description": "9-Month Subscriber",
  "title": "9-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "2012": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/d67f764b-fa1f-4ac4-8a9d-5950cf54845a/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/d67f764b-fa1f-4ac4-8a9d-5950cf54845a/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/d67f764b-fa1f-4ac4-8a9d-5950cf54845a/3",
  "description": "1-Year Subscriber",
  "title": "1-Year Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "2018": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/74cc1df2-2ea9-44d3-a4cc-3b09847db52c/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/74cc1df2-2ea9-44d3-a4cc-3b09847db52c/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/74cc1df2-2ea9-44d3-a4cc-3b09847db52c/3",
  "description": "1.5-Year Subscriber",
  "title": "1.5-Year Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "3000": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/e132f5db-78c6-48d6-9cfd-9f5b77d720c5/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/e132f5db-78c6-48d6-9cfd-9f5b77d720c5/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/e132f5db-78c6-48d6-9cfd-9f5b77d720c5/3",
  "description": "Subscriber",
  "title": "Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "3002": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/8f901b6b-8e8c-4116-876d-dca570d78453/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/8f901b6b-8e8c-4116-876d-dca570d78453/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/8f901b6b-8e8c-4116-876d-dca570d78453/3",
  "description": "2-Month Subscriber",
  "title": "2-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "3003": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/43aab7c6-6e97-4664-b1e7-f052368cd224/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/43aab7c6-6e97-4664-b1e7-f052368cd224/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/43aab7c6-6e97-4664-b1e7-f052368cd224/3",
  "description": "3-Month Subscriber",
  "title": "3-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "3006": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/ee173da4-0170-49df-92c1-0c500fb03d30/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/ee173da4-0170-49df-92c1-0c500fb03d30/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/ee173da4-0170-49df-92c1-0c500fb03d30/3",
  "description": "6-Month Subscriber",
  "title": "6-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "3009": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/f0295db6-1057-43f2-8028-5b8c7b6e04df/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/f0295db6-1057-43f2-8028-5b8c7b6e04df/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/f0295db6-1057-43f2-8028-5b8c7b6e04df/3",
  "description": "9-Month Subscriber",
  "title": "9-Month Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "3012": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/e7474819-665f-4be7-bace-52574041507c/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/e7474819-665f-4be7-bace-52574041507c/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/e7474819-665f-4be7-bace-52574041507c/3",
  "description": "1-Year Subscriber",
  "title": "1-Year Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  },
  "3018": {
  "image_url_1x": "https://static-cdn.jtvnw.net/badges/v1/395162be-6f21-4aaa-b7a9-32318cfebef1/1",
  "image_url_2x": "https://static-cdn.jtvnw.net/badges/v1/395162be-6f21-4aaa-b7a9-32318cfebef1/2",
  "image_url_4x": "https://static-cdn.jtvnw.net/badges/v1/395162be-6f21-4aaa-b7a9-32318cfebef1/3",
  "description": "1.5-Year Subscriber",
  "title": "1.5-Year Subscriber",
  "click_action": "subscribe_to_channel",
  "click_url": "",
  "last_updated": null
  }
  }
  }
  };

const bttvEmoteCache = {
  lastUpdated: 0,
  data: { global: [] },
  urlTemplate: '//cdn.betterttv.net/emote/{{id}}/{{image}}' };


const krakenBase = 'https://api.twitch.tv/kraken/';
const krakenClientID = '4g5an0yjebpf93392k4c5zll7d7xcec';

const chatFilters = [
// '\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF', // Partial Latin-1 Supplement
// '\u0100-\u017F', // Latin Extended-A
// '\u0180-\u024F', // Latin Extended-B
'\u0250-\u02AF', // IPA Extensions
'\u02B0-\u02FF', // Spacing Modifier Letters
'\u0300-\u036F', // Combining Diacritical Marks
'\u0370-\u03FF', // Greek and Coptic
'\u0400-\u04FF', // Cyrillic
'\u0500-\u052F', // Cyrillic Supplement
'\u0530-\u1FFF', // Bunch of non-English
'\u2100-\u214F', // Letter Like
'\u2500-\u257F', // Box Drawing
'\u2580-\u259F', // Block Elements
'\u25A0-\u25FF', // Geometric Shapes
'\u2600-\u26FF', // Miscellaneous Symbols
// '\u2700-\u27BF', // Dingbats
'\u2800-\u28FF' // Braille
// '\u2C60-\u2C7F', // Latin Extended-C
];
const chatFilter = new RegExp(`[${chatFilters.join('')}]`);

const userColors = {};

let client;
let testing = false;

if (testing) {
  kraken({
    endpoint: 'streams',
    qs: {
      limit: 10,
      language: 'en' } }).


  then(({ streams }) => {
    client = new tmi.client({
      // options: { debug: true },
      connection: {
        reconnect: true,
        secure: true },

      channels: chatchannel
      //channels: [ 'geocym','VRFlad','Casual_ObserVR','lyfesaver74' ],
      //channels: streams.map(n => n.channel.name)
    });
    addListeners();
    client.connect();
  });
} else
{
  client = new tmi.client({
    // options: { debug: true },
    connection: {
      reconnect: true,
      secure: true },

    channels: [chatchannel] });

  addListeners();
  client.connect();
}

function addListeners() {
  client.on('connecting', () => {
    showAdminMessage({
      message: 'Connecting...',
      attribs: { subtype: 'connecting' } });

    removeAdminChatLine({ subtype: 'disconnected' });
  });

  client.on('connected', () => {
    getBTTVEmotes();
    getBadges().
    then(badges => twitchBadgeCache.data.global = badges);
    showAdminMessage({
      message: 'Connected...',
      attribs: { subtype: 'connected' },
      timeout: 5000 });

    removeAdminChatLine({ subtype: 'connecting' });
    removeAdminChatLine({ subtype: 'disconnected' });
  });

  client.on('disconnected', () => {
    twitchBadgeCache.data = { global: {} };
    bttvEmoteCache.data = { global: [] };
    showAdminMessage({
      message: 'Disconnected...',
      attribs: { subtype: 'disconnected' } });

    removeAdminChatLine({ subtype: 'connecting' });
    removeAdminChatLine({ subtype: 'connected' });
  });

  function handleMessage(channel, userstate, message, fromSelf) {
    if (chatFilter.test(message)) {
      testing && console.log(message);
      return;
    }

    let chan = getChan(channel);
    let name = userstate['display-name'] || userstate.username;
    if (/[^\w]/g.test(name)) {
      name += ` (${userstate.username})`;
    }
    userstate.name = name;
    showMessage({ chan, type: 'chat', message, data: userstate });
  }
  function handleRaid(channel, username, viewers) {
    if(username && viewers == true) {
      console.log(viewers);
      showMessage({ type: 'alert', message: username + ' has raided with 1 viewer!' });
    }
    if (username && !viewers == true) {
      showMessage({ type: 'alert', message: username + ' has raided with ' + viewers.toString() + ' viewers!' });
    }
  }
  function handleResub(channel, username, months, message, userstate, methods) {
    let subTier = methods.plan;
    if (subTier == 1000) {
      subTier = '1';
    }
    if (subTier == 2000) {
      subTier = '2';
    }
    if (subTier == 3000) {
      subTier = '3';
    }
    let chatMessage = username + " has resubscribed at Tier " + subTier + " for " + userstate["msg-param-cumulative-months"] + " months";
    if (subTier == "Prime") {
      chatMessage = username + " has resubscribed with Prime for " + userstate["msg-param-cumulative-months"] + " months";
    }
    if (!message == null) {
      chatMessage = chatMessage + ": " + message
    }
    showMessage({ type: 'alert', message: chatMessage });
  }
  function handleSub (channel, username, method, message, userstate) {
    let subTier = method.plan;
    if (subTier == 1000) {
      subTier = '1';
    }
    if (subTier == 2000) {
      subTier = '2';
    }
    if (subTier == 3000) {
      subTier = '3';
    }
    let chatMessage = username + " has subscribed at Tier " + subTier;
    if (subTier == "Prime") {
      chatMessage = username + " has subscribed with Prime";
    }
    if (!message == null) {
      chatMessage = chatMessage + ": " + message;
    }
    showMessage({ type: 'alert', message: chatMessage });
  }
  function handleSubGift (channel, username, streakMonths, recipient, methods, userstate) {
    console.log(methods);
    let subTier = methods.plan;
    if (subTier == 1000) {
      subTier = '1';
    }
    if (subTier == 2000) {
      subTier = '2';
    }
    if (subTier == 3000) {
      subTier = '3';
    }
    let chatMessage = username + " has gifted a Tier " + subTier + " subscription to " + recipient;
    if(userstate["msg-param-sender-count"]) {
      chatMessage = chatMessage + ". They have gifted " + userstate["msg-param-sender-count"] + " in the channel."
    }
    showMessage({ type: 'alert', message: chatMessage });
  }
  function handleAnonUpgrade (channel, username, userstate) {
    let chatMessage = username + " is continuing the Gift Sub they got from an anonymous user";
    showMessage({ type: 'alert', message: chatMessage });
  }
  function handleUpgrade (channel, username, sender, userstate) {
    let chatMessage = username + " is continuing the Gift Sub they got from " + sender;
    showMessage({ type: 'alert', message: chatMessage });
  }
  function handleCheer(channel, userstate, message, fromSelf) {
    if (chatFilter.test(message)) {
      testing && console.log(message);
      return;
    }

    let chan = getChan(channel);
    let name = userstate['display-name'] || userstate.username;
    if (/[^\w]/g.test(name)) {
      name += ` (${userstate.username})`;
    }
    userstate.name = name;
    showMessage({ chan, type: 'chat', message: message + userstate.bits, data: userstate });
  }


  client.on('message', handleMessage);
  client.on('cheer', handleCheer);
  client.on('raided', handleRaid);
  client.on('resub', handleResub);
  client.on('subscription', handleSub);
  client.on('subgift', handleSubGift);
  client.on('anongiftpaidupgrade', handleAnonUpgrade);
  client.on('giftpaidupgrade', handleUpgrade);

  client.on('join', (channel, username, self) => {
    if (!self) {
      return;
    }
    let chan = getChan(channel);
    getBTTVEmotes(chan);
    twitchNameToUser(chan).
    then(user => getBadges(user._id)).
    then(badges => twitchBadgeCache.data[chan] = channelBadges);
    showAdminMessage({
      message: `Joined ${chan}`,
      timeout: 1000 });

  });

  client.on('part', (channel, username, self) => {
    if (!self) {
      return;
    }
    let chan = getChan(channel);
    delete bttvEmoteCache.data[chan];
    showAdminMessage({
      message: `Parted ${chan}`,
      timeout: 1000 });

  });

  client.on('clearchat', channel => {
    removeChatLine({ channel });
  });

  client.on('timeout', (channel, username) => {
    removeChatLine({ channel, username });
  });
}

function removeChatLine(params = {}) {
  if ('channel' in params) {
    params.channel = getChan(params.channel);
  }
  let search = Object.keys(params).
  map(key => `[${key}="${params[key]}"]`).
  join('');
  chatEle.querySelectorAll(search).
  forEach(n => chatEle.removeChild(n));
}

function removeAdminChatLine(params = {}) {
  params.type = 'admin';
  removeChatLine(params);
}

function showAdminMessage(opts) {
  opts.type = 'admin';
  if ('attribs' in opts === false) {
    opts.attribs = {};
  }
  opts.attribs.type = 'admin';
  return showMessage(opts);
}

function getChan(channel = '') {
  return channel.replace(/^#/, '');
}

function showMessage({ chan, type, message = '', data = {}, timeout = 0, attribs = {} } = {}) {
  let chatLine_ = document.createElement('div');
  let chatLine = document.createElement('div');
  chatLine_.classList.add('chat-line');
  chatLine.classList.add('chat-line-inner');
  chatLine_.appendChild(chatLine);

  if (chan) {
    chatLine_.setAttribute('channel', chan);
  }

  Object.keys(attribs).
  forEach(key => {
    chatLine_.setAttribute(key, attribs[key]);
  });

  if (type === 'chat') {
    'id' in data && chatLine_.setAttribute('message-id', data.id);
    'user-id' in data && chatLine_.setAttribute('user-id', data['user-id']);
    'room-id' in data && chatLine_.setAttribute('channel-id', data['room-id']);
    'username' in data && chatLine_.setAttribute('username', data.username);

    let spaceEle = document.createElement('span');
    spaceEle.innerText = ' ';
    let badgeEle = document.createElement('span');
    if ('badges' in data && data.badges !== null) {
      badgeEle.classList.add('badges');
      let badgeGroup = Object.assign({}, twitchBadgeCache.data.global, twitchBadgeCache.data[chan] || {});
      let badges = Object.keys(data.badges).
      forEach(type => {
        let version = data.badges[type];
        let group = badgeGroup[type];
        if (group && version in group.versions) {
          let url = group.versions[version].image_url_1x;
          let ele = document.createElement('img');
          ele.setAttribute('src', url);
          ele.setAttribute('badgeType', type);
          ele.setAttribute('alt', type);
          ele.classList.add('badge');
          badgeEle.appendChild(ele);
        }
      }, []);
    }

    let nameEle = document.createElement('span');
    nameEle.classList.add('user-name');
    nameEle.innerText = data.name;
    if (!userColors[data.name]) {
      userColors[data.name] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    if (typeof data.color == 'string') {
    nameEle.style.color = data.color;
    console.log(data.color);
    } else {
      nameEle.style.color = userColors[data.name];
    }

    let colonEle = document.createElement('span');
    colonEle.classList.add('message-colon');
    colonEle.innerText = ': ';

    let messageEle = document.createElement('span');
    messageEle.classList.add('message');

    let finalMessage = handleEmotes(chan, data.emotes || {}, message);
    addEmoteDOM(messageEle, finalMessage);

    chatLine.appendChild(badgeEle);
    chatLine.appendChild(spaceEle);
    chatLine.appendChild(nameEle);
    chatLine.appendChild(colonEle);
    chatLine.appendChild(messageEle);
  } else
  if (type === 'admin') {
    chatLine_.classList.add('admin');

    let messageEle = document.createElement('span');
    messageEle.classList.add('message');
    messageEle.innerText = message;

    chatLine.appendChild(messageEle);
  } else
  if (type === 'alert') {
    chatLine_.classList.add('alert');

    let messageEle = document.createElement('span');
    messageEle.classList.add('message');
    messageEle.innerText = message;

    chatLine.appendChild(messageEle);
  }

  chatEle.appendChild(chatLine_);

  setTimeout(() => chatLine_.classList.add('visible'), 100);

  if (chatEle.childElementCount > 150) {
    chatEle.removeChild(chatEle.children[0]);
  }

  if (timeout) {
    setTimeout(() => {
      if (chatLine_.parentElement) {
        chatLine_.classList.remove('visible');
        setTimeout(() => chatEle.removeChild(chatLine_), 1000);
      }
    }, timeout);
  }
  setTimeout(() => window.scrollTo(0,document.body.scrollHeight + 10000), 200);
}

function handleEmotes(channel, emotes, message) {
  // let messageParts = message.split(' ');
  let bttvEmotes = bttvEmoteCache.data.global.slice(0);
  if (channel in bttvEmoteCache.data) {
    bttvEmotes = bttvEmotes.concat(bttvEmoteCache.data[channel]);
  }
  let twitchEmoteKeys = Object.keys(emotes);
  let allEmotes = twitchEmoteKeys.reduce((p, id) => {
    let emoteData = emotes[id].map(n => {
      let [a, b] = n.split('-');
      let start = +a;
      let end = +b + 1;
      return {
        start,
        end,
        id,
        code: message.slice(start, end),
        type: ['twitch', 'emote'] };

    });
    return p.concat(emoteData);
  }, []);
  bttvEmotes.forEach(({ code, id, type, imageType }) => {
    let hasEmote = message.indexOf(code);
    if (hasEmote === -1) {
      return;
    }
    for (let start = message.indexOf(code); start > -1; start = message.indexOf(code, start + 1)) {
      let end = start + code.length;
      allEmotes.push({ start, end, id, code, type });
    }
  });
  let seen = [];
  allEmotes = allEmotes.sort((a, b) => a.start - b.start).
  filter(({ start, end }) => {
    if (seen.length && !seen.every(n => start > n.end)) {
      return false;
    }
    seen.push({ start, end });
    return true;
  });
  if (allEmotes.length) {
    let finalMessage = [message.slice(0, allEmotes[0].start)];
    allEmotes.forEach((n, i) => {
      let p = Object.assign({}, n, { i });
      let { end } = p;
      finalMessage.push(p);
      if (i === allEmotes.length - 1) {
        finalMessage.push(message.slice(end));
      } else
      {
        finalMessage.push(message.slice(end, allEmotes[i + 1].start));
      }
      finalMessage = finalMessage.filter(n => n);
    });
    return finalMessage;
  }
  return [message];
}

function addEmoteDOM(ele, data) {
  data.forEach(n => {
    let out = null;
    if (typeof n === 'string') {
      out = document.createTextNode(n);
    } else
    {
      let { type: [type, subtype], code } = n;
      if (type === 'twitch') {
        if (subtype === 'emote') {
          out = document.createElement('img');
          out.setAttribute('src', `https://static-cdn.jtvnw.net/emoticons/v1/${n.id}/1.0`);
          out.setAttribute('alt', code);
        }
      } else
      if (type === 'bttv') {
        out = document.createElement('img');
        let url = bttvEmoteCache.urlTemplate;
        url = url.replace('{{id}}', n.id).replace('{{image}}', '1x');
        out.setAttribute('src', 'https:' + url);
      }
    }

    if (out) {
      ele.appendChild(out);
    }
  });
  twemoji.parse(ele);
}

function formQuerystring(qs = {}) {
  return Object.keys(qs).
  map(key => `${key}=${qs[key]}`).
  join('&');
}

function request({ base = '', endpoint = '', qs, headers = {}, method = 'get' }) {
  let opts = {
    method,
    headers: new Headers(headers) };

  return fetch(base + endpoint + '?' + formQuerystring(qs), opts).
  then(res => res.json());
}

function kraken(opts) {
  let defaults = {
    base: krakenBase,
    headers: {
      'Client-ID': krakenClientID,
      Accept: 'application/json' } };


  return request(Object.assign(defaults, opts));
}

function twitchNameToUser(username) {
  // return fetch(`https://decapi.me/twitch/id/${username}`, {
  //   headers: {
  //     "Accept": "application/json"
  //   }
  // }).then(res => res.json());
  return request({
    base: `https://decapi.me/twitch/id/${username}`,
    headers: {
      "Accept": "application/json"
    } });
}

function getBadges(channel) {
  // let channelId = twitchNameToUser(channel);
  return kraken({
    base: 'https://badges.twitch.tv/v1/badges/',
    endpoint: (channel ? `channels/20730412` : 'global') + '/display',
    qs: { language: 'en' } }).

  then(data => data.badge_sets);
}

function getClip(clipSlug) {
  return kraken({
    endpoint: `clips/${clipSlug}` });

}

function getBTTVEmotes(channel) {
  let endpoint = 'cached/emotes/global';
  let global = true;
  if (channel) {
    let userId = twitchNameToUser(channel);
    endpoint = 'cached/users/twitch/' + userId;
    global = false;
  }
  return request({
    base: 'https://api.betterttv.net/3/',
    endpoint }).

  then(({ emotes, status, urlTemplate }) => {
    if (status === 404) return;
    bttvEmoteCache.urlTemplate = urlTemplate;
    emotes.forEach(n => {
      n.global = global;
      n.type = ['bttv', 'emote'];
      if (!global) {
        if (channel in bttvEmoteCache.data === false) {
          bttvEmoteCache.data[channel] = [];
        }
        bttvEmoteCache.data[channel].push(n);
      } else
      {
        bttvEmoteCache.data.global.push(n);
      }
    });
  });
}