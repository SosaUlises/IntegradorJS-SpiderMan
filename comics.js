const comicsData = [
    {
        id: 1,
        name: "Savage SpiderMan",
        precio: 100,
        year: 2019,
        edicion: "#454",
        cardImg: "./assets/img/comic1.jpg",
        category: "Varios"
    },
    {
        id: 2,
        name: "Ben Reilly - SpiderMan",
        precio: 150,
        year: 2017,
        edicion: "#217",
        cardImg: "./assets/img/comic2.jpg",
        category: "Varios"
    },
    {
        id: 3,
        name: "The Amazing SpiderMan",
        precio: 110,
        year: 2018,
        edicion: "#316",
        cardImg: "./assets/img/comic3.jpg",
        category: "Amazing"
    },
    {
        id: 4,
        name: "Darkhold SpiderMan",
        precio: 200,
        year: 2020,
        edicion: "#517",
        cardImg: "./assets/img/comic4.jpg",
        category: "Varios"
    },
    {
        id: 5,
        name: "Empire of the Spider",
        precio: 130,
        year: 2017,
        edicion: "#240",
        cardImg: "./assets/img/comic5.jpg",
        category: "Miles"
    },
    {
        id: 6,
        name: "Lost in Spiderverse",
        precio: 130,
        year: 2018,
        edicion: "#278",
        cardImg: "./assets/img/comic6.jpg",
        category: "Miles"
    },
    {
        id: 7,
        name: "Miles Morales",
        precio: 130,
        year: 2019,
        edicion: "#343",
        cardImg: "./assets/img/comic7.jpg",
        category: "Miles"
    },
    {
        id: 8,
        name: "The Amazing Spiderman",
        precio: 150,
        year: 2001,
        edicion: "#40",
        cardImg: "./assets/img/comic8.jpg",
        category: "Amazing"
    },
    {
        id: 9,
        name: "Symbiote",
        precio: 170,
        year: 2020,
        edicion: "#537",
        cardImg: "./assets/img/comic9.jpg",
        category: "Venom"
    },
    {
        id: 10,
        name: "Symbiote",
        precio: 150,
        year: 2020,
        edicion: "#545",
        cardImg: "./assets/img/comic10.jpg",
        category: "Venom"
    },
    {
        id: 11,
        name: "SpiderMan Noir",
        precio: 100,
        year: 2021,
        edicion: "#616",
        cardImg: "./assets/img/comic11.jpg",
        category: "Varios"
    },
    {
        id: 12,
        name: "Symbiote",
        precio: 130,
        year: 2019,
        edicion: "#498",
        cardImg: "./assets/img/comic12.jpg",
        category: "Venom"
    },
    {
        id: 13,
        name: "The Amazing Spiderman",
        precio: 150,
        year: 2016,
        edicion: "#198",
        cardImg: "./assets/img/comic13.jpg",
        category: "Amazing"
    },
    {
        id: 14,
        name: "The Amazing Spiderman",
        precio: 155,
        year: 2015,
        edicion: "#178",
        cardImg: "./assets/img/comic14.jpg",
        category: "Amazing"
    },
    {
        id: 15,
        name: "The Amazing Spiderman",
        precio: 150,
        year: 2009,
        edicion: "#100",
        cardImg: "./assets/img/comic15.jpg",
        category: "Amazing"
    },
    {
        id: 16,
        name: "The Amazing Spiderman",
        precio: 160,
        year: 2011,
        edicion: "#179",
        cardImg: "./assets/img/comic16.jpg",
        category: "Amazing"
    },
    {
        id: 17,
        name: "Miles Morales",
        precio: 125,
        year: 2018,
        edicion: "#370",
        cardImg: "./assets/img/comic17.jpg",
        category: "Miles"
    },
    {
        id: 18,
        name: "The Amazing Spiderman",
        precio: 175,
        year: 2005,
        edicion: "#57",
        cardImg: "./assets/img/comic18.jpg",
        category: "Amazing"
    },
    {
        id: 19,
        name: "The Amazing Spiderman",
        precio: 160,
        year: 2010,
        edicion: "#111",
        cardImg: "./assets/img/comic19.jpg",
        category: "Amazing"
    },
    {
        id: 20,
        name: "Norman Osborn",
        precio: 290,
        year: 2009,
        edicion: "#100",
        cardImg: "./assets/img/comic20.jpg",
        category: "Varios"
    },
    {
        id: 21,
        name: "Symbiote",
        precio: 180,
        year: 2017,
        edicion: "#419",
        cardImg: "./assets/img/comic21.jpg",
        category: "Venom"
    },
    {
        id: 22,
        name: "The Amazing Spiderman",
        precio: 230,
        year: 2005,
        edicion: "#57",
        cardImg: "./assets/img/comic22.jpg",
        category: "Amazing"
    },
    {
        id: 23,
        name: "The Amazing Spiderman",
        precio: 200,
        year: 2016,
        edicion: "#329",
        cardImg: "./assets/img/comic23.jpg",
        category: "Amazing"
    },
    {
        id: 24,
        name: "Mysterio",
        precio: 300,
        year: 2008,
        edicion: "#44",
        cardImg: "./assets/img/comic24.jpg",
        category: "Varios"
    },
    {
        id: 25,
        name: "Spiderman vs Venom",
        precio: 210,
        year: 2015,
        edicion: "#228",
        cardImg: "./assets/img/comic25.jpg",
        category: "Venom"
    },
    
];

// Para hacer la paginacion de Ver Más
// Usamos el array de comics y lo dividimos en arrays de size elementos
const splitProducts = size => {
    let dividedProducts = [];
    for (let i = 0; i < comicsData.length; i += size) {
        dividedProducts.push(comicsData.slice(i, i + size));
    }
    return dividedProducts;
};

// Funcion para dividir los comics en arrays de 6 y manejar la paginacion
const productsController = {
    dividedProducts: splitProducts(6),
    nextProductsIndex: 1,
    productsLimit: splitProducts(6).length
};

    console.log(productsController)
