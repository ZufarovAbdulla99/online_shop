const product1 = `
    <div class="product">
      <div class="product-image"></div>
      <div class="product-info">
        <h2 class="product-title">Product Name</h2>
        <p class="product-price">$99.99</p>
        <p class="product-description">Product description goes here. This is a detailed description.</p>
        <button class="add-to-cart">Add to Cart</button>
        <div class="product-details">
          <ul>
            <li>Category: </li>
            <li>Rating: </li>
            <li>Rating Count: </li>
          </ul>
        </div>
      </div>
    </div>
`;

const productContainer = document.querySelector(".product");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id") || 1;

console.log(productId);
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((response) => response.json())
  .then((product) => {
    productContainer.innerHTML = `
    <div class="product">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">$${product.price}</p>
        <p class="product-description">${product.description}</p>
        <button class="add-to-cart">Add to Cart</button>
        <div class="product-details">
          <ul>
            <li>Category: ${product.category}</li>
            <li>Rating: ${product.rating?.rate}</li>
            <li>Rating Count: ${product.rating?.count}</li>
          </ul>
        </div>
      </div>
    </div>
`;
  });