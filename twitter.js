//Para restablecer twits:
// 1º Descomentar este fichero y el método cargarCards() de indexedDB.js
// 2º Eliminar el <p> que he metido en index.html en la línea 69 dentro de <div id="contenedorCards">



// const Twit = require('twit');

// var T = new Twit({
//     consumer_key: 'itqFkkwcCj24zOHa3MMmTqiro',
//     consumer_secret: 'MTcsSNUX2VJ8TL1gUPGNswcb7hJkVF7323EIO9ZHIDJTRGxU7n',
//     access_token: '906148602-aWrgK5noS5gbVsLf5BouiVLetd3et3jsprpbeGln',
//     access_token_secret: 'wjjPj5pa8NdBVYK4ddX2DXDYW33onGiRDr4d6pcvazKuc',
//     timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
//     strictSSL: true,     // optional - requires SSL certificates to be valid.
// });

// let twits = [];
// T.get('search/tweets', { q: '#MotoGPxESPN', count: 1000 }, function (err, data, response) {
//     twits = data.statuses.map(twit => cogerTexto(twit));
// });

// function cogerTexto(twit) {
//     let media = twit.entities.media;
//     if (media != null) {
//         return { texto: twit.text, url_imagen: media[0].media_url }
//     }
// };

// function quitarRepetidos() {
//     let twitsLimpios = [];
//     let regex = /RT\s+/;
//     for (twit of twits) {
//         if (twit != null) {
//             if (!regex.test(twit.texto)) {
//                 twitsLimpios.push(twit);
//             } 
//         }
//     }
//     return twitsLimpios;
// }
// exports.getTwits = async function () {
//     return quitarRepetidos();
// };
