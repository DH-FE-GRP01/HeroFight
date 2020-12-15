let userHero = document.getElementById('user-hero');

const myHeader = new Headers();
myHeader.append('Content-Type', 'application/json');

const myInit = {
    method: 'GET',
    headers: myHeader,
    mode: 'cors',
};

let results = [];

function valida(value) {
    return (
        value.powerstats.intelligence !== "null" &&
        value.powerstats.strength !== "null" &&
        value.powerstats.speed !== "null" &&
        value.powerstats.durability !== "null" &&
        value.powerstats.power !== "null" &&
        value.powerstats.combat !== "null"
    );
}

async function getHeroData(heroName) {
    const URL = `https://superheroapi.com/api.php/868642223878564/search/${heroName}`;

    let myRequest = new Request(URL, myInit);

    let result = await fetch(myRequest)
    let data = await result.json();

    if (data.results) {
        data.results = data.results.filter(valida);

        return data.results;
    }
};

async function getHeroOponent(heroId) {
    let url = `https://superheroapi.com/api.php/868642223878564/${heroId}`;
    let myRequest = new Request(url, myInit);

    let result = await fetch(myRequest)
    let data = await result.json();

    if (data.response === "success") {
        return data;
    }
}

function setHeroCard(heroId) {
    const hero = results.filter(hero => hero.id === heroId)[0];

    const intelligence = Number(hero.powerstats.intelligence);
    const strength = Number(hero.powerstats.strength);
    const speed = Number(hero.powerstats.speed);
    const durability = Number(hero.powerstats.durability);
    const power = Number(hero.powerstats.power);
    const combat = Number(hero.powerstats.combat);

    const averagePower = Math.round((intelligence + strength + speed + durability + power + combat) / 6);

    let cardsChooseHero = document.getElementById("cards-choose-hero");
    cardsChooseHero.innerHTML = `
        <img src="images/card-img-default.jpg" alt=""
        class="img-responsive img-max-height" id="user-hero-img"></img>
    `;
    cardsChooseHero.classList.remove("cards-choose-hero");

    document.getElementById("content-info-user-hero").style.display = "block";
    document.getElementById("input-hero").querySelector("input").value = "";
    document.getElementById("input-hero").style.display = "none";

    const userHeroImage = document.getElementById("user-hero-img");
    const userHeroNickname = document.getElementById("user-hero-nickname");
    const userHeroFullName = document.getElementById("user-hero-full-name");
    const userHeroFullPower = document.getElementById("user-hero-full-power");
    const userHeroInt = document.getElementById("user-hero-int");
    const userHeroStr = document.getElementById("user-hero-str");
    const userHeroSpeed = document.getElementById("user-hero-speed");
    const userHeroResistence = document.getElementById("user-hero-resistence");
    const userHeroPower = document.getElementById("user-hero-power");
    const userHeroCombat = document.getElementById("user-hero-combat");

    userHeroImage.setAttribute("src", hero.image.url);
    userHeroImage.setAttribute("alt", hero.name);
    userHeroImage.setAttribute("title", hero.name);

    userHeroNickname.innerText = hero.name;
    userHeroFullName.innerText = hero.biography["full-name"] ? hero.biography["full-name"] : hero.name;
    userHeroFullPower.innerText = averagePower;

    userHeroInt.innerText = intelligence;
    userHeroStr.innerText = strength;
    userHeroSpeed.innerText = speed;
    userHeroResistence.innerText = durability;
    userHeroPower.innerText = power;
    userHeroCombat.innerText = combat;

    setOpponentCard();

    if (changeHeroUser.style.display == "none" || changeHeroUser.style.display == "") {
        changeHeroUser.style.display = "block";
	}
	
	document.getElementById("block-flip-user").removeAttribute("disabled");
}

