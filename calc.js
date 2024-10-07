function buttonPressed(event){
    const display = document.getElementById("calc-display_result");
    
    switch(event.target.classList[0]){
        case "numeral": 
            display.textContent += event.target.textContent;
            break;
        case "operation":
            break;
        case "clear":
            display.textContent = "";
            break;
        case "pi":
            break;
        default: 
            break;
    }
}

const buttons = document.getElementsByTagName("button");
for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", buttonPressed);
}