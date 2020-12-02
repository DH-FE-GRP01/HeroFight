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

	if (data.response === "success") {
		return data.results;
	}
};

function setHeroCard(heroId) {
	const hero = results.filter(hero => hero.id === heroId);

	const intelligence = Number(hero[0].powerstats.intelligence);
	const strength = Number(hero[0].powerstats.strength);
	const speed = Number(hero[0].powerstats.speed);
	const durability = Number(hero[0].powerstats.durability);
	const power = Number(hero[0].powerstats.power);
	const combat = Number(hero[0].powerstats.combat);

	const averagePower = Math.round((intelligence + strength + speed + durability + power + combat) / 6);

	let fighter = document.getElementById('fighter');

	fighter.classList.add('card-flip');

	fighter.innerHTML = `
		<div class="card-front">
			<div class="box-icon">
				<img src=${hero[0].image.url} alt=${hero[0].name} class="img-responsive img-max-height">
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
								<img src='${element.image.url}' alt='${element.name}' title='${element.name}' />
								<span>${element.name}</span>
								<span>(${element.biography["full-name"]})</span>
							</a>
						</div>
					`;
				} else {
					cardsChooseHero.innerHTML += `
					<div class='minicard-heroes'>
						<a href="#" onclick="setHeroCard('${element.id}'); return false;">
							<img src='${element.image.url}' alt='${element.name}' title='${element.name}' />
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