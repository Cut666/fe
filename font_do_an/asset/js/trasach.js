
const id = localStorage.getItem("id")
// 
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

let currentPage = 1;
    const pageSize = 10; // Số mục trên mỗi trang
    let totalPages = 0; // Tổng số trang
// 
//cài đặt tỷ lệ tiền cọc
function updateuser(){
    const token = localStorage.getItem("token")
    var updateuser = document.querySelector('input[name="updateuser"]').value
    fetch(`http://localhost:8080/reRental/updateRate?userid=${id}&d=${updateuser}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
    alert(data1.message)
    location.reload()
}).catch((error)=>{console.log(error);}) 
}
getDepositPercentage()
function getDepositPercentage(){
    const token = localStorage.getItem("token")
    fetch(`http://localhost:8080/reRental/getRate?id=${id}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
    renderDepositPercentage(data1)
}).catch((error)=>{console.log(error);})
}
function renderDepositPercentage(data){
html=`<div class="group" style="margin: 1rem 5rem; display: inline-block;">
                            <label for="">Tỷ lệ phạt:</label>
                            <input type="number" style="height: 40px;width: 40px;margin: 0px 5px;border-radius: 5px;" name="updateuser" value=${data}>
                            <a onclick="updateuser()" class="btn btn-green search" style="width: 40%; padding: 1.2rem 2rem; margin-top: 1rem; color: #fff;">Save</a>
                        </div>`
                        document.getElementById("updateuser").innerHTML=html
}
//cài đặt số ngày thuê tối đa
function updateuserdate(){
    const token = localStorage.getItem("token")
    var updateuserdate = document.querySelector('input[name="updateuserdate"]').value
    fetch(`http://localhost:8080/reRental/updatemaxdate?userid=${id}&d=${updateuserdate}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
    alert(data1.message)
    location.reload()
}).catch((error)=>{console.log(error);}) 
}
getDepositPercentagedate()
function getDepositPercentagedate(){
    const token = localStorage.getItem("token")
    fetch(`http://localhost:8080/reRental/getmaxdate?id=${id}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
    renderDepositPercentagedate(data1)
}).catch((error)=>{console.log(error);})
}
function renderDepositPercentagedate(data){
html=`<div class="group" style="margin: 1rem 5rem; display: inline-block;" id="updateuserdate">
                            <label for="">số ngày thuê tối đa:</label>
                            <input type="number" style="height: 40px;width: 40px;margin: 0px 5px;border-radius: 5px;" name="updateuserdate"value=${data}>
                            <a onclick="updateuserdate()" class="btn btn-green search" style="width: 40%; padding: 1.2rem 2rem; margin-top: 1rem; color: #fff;">Save</a>
                        </div>`
                        document.getElementById("updateuserdate").innerHTML=html
}
        //1 thêm phiếu mua 
       
//nút save thêm phiếu bán
const rentaladd = document.getElementById("save-btn-add")
rentaladd.addEventListener("click", function (e){
    e.preventDefault();
    const token = localStorage.getItem("token")
    var listsp =JSON.parse(localStorage.getItem("listsp")) 
    var noteadd = document.querySelector('input[name="noteadd"]').value;
    var cccdkhadd= document.querySelector('input[name="cccdkhadd"]').value;
    var returndateadd= document.querySelector('input[name="returndateadd"]').value;
    var codeadd= document.querySelector('input[name="codeadd"]').value;
    var searchcoderentaladd= document.querySelector('input[name="searchcoderentaladd"]').value;
    var totalAll= localStorage.getItem("totalAll")
    var warehouseProducts = listsp.map(function(product){
        return{
            "product":{
                "id":product.id,
                "code":product.code,
                "quantity":product.requantity
            }
        }
    })
    if (dateadd === "") {
    alert("Cần nhập ngày");
    return;
}
var body
    body=JSON.stringify({
                code:codeadd,
                dateRe:returndateadd,
                note:noteadd,
                rental:{
                    code:searchcoderentaladd
                },
                receiptDTO:{
                    user:{id},
                    warehouseProducts:warehouseProducts
                },
                user:{
                    id:id
                }
            })
    fetch(`http://localhost:8080/reRental/create?cccd=${cccdkhadd}`,
        {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
            },
            body: body
        })
        .then((data)=>{
        return data.json()
    }).then((data)=>{
        alert(data.message)
        getlist()
        fetch(`http://localhost:8080/reRental/updateStatusReRental?id=${id}&code=${codeadd}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
}).catch((error)=>{console.log(error);})
        location.reload()
    }).catch(error=> console.log(error))
})
//nút hiển thị phiếu tra
function rental(){
const token = localStorage.getItem("token")
localStorage.setItem("dateout",0)
localStorage.setItem("daysDiff",0)
localStorage.setItem("totaladd",0)
localStorage.setItem("timeOrder",0)
localStorage.setItem("priceRental",0)
fetch(`http://localhost:8080/reRental/getDate`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
    getDate(data1)
}).catch((error)=>{console.log(error);}) 
fetch(`http://localhost:8080/reRental/generateCode?id=${id}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.text();
}).then((data1)=>{
    generateCode(data1)
}).catch((error)=>{console.log(error);})

}

//hiển thị ngày thuê
function getDate(data){
html =`<div style="text-align: center; font-size:15px" id="dateadd">
              <i><label for="" >Ngày:</label>
                <input type="date" name="dateadd" value="${data}"></i>
            </div>
`
document.getElementById("dateadd").innerHTML = html; 
}
//hiển thị mã code
function generateCode(data){
html=`<div style="text-align:right; font-size:15px" >
              <i><label for="" >Mã:</label>
                <input type="text" name="codeadd" value="${data}" required></i> 
            </div>`
document.getElementById("codeadd").innerHTML = html; 
}

//nút tìm kiếm đối tượng chức năng phiếu bán sách
const searchadd = document.getElementById("searchadd")
searchadd.addEventListener("click",function(e){
    const token = localStorage.getItem("token")
    e.preventDefault();
    var cccdkhadd= document.querySelector('input[name="cccdkhadd"]').value;
    if (cccdkhadd === "") {
    alert("Vui lòng nhập CCCD/Tax");
    return;
}
    fetch(`http://localhost:8080/supplier/getByCCCDORTax?id=${id}&cccd=${cccdkhadd}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
        if (!response.ok) {
            alert("Đối tượng chưa được tạo")
        }else{
            return response.json();
        }
}).then((data1)=>{
    renderSearchResultadd(data1)
}).catch((error)=>{getlist()})  
})

