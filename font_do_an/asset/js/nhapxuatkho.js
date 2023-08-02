
// 
let currentPage = 1;
const pageSize = 10; // Số mục trên mỗi trang
let totalPages = 0; // Tổng số trang
// 

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
//hiển thị mã code
function generateCodeex3(data){
html=`<div style="text-align:right; font-size:15px" >
          <i><label for="" >Mã:</label>
            <input type="text" name="codexuatadd" value="${data}" required></i> 
        </div>`
document.getElementById("codexuatadd").innerHTML = html; 
}
function generateCodeex4(data){
html=`<div style="text-align:right; font-size:15px" id="codexuatfix">
          <i><label for="" >Mã:</label>
            <input type="text" name="codexuatfix" value="${data}" required></i> 
        </div>`
document.getElementById("codexuatfix").innerHTML = html; 
document.getElementById("codexuatfixpdf").innerHTML = html; 
}
function generateCodeex5(data){
html=`<div style="text-align:right; font-size:15px" >
          <i><label for="" >Mã:</label>
            <input type="text" name="codenhapadd" value="${data}" required></i> 
        </div>`
document.getElementById("codenhapadd").innerHTML = html; 
}
function generateCodeex6(data){
html=`<div style="text-align:right; font-size:15px" >
          <i><label for="" >Mã:</label>
            <input type="text" name="codenhapfix" value="${data}" required></i> 
        </div>`
document.getElementById("codenhapfix").innerHTML = html; 
document.getElementById("codenhapfixpdf").innerHTML = html; 
}
    //1 thêm phiếu xuất 
