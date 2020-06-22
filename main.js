const getPoke = (e) => {
  e.preventDefault();
  let pokeID = Math.floor(Math.random() * 400);
  const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
  const urlDescription = `https://pokeapi.co/api/v2/pokemon-species/${pokeID}`;
  fetch(urlPokemon)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Server status is not 200");
      } else {
        return response.json();
      }
    })
    .then((json) => showPoke(json));
  // fetch(urlDescription)
  //   .then((response2) => {
  //     return response2.json();
  //   })
  //   .then((json) => {
  //     setTimeout(() => {
  //       showPokeInfo(json);
  //     }, 4500);
  //   });
};

const rollPoke = () => {
  document.querySelector(".pokeball__click").remove();

  document
    .querySelector(".pokeball__image")
    .classList.add("pokeball__image--spinning");
  setTimeout(() => {
    const pokeTop = document.createElement("img");
    const pokeBot = document.createElement("img");
    pokeTop.className = "pokeball__part pokeball__part--poke-top";
    pokeBot.className = "pokeball__part pokeball__part--poke-bot";
    pokeTop.setAttribute("src", "assets/pokeball-top.svg");
    pokeBot.setAttribute("src", "assets/pokeball-bot.svg");
    document.querySelector(".pokeball__form").appendChild(pokeTop);
    document.querySelector(".pokeball__form").appendChild(pokeBot);
    document.querySelector(".pokeball__image").style.opacity = "0";
    document.querySelector(".pokeball__image").style.transition = "0.3s";
    pokeTop.style.animation =
      "slideTop 1.5s cubic-bezier(0.750, 0.215, 0.200, 0.990) both";
    pokeBot.style.animation =
      "slideBot 1.5s cubic-bezier(0.750, 0.215, 0.200, 0.990) both";
  }, 3000);
};

const showPokeInfo = (poke) => {
  // const { name: pokeName, order: id,  } = poke;
  const modalFirst = document.createElement("section");
  modalFirst.className = "info";
  console.log(poke.types[0].type.name);
  modalFirst.innerHTML = `<div class="info__main">
    <div class="info__base-info">
      
      <h1 class="info__name">${poke.name}</h1>
      <span class="info__id">#${poke.order}</span>
      <span class="info__category">${poke.types[0].type.name}</span>
    </div>
    <ul class="info__list">
      <li class="info__list-item">About</li>
    </ul>
    <div class="info__desc"></div>
    <div class="info__buttons">
      <button class="info__btn-again">Roll again</button>
      <button class="info__btn-add">Add to Bag</button>
    </div>
  </div>`;
  document.body.appendChild(modalFirst);
};

const showPoke = (poke) => {
  rollPoke();
  const newPokemon = document.createElement("div");
  newPokemon.className = "pokeball__new-pokemon";
  newPokemon.innerHTML = `<img class="pokeball__new-pokemon-img" src="${poke.sprites["front_default"]}">`;
  document.querySelector(".pokeball__form").appendChild(newPokemon);
  setTimeout(() => {
    newPokemon.style.zIndex = "31";
    newPokemon.style.animation = "imgSize 1.5s both";
    showPokeInfo(poke);
  }, 4500);
};

document.querySelector(".pokeball__form").addEventListener("submit", getPoke);
