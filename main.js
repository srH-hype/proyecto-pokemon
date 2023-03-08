const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");

let entrenadorJSON
let capturados = [];

function pokedex() {
  limpiar("login");

  let hNombre = document.createElement("H2");
  hNombre.innerHTML = "Pokedex";

  const login = document.getElementById("login");
  login.appendChild(hNombre);

  let limit = 8;
  let offset = 1;

  let previousButton = document.createElement("button");
  previousButton.setAttribute("class", "botones");
  previousButton.innerHTML = "Anterior";

  previousButton.addEventListener("click", () => {
    if (offset != 1) {
      offset -= 9;
      removeChildNodes(pokemonContainer);
      fetchPokemons(offset, limit);
    }
  });

  let nextButton = document.createElement("button");
  nextButton.setAttribute("class", "botones");
  nextButton.innerHTML = "Siguiente";

  nextButton.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  });

  let cerrarButton = document.createElement("button");
  cerrarButton.setAttribute("class", "botones");
  cerrarButton.innerHTML = "Cerrar sesion";

  cerrarButton.addEventListener("click", () => {
    limpiar("pokedex");
    limpiar("navB");
    limpiar("login");
    inicioSesion();
  });

  let capturadosButton = document.createElement("button");
  capturadosButton.setAttribute("class", "botones");
  capturadosButton.innerHTML = "Capturados";
  capturadosButton.onclick = function () {
    if (capturados.length != 0){
      console.log(capturados);
      limpiar("pokedex");
      limpiar("navB");
      limpiar("login");
      mostrarCapturados();
  }else{
    alert('Equipo vacio');
  }
  };

  const nextLi = document.getElementById("navB");
  nextLi.appendChild(previousButton);
  nextLi.appendChild(nextButton);
  nextLi.appendChild(cerrarButton);
  nextLi.appendChild(capturadosButton);

  function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        createPokemon(data);
        spinner.style.display = "none";
      });
  }
  fetchPokemon;

  function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
      fetchPokemon(i);
    }
  }

function createPokemon(pokemon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.onclick = function () {
		if (capturados.length < 6){
      capturados = entrenadorJSON[0].pokemones;
			alert(name.textContent + " capturado");
			capturados.push(pokemon.id);}
		else{alert("Equipo lleno")}
    };

    cardContainer.appendChild(card);
    pokemonContainer.appendChild(flipCard);
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
    	parent.removeChild(parent.firstChild);
    }
}
	fetchPokemons(offset, limit);
}

function limpiar(pagina) {
	let docu = document.getElementById(pagina);
	while (docu.firstChild) {
    	docu.removeChild(docu.firstChild);
}
}

function inicioSesion() {
  limpiar("login");
  let imgPokeball = document.createElement("img");
  imgPokeball.setAttribute("src", "/pokeball.png");
  imgPokeball.setAttribute("id", "pokeball");

  let hNombre = document.createElement("H2");
  hNombre.innerHTML = "Email";

  let inputN = document.createElement("input");
  inputN.setAttribute("type", "email");
  inputN.setAttribute("id", "nombre");

  let hContra = document.createElement("H2");
  hContra.innerHTML = "Contraseña";

  let inputC = document.createElement("input");
  inputC.setAttribute("type", "password");
  inputC.setAttribute("id", "contra");

  let buttonIniciar = document.createElement("button");
  buttonIniciar.setAttribute("onclick", "getEntrenador()");
  buttonIniciar.setAttribute("class", "botones");
  buttonIniciar.innerHTML = "Iniciar sesion";

  let buttonRegistar = document.createElement("button");
  buttonRegistar.setAttribute("onclick", "postEntrenador()");
  buttonRegistar.setAttribute("class", "botones");
  buttonRegistar.innerHTML = "Registrase";

  let br = document.createElement("br");

  const login = document.getElementById("login");
  login.appendChild(imgPokeball);
  login.appendChild(hNombre);
  login.appendChild(inputN);
  login.appendChild(hContra);
  login.appendChild(inputC);
  login.appendChild(br);
  login.appendChild(buttonIniciar);
  login.appendChild(buttonRegistar);
}

function mostrarCapturados() {
  putEntrenador()
  capturados = entrenadorJSON[0].pokemones;
  console.log(entrenadorJSON[0].pokemones);
  let hNombre = document.createElement("H2");
  hNombre.innerHTML = "Capturados";

  const login = document.getElementById("login");
  login.appendChild(hNombre);

  let cerrarButton = document.createElement("button");
  cerrarButton.setAttribute("class", "botones");
  cerrarButton.innerHTML = "Cerrar sesion";

  cerrarButton.addEventListener("click", () => {
    limpiar("pokedex");
    limpiar("navB");
    inicioSesion();
  });

  let pokedexButton = document.createElement("button");
  pokedexButton.setAttribute("class", "botones");
  pokedexButton.innerHTML = "Pokedex";
  pokedexButton.onclick = function () {
    limpiar("pokedex");
    limpiar("navB");
    pokedex();
  };

  const nextLi = document.getElementById("navB");
  nextLi.appendChild(cerrarButton);
  nextLi.appendChild(pokedexButton);

  function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        createPokemon(data);
        spinner.style.display = "none";
      });
  }

  function fetchPokemons() {
    spinner.style.display = "block";
    for (const poke of capturados) {
      fetchPokemon(poke);
    }
  }

  function createPokemon(pokemon) {
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.onclick = function () {
      alert(name.textContent + " liberado");
      for (var i = 0; i < capturados.length; i++) {
        if (capturados[i] == pokemon.id) {
          capturados.splice(i, 1);
          putEntrenador()
        }
      }
      limpiar("pokedex");
      limpiar("login");
      limpiar("navB");
      mostrarCapturados();
    };

    cardContainer.appendChild(card);
    pokemonContainer.appendChild(flipCard);
  }

  function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  fetchPokemons();
}

function validarContra(contra1, contra2){
  if (contra1 == contra2){
    pokedex();
    alert('Bienvenido ' + entrenadorJSON[0].name)
  }else{
    alert('Contraseña incorrecta')
  }
}

//conectar endpoints

//POST
async function postEntrenador() {
  emailF = document.getElementById("nombre").value;
  contraF = document.getElementById("contra").value;
	let entrenadorNew = {
		name: emailF,
    pass: contraF,
		pokemones: []
	};

	async function postFetch() {
		const object = entrenadorNew;
		await fetch("http://localhost:7000/entrenadores", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'},
		body: JSON.stringify(object)
		});
	}
	postFetch();
  alert('Bienvenido ' + emailF)
  pokedex();
}

//GET
function getEntrenador() {
  let emailF = document.getElementById("nombre").value;
  let contraF = document.getElementById("contra").value;

  async function postFetch() {
    await fetch('http://localhost:7000/entrenadores/'+emailF)
    .then(response => response.json())
    .then(json => entrenadorJSON = json)
    .catch(err => console.error('FALLO'));   
    validarContra(contraF, entrenadorJSON[0].pass)
    console.log(entrenadorJSON);
  }
  postFetch();
}

//PUT
function putEntrenador() {
  let pokemones = capturados;
  let newEntrenador ={
    pokemones: pokemones
  }

  async function postFetch() {
    const object = newEntrenador;
    const response = await fetch("http://localhost:7000/entrenadores/"+entrenadorJSON[0].name, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(object),
    });
    const responseText = await response.text();
    console.log(responseText); // logs 'OK'
  }
  postFetch();

}

//cliente
