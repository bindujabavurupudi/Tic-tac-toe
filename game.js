let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")
let newBtn = document.querySelector("#new-btn")
let clickSound = document.querySelector("#click-sound");
let winSound = document.querySelector("#win-sound");
let drawSound = document.querySelector("#draw-sound");
let turnSound = document.querySelector("#turn-sound");
turnSound.loop = true;

let win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let cnt = 0;
let foundWinner = false;
let turn1 = true

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn1) {
            box.innerText = "X";
            clickSound.play();
            turn1 = false;
        }
        else {
            box.innerText = "O";
            clickSound.play();
            turn1 = true;
        }
        cnt++;
        box.disabled = true;
        let click = clickSound.cloneNode(); 
click.play();

        checkWinner()
        if (cnt == 9 && !foundWinner) {
            showDraw()
        }
        else if (!foundWinner) {
        turnSound.play();
    }

    })
})
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add("hide")
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`
    winSound.play();
    msgContainer.classList.remove("hide")
    disableBoxes()
    turnSound.pause();
turnSound.currentTime = 0;

}
const showDraw = () => {
    msg.innerText = `It's a draw`
    drawSound.play();
    msgContainer.classList.remove("hide")
    disableBoxes()
    turnSound.pause();
turnSound.currentTime = 0;

}


const resetGame = () => {
    turn1 = true;
    enableBoxes();
    foundWinner = false;
    cnt = 0
    clickSound.pause(); clickSound.currentTime = 0;
    winSound.pause(); winSound.currentTime = 0;
    drawSound.pause(); drawSound.currentTime = 0;

    if (turnSound.paused) {
    turnSound.currentTime = 0;
    turnSound.play().catch((e) => {
        console.warn("Autoplay error:", e);
    });
}



}
const checkWinner = () => {
    for (let winner of win) {
        let a = boxes[winner[0]].innerText
        let b = boxes[winner[1]].innerText
        let c = boxes[winner[2]].innerText
        if (a != "" && b != "" && c != "") {
            if (a == b && b == c) {
                foundWinner = true;
                showWinner(a)
                return;
            }

        }

    }


}
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);