// nut lấy thông tin mã phiếu thuê sách cho phiếu trả

var rentalfindadd = document.getElementById("rentalfindadd")
rentalfindadd.addEventListener("click",handleSearchClick1);
function handleSearchClick1(a){
    const token = localStorage.getItem("token")
    var listsp = [];
a.preventDefault();
var code = document.querySelector('input[name="searchcoderentaladd"]').value
if(code ===""){
    alert("cần nhập mã phiếu thuê")
    return;
}
fetch(`http://localhost:8080/rental/getcode?id=${id}&cccd=${code}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{;
if(data1.message!=undefined){
    alert(data1.message)
}else{
    fetch(`http://localhost:8080/WarehouseProduct/getbyWarehouseProduct?id=${id}&code=${code}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
for (let i = 0; i < data1.length; i++) {
    data1[i].product.quantity=data1[i].quantity
  listsp.push(data1[i].product) 
}
localStorage.setItem("listsp",JSON.stringify(listsp))
rendersp(listsp)
// console.log(listsp);

}).catch((error)=>{console.log(error);}) 
renderSearchResultadd(data1[0].subjects)
localStorage.setItem("timeOrder",data1[0].timeOrder)
datefisrt(data1[0].timeOrder,data1[0].code)
localStorage.setItem("priceRental",data1[0].totalprice)
}

}).catch((error)=>{console.log(error);}) 

}

//hiển thị ngày bắt đầu thuê
function datefisrt(data,code){
html=`<div >
    <label for="" style="font-size:15px">Mã phiếu thuê:</label>
    <input type="text" name="searchcoderentaladd" placeholder="Mã" style="margin-top:10px;width:80px;"value="${code}" required>
    <label for="" style="font-size:15px; margin-left: 70px;">Ngày thuê:</label>
    <input type="date" name="rentaldate" style=""disabled required value="${data}">
  </div>`
  document.getElementById("rentaldate").innerHTML = html; 
}

// nút lấy số ngày thuê 
var datelateadd = document.getElementById("datelateadd")
datelateadd.addEventListener("click",function(e){
var timeOrder = new Date(localStorage.getItem("timeOrder")) 
var date = document.querySelector('input[name="returndateadd"]').value
var returndateadd=new Date(document.querySelector('input[name="returndateadd"]').value) ;
var timeDiff = Math.abs(returndateadd.getTime() - timeOrder.getTime());
var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
if(daysDiff==0){
    daysDiff=1
}
numberdatereRental(daysDiff,date)
localStorage.setItem("daysDiff",daysDiff)
})
//hiển thị số ngày thuê
function numberdatereRental(data,date){
html=`<div style="font-size:15px">
    <label for="" >Ngày trả:</label>
    <input type="date" name="returndateadd" style=""value="${date}" required>
    <label for="" style="margin-left: 60px;">Số ngày thuê:</label>
    <input type="number" name="numberdateadd" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data}" disabled required>
  </div>`
  document.getElementById("numberdateadd").innerHTML = html; 
}



