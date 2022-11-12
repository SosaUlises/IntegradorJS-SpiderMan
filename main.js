const grande = document.querySelector(".grande");
const punto = document.querySelectorAll(".punto");
const comicsContainer = document.querySelector(".comics-container");
const btnverMas = document.querySelector(".btn-verMas");
const categoriesList = document.querySelectorAll(".category");
const categories = document.querySelector(".buttons-container");

// ----------Carrousel----------------
punto.forEach((cadaPunto, i) => {
    // Asignamos un click a cadaPunto
    punto[i].addEventListener("click", () => {
        let posicion = i; // Guardamos la posicion del punto
        let operacion = posicion * -50; // Calculamos el espacio que se debe desplazar el grande

        //Movemos el grande
        grande.style.transform = `translateX(${operacion}%)`;
        // Recorremos todos los puntos y quitamos la clase Activo a todos los puntos
        punto.forEach((cadaPunto, i) => {
            punto[i].classList.remove("activo");
        });
        // Añadimos clase activo al punto que hacemos click
        punto[i].classList.add("activo");
    });
});

// ---------Cards a renderizar de COMICS----------------

// Html a renderizar
const renderComic = (comic) => {
    const { id, name, precio, year, edicion, cardImg } = comic;
    return `
    <div class="comics-card">
    <img src=${cardImg} alt="" />

    <div class="comics-title">
     <h3>${name}</h3>
    </div>

     <div class="comics-mid">
        <h4>Edición ${edicion}</h4>
        <p>Año ${year}</p>  
     </div>
  

      <div class="comic-bot">
      <div class="comic-prize">
     <img src="./assets/img/fire.png" alt="" />
     <p>$${precio}</p>
     </div>
      <button class="btn-add"
                data-id='${id}'
                data-name='${name}'
                data-precio='${precio}'
                data-img='${cardImg}'>Comprar</button>
      </div>
    </div>
    `;
};

// Funcion para renderizar los productos divididos
// Recibe un index, si no recibe es 0
// Si es 0 renderiza el primer array del data

const renderDividedComics = (index = 0) => {
    comicsContainer.innerHTML += productsController.dividedProducts[index].map(renderComic).join("");
};

const renderFilteredComics = (category) => {
    const comicsList = comicsData.filter(
        (comics) => comics.category === category
    );

    comicsContainer.innerHTML = comicsList.map(renderComic).join("");
};

// Funcion para renderizar los comics
// Recibe el index, si no se le pasa por default es 0
// Si no hay category renderizamos los productos del array divido 6
// Si hay category seleccionada ejectura renderFilteredComics

const renderComics = (index = 0, category = undefined) => {
    if (!category) {
        renderDividedComics(index);
        return;
    } else {
        renderFilteredComics(category);
    }
};

// Logica de filtros
const changeShowMoreBtnState = (category) => {
    if (!category) {
        btnverMas.classList.remove("hidden");
        return;
    } else {
        btnverMas.classList.add("hidden");
    }
};

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach(categoryBtn => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        } else {
            categoryBtn.classList.add("active");
        }
    });
};
const changeFilterState = e => {
    const selectedCategory = e.target.dataset.category;
    changeBtnActiveState(selectedCategory);
    changeShowMoreBtnState(selectedCategory);
};
// Funcion para aplicar el filtro por categorias
const applyFilter = (e) => {
    if (!e.target.classList.contains("category")) return;
    changeFilterState(e);
    if (!e.target.dataset.category) {
        comicsContainer.innerHTML = "";
        renderComics();
    } else {
        renderComics(0, e.target.dataset.category);
    }
};

//Funcion para cargar mas comics
const showMoreComics = () => {
    renderComics(productsController.nextProductsIndex)
    productsController.nextProductsIndex++; 
    console.log(productsController);
    //Checkear si estamos en el ultimo array del array de comics
    if (productsController.nextProductsIndex === productsController.productsLimit) {
        btnverMas.classList.add("hidden");
    }
};

// Funcion inicializadora
const init = () => {
    renderComics();
    categories.addEventListener("click", applyFilter);
    btnverMas.addEventListener("click", showMoreComics);
};

init();
