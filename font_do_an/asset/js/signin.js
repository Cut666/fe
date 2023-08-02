const login = document.getElementById("login")
const username = document.getElementById("username")
const pass = document.getElementById("password")
login.addEventListener("submit", function (e){
    e.preventDefault();
    const emailValue = username.value;
    const passValue = pass.value;
    fetch("http://localhost:8080/api/auth/signin",
        {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username:emailValue,
                password: passValue
            })
        }).then(response => {
            if (response.status === 401) {
              throw new Error("Tài khoản hoặc mật khẩu của bạn không đúng");
            }
            return response.json();
    }).then((data)=>{
        window.location.href="http://127.0.0.1:5500/home.html"
localStorage.setItem("token",data.accessToken);
localStorage.setItem("id",data.id)
localStorage.setItem("refreshToken",data.refreshToken)
    })
    .catch(error => alert(error.message));
})