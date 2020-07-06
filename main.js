const getPoke = (e) => {
  e.preventDefault();
  document.querySelector(".pokeball__image").disabled = true;
  let pokeID = Math.floor(Math.random() * 400);
  const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
  fetch(urlPokemon)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Server status is not 200");
      } else {
        return response.json();
      }
    })
    .then((json) => showPoke(json));
};

const createPokeParts = () => {
  const pokeTop = document.createElement("img");
  const pokeBot = document.createElement("img");
  pokeTop.className = "pokeball__part pokeball__part--poke-top";
  pokeBot.className = "pokeball__part pokeball__part--poke-bot";
  pokeTop.setAttribute("src", "assets/pokeball-top.svg");
  pokeBot.setAttribute("src", "assets/pokeball-bot.svg");
  document.querySelector(".pokeball__form").appendChild(pokeTop);
  document.querySelector(".pokeball__form").appendChild(pokeBot);
  document.querySelector(".pokeball__image").style.opacity = "0";
  pokeTop.style.animation =
    "slideTop 1.5s cubic-bezier(0.750, 0.215, 0.200, 0.990) both";
  pokeBot.style.animation =
    "slideBot 1.5s cubic-bezier(0.750, 0.215, 0.200, 0.990) both";
  setTimeout(() => {
    pokeTop.remove();
    pokeBot.remove();
  }, 2500);
};

const rollPoke = () => {
  const clickMe = document.querySelector(".pokeball__click");
  if (clickMe) {
    clickMe.remove();
  } else {
    return;
  }
  document.querySelector(".pokeball__image").style.animation = "spin 3s both";
  setTimeout(() => {
    createPokeParts();
  }, 3000);
};

const showPokeInfo = (poke) => {
  const modalFirst = document.createElement("section");
  modalFirst.className = "info";
  console.log(poke.types[0].type.name);
  modalFirst.innerHTML = `
  <img src="assets/icon close.svg" class="info__close-btn" />
  <div class="info__main">
    <div class="info__base-info">
      <h1 class="info__name">${poke.name}</h1>
      <span class="info__id">#${poke.order}</span>
      <span class="info__category">${poke.types[0].type.name}</span>
    </div>
    <ul class="info__list">
      <li class="info__list-item info__list-item--active info__list-item--about">About</li>
      <li class="info__list-item info__list-item info__list-item--moves">Moves</li>
    </ul>
    <div class="info__desc"></div>
    <div class="info__buttons">
      <button class="info__btn info__btn--again">Roll again</button>
      <button class="info__btn info__btn--add">Add to Bag</button>
    </div>
  </div>`;

  document.body.appendChild(modalFirst);
  const modalList = [...document.querySelectorAll(".info__list-item")];
  const aboutList = document.querySelector(".info__list-item--about");
  const movesList = document.querySelector(".info__list-item--moves");
  aboutList.classList.add("info__list-item--active");
  document.querySelector(".info__desc").innerHTML = ` <ul class="info__stats">
    <li>HP: ${poke.stats[0]["base_stat"]}</li>
    <li>ATK: ${poke.stats[1]["base_stat"]}</li>
    <li>DEF: ${poke.stats[2]["base_stat"]}</li>
    <li>SPD: ${poke.stats[5]["base_stat"]}</li>
  </ul>
  `;

  modalList.forEach((item) => {
    item.addEventListener("click", (e) => {
      modalList.forEach((i) => i.classList.remove("info__list-item--active"));
      e.target.classList.add("info__list-item--active");
      if (movesList.classList.contains("info__list-item--active")) {
        document.querySelector(
          ".info__desc"
        ).innerHTML = `<ul class="info__stats">
        <li>${poke.moves[0].move.name}</li>
        <li>${poke.moves[1].move.name}</li>
        <li>${poke.moves[2].move.name}</li>
        <li>${poke.moves[3].move.name}</li>
        <li>${poke.moves[4].move.name}</li>
        </ul>`;
      } else {
        document.querySelector(
          ".info__desc"
        ).innerHTML = ` <ul class="info__stats">
      <li>HP: ${poke.stats[0]["base_stat"]}</li>
      <li>ATK: ${poke.stats[1]["base_stat"]}</li>
      <li>DEF: ${poke.stats[2]["base_stat"]}</li>
      <li>SPD: ${poke.stats[5]["base_stat"]}</li>
    </ul>
      `;
      }
    });
  });

  const colorThief = new ColorThief();
  const img = document.querySelector(".pokeball__new-pokemon-img");
  const pokeColor = colorThief.getColor(img);
  console.log(pokeColor);
  document.querySelector(".info").style.backgroundColor = `rgb(${pokeColor})`;
  document.querySelector(".info__category").style.color = `rgb(${pokeColor})`;
  document.querySelector(
    ".info__category"
  ).style.backgroundColor = `rgb(${pokeColor.map((item) => item + 80)})`;
  document
    .querySelector(".info__btn--again")
    .addEventListener("click", rollAgain);
  document
    .querySelector(".info__close-btn")
    .addEventListener("click", rollAgain);
};

const showPoke = (poke) => {
  rollPoke();

  const newPokemon = document.createElement("div");
  newPokemon.className = "pokeball__new-pokemon";
  newPokemon.innerHTML = `<img class="pokeball__new-pokemon-img" crossorigin="anonymous" src="${poke.sprites["front_default"]}">`;
  document.querySelector(".pokeball__form").appendChild(newPokemon);
  setTimeout(() => {
    newPokemon.style.zIndex = "31";
    newPokemon.style.animation = "imgSize 1.5s both";
    showPokeInfo(poke);
    // document.querySelector(".pokeball__part--poke-top").remove();
    // document.querySelector(".pokeball__part--poke-bot").remove();
  }, 4500);
};

const rollAgain = () => {
  document.querySelector(".info").style.animation = "modalSlideOut 1s both";
  setTimeout(() => {
    document.querySelector(".info").remove();
  }, 1000);
  document.querySelector(".pokeball__new-pokemon").remove();
  const pokeImage = document.querySelector(".pokeball__image");
  pokeImage.style.opacity = "1";
  pokeImage.disabled = false;

  document.querySelector(".pokeball__image").style.animation = null;
  pokeImage.addEventListener("click", () => {
    pokeImage.style.animation = "3s spin both";
    setTimeout(() => {
      createPokeParts();
    }, 3000);
  });
};

document.querySelector(".pokeball__form").addEventListener("submit", getPoke);