//hàm hiển thị đối tượng cho nút thêm đối tượng phiếu bán add
function renderSearchResultadd(customer) {
console.log(customer);
var cccdkh;
if(customer.cccd!=null){
    cccdkh=customer.cccd
}else if(customer.taxcode!=null){
    cccdkh=customer.taxcode
}
const html = `
<div>
    <label for="">CCCD/TAX:</label>
    <input type="text" name="cccdkhadd" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${cccdkh}" >
    <label for="" style="margin-left: 90px;">Tên:</label>
    <input type="text" name="namekhadd" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${customer.name}" disabled>
</div>
<div>
    <label for="">Địa chỉ:</label>
    <input type="text" name="addresskhadd" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${customer.address}" disabled>
    <label for="" style="margin-left: 10px;">SĐT:</label>
    <input type="number" name="phonekhadd" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${customer.phone}" disabled>
</div>

`;
document.getElementById("search-result-add").innerHTML = html; 
}

//hiển thị sản phẩm cho nút thêm sản phẩm phiếu bán

function rendersp(data){
var listsp = data
var additionalValues = [];
var daysDiff = localStorage.getItem("daysDiff")
table = `
<table style="border: 1px solid black;" id="renderspadd">
                  <tr style="border: 1px solid black; ">
                    <th style="border: 1px solid black; text-align: center;width:80px">Mã sp</th>
                    <th style="border: 1px solid black; text-align: center;">Tên</th>
                    <th style="border: 1px solid black; text-align: center;width:100px">số lượng thuê</th>
                    <th style="border: 1px solid black; text-align: center;width:100px">số lượng trả</th>
                    <th style="border: 1px solid black; text-align: center;width:131px">Đơn giá</th>
                    <th style="border: 1px solid black; text-align: center;width:131px">Thành tiền</th>
                  </tr>
                 
                </table>
                  `
var total = 0;
    for(let i=0;i<data.length;i++){
        total += daysDiff*data[i].requantity*data[i].priceRental
            table +=`
        <tr>
    <td style="border: 1px solid black;"><input style="border: none;width:50px" type="text" id="${data[i].id}" value="${data[i].code}" disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none; " type="text" id="${data[i].name}" value="${data[i].name}" disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:50px " type="number" id="${data[i].quantity}"  value="${data[i].quantity}"disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:50px " type="number" id="additionalValue${i}" name="thai"  value="${data[i].requantity}"required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:90px " type="number" id="${data[i].priceRental}"  value="${data[i].priceRental}"disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:90px " type="number" id=""  value="${daysDiff*data[i].requantity*data[i].priceRental}"disabled required></td>
    </tr>` 
    additionalValues.push(0);
    }
    
    localStorage.setItem("totaladd",total)
    document.getElementById("renderspadd").innerHTML=table

    var addadd = document.getElementById("addadd")
addadd.addEventListener("click",function(e){
e.preventDefault();
for (let i = 0; i < additionalValues.length; i++) {
  var inputId = `additionalValue${i}`;
  var inputValue = document.getElementById(inputId).value;
  additionalValues[i] = parseFloat(inputValue);
  listsp[i].requantity=additionalValues[i] 
}
localStorage.setItem("listsp",JSON.stringify(listsp))
rendersp(listsp)
totaladd()
})
}

function totaladd(){
const token = localStorage.getItem("token")
var daysDiff = localStorage.getItem("daysDiff")
fetch(`http://localhost:8080/reRental/getmaxdate?id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
localStorage.setItem("getmaxdate",data1)
}).catch((error)=>{console.log(error);})
var a = localStorage.getItem("getmaxdate")

var dateout;
if(daysDiff-a<=0){
    dateout=0;
    localStorage.setItem("dateout",dateout)
}else{
    dateout=daysDiff-a
    localStorage.setItem("dateout",dateout)
}

fetch(`http://localhost:8080/reRental/getRate?id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
localStorage.setItem("getRate",data1)
}).catch((error)=>{console.log(error);})
var getRate = localStorage.getItem("getRate")
var total = parseInt(localStorage.getItem("totaladd"))
var fine = total/daysDiff*dateout*getRate
var priceRental =parseInt(localStorage.getItem("priceRental"))
var totalAll= total+fine
localStorage.setItem("totalAll",totalAll)
table=`<tr>
                        <th style="border: 1px solid black;width: 82%;text-align: right;">Tiền thuê:</th>
                        <th style="border: 1px solid black;">${total}</th>
                      </tr>
                  <tr>
                    <th style="border: 1px solid black;width: 82%;text-align: right;">Số ngày quá hạn:</th>
                    <th style="border: 1px solid black;">${dateout}</th>
                  </tr>
                  <tr>
                    <th style="border: 1px solid black;width: 82%;text-align: right;">Tỉ lệ phạt:</th>
                    <th style="border: 1px solid black;">${getRate}</th>
                  </tr>
                  <tr>
                    <th style="border: 1px solid black;width: 82%;text-align: right;">Tiền phạt:</th>
                    <th style="border: 1px solid black;">${fine}</th>
                  </tr>
                  <tr>
                    <th style="border: 1px solid black;width: 82%;">Tổng</th>
                    <th style="border: 1px solid black;">${totalAll}</th>
                  </tr>`
document.getElementById("totaladd").innerHTML=table
}




