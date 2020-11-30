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
  console.log('chamou');
  let url = `https://superheroapi.com/api.php/${accessToken}/${heroId}/image`;

  let myRequest = new Request(url, myInit);

  let response = await fetch(myRequest)      
  return await response.json();
  }

window.onload = async function() {
  for (let i = 0; i < 8; i++) {
    console.log('for');

    let heroId = randomCharacterId();

    const imgBoxes = document.querySelectorAll('.box');

    let heroImage = await getHeroImage(heroId);

    console.log(heroImage);

    imgBoxes[i].innerHTML = `<a href=${heroImage.url}><img src=${heroImage.url} alt=${heroImage.name} /></a>`;
  }
}