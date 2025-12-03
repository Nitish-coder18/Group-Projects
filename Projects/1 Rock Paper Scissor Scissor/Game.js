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
    return num;
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
    Result();

    return Choice;
}

const Result = (user) => {

    const num = Computer(); 
    Result(user, num);

    let press = Picture(user);
    if (press === 'stone') {
        if (num === 1) {
            document.getElementById("res").innerText="Match draw..!!";
        } else if (num === 2) {
            document.getElementById("res").innerText="You Won..!!";
        }
        else if (num === 3) {
            document.getElementById("res").innerText="You Lose..!!";
        }
    }    
    if (press === 'paper') {
        if (num === 1) {
            document.getElementById("res").innerText="You Won..!!";
        } else if (num === 2) {
            document.getElementById("res").innerText="Match Draw..!!";
        }
        else if (num === 3) {
            document.getElementById("res").innerText="You Lose..!!";
        }
    }
    if (press === 'scissor') {
        if (num === 1) {
            document.getElementById("res").innerText="You Lose..!!";
        } else if (num === 2) {
            document.getElementById("res").innerText="You Won..!!";
        }
        else if (num === 3) {
            document.getElementById("res").innerText="Match Draw..!!";
        }
    }
}

