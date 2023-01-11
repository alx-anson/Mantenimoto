document.getElementById("moto").addEventListener('mouseover', arrancarMoto);
const audio = new Audio("/public/audio/sonido.mp3");
function arrancarMoto(evt) {
    audio.play();
}