getlist()
// tìm kiếm
var search = document.getElementById("form-search")
search.addEventListener("submit",function(e){
e.preventDefault();
const token = localStorage.getItem("token")
var cccd = document.querySelector('input[name="search"]').value
fetch(`http://localhost:8080/reRental/getcode?cccd=${cccd}&id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data)=>{
if(cccd===""){
    getlist();
}else{
      // 
      const totalItems = data.length;
                totalPages = Math.ceil(totalItems / pageSize);

                render(data.slice((currentPage - 1) * pageSize, currentPage * pageSize));

                updatePagination();
                // 
}

}).catch((error)=>{getlist()})  
        })

//3  get danh sách
function getlist(){
const token = localStorage.getItem("token")
fetch(`http://localhost:8080/reRental/getall?id=${id}`,{
method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}).then((response)=>{
return response.json();
}).then((data)=>{
// 
const totalItems = data.length;
            totalPages = Math.ceil(totalItems / pageSize);

            render(data.slice((currentPage - 1) * pageSize, currentPage * pageSize));

            updatePagination();
            // 
}).catch((error)=>{console.log(error);})
}  
// Hiển thị màn hình chính
function render(data){
var table = document.getElementById("table-body");
        table.innerHTML = ""; // Xóa nội dung bảng cũ

    for(let i=0;i<data.length;i++){
        var row = document.createElement("tr");
        if(data[i].statusReRental==="unfinished"){
            var a = "Chưa HT"
        }else{
            var a = "Đã HT"
        }
       
        row.innerHTML +=`<form>
        <tr>
    <td><input style="border: none; " type="text" id="${data[i].id}" value="${data[i].code}" disabled required></td>
    <td><input style="border: none; " type="date"  id="${data[i].dateRe}" value="${data[i].dateRe}" disabled required></td>
    <td><input style="border: none; " type="number" id="${data[i].totalprice}"  value="${data[i].totalprice}"disabled required></td>
    <td><input style="border: none; " type="text" id="${data[i].note}"  value="${data[i].note}"disabled required></td>
    <td><input style="border: none; " type="text" id="${a}"  value="${a}"disabled required></td>
    <td><input style="border: none; " type="text" id="${data[i].warehouse.subjects.name}"  value="${data[i].warehouse.subjects.name}"disabled required></td>
    <td>
        <a href="#ex4" id="render" rel="modal:open" onclick="getupdate1(${data[i].id})" class="btn btn-orange"><i class="fa fa-edit"></i></a>
        <a href="#ex1" onclick="getcccd(${data[i].id})" class="btn btn-red" rel="modal:open"><i class="fa fa-trash"></i></a>
        
    </td>
    </tr></form> `
    table.appendChild(row);
    }
}
// Cập nhật thông tin phân trang
function updatePagination() {
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const pageInfo = document.getElementById("pageInfo");

        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        if (currentPage === 1) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }

        if (currentPage === totalPages) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }

    // Xử lý sự kiện nút Prev
    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            getlist();
        }
    });

    // Xử lý sự kiện nút Next
    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            getlist();
        }
    });
// sửa
//nút lấy tổng hợp thông tin phiếu sửa
var listspfix = [];
function getupdate1(id1){
const token = localStorage.getItem("token")
localStorage.setItem("reRentalId",id1)
listspfix = []
localStorage.setItem("listspfix",0)
localStorage.setItem("daysDiff",0)
localStorage.setItem("idfix",id1)
var retalCode =localStorage.getItem("retalCode");
//     fetch(`http://localhost:8080/rental/findbycode?id=${id}&cccd=${retalCode}`,{
//         method:"GET",
//     headers:{
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer '+ token,
//     },
//     }) .then((response)=>{
//     return response.json();
// }).then((data1)=>{
//     console.log(data1);
//     localStorage.setItem("priceRentalfix",data1.totalprice)
// }).catch((error)=>{console.log(error);}) 
fetch(`http://localhost:8080/WarehouseProduct/getbyWarehouseProduct?id=${id}&code=${retalCode}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
for (let i = 0; i < data1.length; i++) {
    data1[i].product.quantity=data1[i].quantity
    listspfix.push(data1[i].product) 
}  
}).catch((error)=>{console.log(error);}) 


fetch(`http://localhost:8080/reRental/getid?id=${id1}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
//     localStorage.setItem("rentalid",data1.id)
    renderSearchResultfixnote(data1.note);
    renderSearchResultfixcode(data1.code)
    renderSearchResultfixklatedate(data1.dateRe,data1.dayNumber)
    localStorage.setItem("daysDiff",data1.dayNumber)
    localStorage.setItem("dayNumber",data1.dayNumber)
    localStorage.setItem("retalCode",data1.rental.code)
    rentaldatefix(data1.rental.code,data1.rental.timeOrder)
    localStorage.setItem("timeOrder",data1.rental.timeOrder)
    renderSearchResultfixdate(data1.dateAdd)
    renderSearchResultfixtotal(data1.moneyRental,data1.numberDateOut,data1.fine,data1.penaltyRate,data1.totalprice)
}).catch((error)=>{getlist()}) 
fetch(`http://localhost:8080/WarehouseProduct/getbyreRental?id=${id1}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
    renderSearchResultfixsubjects1(data1[0].warehouse.subjects);
    for (let i = 0; i < data1.length; i++) {
      listspfix[i].requantity=data1[i].quantity
      listspfix[i].priceRental=data1[i].price
    }
    localStorage.setItem("listspfix",JSON.stringify(listspfix))
    renderspfix(listspfix)
// }
}).catch((error)=>{getlist()}) 
}

// // hiển thị thông tin đối tượng cho phiếu thuê sửa
function renderSearchResultfixsubjects1(data) {
if(data.cccd===null){
    var a = data.taxcode
}else{
    var a = data.cccd
}
const html = `
    <div>
        <label for="">CCCD/TAX:</label>
        <input type="text"  name="cccdkhfix" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
        <label for="" style="margin-left: 90px;">Tên:</label>
        <input type="text" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${data.name}" disabled>
    </div>
    <div>
        <label for="">Địa chỉ:</label>
        <input type="text" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${data.address}" disabled>
        <label for="" style="margin-left: 10px;">SĐT:</label>
        <input type="number" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data.phone}" disabled>
    </div>     
