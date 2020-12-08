// BUSCA O ELEMENTO QUE CONTEM O CARD DO OPONENTE
const contentCardOponentHero = document.getElementById("content-card-oponent-hero");

// BUSCA O ELEMENTO QUE CONTEM O CARD DO USUARIO
const contentCardUserHero = document.getElementById("content-card-user-hero");

// FUNCAO RESPONSAVEL POR RECEBER A TELA DO DISPOSITIVO
// E VERIFICAR SE A TELA EH COMPATIVEL COM O TAMANHO
// REQUISITADO NA VARIAVEL
function changeClass(screenWidth) {
    if (screenWidth.matches) {
        contentCardOponentHero.classList.add("card-container-back");
        contentCardOponentHero.classList.remove("card-container");

        contentCardUserHero.classList.remove("card-container-back");
        contentCardUserHero.classList.add("card-container");
    }
    else {
        contentCardOponentHero.classList.add("card-container");
        contentCardOponentHero.classList.remove("card-container-back");

        contentCardUserHero.classList.add("card-container");
        contentCardUserHero.classList.remove("card-container-back");
    }
}

// ARMAZENA NA VARIAVEL O VALOR MAXIMO DA TELA
var sizeWindow = window.matchMedia("(max-width: 1024px)");

// CHAMA A FUNCAO PELA PRIMEIRA VEZ
changeClass(sizeWindow);
// FAZ A TELA FICAR ESCUTANDO QUALQUER ALTERACAO DE TAMANHO
sizeWindow.addListener(changeClass);


if (window.innerWidth <= 1024) {
    // ADICIONA UM EVENTO DE CLIQUE PARA O ELEMENTO
    // QUE CONTEM O CARD DO OPONENTE
    // SERVE MAIS PARA O MODO MOBILE
    contentCardOponentHero.addEventListener("click", () => {
        contentCardOponentHero.classList.toggle("card-container-back");
        contentCardOponentHero.classList.toggle("card-container");
    });


    contentCardUserHero.addEventListener("click", () => {
        if (document.getElementById('fighter').classList.contains('card-flip')) {
            contentCardUserHero.classList.toggle("card-container-back");
            contentCardUserHero.classList.toggle("card-container");
        };
    });
}