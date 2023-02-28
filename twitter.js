const Twit = require('twit');

var T = new Twit({
    consumer_key: 'aQJRhwbs4ZUKJanWf4RXwFtI0',
    consumer_secret: 'xPhEV7cqCzR9iG08yv4zxVnWP0sf31HSEPAn4W3NAKF2NLLwM1',
    access_token: '906148602-fatvc6epNcY19DnmUOoyMkdMhZofdVehTTbwC7WS',
    access_token_secret: 'elLcxf9Orfzdcvzd2Dnn5VjUx9OvCSPfcsjv0BsJYl3Bf',
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
});

let twits = [];
T.get('search/tweets', { q: '#MotoGPxESPN', count: 1000 }, function (err, data, response) {
    twits = data.statuses.map(twit => cogerTexto(twit));
});

function cogerTexto(twit) {
    let media = twit.entities.media;
    if (media != null) {
        return { texto: twit.text, url_imagen: media[0].media_url }
    }
};

function quitarRepetidos() {
    let twitsLimpios = [];
    let regex = /RT\s+/;
    for (twit of twits) {
        if (twit != null) {
            if (!regex.test(twit.texto)) {
                twitsLimpios.push(twit);
            } 
        }
    }
    return twitsLimpios;
}
exports.getTwits = async function () {
    return quitarRepetidos();
};