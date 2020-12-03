
let formulario= document.getElementById("contact-form");
let nome= document.getElementById("name");
let email= document.getElementById("email");
let mensagem= document.getElementById("message");

let errorList =document.querySelector("#contact-error ul");
let error = document.getElementById("contact-error")

formulario.addEventListener("submit", function(evento){
    evento.preventDefault();

    errorList.innerHTML="";
    if(nome.value===''){
        
        errorList.innerHTML += "<li> O campo <b>nome</b> precisa ser preenchido </li>";

    }

    if(email.value===''){
        
        errorList.innerHTML += "<li> O campo <b>e-mail</b> precisa ser preenchido </li>";

    }

    if(mensagem.value===''){
        
        errorList.innerHTML += "<li> O campo <b>mensagem</b> precisa ser preenchido </li>";

    }
    if (errorList.querySelectorAll("li").length > 0){
        error.hidden="";
    }
})


    