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
	let contador = 0;

	addHero = async function (lim) {
		loader.style.display = '';
		for (let i = contador; i < lim; i++) {
			let heroId = randomCharacterId();

			const imgBoxes = document.querySelectorAll('.box');

			let heroImage = await getHeroImage(heroId);
			if(heroImage.status == 404){
				alert("aaaaa");
			}
			imgBoxes[i].innerHTML = `
			<a href=${heroImage.url}>
				<img src='${heroImage.url}' alt='${heroImage.name}' title='${heroImage.name}' />
				<span>${heroImage.name}</span>
			</a>
		`;
		}

		setTimeout(carr, 800);

		function carr(){ loader.style.display = 'none';}
	}
	
	addHero(9);



	let viewMore = document.querySelector(".view_more");
	let divMore = document.querySelector(".gallery-images-container");
	contador = 9;

	viewMore.addEventListener("click", async function () {
		divMore.innerHTML += `
			<div class="box img-gallery">
				<a href="">
					<img alt="" src="">
				</a>
			</div>
			<div class="box img-gallery">
				<a href="">
					<img alt="" src="">
				</a>
			</div>
			<div class="box img-gallery">
				<a href="">
					<img alt="" src="">
				</a>
			</div>
		`;
		
		addHero(contador+3);

		contador += 3;
	});
}