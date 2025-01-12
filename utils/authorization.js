import { getCookies } from "./cookies.js";

const authHandler = () => {
    const cookie = getCookies();
    const url = location.href;

    if (
        (cookie && url.includes("auth")) ||
        (!cookie && url.includes("dashboard"))
    ) {
        location.assign("index.html");
        return false;
    }
};

export default authHandler;
