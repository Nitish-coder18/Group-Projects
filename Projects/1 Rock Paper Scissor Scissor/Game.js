const Picture = (Choice) => {
    
    if (Choice === 'stone') {
        document.getElementById("imguser").src = "assets/stone.png";

        } else if (Choice === 'paper') {
        document.getElementById("imguser").src = "assets/scroll.png";

    } else if (Choice === 'scissor') {
        document.getElementById("imguser").src = "assets/scissor.png";
    }

    const Computer = () => {
        let num = Math.floor(Math.random() * 3) + 1;

        if (num === 1) {
        document.getElementById("imguser").src = "assets/stone.png";

        } else if (num === 2) {
        document.getElementById("imguser").src = "assets/scroll.png";

    } else if (num === 3) {
        document.getElementById("imguser").src = "assets/scissor.png";
    }

    }
}