`;
document.getElementById("search-result-fix").innerHTML = html;
}

// hiển thị thông tin note cho phiếu mua sửa
function renderSearchResultfixnote(data){
const html = `
<div>
                <label for="" style="font-size:15px">Nội dung:</label>
                <input type="text" name="notefix" style="width: 75%; border: none; border-bottom: 1px dotted black;" value="${data}" >
              </div>
`
document.getElementById("notefix").innerHTML = html;

}
// hiển thị thông tin mã cho phiếu thuê sửa
function renderSearchResultfixcode(data){
const html = `
<div style="text-align:right; font-size:15px">
              <i><label for="" >Mã:</label>
                <input type="text" name="codefix" value="${data}" disabled required></i> 
            </div>
`
document.getElementById("codefix").innerHTML = html;

}
// hiển thị thông tin số ngày thuê cho phiếu thuê sửa
function renderSearchResultfixklatedate(date,data){
const html = `
<div style="font-size:15px" id="numberdatefix">
            <label for="" >Ngày trả:</label>
            <input type="date" name="returndatefix" style="" value="${date}" required>
            <label for="" style="margin-left: 60px;">Số ngày thuê:</label>
            <input type="number" name="numberdatefix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data}"disabled required>
          </div>
`
document.getElementById("numberdatefix").innerHTML = html;

}
// hiển thị thông tin mã phiếu thuê cho phiếu trả sửa
function rentaldatefix(data,date){
const html = `
<div id="rentaldatefix">
            <label for="" style="font-size:15px">Mã phiếu thuê:</label>
            <input type="text" name="searchcoderentalfix" placeholder="Mã" style="margin-top:10px;width:80px;" value="${data}" disabled required>
            <label for="" style="font-size:15px; margin-left: 70px;">Ngày thuê:</label>
            <input type="date" name="rentaldatefix" style="" value="${date}"disabled required>
          </div>
`
document.getElementById("rentaldatefix").innerHTML = html;

}
//hiển thị ngày bắt đầu thuê cho phiếu thuê sửa
function renderSearchResultfixdate(data){
const html = `
<div style="text-align: center; font-size:15px" >
              <i><label for="" >Ngày thuê:</label>
                <input type="date" name="datefix" value="${data}" disabled required></i>
            </div>
`
document.getElementById("datefix").innerHTML = html;

}
// //hiển thị tỉ lệ và tổng tiền thuê cho phiếu thuê sửa
function renderSearchResultfixtotal(a,b,c,d,e){
console.log(d);
const html = `
<table id="totalfix">
                <tr>
                    <th style="border: 1px solid black;width: 82%;text-align: right;">Tiền thuê:</th>
                    <th style="border: 1px solid black;">${a}</th>
                  </tr>
              <tr>
                <th style="border: 1px solid black;width: 82%;text-align: right;">Số ngày quá hạn:</th>
                <th style="border: 1px solid black;">${b}</th>
              </tr>
              <tr>
                <th style="border: 1px solid black;width: 82%;text-align: right;">Tỉ lệ phạt:</th>
                <th style="border: 1px solid black;">${d}</th>
              </tr>
              <tr>
                <th style="border: 1px solid black;width: 82%;text-align: right;">Tiền phạt:</th>
                <th style="border: 1px solid black;">${c}</th>
              </tr>
              <tr>
                <th style="border: 1px solid black;width: 82%;">Tổng</th>
                <th style="border: 1px solid black;">${e}</th>
              </tr>
            </table>
