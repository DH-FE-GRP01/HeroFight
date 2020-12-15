const changeHeroUser = document.getElementById("change-hero-user");
const selectRandomHeroUser = document.getElementById("select-random-hero-user");

// blockFlipUser = document.getElementById("block-flip-user");

// blockFlipOpponent = document.getElementById("block-flip-opponent");

changeHeroUser.addEventListener("click", () => {
    backDefault();
});

selectRandomHeroUser.addEventListener("click", async () => {
    backDefault();

    let hero = {};

    do {
        hero = await getHeroOponent(Math.round(Math.random() * 731));
    }
    while (
        hero.powerstats.intelligence === "null" ||
        hero.powerstats.strength === "null" ||
        hero.powerstats.speed === "null" ||
        hero.powerstats.durability === "null" ||
        hero.powerstats.power === "null" ||
        hero.powerstats.combat === "null"
    );

    if (hero) {
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
});

blockFlipUser.addEventListener("click", () => {
    if (blockFlipUser.innerText == "Bloquear giro") {
        blockFlipUser.innerText = "Desbloquear giro";
    }
    else {
        blockFlipUser.innerText = "Bloquear giro";
    }
});

blockFlipOpponent.addEventListener("click", () => {
    if (blockFlipOpponent.innerText == "Bloquear giro") {
        blockFlipOpponent.innerText = "Desbloquear giro";
    }
    else {
        blockFlipOpponent.innerText = "Bloquear giro";
    }
});