const register = document.getElementById("register-form")
const username = document.getElementById("username")
const password = document.getElementById("password")
const email = document.getElementById("email")
register.addEventListener("submit", function (e) {
    e.preventDefault();
    const usernameValue = username.value;
    const passwordValue = password.value;
    const emailValue = email.value;
var user = {
    username: usernameValue,
    password: passwordValue,
    email: emailValue
}
var api = "http://localhost:8080/api/auth/signup"
var course = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
}
localStorage.setItem(usernameValue,user)
    fetch(api,course)
    .then((data) => {
        return data.json()
    }).then((data) => {
        alert(data.message)
    }).catch(error => console.log(error))
})