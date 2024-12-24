import authHandler from "./utils/authorization.js";
import { setCookies } from "./utils/cookies.js";
import { postData } from "./utils/httpReq.js";
import { validationForm } from "./utils/validation.js";

const inputsBox = document.querySelectorAll("input");
const loginButton = document.querySelector("button");

const submitHandler = async (event) => {
    event.preventDefault();

    const username = inputsBox[0].value;
    const password = inputsBox[1].value;

    const validation = validationForm(username, password);
    if (!validation) return;

    const response = await postData("auth/login", { username, password });
    setCookies(response.token);
    location.assign("index.html");
};

loginButton.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", authHandler);
