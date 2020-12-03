let accessToken = '868642223878564';

function randomCharacterId() {
	return Math.round(Math.random() * 731);
}

const myHeader = new Headers();
myHeader.append('Content-Type', 'application/json');

const myInit = {
	method: 'GET',
	headers: myHeader,
	mode: 'cors',
};

async function getHeroImage(heroId) {
	let url = `https://superheroapi.com/api.php/${accessToken}/${heroId}/image`;

	let myRequest = new Request(url, myInit);

	let response = await fetch(myRequest)
	return await response.json();
}

window.onload = async function () {
	const loader = document.getElementById('loader-5');
	loader.style.display = 'fixed';

	for (let i = 0; i < 9; i++) {
		let heroId = randomCharacterId();

		const imgBoxes = document.querySelectorAll('.box');

		let heroImage = await getHeroImage(heroId);

		imgBoxes[i].innerHTML = `
			<a href=${heroImage.url}>
				<img src='${heroImage.url}' alt='${heroImage.name}' title='${heroImage.name}' />
				<span>${heroImage.name}</span>
			</a>
		`;
	}

	loader.style.display = 'none';
}