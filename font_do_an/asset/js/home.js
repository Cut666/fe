
    const id = localStorage.getItem("id")
    async function refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
       token = localStorage.getItem("token")
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
    //1.Tổng hợp công nợ
    
    async function debt() {
        const token = localStorage.getItem("token")
        var listsupplier =[];
  try {
    var startDate = document.querySelector('input[name="startDate"]').value;
    var endDate = document.querySelector('input[name="endDate"]').value;
    headerdebt();
    if(startDate==""||endDate==""){
            alert("nhập đầy đủ ngày bắt đầu và kết thúc")
            return;
    }else if(startDate>endDate){
            alert("ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc")
    }else{
    const response = await fetch(`http://localhost:8080/supplier/getin?id=${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
    const data1 = await response.json();
    for (let index = 0; index < data1.length; index++) {
      listsupplier.push(data1[index]);
    }
    for (let i = 0; i < listsupplier.length; i++) {
      let a;
      if (listsupplier[i].cccd === null) {
        a = listsupplier[i].taxcode;
      } else {
        a = listsupplier[i].cccd;
      }
      const response2 = await fetch(`http://localhost:8080/api/report/collectin?id=${id}&code=${a}&startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      const response3 = await fetch(`http://localhost:8080/api/report/spendin?id=${id}&code=${a}&startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      const response4 = await fetch(`http://localhost:8080/api/report/collect?id=${id}&code=${a}&startDate=${startDate}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      const response5 = await fetch(`http://localhost:8080/api/report/spend?id=${id}&code=${a}&startDate=${startDate}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      const data3 = await response3.json();
      const data2 = await response2.json();
      const data4 = await response4.json();
      const data5 = await response5.json();
      listsupplier[i].phaithu = parseInt(data2);
      listsupplier[i].phaithutruoc = parseInt(data4);
      listsupplier[i].phaitra = parseInt(data3);
      listsupplier[i].phaitratruoc = parseInt(data5);
    }
    renderDebt(listsupplier);
}
  }catch (error) {console.log(error);}
}
// tìm kiếm
async function search() {
    const token = localStorage.getItem("token")
    try {
        var startDate = document.querySelector('input[name="startDate"]').value;
    var endDate = document.querySelector('input[name="endDate"]').value;
        var cccd= document.querySelector('input[name="search"]').value;
        if(!cccd){
            debt()
            
        }else{
            const response = await fetch(`http://localhost:8080/supplier/getByCCCDORTax?id=${id}&cccd=${cccd}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
    const data = await response.json();
    localStorage.setItem("data",JSON.stringify(data))
        }
        const data = JSON.parse(localStorage.getItem("data"))
    let a;
      if (data.cccd === null) {
        a = data.taxcode;
      } else {
        a = data.cccd;
      }
      const response2 = await fetch(`http://localhost:8080/api/report/collectin?id=${id}&code=${a}&startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      const response3 = await fetch(`http://localhost:8080/api/report/spendin?id=${id}&code=${a}&startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      const response4 = await fetch(`http://localhost:8080/api/report/collect?id=${id}&code=${a}&startDate=${startDate}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      const response5 = await fetch(`http://localhost:8080/api/report/spend?id=${id}&code=${a}&startDate=${startDate}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      const data3 = await response3.json();
      const data2 = await response2.json();
      const data4 = await response4.json();
      const data5 = await response5.json();
      data.phaithu = parseInt(data2);
      data.phaithutruoc = parseInt(data4);
      data.phaitra = parseInt(data3);
      data.phaitratruoc = parseInt(data5);
      var data1 =[];
      data1.push(data)
      renderDebt(data1);
    }catch (error) {console.log(error);}
}
    //hiển thị tổng hợp công nợ
    function headerdebt(){
        table=`<h4 class="painel-title" id="header">Tổng hợp công nợ</h4>
        <div>
            <input type="text" style="height: 30px; border-radius: 5px; border-color: rgb(134, 134, 119);border-width: 0.5px; padding-left: 5px;" name="search" id="search" placeholder="Nhập CCCD/Tax">
                <button onclick="search()" type="submit" style="height: 30px; border-radius: 5px; border:none; background-color: #00C86F;color: white;padding:0px 10px;margin-left: 20px;" > Tìm kiếm</button>
                </div>
        `
        document.getElementById("header").innerHTML=table
    }
    
    function renderDebt(data){    
    table=`<tr>
                <th style="width: 18%;">CCCD/TAX</th>
                <th style="width: 28%;">Tên</th>
                <th style="width: 18%;">Phải thu phát sinh</th>
                <th style="width: 18%;">Phải trả phát sinh</th>
                <th style="width: 18%;">Phải thu còn</th>
            </tr>`
        for(let i=0;i<data.length;i++){
            var b = data[i].phaithu-data[i].phaitra
            if(data[i].cccd===null){
        var a = data[i].taxcode
    }else{
        var a = data[i].cccd
    }
            table +=`
            <tr>
                <th style="width: 18%;">${a}</th>
                <th style="width: 28%;"></th>
                <th style="width: 18%;"></th>
                <th style="width: 18%;">Số dư đầu kỳ</th>
                <th style="width: 18%;">${data[i].phaithutruoc-data[i].phaitratruoc}</th>
            </tr>
            <tr>
        <td style="width: 18%;"><input style="border: none; " type="text" id="${data[i].id}" value="${a}" disabled required></td>
        <td style="width: 28%;"><input style="border: none; " type="text"  id="${data[i].name}" value="${data[i].name}" disabled required></td>
        <td style="width: 18%;"><input style="border: none; " type="number"id="${data[i].phaithu}"  value="${data[i].phaithu}"disabled required></td>
        <td style="width: 18%;"><input style="border: none; " type="number" id="${data[i].phaitra}"  value="${data[i].phaitra}"disabled required></td>
        <td style="width: 18%;"><input style="border: none; " type="number" id="${b}"  value="${b}"disabled required></td>
        </tr> 
        <tr>
                <th style="width: 18%;">${a}</th>
                <th style="width: 28%;"></th>
                <th style="width: 18%;"></th>
                <th style="width: 18%;">Số dư cuối kỳ</th>
                <th style="width: 18%;">${data[i].phaithutruoc-data[i].phaitratruoc+b}</th>
            </tr>`
        }
        document.getElementById("ta").innerHTML=table
    }

    //2 doanh thu bán hàng
    async function sell(){
        const token = localStorage.getItem("token")
    try {
    var startDate = document.querySelector('input[name="startDate"]').value;
    var endDate = document.querySelector('input[name="endDate"]').value;
    headersell()
    if(startDate==""||endDate==""){
            alert("nhập đầy đủ ngày bắt đầu và kết thúc")
            return;
    }else if(startDate>endDate){
            alert("ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc")
    }else{
        const response = await fetch(`http://localhost:8080/api/report/listsell?id=${id}&startDate=${startDate}&endDate=${endDate}`,{
            method:"GET",
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
            },
        });
        const response1 = await fetch(`http://localhost:8080/api/report/totalmoneysell?id=${id}&startDate=${startDate}`,{
            method:"GET",
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
            },
        });
        const data = await response.json();
        const data1 = await response1.json();
        rendersell(data,data1)
        }
    }catch (error) {console.log(error);} 
    }
    function headersell(){
        table=`<h4 class="painel-title" id="header">Doanh thu bán sách</h4>`
        document.getElementById("header").innerHTML=table
    }
    function rendersell(data,data1){
        table = `<tr>
                <th style="width: 15%;">Mã</th>
                <th style="width: 15%;">Ngày bán</th>
                <th style="width: 35%;">Nội dung</th>
                <th style="width: 20%;">Đối tượng</th>
                <th style="width: 15%;">Tiền</th>
            </tr>`
            table+=`<tr>
                <th style="width: 15%;"></th>
                <th style="width: 15%;"></th>
                <th style="width: 35%;"></th>
                <th style="width: 20%;">Số dư đầu kỳ</th>
                <th style="width: 15%;">${data1}</th>
            </tr>`
            var total=0;
        for(let i=0;i<data.length;i++){
          total+=data[i].money
            table +=`<form>
            <tr>
        <td style="width: 15%;"><input style="border: none; " type="text" id="${data[i].id}" value="${data[i].code}" disabled required></td>
        <td style="width: 15%;"><input style="border: none; " type="date"  id="${data[i].paymentDate}" value="${data[i].paymentDate}" disabled required></td>
        <td style="width: 35%;"><input style="border: none; " type="text"id="${data[i].note}"  value="${data[i].note}"disabled required></td>
        <td style="width: 20%;"><input style="border: none; " type="text" id="${data[i].subjects.name}"  value="${data[i].subjects.name}"disabled required></td>
        <td style="width: 15%;"><input style="border: none; " type="number" id="${data[i].money}"  value="${data[i].money}"disabled required></td>
        </tr></form> `
        }
        table+=`<tr>
                <th style="width: 15%;"></th>
                <th style="width: 15%;"></th>
                <th style="width: 35%;"></th>
                <th style="width: 20%;">Số dư cuối kỳ</th>
                <th style="width: 15%;">${data1+total}</th>
            </tr>`
        document.getElementById("ta").innerHTML=table
    }
      //3 doanh thu thuê sách
      async function rerental(){
        const token = localStorage.getItem("token")
    try {
    var startDate = document.querySelector('input[name="startDate"]').value;
    var endDate = document.querySelector('input[name="endDate"]').value;
    headerrerental()
    if(startDate==""||endDate==""){
            alert("nhập đầy đủ ngày bắt đầu và kết thúc")
            return;
    }else if(startDate>endDate){
            alert("ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc")
    }else{
        const response = await fetch(`http://localhost:8080/api/report/listrerental?id=${id}&startDate=${startDate}&endDate=${endDate}`,{
            method:"GET",
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
            },
        });
        const response1 = await fetch(`http://localhost:8080/api/report/totalmoneyrerental?id=${id}&startDate=${startDate}`,{
            method:"GET",
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
            },
        });
        const data = await response.json();
        const data1 = await response1.json();
        renderrerental(data,data1)
        }
    }catch (error) {console.log(error);} 
    }
    function headerrerental(){
        table=`<h4 class="painel-title" id="header">Doanh thu bán sách</h4>`
        document.getElementById("header").innerHTML=table
    }
    function renderrerental(data,data1){
        table = `<tr>
                <th style="width: 15%;">Mã</th>
                <th style="width: 15%;">Ngày thuê</th>
                <th style="width: 35%;">Nội dung</th>
                <th style="width: 20%;">Đối tượng</th>
                <th style="width: 15%;">Tiền</th>
            </tr>`
            table+=`<tr>
                <th style="width: 15%;"></th>
                <th style="width: 15%;"></th>
                <th style="width: 35%;"></th>
                <th style="width: 20%;">Số dư đầu kỳ</th>
                <th style="width: 15%;">${data1}</th>
            </tr>`
            var total=0;
            console.log(data);
        for(let i=0;i<data.length;i++){
          total+=data[i].totalprice
            table +=`<form>
            <tr>
        <td style="width: 15%;"><input style="border: none; " type="text" id="${data[i].id}" value="${data[i].code}" disabled required></td>
        <td style="width: 15%;"><input style="border: none; " type="date"  id="${data[i].dateAdd}" value="${data[i].dateAdd}" disabled required></td>
        <td style="width: 35%;"><input style="border: none; " type="text"id="${data[i].note}"  value="${data[i].note}"disabled required></td>
        <td style="width: 20%;"><input style="border: none; " type="text" id="${data[i].subjects.name}"  value="${data[i].subjects.name}"disabled required></td>
        <td style="width: 15%;"><input style="border: none; " type="number" id="${data[i].totalprice}"  value="${data[i].totalprice}"disabled required></td>
        </tr></form> `
        }
        table+=`<tr>
                <th style="width: 15%;"></th>
                <th style="width: 15%;"></th>
                <th style="width: 35%;"></th>
                <th style="width: 20%;">Số dư cuối kỳ</th>
                <th style="width: 15%;">${data1+total}</th>
            </tr>`
        document.getElementById("ta").innerHTML=table
    }
    //hiển thị số tiền
    money()
    async function money(){
        const token = localStorage.getItem("token")
    try {
        const response1 = await fetch(`http://localhost:8080/api/report/moneycash?id=${id}`,{
            method:"GET",
        headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token,
        },
        }) 
        const response2 = await fetch(`http://localhost:8080/api/report/moneywallet?id=${id}`,{
            method:"GET",
        headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token,
        },
        }) 
        const data1 = await response1.json();
        const data2 = await response2.json();
