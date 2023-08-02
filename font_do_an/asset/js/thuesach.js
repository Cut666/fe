   
const id = localStorage.getItem("id")
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


function convertToPdf(sf) {
  var element = document.getElementById(sf);

  html2pdf()
    .from(element)
    .set({
      margin: [20, 20, 20, 20], // Đặt căn lề: [top, right, bottom, left]
      filename: 'converted_file.pdf'
    })
    .save();
}
getlistproduct()
        function getlistproduct() {
    const read = document.getElementById("list-course");
    const token = localStorage.getItem("token")
    fetch(`http://localhost:8080/product/getallbyforRental?id=${id}`, {
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
        localStorage.setItem("productfind",JSON.stringify(data))
      })
      .catch((error) => {
        console.log(error);
      });
  }
   // Function tìm kiếm sản phẩm
   function searchProductsadd(keyword) {
  var results = [];
  var regex = new RegExp(keyword, "i");
    var products = JSON.parse(localStorage.getItem("productfind"))
    console.log(products);
  // Lặp qua danh sách sản phẩm và tìm kiếm sản phẩm phù hợp
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var productName = product.name;

    if (regex.test(productName)) {
      console.log(product);
      results.push(product);
    }
  }

  return results;
}
// Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
var searchInputadd = document.getElementById("searchInputadd");
  var searchResultsadd = document.querySelector("#searchResultsadd");
  searchInputadd.addEventListener("input", function (event) {
    
    var keyword = event.target.value;
    if (keyword.length === 0) {
      // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
      searchResultsadd.innerHTML = "";
      searchResultsadd.style.display = "none";
    } else {
      var results = searchProductsadd(keyword);

      // Xóa danh sách kết quả hiện tại
      searchResultsadd.innerHTML = `<tr>
        <th style="width: 128px;">Mã sp</th>
        <th>Tên sp</th>
        <th>Số lượng</th>
        <th>New/old</th>
      </tr>`;

      // Hiển thị kết quả tìm kiếm
      results.forEach(function (product) {
        var row = document.createElement("tr");
        var codeCell = document.createElement("td");
        var nameCell = document.createElement("td");
        var numberCell = document.createElement("td");
        var statusCell = document.createElement("td");

        codeCell.textContent = product.code;
        nameCell.textContent = product.name;
        numberCell.textContent = product.quantity;
        statusCell.textContent = product.statusProductNew;
        row.appendChild(codeCell);
        row.appendChild(nameCell);
        row.appendChild(numberCell);
        row.appendChild(statusCell);
        searchResultsadd.appendChild(row);

        row.addEventListener("click", function () {
            searchInputadd.value = product.code;
          searchResultsadd.style.display = "none";
        });
      });
      searchResultsadd.style.display = "block";
    }
  });
  

//   // Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
var searchInputfix = document.getElementById("searchInputfix");
  var searchResultsfix = document.querySelector("#searchResultsfix");
  searchInputfix.addEventListener("input", function (event) {
    
    var keyword = event.target.value;
    if (keyword.length === 0) {
      // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
      searchResultsfix.innerHTML = "";
      searchResultsfix.style.display = "none";
    } else {
      var results = searchProductsadd(keyword);

      // Xóa danh sách kết quả hiện tại
      searchResultsfix.innerHTML = `<tr>
        <th style="width: 128px;">Mã sp</th>
        <th>Tên sp</th>
        <th>Số lượng</th>
        <th>New/old</th>
      </tr>`;

      // Hiển thị kết quả tìm kiếm
      results.forEach(function (product) {
        var row = document.createElement("tr");
        var codeCell = document.createElement("td");
        var nameCell = document.createElement("td");
        var numberCell = document.createElement("td");
        var statusCell = document.createElement("td");

        codeCell.textContent = product.code;
        nameCell.textContent = product.name;
        numberCell.textContent = product.quantity;
        statusCell.textContent = product.statusProductNew;
        row.appendChild(codeCell);
        row.appendChild(nameCell);
        row.appendChild(numberCell);
        row.appendChild(statusCell);
        searchResultsfix.appendChild(row);

        row.addEventListener("click", function () {
            searchInputfix.value = product.code;
          searchResultsfix.style.display = "none";
        });
      });
      searchResultsfix.style.display = "block";
    }
  });
// 
let currentPage = 1;
    const pageSize = 10; // Số mục trên mỗi trang
    let totalPages = 0; // Tổng số trang
