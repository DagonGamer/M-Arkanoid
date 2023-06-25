const player = document.querySelector("div.Plato"),
    bala = document.querySelector("div.Bala"),
    Altura = 100 * document.querySelector("html").offsetHeight / document.querySelector("html").offsetWidth;
let move = false,
    direction = ( ( Math.random() * Date.now() / 76567 ) % 1 ) * 30 + 75,
    velocity = 10, 
    x = 50,
    y = 50;console.log(direction)

const Colisiona = (p1, p2) => {

    let b1 = p1.getBoundingClientRect();
    let b2 = p2.getBoundingClientRect();

    if (b1.x < b2.x + b2.width && b2.x < b1.x + b1.width && b1.y < b2.y + b2.height && b2.y < b1.y + b1.height) return true;
    return false;

}

document.querySelector("html").onmousedown = (e) =>
    move = true;

document.querySelector("html").onmouseup = (e) =>
    move = false;

document.querySelector("html").onmousemove = (e) => 
    move ? player.style = `left: calc( ${e.clientX}px - 15vw );` : 0;

document.querySelector("html").ontouchstart = (e) =>
    move = true;

document.querySelector("html").ontouchend = (e) =>
    move = false;

document.querySelector("html").ontouchmove = (e) => 
    move ? player.style = `left: calc( ${e.touches[0].screenX}px - 15vw );` : 0;

setInterval(() => {

    x += Math.cos(direction / 360 * 2 * Math.PI) * velocity / 3;
    y += Math.sin(direction / 360 * 2 * Math.PI) * velocity / 3;
    direction = direction % 360;

    if ( x >= 100 ) {
        direction = 180 - direction;
        x = 100;
    }

    if ( x <= 0 ) {
        direction = 180 - direction;
        x = 0;
    }

    if ( y <= 0 ) alert("Has perdido, gracias por jugarr")
    if (document.querySelectorAll("div.Marco div").length == 0) alert("Has ganado!!! Gracias por jugarr. Sí, la M viene de María y claro que la quiero :)")

    if ( y >= Altura ) {
        direction = -direction;
        y = Altura;
    }

    if (Colisiona(player, bala)) {
        direction = -direction + Math.random() * 10 - 5;
        y = 8;
    }

    for (const piece of document.querySelectorAll("div.Marco div"))
        if (Colisiona(bala, piece)) {

            let b1 = bala.getBoundingClientRect();
            let b2 = piece.getBoundingClientRect();

            if (Math.abs(b1.x - b2.x) > Math.abs(b1.y - b2.y)) {
                x -= Math.cos(direction / 360 * 2 * Math.PI) * velocity / 3;
                direction = 180 - direction;
                x += Math.cos(direction / 360 * 2 * Math.PI) * velocity / 3;

            } else {
                y -= Math.sin(direction / 360 * 2 * Math.PI) * velocity / 3;
                direction = -direction;
                y += Math.sin(direction / 360 * 2 * Math.PI) * velocity / 3;
            }

            piece.remove();

        }

    bala.style.left = `calc( ${x}vw - 2.5vw )`;
    bala.style.bottom = `calc( ${y}vw - 2.5vw )`;

}, 50);