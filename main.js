const grande = document.querySelector(".grande");
const punto = document.querySelectorAll(".punto");


// ----------Carrousel----------------
punto.forEach(( cadaPunto, i ) =>{
    // Asignamos un click a cadaPunto
    punto[i].addEventListener("click",()=>{

        let posicion = i; // Guardamos la posicion del punto
        let operacion = posicion * -50; // Calculamos el espacio que se debe desplazar el grande

        //Movemos el grande
        grande.style.transform = `translateX(${operacion}%)`
        // Recorremos todos los puntos y quitamos la clase Activo a todos los puntos
        punto.forEach( (cadaPunto, i)=>{
            punto[i].classList.remove("activo") 
        })
        // Añadimos clase activo al punto que hacemos click
        punto[i].classList.add("activo");
    })
})