`
document.getElementById("totalfix").innerHTML = html;

}
// lấy thông tin sản phẩm cho phiếu mua sửa 
function renderspfix(data){
var additionalValues = [];
var daysDiff =parseInt(localStorage.getItem("daysDiff"))
table = `
<table style="border: 1px solid black;" id="renderspadd">
                  <tr style="border: 1px solid black; ">
                    <th style="border: 1px solid black; text-align: center;width:80px">Mã sp</th>
                    <th style="border: 1px solid black; text-align: center;">Tên</th>
                    <th style="border: 1px solid black; text-align: center;width:100px">số lượng thuê</th>
                    <th style="border: 1px solid black; text-align: center;width:100px">số lượng trả</th>
                    <th style="border: 1px solid black; text-align: center;width:131px">Đơn giá</th>
                    <th style="border: 1px solid black; text-align: center;width:131px">Thành tiền</th>
                  </tr>
                 
                </table>
                  `
var total = 0;
    for(let i=0;i<data.length;i++){
        total += daysDiff*data[i].requantity*data[i].priceRental
            table +=`
        <tr>
    <td style="border: 1px solid black;"><input style="border: none;width:50px" type="text" id="${data[i].id}" value="${data[i].code}" disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none; " type="text" id="${data[i].name}" value="${data[i].name}" disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:50px " type="number" id="${data[i].quantity}"  value="${data[i].quantity}"disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:50px " type="number" id="additionalValue${i}" name="thai"  value="${data[i].requantity}"required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:90px " type="number" id="${data[i].priceRental}"  value="${data[i].priceRental}"disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:90px " type="number" id=""  value="${daysDiff*data[i].requantity*data[i].priceRental}"disabled required></td>
    </tr>` 
    additionalValues.push(0);
    }
    
    localStorage.setItem("totalfix",total)
    document.getElementById("renderspfix").innerHTML=table
    var addfix = document.getElementById("addfix")
    addfix.addEventListener("click",function(e){
e.preventDefault();
for (let i = 0; i < additionalValues.length; i++) {
  var inputId = `additionalValue${i}`;
  var inputValue = document.getElementById(inputId).value;
  additionalValues[i] = parseFloat(inputValue);
  listspfix[i].requantity=additionalValues[i] 
}
localStorage.setItem("listspfix",listspfix)
renderspfix(listspfix)
totalfix()
})
}

function totalfix(){
const token = localStorage.getItem("token")
var daysDiff = localStorage.getItem("daysDiff")
fetch(`http://localhost:8080/reRental/getmaxdate?id=${id}`,{
method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
localStorage.setItem("getmaxdate",data1)
}).catch((error)=>{console.log(error);})
var a = localStorage.getItem("getmaxdate")
var dateout;
if(daysDiff-a<=0){
    dateout=0;
    localStorage.setItem("dateout",dateout)
}else{
    dateout=daysDiff-a
    localStorage.setItem("dateout",dateout)
}

fetch(`http://localhost:8080/reRental/getRate?id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
localStorage.setItem("getRate",data1)
}).catch((error)=>{console.log(error);})
var getRate = localStorage.getItem("getRate")
var total = parseInt(localStorage.getItem("totalfix"))
var fine = total/daysDiff*dateout*getRate
var priceRental =parseInt(localStorage.getItem("priceRentalfix"))
var totalAll= total+fine
localStorage.setItem("totalAll",totalAll)
table=`<tr>
                        <th style="border: 1px solid black;width: 82%;text-align: right;">Tiền thuê:</th>
                        <th style="border: 1px solid black;">${total}</th>
                      </tr>
                  <tr>
                    <th style="border: 1px solid black;width: 82%;text-align: right;">Số ngày quá hạn:</th>
                    <th style="border: 1px solid black;">${dateout}</th>
                  </tr>
                  <tr>
                    <th style="border: 1px solid black;width: 82%;text-align: right;">Tỉ lệ phạt:</th>
                    <th style="border: 1px solid black;">${getRate}</th>
                  </tr>
                  <tr>
                    <th style="border: 1px solid black;width: 82%;text-align: right;">Tiền phạt:</th>
                    <th style="border: 1px solid black;">${fine}</th>
                  </tr>
                  <tr>
                    <th style="border: 1px solid black;width: 82%;">Tổng</th>
                    <th style="border: 1px solid black;">${totalAll}</th>
                  </tr>`
document.getElementById("totalfix").innerHTML=table
}


// // // //sửa phieu mua hang

// nút tìm kiếm đối tượng chức năng sửa phiếu mua
const searchfix = document.getElementById("searchfix")
searchfix.addEventListener("click",function(e){
const token = localStorage.getItem("token")
    e.preventDefault();
    var cccdkhfix= document.querySelector('input[name="cccdkhfix"]').value;
    if (cccdkhfix === "") {
    alert("Vui lòng nhập CCCD/Tax");
    return;
}
    fetch(`http://localhost:8080/supplier/getByCCCDORTax?id=${id}&cccd=${cccdkhfix}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
        return response.json();
}).then((data1)=>{
    renderSearchResultfixsubjects1(data1)
}).catch((error)=>{getlist()})  
})
// nút lấy số ngày thuê 
var datelatefix = document.getElementById("datelatefix")
datelatefix.addEventListener("click",function(e){
var timeOrder = new Date(localStorage.getItem("timeOrder")) 
var date = document.querySelector('input[name="returndatefix"]').value
var returndatefix=new Date(document.querySelector('input[name="returndatefix"]').value) ;
var timeDiff = Math.abs(returndatefix.getTime() - timeOrder.getTime());
var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
if(daysDiff==0){
    daysDiff=1
}
numberdatereRentalfix(daysDiff,date)
localStorage.setItem("daysDiff",daysDiff)
})
//hiển thị số ngày thuê
function numberdatereRentalfix(data,date){
html=`<div style="font-size:15px">
    <label for="" >Ngày trả:</label>
    <input type="date" name="returndatefix" style=""value="${date}" required>
    <label for="" style="margin-left: 60px;">Số ngày thuê:</label>
    <input type="number" name="numberdatefix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data}" disabled required>
  </div>`
  document.getElementById("numberdatefix").innerHTML = html; 
}