// FUNCAO PARA SETAR O CARD DO OPONENTE
async function setOpponentCard() {
    let averagePowerOpn = 0;
    let heroOpponent = {};

    do {
        heroOpponent = await getHeroOponent(Math.round(Math.random() * 731));
    }
    while (
        heroOpponent.powerstats.intelligence === "null" ||
        heroOpponent.powerstats.strength === "null" ||
        heroOpponent.powerstats.speed === "null" ||
        heroOpponent.powerstats.durability === "null" ||
        heroOpponent.powerstats.power === "null" ||
        heroOpponent.powerstats.combat === "null"
    );

    if (heroOpponent) {
        document.getElementById("menu-buttons-opponent").style.display = "flex";

        const opponent = document.getElementById("opponent");
        opponent.style.display = "grid";
        opponent.classList.add("card-flip");

        const opponentHeroImage = document.getElementById("opponent-hero-img");
        const opponentHeroNickname = document.getElementById("opponent-hero-nickname");
        const opponentHeroFullName = document.getElementById("opponent-hero-full-name");
        const opponentHeroFullPower = document.getElementById("opponent-hero-full-power");
        const opponentHeroInt = document.getElementById("opponent-hero-int");
        const opponentHeroStr = document.getElementById("opponent-hero-str");
        const opponentHeroSpeed = document.getElementById("opponent-hero-speed");
        const opponentHeroResistence = document.getElementById("opponent-hero-resistence");
        const opponentHeroPower = document.getElementById("opponent-hero-power");
        const opponentHeroCombat = document.getElementById("opponent-hero-combat");

        const intelligence = Number(heroOpponent.powerstats.intelligence);
        const strength = Number(heroOpponent.powerstats.strength);
        const speed = Number(heroOpponent.powerstats.speed);
        const durability = Number(heroOpponent.powerstats.durability);
        const power = Number(heroOpponent.powerstats.power);
        const combat = Number(heroOpponent.powerstats.combat);

        averagePowerOpn = Math.round((intelligence + strength + speed + durability + power + combat) / 6);

        opponentHeroImage.setAttribute("src", heroOpponent.image.url);
        opponentHeroImage.setAttribute("alt", heroOpponent.name);
        opponentHeroImage.setAttribute("title", heroOpponent.name);
        opponentHeroNickname.innerText = heroOpponent.name;
        opponentHeroFullName.innerText = heroOpponent.biography["full-name"] ? heroOpponent.biography["full-name"] : heroOpponent.name;
        opponentHeroFullPower.innerText = averagePowerOpn;

        opponentHeroInt.innerText = intelligence;
        opponentHeroStr.innerText = strength;
        opponentHeroSpeed.innerText = speed;
        opponentHeroResistence.innerText = durability;
        opponentHeroPower.innerText = power;
        opponentHeroCombat.innerText = combat;

        setTimeout(checkWinner, 2000);
    }
}

// FUNCAO PARA VERIFICAR O CARD VENCEDOR
function checkWinner() {
    const powerUser = Number(document.getElementById("user-hero-full-power").innerText);
    const powerOpponent = Number(document.getElementById("opponent-hero-full-power").innerText);

    if (powerUser > powerOpponent) {
        const userBox = document.getElementById("user-box");
        const opponentBox = document.getElementById("opponent-box");

        userBox.style.backgroundColor = "rgba(107, 181, 34, 1)";
        opponentBox.style.backgroundColor = "rgba(193, 61, 18, 1)";

        userBox.style.color = "#fff";
        opponentBox.style.color = "#fff";

        document.querySelector(".location i").style.color = "#fff";
        document.querySelector(".london-title h3").style.color = "#fff";
        document.querySelector(".london-title").style.borderLeft = "2px solid #fff";

        document.querySelector(".paris i").style.color = "#fff";
        document.querySelector(".paris-title h3").style.color = "#fff";
        document.querySelector(".paris-title").style.borderLeft = "2px solid #fff";

        document.getElementById("exampleModalLongTitle").innerText = "E O VENCEDOR É...";
        document.getElementById("winnerText").innerText = "VOCÊ é o grande ganhador. Parabéns!!!";

        document.getElementById("showWinner").click();
    }
    else if (powerUser == powerOpponent) {
        document.getElementById("exampleModalLongTitle").innerText = "E O VENCEDOR É...";
        document.getElementById("winnerText").innerText = "Dessa vez foi empate. Ambos lutaram bravamente, mas os 2 caíram de exaustão. Tente novamente!";

        document.getElementById("showWinner").click();
    }
    else {
        const userBox = document.getElementById("user-box");
        const opponentBox = document.getElementById("opponent-box");

        userBox.style.backgroundColor = "rgba(193, 61, 18, 1)";
        opponentBox.style.backgroundColor = "rgba(107, 181, 34, 1)";

        userBox.style.color = "#fff";
        opponentBox.style.color = "#fff";

        document.querySelector(".location i").style.color = "#fff";
        document.querySelector(".london-title h3").style.color = "#fff";
        document.querySelector(".london-title").style.borderLeft = "2px solid #fff";

        document.querySelector(".paris i").style.color = "#fff";
        document.querySelector(".paris-title h3").style.color = "#fff";
        document.querySelector(".paris-title").style.borderLeft = "2px solid #fff";

        document.getElementById("exampleModalLongTitle").innerText = "E O VENCEDOR É...";
        document.getElementById("winnerText").innerText = "Infelizmente o seu oponente venceu dessa vez, mas não desanime porque você pode tentar novamente. Na próxima você irá ganhar!";

        document.getElementById("showWinner").click();
    }
}

