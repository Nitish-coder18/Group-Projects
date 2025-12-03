const Computer = () => {
        let num = Math.floor(Math.random() * 3) + 1;

        if (num === 1) {
        document.getElementById("imgcom").src = "assets/stone.png";
        document.getElementById("para").innerText = "Stone";

        } else if (num === 2) {
        document.getElementById("imgcom").src = "assets/scroll.png";
        document.getElementById("para").innerText = "Paper";

    } else if (num === 3) {
        document.getElementById("imgcom").src = "assets/scissor.png";
        document.getElementById("para").innerText = "Scissor";
    }
}

const Picture = (Choice) => {
    
    if (Choice === 'stone') {
        document.getElementById("imguser").src = "assets/stone.png";

        } else if (Choice === 'paper') {
        document.getElementById("imguser").src = "assets/scroll.png";

    } else if (Choice === 'scissor') {
        document.getElementById("imguser").src = "assets/scissor.png";
    }
    Computer();
}