// 
//cài đặt tỷ lệ tiền cọc
function updateuser(){
  const token = localStorage.getItem("token")
    var updateuser = document.querySelector('input[name="updateuser"]').value
    fetch(`http://localhost:8080/rental/updateuser?userid=${id}&d=${updateuser}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
    alert(data1.message)
    location.reload();
    location.reload();
}).catch((error)=>{console.log(error);}) 
}
getDepositPercentage()
function getDepositPercentage(){
  const token = localStorage.getItem("token")
    fetch(`http://localhost:8080/rental/getDepositPercentage?id=${id}`,{
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
                            <label for="">Tỷ lệ cọc:</label>
                            <input type="number" style="height: 40px;width: 40px;margin: 0px 5px;border-radius: 5px;" name="updateuser" value=${data}>
                            <a onclick="updateuser()" class="btn btn-green search" style="width: 40%; padding: 1.2rem 2rem; margin-top: 1rem; color: #fff;">Save</a>
                        </div>`
                        document.getElementById("updateuser").innerHTML=html
}
        //1 thêm phiếu mua 
       
//nút save thêm phiếu bán
const rentaladd = document.getElementById("save-btn-add")
rentaladd.addEventListener("click", function (e){
    e.preventDefault();
    const token = localStorage.getItem("token")
    var noteadd = document.querySelector('input[name="noteadd"]').value;
    var cccdkhadd= document.querySelector('input[name="cccdkhadd"]').value;
    var numberdateadd= document.querySelector('input[name="numberdateadd"]').value;
    var input1add= document.querySelector('input[name="input1add"]').value;
    var codeadd= document.querySelector('input[name="codeadd"]').value;
    var check = localStorage.getItem("statusPay")
    var check1 =localStorage.getItem("statusCashFund")
    var check2 =localStorage.getItem("statusBanks")
    var warehouseProducts = listsp.map(function(product){
        return{
            "product":{
                "id":product.id,
                "code":product.code,
                "quantity":product.quantity
            }
        }
    })
    if (dateadd === "") {
    alert("Cần nhập ngày");
    return;
}
var body
if(check==="noPay"){
    body=JSON.stringify({
                code:codeadd,
                dayNumber:numberdateadd,
                note:noteadd,
                depositPercentage:input1add,
                exportDTO:{
                    user:{id},
                    warehouseProducts:warehouseProducts
                },
                statusPay:"noPay",
                user:{
                    id:id
                }
            })
}else{
    if(check1==="phieuChi"){
        body=JSON.stringify({
                dayNumber:numberdateadd,
                code:codeadd,
                note:noteadd,
                depositPercentage:input1add,
                exportDTO:{
                    user:{id},
                    warehouseProducts:warehouseProducts
                },
                statusPay:"pay",
                phieuThuDTO: {
                    library: {
                    id: id
                    }
                },
                user:{
                    id:id
                }
            })
    }else if(check2==="UNC"){
        body =JSON.stringify({
                dayNumber:numberdateadd,
                code:codeadd,
                note:noteadd,
                depositPercentage:input1add,
                exportDTO:{
                    user:{id},
                    warehouseProducts:warehouseProducts
                },
                statusPay:"pay",
                baoCoDTO: {
                    library: {
                    id: id
                    }
                },
                user:{
                    id:id
                }
            })
    }
}
    fetch(`http://localhost:8080/rental/create?cccd=${cccdkhadd}`,
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
        location.reload()
    }).catch(error=> console.log(error))
})
//nút hiển thị phiếu thuê
function rental(){
const token = localStorage.getItem("token")
fetch(`http://localhost:8080/rental/getDate`,{
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
fetch(`http://localhost:8080/rental/generateCode?id=${id}`,{
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
//hiển thị ngày thuê dự tính
var datelateadd = document.getElementById("datelateadd")
datelateadd.addEventListener("click",function(e){
const token = localStorage.getItem("token")
var numberdateadd= parseInt(document.querySelector('input[name="numberdateadd"]').value);
fetch(`http://localhost:8080/rental/getDate`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
    var dateString = data1;
var date = new Date(dateString);
date.setDate(date.getDate()+numberdateadd)
var year = date.getFullYear();
var month = (date.getMonth() + 1).toString().padStart(2, '0');
var day = date.getDate().toString().padStart(2, '0');

var formattedDate = `${year}-${month}-${day}`;

document.querySelector('input[name="returndateadd"]').value = formattedDate;
}).catch((error)=>{console.log(error);}) 
})
//hiển thị ngày thuê
function getDate(data){
html =`<div style="text-align: center; font-size:15px" id="dateadd">
              <i><label for="" >Ngày thuê:</label>
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
    e.preventDefault();
    const token = localStorage.getItem("token")
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

//nút thêm sản phẩm vào danh sách sản phẩm chức năng thêm phiếu bán sách
var listsp = [];
var addadd = document.getElementById("addadd")
addadd.addEventListener("click",function(e){
e.preventDefault();
const token = localStorage.getItem("token")
var code = document.querySelector('input[name="searchcodeadd"]').value
var number = document.querySelector('input[name="addnumberadd"]').value
if(code ===""){
    alert("cần nhập tên sản phẩm")
    return;
}
fetch(`http://localhost:8080/product/getbycodeforRental?id=${id}&name=${code}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
if(listsp.length<=0){
    data1.quantity=parseInt(number, 10);
listsp.push(data1)
}else{
    var found = false;
    for (let i = 0; i < listsp.length; i++) {
        if (listsp[i].code === data1.code) {
            data1.quantity=parseInt(number, 10);
            listsp[i].quantity += data1.quantity;
  found = true;
  break;
}
    }
    if (!found) {
        data1.quantity=parseInt(number, 10);
listsp.push(data1)
}
}
console.log(listsp);
rendersp(listsp)

}).catch((error)=>{console.log(error);}) 
        })


//nút lựa chọn phương thức thanh toán phiếu mua add
function onStatusNewChangeadd(){
    if (document.getElementById("chuattadd").checked) {
        localStorage.setItem("statusPay","noPay")
        localStorage.setItem("statusCashFund","noPay")
        localStorage.setItem("statusBanks","noPay")
    } else if (document.getElementById("tienmatadd").checked) {
        localStorage.setItem("statusPay","pay")
        localStorage.setItem("statusCashFund","phieuChi")
    }else if(document.getElementById("chuyenkhoanadd").checked){
        localStorage.setItem("statusPay","pay")
        localStorage.setItem("statusBanks","UNC")
    }
} 

//hàm hiển thị đối tượng cho nút thêm đối tượng phiếu bán add
function renderSearchResultadd(customer) {

var cccdkh = document.querySelector('input[name="cccdkhadd"]').value;
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
        <a onclick="deletespadd(${i})" class="btn btn-red"><i class="fa fa-trash"></i></a>
    </td>
    </tr>` 
    }
    totaladd()
    localStorage.setItem("totaladd",a)
    document.getElementById("renderspadd").innerHTML=table
    var input1add = document.getElementById("input1add");
    var result = document.getElementById("resultadd");
    input1add.addEventListener("input", calculateProduct);
    calculateProduct()
    function calculateProduct() {
        var value1;
        if(input1add.value==""){
            value1=localStorage.getItem("getDepositPercentage")
            input1add.value=localStorage.getItem("getDepositPercentage")
        }else{
            value1 = input1add.value;
        }
    var value2 = a;
    var product = parseFloat(value1) * parseFloat(value2);
    result.value = product;
    }
    
}
function totaladd(){
const token = localStorage.getItem("token")
fetch(`http://localhost:8080/rental/getDepositPercentage?id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
localStorage.setItem("getDepositPercentage",data1)
}).catch((error)=>{console.log(error);})
}
// localStorage.setItem("totaladd",0)

