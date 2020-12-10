let userHero = document.getElementById('user-hero');

const myHeader = new Headers();
myHeader.append('Content-Type', 'application/json');

const myInit = {
	method: 'GET',
	headers: myHeader,
	mode: 'cors',
};

let results = [];

async function getHeroData(heroName) {
	const URL = `https://superheroapi.com/api.php/868642223878564/search/${heroName}`;

	let myRequest = new Request(URL, myInit);

	let result = await fetch(myRequest)
	let data = await result.json();

	function valida(value){
		return value.powerstats.intelligence != "null" &&  value.powerstats.strength != "null" && value.powerstats.speed != "null" && value.powerstats.durability != "null" && value.powerstats.power != "null" && value.powerstats.combat != "null";
	}

	data.results = data.results.filter(valida);

	if (data.response === "success") {
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
	const hero = results.filter(hero => hero.id === heroId);

	const intelligence = Number(hero[0].powerstats.intelligence);
	const strength = Number(hero[0].powerstats.strength);
	const speed = Number(hero[0].powerstats.speed);
	const durability = Number(hero[0].powerstats.durability);
	const power = Number(hero[0].powerstats.power);
	const combat = Number(hero[0].powerstats.combat);

	const averagePower = Math.round((intelligence + strength + speed + durability + power + combat) / 6);

	const oponentHeroImage = document.getElementById("oponent-hero-img");
	const oponentHeroNickname = document.getElementById("oponent-hero-nickname");
	const oponentHeroFullName = document.getElementById("oponent-hero-full-name");
	const oponentHeroFullPower = document.getElementById("oponent-hero-full-power");
	const oponentHeroInt = document.getElementById("oponent-hero-int");
	const oponentHeroStr = document.getElementById("oponent-hero-str");
	const oponentHeroSpeed = document.getElementById("oponent-hero-speed");
	const oponentHeroResistence = document.getElementById("oponent-hero-resistence");
	const oponentHeroPower = document.getElementById("oponent-hero-power");
	const oponentHeroCombat = document.getElementById("oponent-hero-combat");

	let fighter = document.getElementById('fighter');

	fighter.classList.add('card-flip');

	fighter.innerHTML = `
		<div class="card-front" id="user-box">
			<div class="box-icon">
				<img src=${hero[0].image.url} onerror="this.src='./images/default-hero.jpg'" alt=${hero[0].name} class="img-responsive img-max-height">
			</div>
			<div class="info float-container">
				<div class="col-sm-12 london-title">
					<h3 class="text-uppercase">${hero[0].name}</h3>
					<h4 class="text-uppercase">${hero[0].biography['full-name']}</h4>
				</div>
				<div class="col-sm-12 location-main">
					<div class="pull-left location">
						<i class="fa fa-hand-rock-o fa-3x"></i><span>${averagePower}</span>
					</div>
					<div class="pull-right user-icons">
						<a href="#"><i class="fa fa-repeat fa-3x"></i></a>
					</div>
				</div>
			</div>
		</div>
		<div class="card-back">
			<div class="info float-container">
				<div class="pull-left">
					<h3 class="text-uppercase">Poderes</h3>
					<h4 class="text-uppercase">Inteligência: ${intelligence}</h4>
					<h4 class="text-uppercase">Força: ${strength}</h4>
					<h4 class="text-uppercase">Velocidade: ${speed}</h4>
					<h4 class="text-uppercase">Resistência: ${durability}</h4>
					<h4 class="text-uppercase">Poder: ${power}</h4>
					<h4 class="text-uppercase">Combate: ${combat}</h4>
				</div>
			</div>
		</div>
	`;

	let averagePowerOpn = 0;

	async function getHero() {

		let result = '';

		do{
			result = await getHeroOponent(Math.round(Math.random() * 731));
		}while (result.powerstats.intelligence == "null" || result.powerstats.strength == "null" || result.powerstats.speed == "null" || result.powerstats.durability == "null" || result.powerstats.power == "null" || result.powerstats.combat == "null");

		intOpn = Number(result.powerstats.intelligence);
		strOpn = Number(result.powerstats.strength);
		speedOpn = Number(result.powerstats.speed);
		durabilityOpn = Number(result.powerstats.durability);
		powerOpn = Number(result.powerstats.power);
		combatOpn = Number(result.powerstats.combat);

		averagePowerOpn = Math.round((intOpn + strOpn + speedOpn + durabilityOpn + powerOpn + combatOpn) / 6);

		let oponent = document.getElementById('oponent');

		oponent.classList.add('card-flip');
		oponent.innerHTML = `
		<div class="card-front" id="oponent-box">
			<div class="box-icon">
				<img src=${result.image.url} alt=${result.name} class="img-responsive img-max-height" id="oponent-hero-img">
			</div>
			<div class="info float-container">
				<div class="col-sm-12 paris-title">
					<h3 class="text-uppercase" id="oponent-hero-nickname">${result.name}</h3>
					<h4 class="text-uppercase" id="oponent-hero-full-name">${result.biography['full-name']}</h4>
				</div>
				<div class="col-sm-12 location2-main">
					<div class="pull-left location2">
						<i class="fa fa-hand-rock-o fa-3x"></i><span id="oponent-hero-full-power">${averagePowerOpn}</span>
					</div>
					<div class="pull-right user-icons">
						<a href="#"><i class="fa fa-repeat fa-3x"></i></a>
					</div>
				</div>
			</div>
		</div>
		<div class="card-back">
			<div class="info float-container">
				<div class="pull-left">
					<h3 class="text-uppercase">Poderes</h3>
					<h4 class="text-uppercase" id="oponent-hero-int">Inteligência ${intOpn}</h4>
					<h4 class="text-uppercase" id="oponent-hero-str">Força ${strOpn}</h4>
					<h4 class="text-uppercase" id="oponent-hero-speed">Velocidade ${speedOpn}</h4>
					<h4 class="text-uppercase" id="oponent-hero-resistence">Resistência ${durabilityOpn}</h4>
					<h4 class="text-uppercase" id="oponent-hero-power">Poder ${powerOpn}</h4>
					<h4 class="text-uppercase" id="oponent-hero-combat">Combate ${combatOpn}</h4>
				</div>
			</div>
		</div>
		`;
		
		// if (result !== undefined) {
		// 	let intOpn = 0;
		// 	let strOpn = 0;
		// 	let speedOpn = 0;
		// 	let durabilityOpn = 0;
		// 	let powerOpn = 0;
		// 	let combatOpn = 0;

		// 	if (result.powerstats.intelligence !== "null") {
		// 		intOpn = Number(result.powerstats.intelligence);
		// 		strOpn = Number(result.powerstats.strength);
		// 		speedOpn = Number(result.powerstats.speed);
		// 		durabilityOpn = Number(result.powerstats.durability);
		// 		powerOpn = Number(result.powerstats.power);
		// 		combatOpn = Number(result.powerstats.combat);

		// 		averagePowerOpn = Math.round((intOpn + strOpn + speedOpn + durabilityOpn + powerOpn + combatOpn) / 6);
		// 	}

		// 	oponentHeroImage.setAttribute("src", result.image.url);
		// 	oponentHeroNickname.innerText = result.name;
		// 	oponentHeroFullName.innerText = result.biography["full-name"] ? result.biography["full-name"] : result.name;
		// 	oponentHeroFullPower.innerText = averagePowerOpn;

		// 	oponentHeroInt.innerText = "Inteligência " + intOpn;
		// 	oponentHeroStr.innerText = "Força " + strOpn;
		// 	oponentHeroSpeed.innerText = "Velocidade " + speedOpn;
		// 	oponentHeroResistence.innerText = "Resistência " + durabilityOpn;
		// 	oponentHeroPower.innerText = "Poder " + powerOpn;
		// 	oponentHeroCombat.innerText = "Combate " + combatOpn;
		//}
	}

	getHero();

	setTimeout(() => {
		document.getElementById("content-card-oponent-hero").style.display = "block";
	}, 2000);

	setTimeout(() => {
		if (averagePower > averagePowerOpn) {
			document.getElementById("user-box").style.backgroundColor = "rgba(107, 181, 34, 1)";
			document.getElementById("user-box").style.color = "#fff";
			document.querySelector(".location i").style.color = "#fff";
			document.querySelector(".london-title h3").style.color = "#fff";
			document.querySelector(".london-title").style.borderLeft = "2px solid #fff";

			document.getElementById("oponent-box").style.backgroundColor = "rgba(193, 61, 18, 1)";
			document.getElementById("oponent-box").style.color = "#fff";
			document.querySelector(".paris i").style.color = "#fff";
			document.querySelector(".paris-title h3").style.color = "#fff";
			document.querySelector(".paris-title").style.borderLeft = "2px solid #fff";
			alert("VOCÊ VENCEU");
		}
		else if (averagePower == averagePowerOpn) {
			alert("EMPATOU");
		}
		else {
			document.getElementById("user-box").style.backgroundColor = "rgba(193, 61, 18, 1)";
			document.getElementById("user-box").style.color = "#fff";
			document.querySelector(".location i").style.color = "#fff";
			document.querySelector(".london-title h3").style.color = "#fff";
			document.querySelector(".london-title").style.borderLeft = "2px solid #fff";

			document.getElementById("oponent-box").style.backgroundColor = "rgba(107, 181, 34, 1)";
			document.getElementById("oponent-box").style.color = "#fff";
			document.querySelector(".paris i").style.color = "#fff";
			document.querySelector(".paris-title h3").style.color = "#fff";
			document.querySelector(".paris-title").style.borderLeft = "2px solid #fff";
			alert("INIMIGO VENCEU");
		}
	}, 3000);
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
								<span>(${element.biography["full-name"]})</span>
							</a>
						</div>
					`;
				} else {
					cardsChooseHero.innerHTML += `
					<div class='minicard-heroes'>
						<a href="#" onclick="setHeroCard('${element.id}'); return false;">
							<img src='${element.image.url}' onerror="this.src='./images/default-hero.jpg'" alt='${element.name}' title='${element.name}' />
							<span>${element.name}</span>
							<span>(${element.biography["full-name"]})</span>
						</a>
					</div>
				`;
				}
			});
		} else {
			let cardsChooseHero = document.getElementById("cards-choose-hero");
			cardsChooseHero.innerHTML = `
				Nenhum herói encontrado para sua busca.
				<img src="/images/card-img-default.jpg" />
			`;
		}
	}
});