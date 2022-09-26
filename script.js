const params = new URLSearchParams(window.location.search);
const chatchannel = params.get('channel') ? params.get('channel').split(',') : ['guude', 'arkas'];
const usersIgnored = params.get('ignore') ? params.get('ignore').split(',') : [];
const alerts = params.get('alerts') === 'false' ? false : true;
const transparent = params.get('transparent') === 'true' ? true : false;
const width = params.get('width') === 'full' ? true : false;
const lines = typeof +params.get('lines') === 'number' && +params.get('lines') > 1 ? params.get('lines') : 150;
const font = typeof +params.get('font') === 'number' && +params.get('font') > 1 ? params.get('font') : false;

if (transparent) {
  var element = document.getElementById('chat');
  element.classList.add('half-transparent');
}

if (width) {
  var element = document.getElementById('chat');
  element.classList.add('full-width');
  document.body.style.backgroundColor = 'rgb(14, 14, 16)';
}

if (font) {
  document.getElementById('chat').setAttribute('style', 'font-size:' + font + 'px' + '!important');
  var elems = document.getElementsByClassName('channel-name');
    for(i = 0; i < elems.length; i++) {
        elems[i].setAttribute('style', 'font-size:' + (font - 4) + 'px' + '!important');
    }
}

const chatEle = document.getElementById('chat');
const twitchBadgeCache = {
  data: { 
    global: {} } };
let channelBadges = {};

const bttvEmoteCache = {
  lastUpdated: 0,
  data: { global: [] },
  urlTemplate: '//cdn.betterttv.net/emote/{{id}}/{{image}}' };


const krakenBase = 'https://api.twitch.tv/kraken/';
const krakenClientID = '4g5an0yjebpf93392k4c5zll7d7xcec';

const chatFilters = [
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
'\u2800-\u28FF' // Braille
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
      connection: {
        reconnect: true,
        secure: true },

      channels: chatchannel
    });
    addListeners();
    client.connect();
  });
} else
{
  client = new tmi.client({
    options: { debug: false },
    connection: {
      reconnect: true,
      secure: true
     },

    channels: chatchannel,
 });

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
    if (usersIgnored.includes(userstate.username)) return;

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
      showMessage({ type: 'alert', message: username + ' has raided with 1 viewer!' });
    }
    else {
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
    if (alerts) {
      if (userstate.bits > 1) {
        let chatMessage = userstate.name + " has cheered " + userstate.bits + " bits";
        showMessage({ type: 'alert', message: chatMessage });
      } else {
        let chatMessage = userstate.name + " has cheered " + userstate.bits + " bit";
        showMessage({ type: 'alert', message: chatMessage });
      }
  }
    showMessage({ chan, type: 'chat', message: message, data: userstate });
  }


  client.on('message', handleMessage);
  client.on('cheer', handleCheer);
  if (alerts) {
  client.on('raided', handleRaid);
  client.on('resub', handleResub);
  client.on('subscription', handleSub);
  client.on('subgift', handleSubGift);
  client.on('anongiftpaidupgrade', handleAnonUpgrade);
  client.on('giftpaidupgrade', handleUpgrade);
  }

  client.on('join', (channel, username, self) => {
    if (!self) {
      return;
    }
    let chan = getChan(channel);
    getBTTVEmotes(chan);
    twitchNameToUser(chan).
    then(user => getBadges(user)).
    then(badges => twitchBadgeCache.data[chan] = badges);
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
    let chanEle = document.createElement('span');
    if (chatchannel.length > 1) {
      chanEle.classList.add('channel-name');
      chanEle.innerText = chan;
    }
    let nameEle = document.createElement('span');
    nameEle.classList.add('user-name');
    nameEle.innerText = data.name;
    if (!userColors[data.name]) {
      userColors[data.name] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    if (typeof data.color == 'string') {
    nameEle.style.color = data.color;
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

    if (chatchannel.length > 1) chatLine.appendChild(chanEle);
    chatLine.appendChild(badgeEle);
    // chatLine.appendChild(spaceEle);
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

  if (chatEle.childElementCount > lines) {
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
  window.scrollTo(0,document.body.scrollHeight + 10000)
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
      if (id.includes('emotesv2_')) {
        return {
          start,
          end,
          id,
          code: message.slice(start, end),
          type: ['twitch', 'emotev2'] };
  
      }
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
        if (subtype === 'emotev2') {
          out = document.createElement('img');
          out.setAttribute('src', `https://static-cdn.jtvnw.net/emoticons/v2/${n.id}/default/dark/1.0`);
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

  var requests = fetch(base + endpoint + '?' + formQuerystring(qs), opts).then(res => res.json());

  return requests;
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
  return request({
    base: `https://decapi.me/twitch/id/${username}`,
    headers: {
      "Accept": "application/json"
    } });
}

function getBadges(channel) {
  return kraken({
    base: 'https://badges.twitch.tv/v1/badges/',
    endpoint: (channel ? `channels/${channel}` : 'global') + '/display',
    qs: { language: 'en' } }).

  then(data => data.badge_sets);
}

function getClip(clipSlug) {
  return kraken({
    endpoint: `clips/${clipSlug}` });

}

async function getBTTVEmotes(channel) {
  let endpoint = 'cached/emotes/global';
  let global = true;
  if (channel) {
    let userId = await twitchNameToUser(channel);
    endpoint = 'cached/users/twitch/' + userId;
    global = false;
  }
  return request({
    base: 'https://api.betterttv.net/3/',
    endpoint }).

  then(({ channelEmotes, status, urlTemplate }) => {
    if (status === 404) return;
    if (!channelEmotes) return;
    channelEmotes.forEach(n => {
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

function replaceCheerWithImgTag(text) {
  let output = text;
  const targetStrArr = text.match(/(^|\s)Cheer\d+/g) || [];
  const targetNumArr = targetStrArr.map((item) =>
    Number(item.replace("Cheer", ""))
  );
  const getImgTag = function (n) {
    let imgNum = 0;
    if (n >= 1 && n <= 99) {
      imgNum = 1;
    } else if (n >= 100 && n <= 999) {
      imgNum = 100;
    } else if (n >= 1000 && n <= 4999) {
      imgNum = 1000;
    } else if (n >= 5000 && n <= 9999) {
      imgNum = 5000;
    } else if (n >= 10000 && n <= 99999) {
      imgNum = 10000;
    } else if (n >= 100000) {
      imgNum = 100000;
    }
    return (
      ' <img src="https://d3aqoihi2n8ty8.cloudfront.net/actions/cheer/dark/animated/' +
      imgNum +
      '/1.gif">'
    );
  };
  targetStrArr.forEach(function (word, i) {
    output = output.replace(word, getImgTag(targetNumArr[i]) + targetNumArr[i]);
  });
  return output;
}

function appendToDoc(str){
  document.body.innerHTML += (str +"<br><br>")
}
