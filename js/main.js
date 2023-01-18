/*import { button, modal, btnClose } from './nodes.js';*/

/*
import { view } from './printView.js';

import { products } from '../utils/data.js';
button.addEventListener('click', () => {
  modal.style.clipPath =
    'polygon(50% 0%, 100% 0, 100% 60%, 100% 100%, 0 100%, 0% 60%, 0 0)';
});

btnClose.addEventListener('click', () => {
  modal.style.clipPath =
    'polygon(50% 0%, 50% 47%, 100% 60%, 50% 47%, 50% 47%, 0% 60%, 50% 47%)';
});

window.addEventListener('load', view);
*/

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

const carsProducto = document.getElementById('products');
const total_carro = document.getElementById('suma_productos');
const listProductos = document.getElementById('lista_producto');

//templates
const templateProducto = document.getElementById('destacados').content;
const templateCartTotal = document.getElementById('total_productos').content;
const templateListaProductos = document.getElementById('lista_productos').content;

const fragment = document.createDocumentFragment();

carsProducto.addEventListener('click', (e) => {
  addCart(e);
});

let my_car = {};

const fetchData = async () => {
  try {
    const res = await fetch(
      'https://api.mercadolibre.com/sites/MLC/search?q=accesorios_vehiculos&'
    );

    const data = await res.json();
    paintCards(data);
  } catch (error) {
    console.log(error);
  }
};

const paintCards = (data) => {
  const productos = data.results;
  productos.forEach((producto) => {
    templateProducto
      .querySelector('img')
      .setAttribute('src', producto.thumbnail);
    templateProducto.querySelector('h2').textContent = producto.title;
    templateProducto.querySelector('p').textContent = '$' + producto.price;
    templateProducto.querySelector('.add').dataset.id = producto.id;
    const clone = templateProducto.cloneNode(true);
    fragment.appendChild(clone);
  });
  carsProducto.appendChild(fragment);
};



const addCart = (e) => {
  if (e.target.classList.contains('add')) {
    setMyCart(e.target.parentElement.parentElement);
  }
  e.stopPropagation();
};

const setMyCart = (ObjCart) => {
 
  const SelProduct = {
    id: ObjCart.querySelector('.add').dataset.id,
    title: ObjCart.querySelector('h2').textContent,
    price: ObjCart.querySelector('p').textContent,
    image: ObjCart.querySelector('img').src,
    cant: 1,
  };

  if (my_car.hasOwnProperty(SelProduct.id)) {
    SelProduct.cant = my_car[SelProduct.id].cant + 1;
  }

  my_car[SelProduct.id] = { ...SelProduct };
   
  paintListCarro(my_car[SelProduct.id].cant );
};

const paintListCarro = (total) => {
  listProductos.innerHTML='';
   Object.values(my_car).forEach(producto=>{

    
    templateListaProductos.querySelector('img').setAttribute('src', producto['image']);
    templateListaProductos.querySelector('.title__item').textContent=producto['title']
    templateListaProductos.querySelector('.precio__item').textContent=producto['price']
    templateListaProductos.querySelector('.cant__item').textContent='Cant.: '+producto['cant']

    
    const clone = templateListaProductos.cloneNode(true);
    fragment.appendChild(clone);
                                            
  })
  listProductos.appendChild(fragment);
  paintTotalCart()
}

const paintTotalCart = ()=>{
  total_carro.innerHTML="";
  if (Object.keys(my_car).length==0){
    total_carro.innerHTML="No hay"
  }

  const nCantidad = Object.values(my_car).reduce((acc, { cant }) => acc + cant, 0)


  templateCartTotal.querySelector('p').textContent = nCantidad;
  const clone = templateCartTotal.cloneNode(true)
 
  total_carro.appendChild(clone );
}
//https://www.youtube.com/watch?v=JL7Wo-ASah4
