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

const items = document.getElementById('products');
const templateProducto = document.getElementById('destacados').content;
const fragment = document.createDocumentFragment();

items.addEventListener('click', (e) => {
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
  items.appendChild(fragment);
};

const addCart = (e) => {
  if (e.target.classList.contains('add')) {
    setMyCart(e.target.parentElement.parentElement);
  }
  e.stopPropagation();
};

const setMyCart = (ObjCart) => {
  console.log(ObjCart);
  const SelProduct = {
    id: ObjCart.querySelector('.add').dataset.id,
    title: ObjCart.querySelector('h2').textContent,
    price: ObjCart.querySelector('p').textContent,
    cant: 1,
  };

  if (my_car.hasOwnProperty(SelProduct.id)) {
    SelProduct.cant = my_car[SelProduct.id].cant + 1;
  }

  my_car[SelProduct.id] = { ...SelProduct };
  console.log(my_car);
};
