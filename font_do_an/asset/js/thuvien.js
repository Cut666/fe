
      const id = localStorage.getItem("id");
      async function refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const token = localStorage.getItem("token")
      const response = await fetch('http://localhost:8080/api/auth/refreshtoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` +token
        },
        body:JSON.stringify({
            refreshToken:refreshToken
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        const newToken = data.accessToken;
        localStorage.setItem('token', newToken);
      } else {
        window.location.href="http://127.0.0.1:5500/signin.html"
      }
    } catch (error) {
      console.log('Lỗi kết nối');
    }
    setTimeout(refreshToken, 50000);
  }
  window.addEventListener('DOMContentLoaded', function() {
    refreshToken(); 
  });
  refreshToken()
      getrole()
        function getrole() {
            const token = localStorage.getItem("token");
        fetch(`http://localhost:8080/library/getUser?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
           render(data)
           if(data.roles[0].name=="BUY"){
            document.getElementById("rental").style.display="block"
            document.getElementById("updaterole").style.display="none"
       
           }else{
            document.getElementById("rental").style.display="none"
            document.getElementById("updaterole").style.display="block"
            function showDiv() {
  document.getElementById("ads").style.display = "block";
  console.log(document.getElementById("ads"));
}
setTimeout(showDiv, 10000);
function hideDiv() {
  document.getElementById("ads").style.display = "none";
  setTimeout(showDiv, 30000);
}

document.getElementById("ads").addEventListener("click", hideDiv);
        }
          })
          .catch((error) => {
            console.log(error);
          });
    }
    function render(data){
        var tax;
        var name;
        var phone;
        var address;
        var gmail;
        var role;
        if(data.tax==null){
            tax=""
        }else{
            tax=data.tax
        }
        if(data.name==null){
            name=""
        }else{
            name=data.name
        }
        if(data.phone==null){
            phone=""
        }else{
            phone=data.phone
        }
        if(data.address==null){
            address=""
        }else{
            address=data.address
        }
        if(data.email==null){
            gmail=""
        }else{
            gmail=data.email
        }
        if(data.roles[0].name=="FREE"){
            role="FREE"
        }else{
            role="VIP"
        }
        
        table=`<form class="inline-form" style="display: block; margin-left: 40rem;margin-right: 50rem;">
                    <div class="group">
                        <label >Mã số thuế:</label>
                        <input type="text"  name="tax"  placeholder=""value="${tax}">
                    </div>
                    <div class="group">
                        <label >Tên thư viện:</label>
                        <input type="text"  name="name"  placeholder="" value="${name}">
                    </div>
                    <div class="group">
                        <label >Số điện thoại:</label>
                        <input type="text"  name="phone" placeholder="" value="${phone}">
                    </div>
                    <div class="group">
                        <label >Địa Chỉ:</label>
                        <input type="text"  name="address"  placeholder="" value="${address}">
                    </div>
                    <div class="group">
                        <label >Gmail:</label>
                        <input type="email" id="5" name="gmail"  placeholder="" value="${gmail}"disabled required>
                    </div>
                    <div class="group">
                        <label >Tài khoản:</label>
                        <input type="text" id="5" name="role"  placeholder="" value="${role}" disabled required>
                    </div>
                        <p>&nbsp;</p>
                        <input type="submit" id ="create" class="btn btn-green search" style="width: 25%;" value="Save">
                </form>`
                document.getElementById("inline-f").innerHTML=table
    }
    const library = document.getElementById("inline-f")
    library.addEventListener("submit", function (e){
        e.preventDefault();
        
        const token = localStorage.getItem("token")
        const id = localStorage.getItem("id")
        if(!id){
            alert("Yêu cầu đăng nhập");
            return;
        }
        var tax= document.querySelector('input[name="tax"]').value;
        var name= document.querySelector('input[name="name"]').value;
        var phone= document.querySelector('input[name="phone"]').value;
        var address= document.querySelector('input[name="address"]').value;
        fetch("http://localhost:8080/library/updatelibrary",
            {
                method:"PUT",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token,
                },
                body:JSON.stringify({
                    id:id,
                    tax:tax,
                    name:name,
                    phone:phone,
                    address:address
                })
            }).then((data)=>{
            return data.json()
        }).then((data)=>{alert(data.message)
        }).catch(error=> console.log(error))
    })


    const updaterole1 = document.getElementById("updaterole1")
    updaterole1.addEventListener("click", function (e){
        const token = localStorage.getItem("token");
        e.preventDefault();
        fetch(`http://localhost:8080/payment/create_payment?accountId=${id}`,
            {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token,
                }
            }).then((data)=>{
            return data.json()
        }).then((data)=>{
            console.log(data.url);
            if (data && data.url) {
            window.location.href = data.url;
        }
        }).catch(error=> {
            console.log(error)
           
        } )
    })