//nút xóa sản phẩm cho danh sách sản phẩm bán
function deletespadd(i){
listsp.splice(i,1)
rendersp(listsp)

}

getlist()
// tìm kiếm
var search = document.getElementById("form-search")
search.addEventListener("submit",function(e){
e.preventDefault();
const token = localStorage.getItem("token")
var cccd = document.querySelector('input[name="search"]').value
fetch(`http://localhost:8080/rental/getcode?cccd=${cccd}&id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
console.log(data);
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
fetch(`http://localhost:8080/rental/getall?id=${id}`,{
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
        if(data[i].statusRental==="returned"){
            var a = "Đã trả"
        }else{
            var a = "Chưa trả"
        }
       
        row.innerHTML +=`<form>
        <tr>
    <td><input style="border: none; " type="text" id="${data[i].id}" value="${data[i].code}" disabled required></td>
    <td><input style="border: none; " type="date"  id="${data[i].timeOrder}" value="${data[i].timeOrder}" disabled required></td>
    <td><input style="border: none; " type="number" id="${data[i].totalprice}"  value="${data[i].totalprice}"disabled required></td>
    <td><input style="border: none; " type="text" id="${data[i].note}"  value="${data[i].note}"disabled required></td>
    <td><input style="border: none; " type="text" id="${a}"  value="${a}"disabled required></td>
    <td><input style="border: none; " type="text" id="${data[i].warehouse.subjects.name}"  value="${data[i].warehouse.subjects.name}"disabled required></td>
    <td>
        <a href="#ex4" id="render" rel="modal:open" onclick="getupdate1(${data[i].id})" class="btn btn-orange"><i class="fa fa-edit"></i></a>
        <a href="#ex1" onclick="getcccd(${data[i].id})" class="btn btn-red" rel="modal:open"><i class="fa fa-trash"></i></a>
        <a href="#ex4pdf" id="renderpdf" rel="modal:open" onclick="getupdate1(${data[i].id})" class="btn btn-orange"><i class="fas fa-download"></i></a>
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

// // hiển thị thông tin đối tượng cho phiếu thuê sửa
function renderSearchResultfixsubjects(data) {
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
function renderSearchResultfixsubjectspdf(data) {
if(data.cccd===null){
    var a = data.taxcode
}else{
    var a = data.cccd
}
const html = `
    <div>
        <label for="">CCCD/TAX:</label>
        <input type="text"   style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
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
document.getElementById("search-result-fixpdf").innerHTML = html;
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
document.getElementById("notefixpdf").innerHTML = html;

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
document.getElementById("codefixpdf").innerHTML = html;

}
// hiển thị thông tin số ngày thuê cho phiếu thuê sửa
function renderSearchResultfixklatedate(data,date){
const html = `
<div style="font-size:15px">
                <label for="" style="">Số ngày thuê:</label>
                <input type="number" name="numberdatefix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data}" required>
                <label for="" style="margin-left: 60px;">Ngày trả dự tính:</label>
                <input type="date" name="returndatefix" style="" value="${date}" disabled required>
              </div>
`
document.getElementById("numberdatefix").innerHTML = html;

}
function renderSearchResultfixklatedatepdf(data,date){
const html = `
<div style="font-size:15px">
                <label for="" style="">Số ngày thuê:</label>
                <input type="number"  style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data}" required>
                <label for="" style="margin-left: 60px;">Ngày trả dự tính:</label>
                <input type="date"  style="" value="${date}" disabled required>
              </div>
`
document.getElementById("numberdatefixpdf").innerHTML = html;

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
document.getElementById("datefixpdf").innerHTML = html;

}

//lấy thông tin sản phẩm cho phiếu mua sửa 
function renderspfix(data){
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
    
    totalfix()
    localStorage.setItem("totaladd",a)
    document.getElementById("renderspfix").innerHTML=table
    var input1fix = document.getElementById("input1fix");
    var result = document.getElementById("resultfix");
    input1fix.addEventListener("input", calculateProduct);
    calculateProduct()
    function calculateProduct() {
        var value1;
        if(input1fix.value==""){
            value1=localStorage.getItem("getDepositPercentage")
            input1fix.value=localStorage.getItem("getDepositPercentage")
        }else{
            value1 = input1fix.value;
        }
    var value2 = a;
    var product = parseFloat(value1) * parseFloat(value2);
    result.value = product;
    }
}
function renderspfixpdf(data){
table = `
                  <tr style="border: 1px solid black; ">
                    <th style="border: 1px solid black; text-align: center;width:15%">Mã sp</th>
                    <th style="border: 1px solid black; text-align: center;">Tên</th>
                    <th style="border: 1px solid black; text-align: center;width:10%">số lượng</th>
                    <th style="border: 1px solid black; text-align: center;width:15%">Đơn giá</th>
                    <th style="border: 1px solid black; text-align: center;width:15%">Thành tiền</th>
                  </tr>
                  `
var a = 0;
    for(let i=0;i<data.length;i++){
        // for(let j=0; j<data[i].length;j++){
             a += (data[i].quantity*data[i].price)
             var b=data[i].quantity*data[i].price
            table +=`
        <tr>
    <td style="border: 1px solid black;"><input style="border: none;width:100%" type="text" value="${data[i].code}" disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none; " type="text" value="${data[i].name}" disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:100% " type="number" value="${data[i].quantity}"disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:100% " type="number" value="${data[i].price}"disabled required></td>
    <td style="border: 1px solid black;"><input style="border: none;width:100% " type="number"  value="${b}"disabled required></td>
    </tr>` 
    }
    
    totalfix()
    localStorage.setItem("totaladd",a)
    document.getElementById("renderspfixpdf").innerHTML=table
    var input1fix = document.getElementById("input1fix");
    var result = document.getElementById("resultfix");
    input1fix.addEventListener("input", calculateProduct);
    calculateProduct()
    function calculateProduct() {
        var value1;
        if(input1fix.value==""){
            value1=localStorage.getItem("getDepositPercentage")
            input1fix.value=localStorage.getItem("getDepositPercentage")
        }else{
            value1 = input1fix.value;
        }
    var value2 = a;
    var product = parseFloat(value1) * parseFloat(value2);
    result.value = product;
    }
}
function totalfix(){
const token = localStorage.getItem("token")
fetch(`http://localhost:8080/rental/getDepositPercentage?id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
localStorage.setItem("getDepositPercentage",data1)
}).catch((error)=>{console.log(error);})
}


// xóa 
function getcccd(id){
localStorage.setItem("rentalid",id)
}
function deleteCourse(){
const token = localStorage.getItem("token")
var cccd = localStorage.getItem("rentalid")
fetch(`http://localhost:8080/rental/delete?id=${cccd}&userid=${id}`,{
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
}).catch((error)=>{console.log(error);;}) 

}
function close(){
getlist();
}
function close1(){
getlist();
}

// sửa
//nút lấy tổng hợp thông tin phiếu sửa
function getupdate1(id1){
const token = localStorage.getItem("token")
var listspfix = [];
localStorage.setItem("idfix",id1)
fetch(`http://localhost:8080/WarehouseProduct/getbyrental?id=${id1}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
    renderSearchResultfixsubjects(data1[0].warehouse.subjects);
    renderSearchResultfixsubjectspdf(data1[0].warehouse.subjects);
    for (let i = 0; i < data1.length; i++) {
      
      data1[i].product.quantity= data1[i].quantity
      data1[i].product.price= data1[i].price
      listspfix.push(data1[i].product)
    }
    localStorage.setItem("listspfix",JSON.stringify(listspfix))
    renderspfix(listspfix)
    renderspfixpdf(listspfix)

// }
}).catch((error)=>{getlist()})   

fetch(`http://localhost:8080/rental/getid?id=${id1}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
localStorage.setItem("rentalid",data1.id)
    renderSearchResultfixnote(data1.note);
    renderSearchResultfixcode(data1.code)
    renderSearchResultfixklatedate(data1.dayNumber,data1.estimateTime)
    renderSearchResultfixklatedatepdf(data1.dayNumber,data1.estimateTime)
    renderSearchResultfixdate(data1.timeOrder)
    document.getElementById("input1fix").value=data1.depositPercentage;
    document.getElementById("input1fixpdf").value=data1.depositPercentage;
    document.getElementById("resultfix").value= data1.totalprice
    document.getElementById("resultfixpdf").value= data1.totalprice
    // renderSearchResultfixtotal(data1.depositPercentage,data1.totalprice)
}).catch((error)=>{getlist()}) 
}