document.getElementById("play-again").addEventListener("click", () => {
    document.getElementById("showWinner").click();
    backDefault();
});

function backDefault() {
    let cardsChooseHero = document.getElementById("cards-choose-hero");
    cardsChooseHero.innerHTML = `
        <img src="images/card-img-default.jpg" alt=""
        class="img-responsive img-max-height" id="user-hero-img"></img>
    `;
    cardsChooseHero.classList.add("cards-choose-hero");

    document.getElementById("content-info-user-hero").style.display = "none";
    document.getElementById("input-hero").style.display = "block";

    document.getElementById("menu-buttons-opponent").style.display = "none";
    document.getElementById("opponent").style.display = "none";

	document.getElementById("change-hero-user").style.display = "none";
	
	document.getElementById("block-flip-user").setAttribute("disabled", false);
	document.getElementById("block-flip-user").innerText = "Desbloquear giro";
	document.getElementById("block-flip-opponent").innerText = "Desbloquear giro";

    const userBox = document.getElementById("user-box");
    const opponentBox = document.getElementById("opponent-box");

    userBox.style.backgroundColor = "#fff";
    opponentBox.style.backgroundColor = "#fff";

    userBox.style.color = "#161E2C";
    opponentBox.style.color = "#161E2C";

    document.querySelector(".location i").style.color = "#19beb6";
    document.querySelector(".london-title h3").style.color = "#19beb6";
    document.querySelector(".london-title").style.borderLeft = "2px solid #19beb6";

    document.querySelector(".paris i").style.color = "#df9801";
    document.querySelector(".paris-title h3").style.color = "#df9801";
    document.querySelector(".paris-title").style.borderLeft = "2px solid #df9801";

    document.getElementById("user-hero-int").innerText = "";
    document.getElementById("user-hero-str").innerText = "";
    document.getElementById("user-hero-speed").innerText = "";
    document.getElementById("user-hero-resistence").innerText = "";
    document.getElementById("user-hero-power").innerText = "";
    document.getElementById("user-hero-combat").innerText = "";
}

userHero.addEventListener('change', async function () {
    if (this.value !== '') {
        const heroName = this.value;

        results = await getHeroData(heroName);

        if (results) {
            let cardsChooseHero = document.getElementById("cards-choose-hero");
            cardsChooseHero.innerHTML = "";

            results.map(function (element, index) {
                if (index === 0) {
                    cardsChooseHero.innerHTML = `
						<div class='minicard-heroes'>
							<a href="#" onclick="setHeroCard('${element.id}'); return false;">
								<img src='${element.image.url}' onerror="this.src='./images/default-hero.jpg'" alt='${element.name}' title='${element.name}' />
								<span>${element.name}</span>
								<span>(${element.biography["full-name"] ? element.biography["full-name"] : element.name})</span>
							</a>
						</div>
					`;
                } else {
                    cardsChooseHero.innerHTML += `
					<div class='minicard-heroes'>
						<a href="#" onclick="setHeroCard('${element.id}'); return false;">
							<img src='${element.image.url}' onerror="this.src='./images/default-hero.jpg'" alt='${element.name}' title='${element.name}' />
							<span>${element.name}</span>
							<span>(${element.biography["full-name"] ? element.biography["full-name"] : element.name})</span>
						</a>
					</div>
				`;
                }
            });
        } else {
            document.getElementById("cards-choose-hero")
                .innerHTML = `
				Nenhum herói encontrado para sua busca.
				<img src="/images/card-img-default.jpg" />
			`;
        }
    }
    else {
        document.getElementById("cards-choose-hero")
            .innerHTML = `
            <img src="images/card-img-default.jpg" alt="Chuck Norris"
            class="img-responsive img-max-height" id="user-hero-img"></img>
        `;
    }
});