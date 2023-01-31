 import { button, modal, btnClose } from './nodes.js'; 

btnClose.addEventListener('click', () => {
  modal.style.clipPath =
    'polygon(50% 0%, 50% 47%, 100% 60%, 50% 47%, 50% 47%, 0% 60%, 50% 47%)';
});
 

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  if (localStorage.getItem('my_car')) {
    my_car = JSON.parse(localStorage.getItem('my_car'));
    paintListCarro();
  }
});

const carsProducto = document.getElementById('products');
const total_carro = document.getElementById('suma_productos');
const listProductos = document.getElementById('lista_producto');
const toglee = document.getElementById('toglee');
const prod_modal = document.getElementById('prod_modal');








//templates
const templateProducto = document.getElementById('destacados').content;
const templateCartTotal = document.getElementById('total_productos').content;
const template_prop_producto = document.getElementById('popup_producto').content;

const containItem = document.getElementById('containItem');
const templateListaProductos =
  document.getElementById('lista_productos').content;

const fragment = document.createDocumentFragment();



carsProducto.addEventListener('click', (e) => {
  addCart(e);
  
});




toglee.addEventListener('click', (e) => {
  

  if ( containItem.style.left==='0px') {
    containItem.style.left ='-300px';
  }else
  {
    containItem.style.left =0
  }
  
});

const EmptyCart = document.getElementById('EmptyCart');

EmptyCart.addEventListener('click', (e) => {
  Empty_Cart(e);
});

let my_car = {};

const fetchData = async () => {
  try {
    const res = await fetch(
      'https://api.mercadolibre.com/sites/MLC/search?q=accesorios_vehiculos&',
    );

    const data = await res.json();
    if (paintCards(data)){
      getContainImg();
    };


  } catch (error) {
    console.log(error);
  }
};

const getContainImg = () => {
  const elements = document.querySelectorAll('.containImg');
  for(var i = 0; i < elements.length; i++){
   
    elements[i].addEventListener('click',function(elements){
      
      const obj_Product = (elements.target.parentElement.parentElement)

   
      //setMyCart(obj_Product);

      
     
      paintPopuProdcut(obj_Product);
      modal.style.clipPath =
      'polygon(50% 0%, 100% 0, 100% 60%, 100% 100%, 0 100%, 0% 60%, 0 0)';
 });
}

}


 

const paintCards = (data) => {

  try {
  const productos = data.results;
  productos.forEach((producto) => {
    templateProducto
      .querySelector('img')
      .setAttribute('src', producto.thumbnail);
    templateProducto.querySelector('img').setAttribute('alt', producto.id);
    templateProducto.querySelector('h2').textContent = producto.title;
    templateProducto.querySelector('p').textContent = '$' + producto.price;
    templateProducto.querySelector('.add').dataset.id = producto.id;
    const clone = templateProducto.cloneNode(true);
    fragment.appendChild(clone);
  });
  carsProducto.appendChild(fragment);
  return(true)
} catch (error) {
  console.log(error);

}

 

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
  paintListCarro(my_car[SelProduct.id].cant);
};


const paintListCarro = (total) => {
  listProductos.innerHTML = '';
  Object.values(my_car).forEach((producto) => {
    templateListaProductos
      .querySelector('img')
      .setAttribute('src', producto['image']);
    templateListaProductos.querySelector('.title__item').textContent =
      producto['title'];
    templateListaProductos.querySelector('.precio__item').textContent =
      producto['price'];
    templateListaProductos.querySelector('.cant__item').textContent =
      'Cant.: ' + producto['cant'];

    const clone = templateListaProductos.cloneNode(true);
    fragment.appendChild(clone);
  });
  listProductos.appendChild(fragment);
  paintTotalCart();
  localStorage.setItem('my_car', JSON.stringify(my_car));
};

const paintTotalCart = () => {
  total_carro.innerHTML = '';
  if (Object.keys(my_car).length == 0) {
    total_carro.innerHTML = 'No hay';
    return;
  }

  const nCantidad = Object.values(my_car).reduce(
    (acc, { cant }) => acc + cant,
    0,
  );

  templateCartTotal.querySelector('p').textContent = nCantidad;
  const clone = templateCartTotal.cloneNode(true);

  total_carro.appendChild(clone);
};


const paintPopuProdcut = (obj_prod) => {
  prod_modal.innerHTML='';

  /*const id = obj_Product.querySelector('.add');
  const title=  obj_Product.querySelector('h2')
  const price = obj_Product.querySelector('p')
  const image =  obj_Product.querySelector('img')
  */
  


  template_prop_producto.querySelector('.nameProductPopUp').textContent =  obj_prod.querySelector('h2').textContent;
  template_prop_producto.querySelector('.pricePopUp').textContent =  obj_prod.querySelector('p').textContent;
 
 
  template_prop_producto
  .querySelector('img')
  .setAttribute('src', obj_prod.querySelector('img').getAttribute('src'));
  
 
  
  const clone = template_prop_producto.cloneNode(true);
  prod_modal.appendChild(clone);

  //template_prop_producto

}
const SaveLocalStorage = () => {
  const ls = 0;
  if (ls == 0) {
    console.log('estoy solo probando el prettier json');
  }
};

const Empty_Cart = () => {
  my_car = {};
  paintListCarro();
};



//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
