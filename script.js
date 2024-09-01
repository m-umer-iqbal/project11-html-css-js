const title = document.querySelector("link");

(() => {
    setInterval(() => {
        if (Math.random() < 0.5)
            title.setAttribute("href", "Media/Asset=O.png");
        else
            title.setAttribute("href", "Media/Asset=X.png");
    }, 200);
})();

const turnIndicator = document.querySelector("#turnIndicatorImg");
const btns = document.querySelectorAll(".btn");
const btnsArrayLength = btns.length;
let turn = false;
const finalCircleBtn = new Array(btnsArrayLength).fill(false);
const finalCrossBtn = new Array(btnsArrayLength).fill(false);
const board = new Array(btnsArrayLength).fill(null);

const winPattern = {
    // Horizontal
    pattern1: [0, 1, 2],
    pattern2: [3, 4, 5],
    pattern3: [6, 7, 8],

    // Vertical
    pattern4: [0, 3, 6],
    pattern5: [1, 4, 7],
    pattern6: [2, 5, 8],

    // Diagonal
    pattern7: [0, 4, 8],
    pattern8: [2, 4, 6]
};

const checkingWinner = () => {
    console.log('Board:', board); // Debugging line
    let hasWinner = false;

    for (let i in winPattern) {
        let cells = winPattern[i];
        let firstCell = board[cells[0]];

        if (firstCell && cells.every(index => board[index] === firstCell)) {
            displayResult(firstCell);
            hasWinner = true;
            return;
        }
    }

    if (!hasWinner) {
        if (board.every(cell => cell !== null)) {
            displayResult("Draw");
        }
    }
}



const displayResult = (winner) => {
    console.log(winner);
    document.querySelector(".info").classList.add("hide");
    let resultSectionOn = document.querySelector(".result");
    if (resultSectionOn) {
        if (winner == "Draw") {
            console.log("hi");
            resultSectionOn.firstElementChild.remove();
            resultSectionOn.firstElementChild.textContent = "Draw"; // Set text for draw
        } else {
            resultSectionOn.firstElementChild.setAttribute("src", `Media/Asset=${winner}.png`);
        }
        resultSectionOn.classList.remove("hide");
    }
    disableAllButtons();
    const restartBtn = document.querySelector(".restart");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            location.reload();
        });
        restartBtn.classList.remove("hide");
    }
}

const disableAllButtons = () => {
    for (let i = 0; i < btnsArrayLength; i++) {
        btns[i].classList.remove("circle-turn", "cross-turn", "final-circle-btn", "final-cross-btn");
        btns[i].removeEventListener("click", handleButtonClick);
    }
}

const playBtn = () => {
    const playButton = document.querySelector(".play-btn");
    const introScreen = document.querySelector(".intro-screen");
    const mainContent = document.querySelector(".main-content");

    playButton?.addEventListener("click", () => {
        introScreen.classList.add("hide");
        setTimeout(() => {
            introScreen.style.display = "none";
            mainContent.classList.add("visible");
        }, 2000); // Matches the transition duration
    });
}

const firstTurn = () => {
    if (Math.random() < 0.5) {
        turnIndicator?.setAttribute("src", "Media/Asset=O.png");
        return true;
    } else {
        turnIndicator?.setAttribute("src", "Media/Asset=X.png");
        return false;
    }
}

const turnHoverProviderFunction = (turn) => {
    if (document.querySelector(".result")?.classList.contains("hide")) {
        for (let i = 0; i < btnsArrayLength; i++) {
            if (!finalCircleBtn[i] && !finalCrossBtn[i]) {
                if (turn) {
                    btns[i].classList.remove("cross-turn");
                    btns[i].classList.add("circle-turn");
                } else {
                    btns[i].classList.remove("circle-turn");
                    btns[i].classList.add("cross-turn");
                }
            }
        }
    }
}

const finalStateClass = (i) => {
    if (turn) {
        btns[i].classList.add("final-circle-btn");
        turnIndicator?.setAttribute("src", "Media/Asset=X.png");
        board[i] = "O";
        finalCircleBtn[i] = true;
    } else {
        btns[i].classList.add("final-cross-btn");
        turnIndicator?.setAttribute("src", "Media/Asset=O.png");
        board[i] = "X";
        finalCrossBtn[i] = true;
    }
    btns[i].classList.remove("cross-turn", "circle-turn");

    turn = !turn;
    turnHoverProviderFunction(turn);
    checkingWinner();
}


const handleButtonClick = (event) => {
    const i = Array.from(btns).indexOf(event.target);
    if (board[i] === null) {
        finalStateClass(i);
    }
}

const button = () => {
    for (let i = 0; i < btnsArrayLength; i++) {
        btns[i].addEventListener("click", handleButtonClick);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    playBtn();
    turn = firstTurn();
    turnHoverProviderFunction(turn);
    button();
});