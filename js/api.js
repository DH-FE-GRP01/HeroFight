let userHero = document.getElementById('user-hero');

const myHeader = new Headers();
myHeader.append('Content-Type', 'application/json');

const myInit = {
	method: 'GET',
	headers: myHeader,
	mode: 'cors',
};

userHero.addEventListener("keyup", async function () {
	if (this.value !== '') {
		const heroName = this.value;
		const URL = `https://superheroapi.com/api.php/868642223878564/search/${heroName}`;

		let myRequest = new Request(URL, myInit);

		fetch(myRequest)
			.then(function (result) {
				return result.json();
			})
			.then(function (data) {
				if (data.response === "success") {
					const results = data.results;

					let cardsChooseHero = document.getElementById("cards-choose-hero");
					cardsChooseHero.innerHTML = "";
					document.getElementById('user-hero-img').src = "";

					results.map(function (element) {
						cardsChooseHero.innerHTML += `
							<div class='minicard-heroes'>
								<img src='${element.image.url}' alt='${element.name}' title='${element.name}' />
								<span>${element.name}</span>
								<span>(${element.biography["full-name"]})</span>
							</div>
						`;
					});
				}
			});
	}
	else {
		let cardsChooseHero = document.getElementById("cards-choose-hero");
		cardsChooseHero.innerHTML = "";
		document.getElementById('user-hero-img').src = "../images/card-img-default.jpg";
	}
});