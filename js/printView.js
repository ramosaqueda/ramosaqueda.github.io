import { products } from '../utils/data.js';
import { containProducts } from '../js/nodes.js';

const templateCard = (product) => {
  return `
        <div class="card">
                <figure class="containImg">
                    <img src="public/images/products/${product.url}" alt="" class="imgCard">
                </figure>
                <h2 class="nameProduct">${product.name}</h2>
                <div>
                    <p class="price">$${product.price}</p>
                    <button id="${product.id}" class="buy" >Add ${product.id}</button>
                          </div>
        </div>
    `;
};

const view = () => {
  const view = products.map((product) => templateCard(product));
  containProducts.innerHTML = view.join(' ');
};

export { view };
