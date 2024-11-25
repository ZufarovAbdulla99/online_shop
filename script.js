const filters = document.querySelector(".filters");
const productsContainer = document.querySelector(".products");
const select = document.querySelector("#sort");

(function () {
  // renderCategories();
  // renderProducts()
})();

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
  } catch (error) {
    console.error(error);
  } finally {
  }
}

async function renderProducts() {
  showSpinner(productsContainer);
  try {
    let products = await fetchProducts();
    const items = products.map(
      (product) => `
            <div class="card">
            <img src="${product.image}" alt="${product.title}" />
            <h3><a href=".product.html?id=${product.id}">${
        product.title
      }</a></h3>
            <p>${product.price}</p>
            <div>
                <span>${"⭐".repeat(Math.round(product.rating.rate))}</span>
                <span>${product.rating.count}</span>
            </div>
            </div>
            `
    );
    productsContainer.innerHTML = items.join("");
  } catch (error) {
    console.error(error);
  } finally {
    hideSpinner(productsContainer);
  }
}

// renderProducts();

select.onchange = async function () {
  // console.log()
  let products_ = await sortedProducts(true);
  if (select.value === "cheap") {
    products_ = await sortedProducts(true);
  } else if (select.value === "expensive") {
    products_ = await sortedProducts(false);
  }

  // showSpinner(productsContainer);
  const items = products_.map(
    (product) => `
          <div class="card">
          <img src="${product.image}" alt="${product.title}" />
          <h3><a href=".product.html?id=${product.id}">${product.title}</a></h3>
          <p>${product.price}</p>
          <div>
              <span>${"⭐".repeat(Math.round(product.rating.rate))}</span>
              <span>${product.rating.count}</span>
          </div>
          </div>
          `
  );
  productsContainer.innerHTML = items.join("");
  // hideSpinner(productsContainer);
  // renderProducts();
};

async function fetchCategories() {
  showSpinner(filters);
  try {
    const categories = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return await categories.json();
  } catch (error) {
    console.error(error);
  } finally {
    hideSpinner(filters);
  }
}

function diplayCategoryItems(items) {
  let displayMenu = items.map(function (item) {
    // console.log(item);

    return `
          <div class="card">
          <img src="${item.image}" alt="${item.title}" />
          <h3><a href=".product.html?id=${item.id}">${item.title}</a></h3>
          <p>${item.price}</p>
          <div>
              <span>${"⭐".repeat(Math.round(item.rating.rate))}</span>
              <span>${item.rating.count}</span>
          </div>
          </div>
          `;
  });
  displayMenu = displayMenu.join("");
  // console.log(displayMenu);
  // productsContainer.innerHTML = ""
  productsContainer.innerHTML = displayMenu;
}

async function renderCategories() {
  const categories = await fetchCategories();
  categories.forEach((category) => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("btn");
    button.dataset.id = category;

    li.append(button);
    filters.append(li);
  });

  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const category = e.currentTarget.dataset.id;
      // console.log(category);
      const allProducts = await fetchProducts()
      const selectedProductsByCategory = allProducts.filter((product) => {
        if(product.category === category)
          return product
      })
      diplayCategoryItems(selectedProductsByCategory)
    });
  });
}

function showSpinner(containerNode) {
  containerNode.insertAdjacentHTML("afterbegin", "<div class='spinner'></div>");
}

function hideSpinner(containerNode) {
  const spinner = containerNode.querySelector(".spinner");
  spinner.hidden = true;
}

async function sortedProducts(order) {
  const sortedProducts = await fetchProducts();
  return order
    ? sortedProducts.sort(function (a, b) {
        return a.price - b.price;
      })
    : sortedProducts.sort(function (a, b) {
        return b.price - a.price;
      });
}

renderProducts()
renderCategories()