// nút lấy thông tin đã sửa phiếu mua 
var savefix=document.getElementById("save-btn-fix")
savefix.addEventListener("click",function(e){
e.preventDefault();
var cccdkhfix = document.querySelector('input[name="cccdkhfix"]').value;
var notefix = document.querySelector('input[name="notefix"]').value;
var numberdatefix = document.querySelector('input[name="numberdatefix"]').value
localStorage.setItem("cccdkhfix",cccdkhfix)
localStorage.setItem("notefix",notefix)
localStorage.setItem("numberdatefix",numberdatefix)
})



// // // nút lưu phiếu đã sửa 
function updateCourse(){
const token = localStorage.getItem("token")
    var reRentalId = localStorage.getItem("reRentalId")
    var notefix = document.querySelector('input[name="notefix"]').value;
    var cccdkhfix= document.querySelector('input[name="cccdkhfix"]').value;
    var returndatefix= document.querySelector('input[name="returndatefix"]').value;
    var codefix= document.querySelector('input[name="codefix"]').value;
    var searchcoderentalfix= document.querySelector('input[name="searchcoderentalfix"]').value;
    var totalAll= localStorage.getItem("totalAll")
    var warehouseProducts = listspfix.map(function(product){
        return{
            "product":{
                "id":product.id,
                "code":product.code,
                "quantity":product.requantity
            }
        }
    })
    if (dateadd === "") {
    alert("Cần nhập ngày");
    return;
}
var body
    body=JSON.stringify({
                id:reRentalId,
                code:codefix,
                dateRe:returndatefix,
                note:notefix,
                rental:{
                    code:searchcoderentalfix
                },
                receiptDTO:{
                    user:{id},
                    warehouseProducts:warehouseProducts
                },
                user:{
                    id:id
                }
            })
    fetch(`http://localhost:8080/reRental/update?cccd=${cccdkhfix}`,
        {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
            },
            body: body
        })
        .then((data)=>{
        return data.json()
    }).then((data)=>{
        alert(data.message)
        getlist()
        fetch(`http://localhost:8080/reRental/updateStatusReRental?id=${id}&code=${codefix}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
    location.reload()
}).catch((error)=>{console.log(error);})
    }).catch(error=> console.log(error))
}

// xóa 
function getcccd(id){
localStorage.setItem("reRentalid",id)
}
function deleteCourse(){
const token = localStorage.getItem("token")
var cccd = localStorage.getItem("reRentalid")
fetch(`http://localhost:8080/reRental/delete?id=${cccd}`,{
method:"DELETE",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}).then((response)=>{
return response.json();
}).then((data1)=>{
alert(data1.message)
getlist();
}).catch((error)=>{console.log(error);}) 

}
function close(){
getlist();
}
function close1(){
getlist();
} 
//nut tạo phiếu bán sách mất
var listspsell=[];
function createsell(){
const token = localStorage.getItem("token")
var cccd = document.querySelector('input[name="createsell"]').value
if(cccd===""){
    alert("Nhập mã phiếu trả")
    return;
}
fetch(`http://localhost:8080/reRental/getcode?cccd=${cccd}&id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
if(data1[0].statusReRental==="unfinished"){
    var linkElement = document.getElementById('myLink');
linkElement.click();
    fetch(`http://localhost:8080/sell/generateCode?id=${id}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.text();
}).then((data1)=>{
  generateCodeex5(data1)
}).catch((error)=>{console.log(error);})
fetch(`http://localhost:8080/reRental/getcode?cccd=${cccd}&id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
renderSearchResultfixsubjects(data1[0].warehouse.subjects)
getDatesell(data1[0].dateAdd)

}).catch((error)=>{console.log(error);})  

fetch(`http://localhost:8080/reRental/lostbool?id=${id}&cccd=${cccd}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
for (let i = 0; i < data1.length; i++) {
    listspsell.push(data1[i])
}
console.log(listspsell);
renderspfix1(data1)
}).catch((error)=>{console.log(error);}) 
}else{
    alert("Phiếu trả đã hoàn thành")
}

}).catch((error)=>{console.log(error);}) 

 
}
function generateCodeex5(data){
html=`<div style="text-align:right; font-size:15px" >
              <i><label for="" >Mã:</label>
                <input type="text" name="codeselladd" value="${data}" required></i> 
            </div>`
document.getElementById("codeselladd").innerHTML = html; 
}
//hiển thị thông tin đối tượng phiếu bán sách
function renderSearchResultfixsubjects(data) {
console.log(data);
if(data.cccd===null){
    var a = data.taxcode
}else{
    var a = data.cccd
}
const html = `
    <div>
        <label for="">CCCD/TAX:</label>
        <input type="text"  name="cccdkhselladd" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
        <label for="" style="margin-left: 90px;">Tên:</label>
        <input type="text" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${data.name}" disabled>
    </div>
    <div>
        <label for="">Địa chỉ:</label>
        <input type="text" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${data.address}" disabled>
        <label for="" style="margin-left: 10px;">SĐT:</label>
        <input type="number" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data.phone}" disabled>
    </div>     
`;
document.getElementById("search-result-sell-add").innerHTML = html;
}
//hiển thị danh sách sách mất
function renderspfix1(data){
table = `
                  <tr style="border: 1px solid black; ">
                    <th style="border: 1px solid black; text-align: center;width:80px">Mã sp</th>
                    <th style="border: 1px solid black; text-align: center;">Tên</th>
                    <th style="border: 1px solid black; text-align: center;width:100px">số lượng</th>
                    <th style="border: 1px solid black; text-align: center;width:131px">Đơn giá</th>
                    <th style="border: 1px solid black; text-align: center;width:131px">Thành tiền</th>
                    <th style="border: 1px solid black; text-align: center;width:70px">Xóa</th>
                  </tr>
                  `
var a = 0;
    for(let i=0;i<data.length;i++){
        // for(let j=0; j<data[i].length;j++){
             a += (data[i].quantity*data[i].price)
             var b=data[i].quantity*data[i].price
            table +=`
        <tr>
    <td style="border: 1px solid black;"><input style="border: none;width:50px" type="text" id="${data[i].id}" value="${data[i].code}" disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none; " type="text" id="${data[i].name}" value="${data[i].name}" disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:50px " type="number" id="${data[i].quantity}"  value="${data[i].quantity}"disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:90px " type="number" id="${data[i].price}"  value="${data[i].price}"disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:90px " type="number" id="${b}"  value="${b}"disabled required></td>
    <td style="border: 1px solid black;">
        <a onclick="deletespfix(${i})" class="btn btn-red"><i class="fa fa-trash"></i></a>
    </td>
    </tr>` 
    }
    localStorage.setItem("totalbuyadd",a)
    document.getElementById("renderspsell").innerHTML=table
    totalbuyfix()
}

