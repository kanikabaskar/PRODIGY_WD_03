console.log("Welcome to Tic Tac Toe")
let victoryplay = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let turn = "X"
let isgameover = false;
let aiMode = document.getElementById('aiMode').checked; 

const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = "Player " + boxtext[e[0]].innerText + " Won the Game !!! "
            isgameover = true
            victoryplay.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    })
}

const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let isFull = true;
    Array.from(boxtext).forEach(box => {
        if (box.innerText === '') {
            isFull = false;
        }
    });
    if (isFull && !isgameover) {
        document.querySelector('.info').innerText = "It's a Draw !!!";
        isgameover = true;
    }
}


const aiMove = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    for (let i = 0; i < boxtexts.length; i++) {
        if (boxtexts[i].innerText === '') {
            boxtexts[i].innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            checkDraw();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for Player " + turn;
            }
            break;
        }
    }
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            checkDraw();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for Player " + turn;
                if (aiMode && turn === "O" && !isgameover) {
                    setTimeout(aiMove, 500); // AI takes its turn after a short delay
                }
            }
        }
    })
})

reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false
    victoryplay.pause();
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for Player " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
    aiMode = document.getElementById('aiMode').checked; // Recheck the AI mode after reset
})
