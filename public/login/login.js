const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if ((username === "yen" && password === "admin") || (username === "thanh" && password ==="admin")) {
        // alert("Đăng nhập thành công.");
        //location.href = 'https://homeautoty.web.app'
        location.href = "./control/index.html"
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không chính xác");
    }
})