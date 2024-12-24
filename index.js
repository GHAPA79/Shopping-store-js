import { getCookies } from "./utils/cookies.js";
import { getData } from "./utils/httpReq.js";
import { shortenText } from "./utils/stringFunction.js";

let allProducts = null;
let search = "";
let category = "all";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const searchButton = document.querySelector("button");
const searchInput = document.querySelector("input");
const categoriesFilter = document.querySelectorAll("li");

const showProducts = (products) => {
    mainContent.innerHTML = "";

    products.forEach((product) => {
        const jsx = `
            <div>
                <img src="${product.image}" alt="${product.title}" />
                <h4>${shortenText(product.title)}</h4>
                <div id="price">
                    <p>${product.price}</p>
                    <button>
                        Buy
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
                <div id="rate">
                    <i class="fa-solid fa-star"></i>
                    <span>${product.rating.rate}</span>
                </div>
                <div id="count">
                    <i class="fa-solid fa-user"></i>
                    <span>${product.rating.count}</span>
                </div>
            </div>
        `;
        mainContent.innerHTML += jsx;
    });
};

const init = async () => {
    const cookie = getCookies();
    cookie
        ? (loginButton.style.display = "none")
        : (dashboardButton.style.display = "none");

    allProducts = await getData("products");
    showProducts(allProducts);
};

const filterProducts = () => {
    const filteredProducts = allProducts.filter((product) => {
        if (category === "all") {
            return product.title.toLowerCase().includes(search);
        } else {
            return (
                product.title.toLowerCase().includes(search) &&
                product.category.toLowerCase() === category
            );
        }
    });

    showProducts(filteredProducts);
};

const searchHandler = () => {
    search = searchInput.value.trim().toLowerCase();
    filterProducts();
};

const categoriesFilterHandler = (event) => {
    category = event.target.innerText.toLowerCase();

    categoriesFilter.forEach((item) => {
        if (item.innerText.toLowerCase() === category) {
            item.className = "selected";
        } else {
            item.className = "";
        }
    });

    filterProducts();
};

document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
categoriesFilter.forEach((item) => {
    item.addEventListener("click", categoriesFilterHandler);
});
