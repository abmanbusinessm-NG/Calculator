const gift = document.getElementById("gift");
const surprise = document.getElementById("surprise");

let x = 100;
let y = 100;

let dx = 4;
let dy = 4;

// Move the gift around the screen
function moveGift(){

    x += dx;
    y += dy;

    if(x <= 0 || x >= window.innerWidth - 80){
        dx *= -1;
    }

    if(y <= 60 || y >= window.innerHeight - 80){
        dy *= -1;
    }

    gift.style.left = x + "px";
    gift.style.top = y + "px";

    requestAnimationFrame(moveGift);

}

moveGift();

// Show the picture when the gift is left-clicked
gift.addEventListener("click", function(){

    gift.style.display = "none";

    surprise.style.display = "flex";

});