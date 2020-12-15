// BUSCA O ELEMENTO QUE CONTEM O CARD DO OPONENTE
const contentCardOponentHero = document.getElementById("content-card-opponent-hero");
const blockFlipOpponent = document.getElementById("block-flip-opponent");

// BUSCA O ELEMENTO QUE CONTEM O CARD DO USUARIO
const contentCardUserHero = document.getElementById("content-card-user-hero");
const blockFlipUser = document.getElementById("block-flip-user");

contentCardOponentHero.addEventListener("click", () => {
	if (blockFlipOpponent.innerText === "Bloquear giro") {
		contentCardOponentHero.classList.toggle("card-container-back");
		contentCardOponentHero.classList.toggle("card-container");
	}
});

contentCardUserHero.addEventListener("click", () => {
	if (blockFlipUser.innerText === "Bloquear giro") {
		if (document.getElementById('fighter').classList.contains('card-flip')) {
			contentCardUserHero.classList.toggle("card-container-back");
			contentCardUserHero.classList.toggle("card-container");
		}
	}
});