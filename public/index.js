document.getElementById("moto").addEventListener('mouseover', arrancarMoto);
const audio = new Audio("/audio/sonido.mp3");
function arrancarMoto(evt) {
    audio.play();
}