function xuatadd(){
const token = localStorage.getItem("token")
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
fetch(`http://localhost:8080/export/generateCode?id=${id}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
        return response.text();
}).then((data1)=>{
generateCodeex3(data1)
}).catch((error)=>{console.log(error);})
}
//hiển thị ngày thuê
function getDate(data){
html =`<div style="text-align: center; font-size:15px" id="datexuatadd">
          <i><label for="" >Ngày xuất:</label>
            <input type="date" name="datexuatadd" value="${data}"></i>
        </div>
`
document.getElementById("datexuatadd").innerHTML = html; 
}
function nhapadd(){
const token = localStorage.getItem("token")
fetch(`http://localhost:8080/reRental/getDate`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
        return response.json();
}).then((data1)=>{
getDate1(data1)
}).catch((error)=>{console.log(error);}) 
fetch(`http://localhost:8080/receipt/generateCode?id=${id}`,{
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
}
//hiển thị ngày thuê
function getDate1(data){
html =`<div style="text-align: center; font-size:15px" id="datenhapadd">
          <i><label for="" >Ngày xuất:</label>
            <input type="date" name="datenhapadd" value="${data}"></i>
        </div>
`
document.getElementById("datenhapadd").innerHTML = html; 
}
//nút save thêm phiếu xuất
const cashfund = document.getElementById("save-btn-xuat-add")
cashfund.addEventListener("click", function (e){
const token = localStorage.getItem("token")
e.preventDefault();
var codexuatadd = document.querySelector('input[name="codexuatadd"]').value;
var nodexuatadd = document.querySelector('input[name="nodexuatadd"]').value;
var datexuatadd = document.querySelector('input[name="datexuatadd"]').value;
var cccdkhxuatadd= document.querySelector('input[name="cccdkhxuatadd"]').value;
var namekhxuatadd= document.querySelector('input[name="namekhxuatadd"]').value;
var phonekhxuatadd= document.querySelector('input[name="phonekhxuatadd"]').value;
var addresskhxuatadd= document.querySelector('input[name = "addresskhxuatadd"]').value;
var warehouseProducts = listsp.map(function(product){
    return{
        "product":{
            "id":product.id,
            "code":product.code,
            "quantity":product.quantity
        }
    }
})
if (datexuatadd === "") {
alert("Cần nhập ngày");
return;
}
fetch(`http://localhost:8080/export/create?cccd=${cccdkhxuatadd}`,
    {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body:JSON.stringify({
            code:codexuatadd,
            exportdate:datexuatadd,
            note:nodexuatadd,
            warehouseProducts:warehouseProducts,
            user:{
                id:id
            }
        })
    })
    .then((data)=>{
    return data.json()
}).then((data)=>{
    alert(data.message)
    getlist()
}).catch(error=> console.log(error))
})

//nút tìm kiếm đối tượng chức năng phiếu xuất
const searchp = document.getElementById("searchxuatadd")
searchp.addEventListener("click",handleSearchClick1);
function handleSearchClick1(e){
e.preventDefault();
const token = localStorage.getItem("token")
var cccdkhxuatadd= document.querySelector('input[name="cccdkhxuatadd"]').value;
if (cccdkhxuatadd === "") {
alert("Vui lòng nhập CCCD/Tax");
return;
}
fetch(`http://localhost:8080/supplier/getByCCCDORTax?id=${id}&cccd=${cccdkhxuatadd}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
  if (response.status === 500) {
throw new Error("Đối tượng chưa được tạo");
}
return response.json();
}).then((data1)=>{
renderSearchResult(data1)
}).catch((error)=>{
alert(error.message)
getlist()})  
}
//nút thêm sản phẩm vào danh sách sản phẩm chức năng thêm phiếu xuất
var listsp = [];

var addxuatadd = document.getElementById("addxuatadd")
addxuatadd.addEventListener("click",function(e){
e.preventDefault(); 
const token = localStorage.getItem("token")
var code = document.querySelector('input[name="searchcodexuatadd"]').value
console.log(code);
var number = document.querySelector('input[name="addnumberxuatadd"]').value
if(code ===""){
alert("cần nhập mã sản phẩm")
return;
}
if(number ===""){
alert("cần nhập số lượng sản phẩm")
return;
}
fetch(`http://localhost:8080/product/getbycodes?id=${id}&name=${code}`,{
method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
data1.quantity=parseInt(number, 10);
listsp.push(data1)
rendersp(listsp)

}).catch((error)=>{console.log(error);})  
    })

    
    getlistproduct()
    function getlistproduct() {
const read = document.getElementById("list-course");
const token = localStorage.getItem("token")
fetch(`http://localhost:8080/product/getall?id=${id}`, {
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
function searchProductsxuatadd(keyword) {
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
var searchInput = document.getElementById("searchInputxuatadd");
var searchResults = document.querySelector("#searchResultsxuatadd");
searchInput.addEventListener("input", function (event) {

var keyword = event.target.value;
if (keyword.length === 0) {
  // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
  searchResults.innerHTML = "";
  searchResults.style.display = "none";
} else {
  var results = searchProductsxuatadd(keyword);

  // Xóa danh sách kết quả hiện tại
  searchResults.innerHTML = `<tr>
    <th style="width: 128px;">Mã sp</th>
    <th>Tên sp</th>
    <th>New/old</th>
  </tr>`;

  // Hiển thị kết quả tìm kiếm
  results.forEach(function (product) {
    var row = document.createElement("tr");
    var codeCell = document.createElement("td");
    var nameCell = document.createElement("td");
    var statusCell = document.createElement("td");

    codeCell.textContent = product.code;
    nameCell.textContent = product.name;
    statusCell.textContent = product.statusProductNew;
    row.appendChild(codeCell);
    row.appendChild(nameCell);
    row.appendChild(statusCell);
    searchResults.appendChild(row);

    row.addEventListener("click", function () {
      searchInput.value = product.code;
      searchResults.style.display = "none";
    });
  });
  searchResults.style.display = "block";
}
});


// Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
var searchInputxuatfix = document.getElementById("searchInputxuatfix");
var searchResultsxuatfix = document.querySelector("#searchResultsxuatfix");
searchInputxuatfix.addEventListener("input", function (event) {

var keyword = event.target.value;
if (keyword.length === 0) {
  // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
  searchResultsxuatfix.innerHTML = "";
  searchResultsxuatfix.style.display = "none";
} else {
  var results = searchProductsxuatadd(keyword);

  // Xóa danh sách kết quả hiện tại
  searchResultsxuatfix.innerHTML = `<tr>
    <th style="width: 128px;">Mã sp</th>
    <th>Tên sp</th>
    <th>New/old</th>
  </tr>`;

  // Hiển thị kết quả tìm kiếm
  results.forEach(function (product) {
    var row = document.createElement("tr");
    var codeCell = document.createElement("td");
    var nameCell = document.createElement("td");
    var statusCell = document.createElement("td");

    codeCell.textContent = product.code;
    nameCell.textContent = product.name;
    statusCell.textContent = product.statusProductNew;
    row.appendChild(codeCell);
    row.appendChild(nameCell);
    row.appendChild(statusCell);
    searchResultsxuatfix.appendChild(row);

    row.addEventListener("click", function () {
      searchInputxuatfix.value = product.code;
      searchResultsxuatfix.style.display = "none";
    });
  });
  searchResultsxuatfix.style.display = "block";
}
});

var searchInputnhapadd = document.getElementById("searchInputnhapadd");
var searchResultsnhapadd = document.querySelector("#searchResultsnhapadd");
searchInputnhapadd.addEventListener("input", function (event) {

var keyword = event.target.value;
if (keyword.length === 0) {
  // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
  searchResultsnhapadd.innerHTML = "";
  searchResultsnhapadd.style.display = "none";
} else {
  var results = searchProductsxuatadd(keyword);

  // Xóa danh sách kết quả hiện tại
  searchResultsnhapadd.innerHTML = `<tr>
    <th style="width: 128px;">Mã sp</th>
    <th>Tên sp</th>
    <th>New/old</th>
  </tr>`;

  // Hiển thị kết quả tìm kiếm
  results.forEach(function (product) {
    var row = document.createElement("tr");
    var codeCell = document.createElement("td");
    var nameCell = document.createElement("td");
    var statusCell = document.createElement("td");

    codeCell.textContent = product.code;
    nameCell.textContent = product.name;
    statusCell.textContent = product.statusProductNew;
    row.appendChild(codeCell);
    row.appendChild(nameCell);
    row.appendChild(statusCell);
    searchResultsnhapadd.appendChild(row);

    row.addEventListener("click", function () {
      searchInputnhapadd.value = product.code;
      searchResultsnhapadd.style.display = "none";
    });
  });
  searchResultsnhapadd.style.display = "block";
}
});


// Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
var searchInputnhapfix = document.getElementById("searchInputnhapfix");
var searchResultsnhapfix = document.querySelector("#searchResultsnhapfix");
searchInputnhapfix.addEventListener("input", function (event) {

var keyword = event.target.value;
if (keyword.length === 0) {
  // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
  searchResultsnhapfix.innerHTML = "";
  searchResultsnhapfix.style.display = "none";
} else {
  var results = searchProductsxuatadd(keyword);

  // Xóa danh sách kết quả hiện tại
  searchResultsnhapfix.innerHTML = `<tr>
    <th style="width: 128px;">Mã sp</th>
    <th>Tên sp</th>
    <th>New/old</th>
  </tr>`;

  // Hiển thị kết quả tìm kiếm
  results.forEach(function (product) {
    var row = document.createElement("tr");
    var codeCell = document.createElement("td");
    var nameCell = document.createElement("td");
    var statusCell = document.createElement("td");

    codeCell.textContent = product.code;
    nameCell.textContent = product.name;
    statusCell.textContent = product.statusProductNew;
    row.appendChild(codeCell);
    row.appendChild(nameCell);
    row.appendChild(statusCell);
    searchResultsnhapfix.appendChild(row);

    row.addEventListener("click", function () {
      searchInputnhapadd.value = product.code;
      searchResultsnhapfix.style.display = "none";
    });
  });
  searchResultsnhapfix.style.display = "block";
}
});

    //hàm hiển thị đối tượng cho nút thêm đối tượng
function renderSearchResult(customer) {

var cccdkh = document.querySelector('input[name="cccdkhxuatadd"]').value;
const html = `
<div>
<label for="">CCCD/TAX:</label>
<input type="text" name="cccdkhxuatadd" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${cccdkh}" >
<label for="" style="margin-left: 90px;">Tên:</label>
<input type="text" name="namekhxuatadd" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${customer.name}" >
</div>
<div>
<label for="">Địa chỉ:</label>
<input type="text" name="addresskhxuatadd" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${customer.address}" >
<label for="" style="margin-left: 10px;">SĐT:</label>
<input type="number" name="phonekhxuatadd" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${customer.phone}" >
</div>

`;
document.getElementById("search-result-xuat-add").innerHTML = html; 
}
//hiển thị sản phẩm cho nút thêm sản phẩm
function rendersp(data){
table = `<tr>
        <th style="border: 1px solid black;">Mã sp</th>
        <th style="border: 1px solid black;">Tên</th>
        <th style="border: 1px solid black;">Số lượng</th>
        <th style="border: 1px solid black;">Actions</th>
    </tr>`

for(let i=0;i<data.length;i++){
    // for(let j=0; j<data[i].length;j++){
        
        table +=`<form>
    <tr>
<td style="border: 1px solid black;"><input style="border: none;" type="text" name="code" id="${data[i].id}" value="${data[i].code}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="text" name="collectionDate" id="${data[i].name}" value="${data[i].name}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="number" name="paymentDate" id="${data[i].quantity}"  value="${data[i].quantity}"></td>
<td style="border: 1px solid black;">
    <a onclick="deletesp(${i})" class="btn btn-red"><i class="fa fa-trash"></i></a>
</td>
</tr></form> ` 
}

document.getElementById("rendersp").innerHTML=table
}
//nút xóa sản phẩm cho danh sách sản phẩm
function deletesp(i){

listsp.splice(i,1)
rendersp(listsp)

}

2 //thêm phiếu nhập kho
    //nút save thêm phiếu nhập
    const receiptadd = document.getElementById("save-btn-nhap-add")
    receiptadd.addEventListener("click", function (e){
e.preventDefault();
const token = localStorage.getItem("token")
var codenhapadd = document.querySelector('input[name="codenhapadd"]').value;
var notenhapadd = document.querySelector('input[name="notenhapadd"]').value;
var datenhapadd = document.querySelector('input[name="datenhapadd"]').value;
var cccdkhnhapadd= document.querySelector('input[name="cccdkhnhapadd"]').value;
var namekhnhapadd= document.querySelector('input[name="namekhnhapadd"]').value;
var phonekhnhapadd= document.querySelector('input[name="phonekhnhapadd"]').value;
var addresskhnhapadd= document.querySelector('input[name = "addresskhnhapadd"]').value;
var warehouseProducts = listspnhap.map(function(product){
    return{
        "product":{
            "id":product.id,
            "code":product.code,
            "quantity":product.quantity
        }
    }
})
if (datenhapadd === "") {
alert("Cần nhập ngày");
return;
}
fetch(`http://localhost:8080/receipt/create?cccd=${cccdkhnhapadd}`,
    {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body:JSON.stringify({
          code:codenhapadd,
          dateadd:datenhapadd,
            note:notenhapadd,
            warehouseProducts:warehouseProducts,
            user:{
                id:id
            }
        })
    })
    .then((data)=>{
    return data.json()
}).then((data)=>{
    alert(data.message)
    getlist()
}).catch(error=> console.log(error))
})
// nút tìm kiếm đối tượng chức năng phiếu nhập
const searchnhapadd = document.getElementById("searchnhapadd")
searchnhapadd.addEventListener("click",handleSearchClick2);
function handleSearchClick2(e){
const token = localStorage.getItem("token")
e.preventDefault();
var cccdkhnhapadd= document.querySelector('input[name="cccdkhnhapadd"]').value;
if (cccdkhnhapadd === "") {
alert("Vui lòng nhập CCCD/Tax");
return;
}
fetch(`http://localhost:8080/supplier/getByCCCDORTax?id=${id}&cccd=${cccdkhnhapadd}`,{
    method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
    return response.json();tfix
}).then((data1)=>{
renderSearchResultreceipt(data1)
}).catch((error)=>{getlist()})  
}

//nút thêm sản phẩm vào danh sách sản phẩm chức năng thêm phiếu nhập
var listspnhap = [];
var addnhapadd = document.getElementById("addnhapadd")
addnhapadd.addEventListener("click",function(e){
e.preventDefault(); 
const token = localStorage.getItem("token")
var code = document.querySelector('input[name="searchcodenhapadd"]').value
var number = document.querySelector('input[name="addnumbernhapadd"]').value
if(code ===""){
alert("cần nhập mã sản phẩm")
return;
}
if(number ===""){
alert("cần nhập số lượng sản phẩm")
return;
}
fetch(`http://localhost:8080/product/getbycodes?id=${id}&name=${code}`,{
method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
data1.quantity=parseInt(number, 10);
listspnhap.push(data1)
renderspnhap(listspnhap)

}).catch((error)=>{console.log(error);})  
    })

    //hàm hiển thị đối tượng cho nút thêm đối tượng
    function renderSearchResultreceipt(customer) {

var cccdkh = document.querySelector('input[name="cccdkhnhapadd"]').value;
const html = `
<div>
<label for="">CCCD/TAX:</label>
<input type="text" name="cccdkhnhapadd" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${cccdkh}" >
<label for="" style="margin-left: 90px;">Tên:</label>
<input type="text" name="namekhnhapadd" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${customer.name}" >
</div>
<div>
<label for="">Địa chỉ:</label>
<input type="text" name="addresskhnhapadd" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${customer.address}" >
<label for="" style="margin-left: 10px;">SĐT:</label>
<input type="number" name="phonekhnhapadd" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${customer.phone}" >
</div>

`;
document.getElementById("search-result-nhap-add").innerHTML = html; 
}
//hiển thị sản phẩm cho nút thêm sản phẩm
function renderspnhap(data){
table = `<tr>
        <th style="border: 1px solid black;">Mã sp</th>
        <th style="border: 1px solid black;">Tên</th>
        <th style="border: 1px solid black;">Số lượng</th>
        <th style="border: 1px solid black;">Actions</th>
    </tr>`

for(let i=0;i<data.length;i++){
    // for(let j=0; j<data[i].length;j++){
        
        table +=`<form>
    <tr>
<td style="border: 1px solid black;"><input style="border: none;" type="text" name="code" id="${data[i].id}" value="${data[i].code}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="text" name="collectionDate" id="${data[i].name}" value="${data[i].name}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="number" name="paymentDate" id="${data[i].quantity}"  value="${data[i].quantity}"></td>
<td style="border: 1px solid black;">
    <a onclick="deletespnhap(${i})" class="btn btn-red"><i class="fa fa-trash"></i></a>
</td>
</tr></form> ` 
}

document.getElementById("renderspnhapadd").innerHTML=table
}
//nút xóa sản phẩm cho danh sách sản phẩm
function deletespnhap(i){
listspnhap.splice(i,1)
renderspnhap(listspnhap)
}


getlist()
// tìm kiếm
var search = document.getElementById("form-search")
search.addEventListener("submit",function(e){
e.preventDefault();
const token = localStorage.getItem("token")
var cccd = document.querySelector('input[name="search"]').value
fetch(`http://localhost:8080/export/getbywarehousecode?warehouseCode=${cccd}&id=${id}`,{
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
fetch(`http://localhost:8080/export/getall?id=${id}`,{
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

// Hiển thị tổng
function render(data){
var table = document.getElementById("table-body");
table.innerHTML = "";

for(let i=0;i<data.length;i++){
    var row = document.createElement("tr");
    var a
    var b
   if(data[i].statusWareHouse==="export"){
     a = "#ex4"
     b = "#ex4pdf"
   }else{
     a = "#ex6"
     b = "#ex6pdf"
   }
   
   row.innerHTML +=`<form>
    <tr>
<td><input style="border: none; " type="text" name="code" id="${data[i].id}" value="${data[i].code}" disabled required></td>
<td><input style="border: none; " type="date" name="dateadd" id="${data[i].dateadd}" value="${data[i].dateadd}" disabled required></td>
<td><input style="border: none; " type="date" name="exportdate" id="${data[i].exportdate}"  value="${data[i].exportdate}"disabled required></td>
<td><input style="border: none; " type="text" name="note" id="${data[i].note}"  value="${data[i].note}"disabled required></td>
<td><input style="border: none; " type="text"name="subjects" id="${data[i].subjects.name}"  value="${data[i].subjects.name}"disabled required></td>
<td>
    <a href="${a}" id="render" rel="modal:open" onclick="getupdate1(${data[i].id})" class="btn btn-orange"><i class="fa fa-edit"></i></a>
    <a href="#ex1" onclick="getcccd(${data[i].id})" class="btn btn-red" rel="modal:open"><i class="fa fa-trash"></i></a>
    <a href="${b}" id="renderpdf" rel="modal:open" onclick="getupdate1(${data[i].id})" class="btn btn-orange"><i class="fas fa-download"></i></a>
    
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
// hiển thị thông tin đối tượng cho phiếu xuất sửa
function renderSearchResultfixsubjects(data) {
if(data.cccd===null){
var a = data.taxcode
}else{
var a = data.cccd
}
const html = `
<div>
    <label for="">CCCD/TAX:</label>
    <input type="text" name="cccdkhxuatfix1" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
    <label for="" style="margin-left: 90px;">Tên:</label>
    <input type="text" name="namekhxuatfix" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${data.name}" >
</div>
<div>
    <label for="">Địa chỉ:</label>
    <input type="text" name="addresskhxuatfix" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${data.address}" >
    <label for="" style="margin-left: 10px;">SĐT:</label>
    <input type="number" name="phonekhxuatfix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data.phone}" >
</div>     
`;
document.getElementById("search-result-xuat-fix").innerHTML = html;
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
    <input type="text"  style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
    <label for="" style="margin-left: 90px;">Tên:</label>
    <input type="text" name="namekhxuatfix" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${data.name}" >
</div>
<div>
    <label for="">Địa chỉ:</label>
    <input type="text" name="addresskhxuatfix" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${data.address}" >
    <label for="" style="margin-left: 10px;">SĐT:</label>
    <input type="number" name="phonekhxuatfix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data.phone}" >
</div>     
`;
document.getElementById("search-result-xuat-fixpdf").innerHTML = html;
}
//hiển thị ngày cho phiếu sửa
function renderdatefix(data){
html =`<div style="text-align: center; font-size:15px" id="datexuatfix">
          <i><label for="" >Ngày xuất:</label>
            <input type="date" name="datexuatfix" value="${data}"></i>
        </div>
`
document.getElementById("datexuatfix").innerHTML = html; 
document.getElementById("datexuatfixpdf").innerHTML = html; 
}

    function renderdatefix1(data){
html =`<div style="text-align: center; font-size:15px" id="datenhapfix">
      <i><label for="" >Ngày nhập:</label>
        <input type="date" name="datenhapfix" value="${data}"></i>
    </div>
`
document.getElementById("datenhapfix").innerHTML = html; 
document.getElementById("datenhapfixpdf").innerHTML = html; 
}
// hiển thị thông tin đối tượng cho phiếu nhập sửa
function renderSearchResultReceiptfixsubjects(data) {
if(data.cccd===null){
var a = data.taxcode
}else{
var a = data.cccd
}
const html = `
<div>
    <label for="">CCCD/TAX:</label>
    <input type="text" name="cccdkhnhapfix" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
    <label for="" style="margin-left: 90px;">Tên:</label>
    <input type="text" name="namekhnhapfix" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${data.name}" >
</div>
<div>
    <label for="">Địa chỉ:</label>
    <input type="text" name="addresskhnhapfix" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${data.address}" >
    <label for="" style="margin-left: 10px;">SĐT:</label>
    <input type="number" name="phonekhnhapfix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data.phone}" >
</div>     
`;
document.getElementById("search-result-nhap-fix").innerHTML = html;
}
function renderSearchResultReceiptfixsubjectspdf(data) {
if(data.cccd===null){
var a = data.taxcode
}else{
var a = data.cccd
}
const html = `
<div>
    <label for="">CCCD/TAX:</label>
    <input type="text"  style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
    <label for="" style="margin-left: 90px;">Tên:</label>
    <input type="text" name="namekhnhapfix" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${data.name}" >
</div>
<div>
    <label for="">Địa chỉ:</label>
    <input type="text" name="addresskhnhapfix" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${data.address}" >
    <label for="" style="margin-left: 10px;">SĐT:</label>
    <input type="number" name="phonekhnhapfix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data.phone}" >
</div>     
`;
document.getElementById("search-result-nhap-fixpdf").innerHTML = html;
}
// lấy thông tin note cho phiếu xuất sửa
function renderSearchResultfixnote(data){
const html = `
<div id="search-result-xuat-note-fix">
            <label for="" style="font-size:15px">Nội dung:</label>
            <input type="text" name="notexuatfix" style="width: 75%; border: none; border-bottom: 1px dotted black;" value="${data}" >
          </div>
`
document.getElementById("search-result-xuat-note-fix").innerHTML = html;
document.getElementById("search-result-xuat-note-fixpdf").innerHTML = html;

}
// lấy thông tin note cho phiếu nhập sửa
function renderSearchResultReceiptfixnote(data){
const html = `
<div id="search-result-nhap-note-fix">
            <label for="" style="font-size:15px">Nội dung:</label>
            <input type="text" name="notenhapfix" style="width: 75%; border: none; border-bottom: 1px dotted black;" value="${data}" >
          </div>
`
document.getElementById("search-result-nhap-note-fix").innerHTML = html;
document.getElementById("search-result-nhap-note-fixpdf").innerHTML = html;

}
//lấy thông tin sản phẩm cho phiếu xuất sửa 
function renderspfix(data){
table = `<tr>
        <th style="border: 1px solid black;">Mã sp</th>
        <th style="border: 1px solid black;">Tên</th>
        <th style="border: 1px solid black;">Số lượng</th>
        <th style="border: 1px solid black;">Actions</th>
    </tr>`

for(let i=0;i<data.length;i++){
        table +=`<form>
    <tr>
<td style="border: 1px solid black;"><input style="border: none;" type="text" name="code" id="${data[i].id}" value="${data[i].code}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="text" name="collectionDate" id="${data[i].name}" value="${data[i].name}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="number" name="paymentDate" id="${data[i].quantity}"  value="${data[i].quantity}"></td>
<td style="border: 1px solid black;">
    <a onclick="deletespfix(${i})" class="btn btn-red"><i class="fa fa-trash"></i></a>
</td>
</tr></form> ` 
}
document.getElementById("renderspfix").innerHTML=table
}
function renderspfixpdf(data){
table = `<tr>
        <th style="border: 1px solid black;width:30%">Mã sp</th>
        <th style="border: 1px solid black;">Tên</th>
        <th style="border: 1px solid black;width:20%">Số lượng</th>
    </tr>`

for(let i=0;i<data.length;i++){
        table +=`<form>
    <tr>
<td style="border: 1px solid black;"><input style="border: none;" type="text" name="code" id="${data[i].id}" value="${data[i].code}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="text" name="collectionDate" id="${data[i].name}" value="${data[i].name}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="number" name="paymentDate" id="${data[i].quantity}"  value="${data[i].quantity}"></td>

</tr></form> ` 
}
document.getElementById("renderspfixpdf").innerHTML=table
}
//lấy thông tin sản phẩm cho phiếu nhập sửa 
function renderspnhapfix(data){
table = `<tr>
        <th style="border: 1px solid black;">Mã sp</th>
        <th style="border: 1px solid black;">Tên</th>
        <th style="border: 1px solid black;">Số lượng</th>
        <th style="border: 1px solid black;">Actions</th>
    </tr>`

for(let i=0;i<data.length;i++){
        table +=`<form>
    <tr>
<td style="border: 1px solid black;"><input style="border: none;" type="text" name="code" id="${data[i].id}" value="${data[i].code}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="text" name="collectionDate" id="${data[i].name}" value="${data[i].name}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="number" name="paymentDate" id="${data[i].quantity}"  value="${data[i].quantity}"></td>
<td style="border: 1px solid black;">
    <a onclick="deletespnhapfix(${i})" class="btn btn-red"><i class="fa fa-trash"></i></a>
</td>
</tr></form> ` 
}
document.getElementById("renderspnhapfix").innerHTML=table
}
function renderspnhapfixpdf(data){
table = `<tr>
        <th style="border: 1px solid black;width:30%">Mã sp</th>
        <th style="border: 1px solid black;">Tên</th>
        <th style="border: 1px solid black;width:20%">Số lượng</th>
    </tr>`

for(let i=0;i<data.length;i++){
        table +=`<form>
    <tr>
<td style="border: 1px solid black;"><input style="border: none;" type="text" name="code" id="${data[i].id}" value="${data[i].code}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="text" name="collectionDate" id="${data[i].name}" value="${data[i].name}" disabled required></td>
<td style="border: 1px solid black;"><input style="border: none; " type="number" name="paymentDate" id="${data[i].quantity}"  value="${data[i].quantity}"></td>
</tr></form> ` 
}
document.getElementById("renderspnhapfixpdf").innerHTML=table
}
// xóa 
function getcccd(id){
localStorage.setItem("warehouseid",id)
}
function deleteCourse(){
const token = localStorage.getItem("token")
var cccd = localStorage.getItem("warehouseid")
var check = localStorage.getItem("statusWareHouse")
if(check==="b"){
fetch(`http://localhost:8080/export/delete?id=${cccd}`,{
method:"DELETE",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}).then((response)=>{
return response.json();
}).then((data1)=>{
getlist();
}).catch((error)=>{console.log(error);}) 
}else{
fetch(`http://localhost:8080/receipt/delete?id=${cccd}`,{
method:"DELETE",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}).then((response)=>{
return response.json();
}).then((data1)=>{
getlist();
}).catch((error)=>{console.log(error);}) 
}
}
function close(){
getlist();
}
function close1(){
getlist();
// document.getElementById("updatecus").style.display = "none"
}
// sửa
//nút lấy tổng hợp thông tin phiếu sửa
function getupdate1(id1){
const token = localStorage.getItem("token")
var listspfix = [];
localStorage.setItem("idfix",id1)
fetch(`http://localhost:8080/export/getbywarehouse?id=${id1}`,{
method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
console.log(data1[0].warehouse);
if(data1[0].warehouse.statusWareHouse==="warehouse"){
localStorage.setItem("statusWareHouse","a")
generateCodeex6(data1[0].warehouse.code)
renderSearchResultReceiptfixsubjects(data1[0].warehouse.subjects)
renderSearchResultReceiptfixsubjectspdf(data1[0].warehouse.subjects)
renderSearchResultReceiptfixnote(data1[0].warehouse.note)
renderdatefix1(data1[0].warehouse.dateadd)
for (let i = 0; i < data1.length; i++) {
  data1[i].product.quantity= data1[i].quantity
  listspfix.push(data1[i].product)
}
localStorage.setItem("listspfix",JSON.stringify(listspfix))
renderspnhapfix(listspfix)
renderspnhapfixpdf(listspfix)
return;
}else{
localStorage.setItem("statusWareHouse","b")
var warehouseId = data1[0].warehouse.id;
localStorage.setItem("warehouseId",warehouseId)
console.log(data1[0].warehouse.code);
generateCodeex4(data1[0].warehouse.code)
renderSearchResultfixsubjects(data1[0].warehouse.subjects);
renderSearchResultfixsubjectspdf(data1[0].warehouse.subjects);
renderSearchResultfixnote(data1[0].warehouse.note);
renderdatefix(data1[0].warehouse.exportdate)
for (let i = 0; i < data1.length; i++) {
  data1[i].product.quantity= data1[i].quantity
  listspfix.push(data1[i].product)
}
localStorage.setItem("listspfix",JSON.stringify(listspfix))
renderspfix(listspfix)
renderspfixpdf(listspfix)

}
}).catch((error)=>{getlist()})   
}
//sửa phieu xuất

// nút tìm kiếm đối tượng chức năng sửa phiếu xuất
const searchxuatfix = document.getElementById("searchxuatfix")
searchxuatfix.addEventListener("click",handleSearchClickFix);
function handleSearchClickFix(e){
const token = localStorage.getItem("token")
e.preventDefault();
var cccdkhfix= document.querySelector('input[name="cccdkhxuatfix1"]').value;
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
}

// nút tìm kiếm đối tượng chức năng sửa phiếu nhập
const searchnhapfix = document.getElementById("searchnhapfix")
searchnhapfix.addEventListener("click",handleSearchClickFix4);
function handleSearchClickFix4(e){
e.preventDefault();
const token = localStorage.getItem("token")
var cccdkhfix= document.querySelector('input[name="cccdkhnhapfix"]').value;
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
renderSearchResultReceiptfixsubjects(data1)
}).catch((error)=>{getlist()})  
}

// nút tìm kiếm sản phẩm chức năng sửa phiếu xuất
var addxuatfix = document.getElementById("addxuatfix")
addxuatfix.addEventListener("click",function(e){
e.preventDefault(); 
const token = localStorage.getItem("token")
var listspfix1 =JSON.parse(localStorage.getItem("listspfix")) 
var code = document.querySelector('input[name="searchcodexuatfix"]').value
var number = document.querySelector('input[name="addnumberxuatfix"]').value
if(code ===""){
alert("cần nhập mã sản phẩm")
return;
}
if(number ===""){
alert("cần nhập số lượng sản phẩm")
return;
}
fetch(`http://localhost:8080/product/getbycodes?id=${id}&name=${code}`,{
method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
data1.quantity=parseInt(number, 10);
listspfix1.push(data1)
localStorage.setItem("listspfix",JSON.stringify(listspfix1))
renderspfix(listspfix1)
}).catch((error)=>{console.log(error);})  
    })
// nút tìm kiếm sản phẩm chức năng sửa phiếu nhap
var addnhapfix = document.getElementById("addnhapfix")
addnhapfix.addEventListener("click",function(e){
e.preventDefault(); 
const token = localStorage.getItem("token")
var listspfix1 =JSON.parse(localStorage.getItem("listspfix")) 
var code = document.querySelector('input[name="searchcodenhapfix"]').value
var number = document.querySelector('input[name="addnumbernhapfix"]').value
if(code ===""){
alert("cần nhập mã sản phẩm")
return;
}
if(number ===""){
alert("cần nhập số lượng sản phẩm")
return;
}
fetch(`http://localhost:8080/product/getbycodes?id=${id}&name=${code}`,{
method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
data1.quantity=parseInt(number, 10);
listspfix1.push(data1)
localStorage.setItem("listspfix",JSON.stringify(listspfix1))
renderspnhapfix(listspfix1)
}).catch((error)=>{console.log(error);})  
    })
//nút xóa thông tin sản phẩm chức năng sửa phiếu xuất
var closes= document.getElementById("close-btn-xuat-fix")
closes.addEventListener("click",function(e){
listspfix2 =[]
localStorage.setItem("listspfix",JSON.stringify(listspfix2))
})
//nút xóa thông tin sản phẩm chức năng sửa phiếu nhập
var closesnhap= document.getElementById("close-btn-nhap-fix")
closesnhap.addEventListener("click",function(e){
listspfix2 =[]
localStorage.setItem("listspfix",JSON.stringify(listspfix2))
})
//nút xóa sản phẩm ở danh sách sản phẩm phiếu xuất sửa 

function deletespfix(i){
var listspfix1 =JSON.parse(localStorage.getItem("listspfix")) 
listspfix1.splice(i,1)
localStorage.setItem("listspfix",JSON.stringify(listspfix1))
renderspfix(listspfix1)
}

//nút xóa sản phẩm ở danh sách sản phẩm phiếu xuất sửa 

function deletespnhapfix(i){
var listspfix1 =JSON.parse(localStorage.getItem("listspfix")) 
listspfix1.splice(i,1)
localStorage.setItem("listspfix",JSON.stringify(listspfix1))
renderspnhapfix(listspfix1)
}
// nút lấy thông tin đã sửa phiếu xuất 
var savexuatfix=document.getElementById("save-btn-xuat-fix")
savexuatfix.addEventListener("click",function(e){
e.preventDefault();
var cccdkhxuatfix1 = document.querySelector('input[name="cccdkhxuatfix1"]').value;
var datexuatfix = document.querySelector('input[name="datexuatfix"]').value;
var notexuatfix = document.querySelector('input[name="notexuatfix"]').value;
localStorage.setItem("datexuatfix",datexuatfix)
localStorage.setItem("notexuatfix",notexuatfix)
localStorage.setItem("cccdkhxuatfix1",cccdkhxuatfix1)
})
// nút lấy thông tin đã sửa phiếu nhập 
var savenhapfix=document.getElementById("save-btn-nhap-fix")
savenhapfix.addEventListener("click",function(e){
e.preventDefault();
var cccdkhnhapfix = document.querySelector('input[name="cccdkhnhapfix"]').value;
console.log(cccdkhnhapfix);
var datenhapfix = document.querySelector('input[name="datenhapfix"]').value;
console.log(datenhapfix);
var notenhapfix = document.querySelector('input[name="notenhapfix"]').value;
console.log(notenhapfix);
localStorage.setItem("datenhapfix",datenhapfix)
localStorage.setItem("notenhapfix",notenhapfix)
localStorage.setItem("cccdkhnhapfix",cccdkhnhapfix)
})
// nút lưu phiếu đã sửa 

function updateCourse(){
const token = localStorage.getItem("token")
var codexuatfix = document.querySelector('input[name="codexuatfix"]').value;
var codenhapfix = document.querySelector('input[name="codenhapfix"]').value;
var listspfix1 =JSON.parse(localStorage.getItem("listspfix"))
var datexuatfix = localStorage.getItem("datexuatfix")
var notexuatfix = localStorage.getItem("notexuatfix")
var cccdkhxuatfix1 = localStorage.getItem("cccdkhxuatfix1")
console.log(cccdkhnhapfix);
console.log(datenhapfix);
console.log(notenhapfix);
console.log(listspfix1);
var datenhapfix = localStorage.getItem("datenhapfix")
var notenhapfix = localStorage.getItem("notenhapfix")
var cccdkhnhapfix = localStorage.getItem("cccdkhnhapfix")
var warehouseId = localStorage.getItem("idfix")
var warehouseProducts = listspfix1.map(function(product){
return{
"product":{
"id":product.id,
"code":product.code,
"quantity":product.quantity
}
}
})

var check = localStorage.getItem("statusWareHouse")
if(check==="b"){
fetch(`http://localhost:8080/export/update?cccd=${cccdkhxuatfix1}`,{
method:"POST",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
body:JSON.stringify({
code:codexuatfix,
        id: warehouseId,
        exportdate:datexuatfix,
        note:notexuatfix,
        warehouseProducts:warehouseProducts,
        user:{
            id:id
        }
    })
}).then((response)=>{
return response.json();
}).then((data1)=>{
alert(data1.message)
getlist()
}).catch((error)=>{console.log(error);})
}else{
fetch(`http://localhost:8080/receipt/update?cccd=${cccdkhnhapfix}`,{
method:"POST",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
body:JSON.stringify({
code:codenhapfix,
        id: warehouseId,
        dateadd:datenhapfix,
        note:notenhapfix,
        warehouseProducts:warehouseProducts,
        user:{
            id:id
        }
    })
}).then((response)=>{
return response.json();
}).then((data1)=>{
alert(data1.message)
getlist()
}).catch((error)=>{console.log(error);})
}
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