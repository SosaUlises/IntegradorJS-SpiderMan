// Selectores
const grande = document.querySelector(".grande");
const punto = document.querySelectorAll(".punto");
const comicsContainer = document.querySelector(".comics-container");
const btnverMas = document.querySelector(".btn-verMas");
const categoriesList = document.querySelectorAll(".category");
const categories = document.querySelector(".buttons-container");
const overlay = document.querySelector('.overlay');
const buyBtn = document.querySelector('.btn-buy');
const cartBtn = document.querySelector('.cart-label');
const barsBtn = document.querySelector('.menu-label');
const cartMenu = document.querySelector('.cart');
const barsMenu = document.querySelector('.navbar-list');
const deleteBtn = document.querySelector(".btn-deleted");
const successModal = document.querySelector(".add-modal")
const productsCart = document.querySelector(".cart-container")
const total = document.querySelector(".total");
const ver = document.querySelector(".btn-add");

// Setear el array para el carro
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Guardar Local Storage
const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList));
}


//-------- ----------Carrousel----------------//
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

// ---------Cards a renderizar de COMICS----------------//

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
                data-edicion='${edicion}'
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
// Cambiar el color del boton seleccionado en category
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


//------------- Interfaz del Menu-----------------//

//Logica abrir y cerrar el carrito y mostrar el overlay
const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    } else {
        overlay.classList.toggle("show-overlay");
    }
};

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return;
    } else {
        overlay.classList.toggle("show-overlay");
    }
};

//Funcion que cierra el menu y carrito si se scrollea
const closeOnScroll = () => {
    if (
        !barsMenu.classList.contains('open-menu') &&
        !cartMenu.classList.contains('open-cart')
    )
        return;

    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
};
// Funcion overlay
const closeOnClick = (e) => {
    if (!e.target.classList.contains("navbar-link")) return;
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
};
// Funcion overlay
const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
}

// -------------------- Logica Carrito -------------------//

const renderCartProduct = (cartProduct) => {
    const { id, name, img, precio, quantity, edicion } = cartProduct;
    return `
  <div class="cart-item">
    <img src=${img} alt="error"/>
    <div class="item-info">
      <h3 class="item-title">${name}</h3>
      <p class="item-bid">Edición ${edicion}</p>
      <span class="item-price">$${precio}</span>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${quantity}</span>
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
  </div>
  `;
}

// Mostramos mensaje de "error" si no hay productos en el carro o Renderizamos renderCartProduct
const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p class="msg-error">No hay productos en el carrito</p>`
        return;
    } else {
        productsCart.innerHTML = cart.map(renderCartProduct).join("");
    }
}
// Obtenemos el total
const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0);
};
// Mostramos total
const showTotal = () => {
    total.innerHTML = `$${getCartTotal().toFixed(2)}`
};
// Desabilitar BTN de carrito
const disableBtn = (btn) => {
    if (!cart.length) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
    }
  };
// Crear un producto
const createProductData = (id, name, precio, edicion, img) => {
    return { id, name, precio, edicion, img };
};
// Comprobamos si existe el producto
const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
};

// Recorremos el carrito y cuando el producto el cual agregamos, sumamos 1
const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => {
        return cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct;
    });
};

const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
};
//Funcion mostrar Modal
const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove("active-modal");
    }, 1500);
};
// Check estado del carrito
const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart(cart);
    showTotal(cart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};
// Agregar productos
const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) return;
    const { id, name, precio, edicion, img } = e.target.dataset;
    const product = createProductData(id, name, precio, edicion, img);
    console.log(product);

    if (isExistingCartProduct(product)) {
        //Añadimos unidad
        addUnitToProduct(product);
        //Mostrar el modal de success
        showSuccessModal("Se agregó una unidad del producto al carrito");
    } else {
        //Crear el producto
        createCartProduct(product);
        //Mostrar el modal de que se agrego el producto
        showSuccessModal("El producto se ha agregado al carrito");
    }
    checkCartState();
};

//Funcion para deleted
const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    checkCartState();
};
// Quitamos una unidad del producto
const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id
            ? { ...product, quantity: Number(product.quantity) - 1 }
            : product;
    });
};
// Funcion inicializadora del delet
const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);

    if (existingCartProduct.quantity === 1) {
        if (window.confirm("¿Desea eliminar el producto del carrito?")) {
            //Eliminar producto
            removeProductFromCart(existingCartProduct);
        } else {
            return;
        }
    }
    // Restar uno al producto existente
    substractProductUnit(existingCartProduct);
};
// Funcion para agregar una unidad
const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct);
};
// Funcion para sumar o restar productos del carro con +/-
const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
        handlePlusBtnEvent(e.target.dataset.id);
    }
    checkCartState();
};
// Resetear el carrito
const resetCartItems = () => {
    cart = [];
    checkCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
    };
};

const completeBuy = () => {
    completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const deleteCart = () => {
    completeCartAction("¿Desea vaciar el carrito?", "No hay productos en el carrito")
};

// Funcion inicializadora
// EVENTOS
const init = () => {
    renderComics();
    categories.addEventListener("click", applyFilter);
    btnverMas.addEventListener("click", showMoreComics);
    cartBtn.addEventListener('click', toggleCart);
    barsBtn.addEventListener('click', toggleMenu);
    barsMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOnOverlayClick)
    window.addEventListener('scroll', closeOnScroll);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showTotal);
    comicsContainer.addEventListener("click", addProduct);
    productsCart.addEventListener("click", handleQuantity);
    disableBtn(deleteBtn);
    disableBtn(buyBtn);
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
};

init();