rendermoney(data1,data2)
    }catch (error) {console.log(error);} 
}
function rendermoney(data1,data2){
table=`<div class="grid"id="money">
        <div class="mini-reports bg-orange">
                <div class="l" >
                    <span>Tiền mặt</span>
                    <span>VND: ${data1}đ</span>
                </div>
                <div class="r">
                    <i class="fas fa-donate c-orange"></i>
                </div>
        </div>
        <div class="mini-reports bg-red">
                <div class="l" id="wallet">
                    <span>Tiền tài khoản</span>
                    <span>VND: ${data2}đ</span>
                </div>
                <div class="r">
                    <i class="fa fa-user c-red"></i>
                </div>
        </div>
    </div>`
    document.getElementById("money").innerHTML=table
}
user()
async function user(){
    const token = localStorage.getItem("token")
    try {
        const response1 = await fetch(`http://localhost:8080/library/getUser?id=${id}`,{
            method:"GET",
        headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token,
        },
        }) 
        const data1 = await response1.json();
        renderUser(data1.username)
    }catch (error) {console.log(error);} 
}
function renderUser(data){
    table=`<span>${data}</span>`
        document.getElementById("username").innerHTML=table
}
getrole()
        function getrole() {
            const token = localStorage.getItem("token")
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
           if(data.roles[0].name=="BUY"){
            document.getElementById("rental").style.display="block"
            document.getElementById("ads").style.display = "none";
       
           }else{
            document.getElementById("rental").style.display="none"
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

     function LogoutMess(){
      const token = localStorage.getItem("token")
      if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        fetch('http://localhost:8080/api/auth/signout', {
            method: 'POST',
            body: {},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                localStorage.clear();
                window.location.href = "http://127.0.0.1:5500/signin.html";
            })
            .catch(error => console.error(error));
    }
}