function totalbuyfix(){
var total= localStorage.getItem("totalbuyadd")
table=`<tr>
                    <th style="border: 1px solid black;width: 72.7%;">Tổng</th>
                    <th style="border: 1px solid black;">${total}</th>
                  </tr>`
document.getElementById("totalselladd").innerHTML=table
}
//hiển thị ngày bán sách
function getDatesell(data){
html =`<div style="text-align: center; font-size:15px" id="dateselladd">
              <i><label for="" >Ngày bán:</label>
                <input type="date" name="dateselladd" value=${data}></i>
            </div>
`
document.getElementById("dateselladd").innerHTML = html; 
}
//nút tạo phiếu bán sách
//nút save thêm phiếu bán
const buysell = document.getElementById("save-btn-sell-add")
buysell.addEventListener("click", function (e){
    const token = localStorage.getItem("token")
    e.preventDefault();
    var noteselladd = document.querySelector('input[name="noteselladd"]').value;
    var codebuyadd = document.querySelector('input[name="codeselladd"]').value;
    var dateselladd = document.querySelector('input[name="dateselladd"]').value;
    var cccdkhselladd= document.querySelector('input[name="cccdkhselladd"]').value;
    console.log(listspsell);
    var warehouseProducts = listspsell.map(function(product){
        return{
            "product":{
                "id":product.id,
                "code":product.code,
                "quantity":product.quantity,
                "price":product.price
            }
        }
    })
    if (dateselladd === "") {
    alert("Cần nhập ngày");
    return;
}
var body

    body=JSON.stringify({
        code:codebuyadd,
                paymentDate:dateselladd,
                note:noteselladd,
                exportDTO:{
                    user:{id},
                    warehouseProducts:warehouseProducts
                },
                user:{
                    id:id
                }
            })
console.log(body);
    fetch(`http://localhost:8080/sell/createlostbook?cccd=${cccdkhselladd}`,
        {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token,
            },
            body: body
        })
        .then((data)=>{
        return data.json()
    }).then((data)=>{
        alert(data.message)
        getlist()
    }).catch(error=> console.log(error))
})