// // //sửa phieu mua hang

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
    renderSearchResultfixsubjects(data1)
}).catch((error)=>{getlist()})  
})
//hiển thị ngày thuê dự tính phiếu sửa
var datelatefix = document.getElementById("datelatefix")
datelatefix.addEventListener("click",function(e){
const token = localStorage.getItem("token")
var numberdatefix= parseInt(document.querySelector('input[name="numberdatefix"]').value);
fetch(`http://localhost:8080/rental/getDate`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
            return response.json();
}).then((data1)=>{
    var dateString = data1;
var date = new Date(dateString);
date.setDate(date.getDate()+numberdatefix)
var year = date.getFullYear();
var month = (date.getMonth() + 1).toString().padStart(2, '0');
var day = date.getDate().toString().padStart(2, '0');

var formattedDate = `${year}-${month}-${day}`;

document.querySelector('input[name="returndatefix"]').value = formattedDate;
}).catch((error)=>{console.log(error);}) 
})
//nút thêm sản phẩm vào danh sách sản phẩm chức năng thêm phiếu bán sách sửa

var addfix = document.getElementById("addfix")
addfix.addEventListener("click",function(e){
e.preventDefault();
const token = localStorage.getItem("token")
var listspfix =JSON.parse(localStorage.getItem("listspfix")) 
var code = document.querySelector('input[name="searchcodefix"]').value
var number = document.querySelector('input[name="addnumberfix"]').value
if(code ===""){
    alert("cần nhập tên sản phẩm")
    return;
}
fetch(`http://localhost:8080/product/getbycodeforRental?id=${id}&name=${code}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
if(listspfix.length<=0){
    data1.quantity=parseInt(number, 10);
    listspfix.push(data1)
}else{
    var found = false;
    for (let i = 0; i < listspfix.length; i++) {
        if (listspfix[i].code === data1.code) {
            data1.quantity=parseInt(number, 10);
            listspfix[i].quantity += data1.quantity;
  found = true;
  break;
}
    }
    if (!found) {
        data1.quantity=parseInt(number, 10);
        listspfix.push(data1)
}
}
localStorage.setItem("listspfix",JSON.stringify(listspfix))
renderspfix(listspfix)

}).catch((error)=>{console.log(error);}) 
        })

// //nút xóa sản phẩm ở danh sách sản phẩm phiếu mua sửa 

function deletespfix(i){
var listspfix1 =JSON.parse(localStorage.getItem("listspfix")) 
listspfix1.splice(i,1)
localStorage.setItem("listspfix",JSON.stringify(listspfix1))
renderspfix(listspfix1)
}



// nút lấy thông tin đã sửa phiếu mua 
var savefix=document.getElementById("save-btn-fix")
savefix.addEventListener("click",function(e){
e.preventDefault();
var cccdkhfix = document.querySelector('input[name="cccdkhfix"]').value;
var notefix = document.querySelector('input[name="notefix"]').value;
var numberdatefix = document.querySelector('input[name="numberdatefix"').value
localStorage.setItem("cccdkhfix",cccdkhfix)
localStorage.setItem("notefix",notefix)
localStorage.setItem("numberdatefix",numberdatefix)
})



// // nút lưu phiếu đã sửa 

function updateCourse(){
const token = localStorage.getItem("token")
var listspfix1 =JSON.parse(localStorage.getItem("listspfix"))
var notefix = localStorage.getItem("notefix")
var cccdkhfix = localStorage.getItem("cccdkhfix")
var numberdatefix = localStorage.getItem("numberdatefix")
var input1add= document.querySelector('input[name="input1fix"]').value;
var rentalid = localStorage.getItem("rentalid")
var check = localStorage.getItem("statusPay")
    var check1 =localStorage.getItem("statusCashFund")
    var check2 =localStorage.getItem("statusBanks")
var warehouseProducts = listspfix1.map(function(product){
return{
  "product":{
    "id":product.id,
    "code":product.code,
    "quantity":product.quantity
  }
}
})
var body
if(check==="noPay"){
    body=JSON.stringify({
      id:rentalid,
      dayNumber:numberdatefix,
                note:notefix,
                
                depositPercentage:input1add,
                exportDTO:{
                    user:{id},
                    warehouseProducts:warehouseProducts
                },
                statusPay:"noPay",
                user:{
                    id:id
                }
            })
}else{
    if(check1==="phieuChi"){
        body=JSON.stringify({
          id:rentalid,
          dayNumber:numberdatefix,
                note:notefix,
                depositPercentage:input1add,
                exportDTO:{
                    user:{id},
                    warehouseProducts:warehouseProducts
                },
                statusPay:"pay",
                phieuChiDTO: {
                    library: {
                    id: id
                    }
                },
                user:{
                    id:id
                }
            })
    }else if(check2==="UNC"){
        body =JSON.stringify({
          id:rentalid,
          dayNumber:numberdatefix,
                note:notefix,
                depositPercentage:input1add,
                exportDTO:{
                    user:{id},
                    warehouseProducts:warehouseProducts
                },
                statusPay:"pay",
                uncdto: {
                    library: {
                    id: id
                    }
                },
                user:{
                    id:id
                }
            })
    }
}

    fetch(`http://localhost:8080/rental/update?cccd=${cccdkhfix}`,{
method:"POST",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
body:body
}).then((response)=>{
return response.json();
}).then((data1)=>{
alert(data1.message)
getlist()
location.reload()
}).catch((error)=>{console.log(error);})

}
localStorage.setItem("statusPay","noPay")
//nut chọn hình thức thanh toán mua sửa
function onStatusNewChangefix(){
    if (document.getElementById("chuattfix").checked) {
        localStorage.setItem("statusPay","noPay")
        localStorage.setItem("statusCashFund","noPay")
        localStorage.setItem("statusBanks","noPay")
    } else if (document.getElementById("tienmatfix").checked) {
        localStorage.setItem("statusPay","pay")
        localStorage.setItem("statusCashFund","phieuChi")
    }else if(document.getElementById("chuyenkhoanfix").checked){
        localStorage.setItem("statusPay","pay")
        localStorage.setItem("statusBanks","UNC")
    }
}    