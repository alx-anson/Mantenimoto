const Twit = require('twit');

var T = new Twit({
    consumer_key: 'aQJRhwbs4ZUKJanWf4RXwFtI0',
    consumer_secret: 'xPhEV7cqCzR9iG08yv4zxVnWP0sf31HSEPAn4W3NAKF2NLLwM1',
    access_token: '906148602-fatvc6epNcY19DnmUOoyMkdMhZofdVehTTbwC7WS',
    access_token_secret: 'elLcxf9Orfzdcvzd2Dnn5VjUx9OvCSPfcsjv0BsJYl3Bf',
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
});

let twits;
T.get('search/tweets', { q: '#RevistaMoto', count: 100 }, function (err, data, response) {
    twits = data.statuses.map(twit => procesarTwit(twit))
});

function procesarTwit(twit) {
    return { texto: twit.text}
};

exports.getTwits = function () {
    return twits;
}