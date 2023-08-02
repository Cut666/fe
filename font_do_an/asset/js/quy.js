
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
   //hiển thị ngày thuê
function getDate(data){
html =`<div style="text-align: center; font-size: 15px"id="datepcadd">
   <i><label for="">Ngày chi:</label> 
     <input type="date"  name="dateadd" value="${data}"/></i>
 </div>
`
document.getElementById("datepcadd").innerHTML = html; 
}
function getDate1(data){
html =`<div style="text-align: center; font-size: 15px"id="dateptadd">
   <i><label for="">Ngày chi:</label> 
     <input type="date"  name="datethuadd" value="${data}"/></i>
 </div>
`
document.getElementById("dateptadd").innerHTML = html; 
}
function PC(){
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
fetch(`http://localhost:8080/phieuchi/generateCode?id=${id}`,{
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
function PT(){
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
 getDate1(data1)
}).catch((error)=>{console.log(error);}) 
fetch(`http://localhost:8080/phieuthu/generateCode?id=${id}`,{
     method:"GET",
 headers:{
 'Content-Type': 'application/json',
 'Authorization': 'Bearer '+ token,
 },
 }) .then((response)=>{
         return response.text();
}).then((data1)=>{
 generateCode1(data1)
}).catch((error)=>{console.log(error);}) 
}
function generateCode(data){
html=`<div style="text-align:right; font-size:15px" >
           <i><label for="" >Mã:</label>
             <input type="text" name="codepcadd" value="${data}" required></i> 
         </div>`
document.getElementById("codepcadd").innerHTML = html; 
}
function generateCode1(data){
html=`<div style="text-align:right; font-size:15px" >
           <i><label for="" >Mã:</label>
             <input type="text" name="codeptadd" value="${data}" required></i> 
         </div>`
document.getElementById("codeptadd").innerHTML = html; 
}
     //1 thêm phiếu chi  
const cashfund = document.getElementById("save-btn-add")
cashfund.addEventListener("click", function (e){
const token = localStorage.getItem("token")
 e.preventDefault();
 var noteadd = document.querySelector('input[name="noteadd"]').value;
 var codepcadd = document.querySelector('input[name="codepcadd"]').value;
 var moneyadd = document.querySelector('input[name="moneyadd"]').value;
 var dateadd = document.querySelector('input[name="dateadd"]').value;
 var cccdkhadd= document.querySelector('input[name="cccdkhadd"]').value;
 var namekhadd= document.querySelector('input[name="namekhadd"]').value;
 var phonekhadd= document.querySelector('input[name="phonekhadd"]').value;
 var addresskhadd= document.querySelector('input[name = "addresskhadd"]').value;
 if (dateadd === "") {
 alert("Cần nhập ngày");
 return;
}
 fetch(`http://localhost:8080/phieuchi/create?cccd=${cccdkhadd}`,
     {
         method:"POST",
         headers:{
             'Content-Type': 'application/json',
             'Authorization': 'Bearer '+ token,
         },
         body:JSON.stringify({
           code:codepcadd,
             paymentDate:dateadd,
             note:noteadd,
             money:moneyadd,
             library:{
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
const searchp = document.getElementById("searchadd")
searchp.addEventListener("click",handleSearchClick1);

function handleSearchClick1(e){
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
     return response.json();
}).then((data1)=>{
 renderSearchResult(data1)
}).catch((error)=>{getlist()})  
}


//thêm phiếu thu
const cashfund1 = document.getElementById("save-btn-thu-add")
 cashfund1.addEventListener("click", function (e){
   const token = localStorage.getItem("token")
 e.preventDefault();
 var notethuadd = document.querySelector('input[name="notethuadd"]').value;
 var codeptadd = document.querySelector('input[name="codeptadd"]').value;
 var moneythuadd = document.querySelector('input[name="moneythuadd"]').value;
 var datethuadd = document.querySelector('input[name="datethuadd"]').value;
 var cccdkhthuadd= document.querySelector('input[name="cccdkhthuadd"]').value;
 var namekhthuadd= document.querySelector('input[name="namekhthuadd"]').value;
 var phonekhthuadd= document.querySelector('input[name="phonekhthuadd"]').value;
 var addresskhthuadd= document.querySelector('input[name = "addresskhthuadd"]').value;

 console.log(datethuadd);
 if (datethuadd === "") {
 alert("Cần nhập ngày");
 return;
}
 fetch(`http://localhost:8080/phieuthu/create?cccd=${cccdkhthuadd}`,
     {
         method:"POST",
         headers:{
             'Content-Type': 'application/json',
             'Authorization': 'Bearer '+ token,
         },
         body:JSON.stringify({
           code:codeptadd,
             collectionDate:datethuadd,
             note:notethuadd,
             money:moneythuadd,
             library:{
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
const searchp1 = document.getElementById("searchthuadd")
searchp1.addEventListener("click",handleSearchClick);

function handleSearchClick(e){
const token = localStorage.getItem("token")
 e.preventDefault();
 var cccdkhthuadd= document.querySelector('input[name="cccdkhthuadd"]').value;
 if (cccdkhthuadd === "") {
 alert("Vui lòng nhập CCCD/Tax");
 return;
}
 fetch(`http://localhost:8080/supplier/getByCCCDORTax?id=${id}&cccd=${cccdkhthuadd}`,{
     method:"GET",
 headers:{
 'Content-Type': 'application/json',
 'Authorization': 'Bearer '+ token,
 },
 }) .then((response)=>{
     return response.json();
}).then((data1)=>{
 console.log(data1);
 renderSearchResultthu(data1)
}).catch((error)=>{getlist()})  
}

getlist()
// tìm kiếm
var search = document.getElementById("form-search")
search.addEventListener("submit",function(e){
const token = localStorage.getItem("token")
e.preventDefault();
var cccd = document.querySelector('input[name="search"]').value
fetch(`http://localhost:8080/cashfund/getbycode?code=${cccd}&id=${id}`,{
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
 const read = document.getElementById("list-course")
fetch(`http://localhost:8080/cashfund/getall?id=${id}`,{
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
// Hiển thị
function render(data){
const token = localStorage.getItem("token")
var table = document.getElementById("table-body");
     table.innerHTML = ""; // Xóa nội dung bảng cũ

 for(let i=0;i<data.length;i++){
   var row = document.createElement("tr");
     var a
    if(data[i].statusCashFund==="phieuChi"){
      a = "#ex4"
    }else{
      a = "#ex6"
    }
    
    row.innerHTML +=`<form>
     <tr>
 <td><input style="border: none; " type="text" name="code" id="${data[i].id}" value="${data[i].code}" disabled required></td>
 <td><input style="border: none; " type="date" name="collectionDate" id="${data[i].collectionDate}" value="${data[i].collectionDate}" disabled required></td>
 <td><input style="border: none; " type="date" name="paymentDate" id="${data[i].paymentDate}"  value="${data[i].paymentDate}"disabled required></td>
 <td><input style="border: none; " type="text" name="note" id="${data[i].note}"  value="${data[i].note}"disabled required></td>
 <td><input style="border: none; " type="number" name="money" id="${data[i].money}"  value="${data[i].money}" disabled required></td>
 <td><input style="border: none; " type="text"name="subjects" id="${data[i].subjects.name}"  value="${data[i].subjects.name}"disabled required></td>
 <td>
     <a href="${a}" id="render" rel="modal:open" onclick="getupdate1(${data[i].id})" class="btn btn-orange"><i class="fa fa-edit"></i></a>
     <a href="#ex1" onclick="getcccd(${data[i].id})" class="btn btn-red" rel="modal:open"><i class="fa fa-trash"></i></a>
     <a href="#ex2" id="updatecus" style="display:none" rel="modal:open" class="btn btn-orange">save</a>
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
//hiển thị của phiếu chi
function renderSearchResult(customer) {

var cccdkh = document.querySelector('input[name="cccdkhadd"]').value;
const html = `
<div>
 <label for="">CCCD/TAX:</label>
 <input type="text" name="cccdkhadd" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${cccdkh}" >
 <label for="" style="margin-left: 90px;">Tên:</label>
 <input type="text" name="namekhadd" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${customer.name}" >
</div>
<div>
 <label for="">Địa chỉ:</label>
 <input type="text" name="addresskhadd" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${customer.address}" >
 <label for="" style="margin-left: 10px;">SĐT:</label>
 <input type="number" name="phonekhadd" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${customer.phone}" >
</div>
<br>
           <div>
             <table style="border: 1px solid black;">
               <tr style="border: 1px solid black; ">
                 <th style="border: 1px solid black; text-align: center;">Nội dung</th>
                 <th style="border: 1px solid black; text-align: center;">Tiền</th>
               </tr>
               <tr style="border: 1px solid black;">
                 <td style="border: 1px solid black;"><input type="text" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="noteadd"></td>
                 <td style="border: 1px solid black;"><input type="number" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="moneyadd"></td>
               </tr>
             </table>
           </div>
`;
document.getElementById("search-result-add").innerHTML = html; 
}
function rendercodeandateunc(data){
console.log(data);
 const html = `
 <div id="dateandcodepcfix">
   <div style="text-align: center; font-size: 15px" id="datepcfix">
     <i><label for="">Ngày chi:</label> 
       <input type="date" name="datefix" value="${data.paymentDate}"/></i>
   </div>
   <div style="text-align:right; font-size:15px" id="codepcfix">
     <i><label for="" >Mã:</label>
       <input type="text" name="codepcfix"value="${data.code}" disabled required></i> 
   </div>
 </div>
`;
document.getElementById("dateandcodepcfix").innerHTML = html;
}
function rendercodeandatebc(data){
 const html = `
 <div id="dateandcodeptfix">
   <div style="text-align: center; font-size: 15px" id="dateptfix">
     <i><label for="">Ngày chi:</label> 
       <input type="date" name="datethufix" value="${data.collectionDate}"/></i>
   </div>
   <div style="text-align:right; font-size:15px" id="codeptfix">
     <i><label for="" >Mã:</label>
       <input type="text" name="codeptfix"value="${data.code}" disabled required></i> 
   </div>
 </div>
`;
document.getElementById("dateandcodeptfix").innerHTML = html;
}
function renderSearchResultfix(data) {
if(data.subjects.cccd===null){
 var a = data.subjects.taxcode
}else{
 var a = data.subjects.cccd
}
const html = `
 <div>
     <label for="">CCCD/TAX:</label>
     <input type="text" name="cccdkhfix" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
     <label for="" style="margin-left: 90px;">Tên:</label>
     <input type="text" name="namekhfix" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${data.subjects.name}" >
 </div>
 <div>
     <label for="">Địa chỉ:</label>
     <input type="text" name="addresskhfix" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${data.subjects.address}" >
     <label for="" style="margin-left: 10px;">SĐT:</label>
     <input type="number" name="phonekhfix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data.subjects.phone}" >
 </div>
 <br>
               <div>
                 <table style="border: 1px solid black;">
                   <tr style="border: 1px solid black; ">
                     <th style="border: 1px solid black; text-align: center;">Nội dung</th>
                     <th style="border: 1px solid black; text-align: center;">Tiền</th>
                   </tr>
                   <tr style="border: 1px solid black;">
                     <td style="border: 1px solid black;"><input type="text" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="notefix" value="${data.note}"></td>
                     <td style="border: 1px solid black;"><input type="number" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="moneyfix" value="${data.money}"></td>
                   </tr>
                 </table>
               </div>
`;
document.getElementById("search-result-fix").innerHTML = html;
}
function renderSearchResultsearchfix(customer) {

var cccdkh = document.querySelector('input[name="cccdkhfix"]').value;
const html = `
<div>
 <label for="">CCCD/TAX:</label>
 <input type="text" name="cccdkhfix" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${cccdkh}" >
 <label for="" style="margin-left: 90px;">Tên:</label>
 <input type="text" name="namekhfix" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${customer.name}" >
</div>
<div>
 <label for="">Địa chỉ:</label>
 <input type="text" name="addresskhfix" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${customer.address}" >
 <label for="" style="margin-left: 10px;">SĐT:</label>
 <input type="number" name="phonekhfix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${customer.phone}" >
</div>
<br>
           <div>
             <table style="border: 1px solid black;">
               <tr style="border: 1px solid black; ">
                 <th style="border: 1px solid black; text-align: center;">Nội dung</th>
                 <th style="border: 1px solid black; text-align: center;">Tiền</th>
               </tr>
               <tr style="border: 1px solid black;">
                 <td style="border: 1px solid black;"><input type="text" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="notefix"></td>
                 <td style="border: 1px solid black;"><input type="number" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="moneyfix"></td>
               </tr>
             </table>
           </div>
`;
document.getElementById("search-result-fix").innerHTML = html; 
}

//hiển thi cho phiếu thu
function renderSearchResultthu(customer) {

var cccdkh = document.querySelector('input[name="cccdkhthuadd"]').value;
const html = `
<div>
 <label for="">CCCD/TAX:</label>
 <input type="text" name="cccdkhthuadd" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${cccdkh}" >
 <label for="" style="margin-left: 90px;">Tên:</label>
 <input type="text" name="namekhthuadd" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${customer.name}" >
</div>
<div>
 <label for="">Địa chỉ:</label>
 <input type="text" name="addresskhthuadd" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${customer.address}" >
 <label for="" style="margin-left: 10px;">SĐT:</label>
 <input type="number" name="phonekhthuadd" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${customer.phone}" >
</div>
<br>
           <div>
             <table style="border: 1px solid black;">
               <tr style="border: 1px solid black; ">
                 <th style="border: 1px solid black; text-align: center;">Nội dung</th>
                 <th style="border: 1px solid black; text-align: center;">Tiền</th>
               </tr>
               <tr style="border: 1px solid black;">
                 <td style="border: 1px solid black;"><input type="text" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="notethuadd"></td>
                 <td style="border: 1px solid black;"><input type="number" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="moneythuadd"></td>
               </tr>
             </table>
           </div>
`;
document.getElementById("search-result-thu-add").innerHTML = html; 
}

function renderSearchResultfixthu(data) {
if(data.subjects.cccd===null){
 var a = data.subjects.taxcode
}else{
 var a = data.subjects.cccd
}
const html = `
 <div>
     <label for="">CCCD/TAX:</label>
     <input type="text" name="cccdkhthufix" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
     <label for="" style="margin-left: 90px;">Tên:</label>
     <input type="text" name="namekhthufix" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${data.subjects.name}" >
 </div>
 <div>
     <label for="">Địa chỉ:</label>
     <input type="text" name="addresskhthufix" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${data.subjects.address}" >
     <label for="" style="margin-left: 10px;">SĐT:</label>
     <input type="number" name="phonekhthufix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${data.subjects.phone}" >
 </div>
 <br>
               <div>
                 <table style="border: 1px solid black;">
                   <tr style="border: 1px solid black; ">
                     <th style="border: 1px solid black; text-align: center;">Nội dung</th>
                     <th style="border: 1px solid black; text-align: center;">Tiền</th>
                   </tr>
                   <tr style="border: 1px solid black;">
                     <td style="border: 1px solid black;"><input type="text" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="notethufix" value="${data.note}"></td>
                     <td style="border: 1px solid black;"><input type="number" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="moneythufix" value="${data.money}"></td>
                   </tr>
                 </table>
               </div>
`;
document.getElementById("search-result-thu-fix").innerHTML = html;
}
function renderSearchResultsearchthufix(customer) {

var cccdkh = document.querySelector('input[name="cccdkhthufix"]').value;
const html = `
<div>
 <label for="">CCCD/TAX:</label>
 <input type="text" name="cccdkhthufix" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${cccdkh}" >
 <label for="" style="margin-left: 90px;">Tên:</label>
 <input type="text" name="namekhthufix" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${customer.name}" >
</div>
<div>
 <label for="">Địa chỉ:</label>
 <input type="text" name="addresskhthufix" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${customer.address}" >
 <label for="" style="margin-left: 10px;">SĐT:</label>
 <input type="number" name="phonekhthufix" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${customer.phone}" >
</div>
<br>
           <div>
             <table style="border: 1px solid black;">
               <tr style="border: 1px solid black; ">
                 <th style="border: 1px solid black; text-align: center;">Nội dung</th>
                 <th style="border: 1px solid black; text-align: center;">Tiền</th>
               </tr>
               <tr style="border: 1px solid black;">
                 <td style="border: 1px solid black;"><input type="text" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="notethufix"></td>
                 <td style="border: 1px solid black;"><input type="number" style="width: 100%; border: none; border-bottom: 1px dotted black;" name="moneythufix"></td>
               </tr>
             </table>
           </div>
`;
document.getElementById("search-result-thu-fix").innerHTML = html; 
}

// xóa 
function getcccd(id){
localStorage.setItem("cashfundid",id)
getupdate1(id)
}
function deleteCourse(){
const token = localStorage.getItem("token")
var check = localStorage.getItem("phieu")
console.log(check);
var cccd = localStorage.getItem("cashfundid")
if(check==="a"){
fetch(`http://localhost:8080/phieuthu/delete?id=${cccd}&userid=${id}`,{
method:"DELETE",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}).then((response)=>{
return response.json();
}).then((data1)=>{
getlist()
}).catch((error)=>{console.log(error);}) 
}else{
fetch(`http://localhost:8080/phieuchi/delete?id=${cccd}&userid=${id}`,{
method:"DELETE",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}).then((response)=>{
return response.json();
}).then((data1)=>{
getlist()
}).catch((error)=>{console.log(error);}) 
}

}
function close(){
getlist()
}
function close1(){
getlist()
document.getElementById("updatecus").style.display = "none"
}
// sửa
function getupdate1(id1){
const token = localStorage.getItem("token")
localStorage.setItem("idfix",id1)
fetch(`http://localhost:8080/cashfund/getbyid?id=${id1}`,{
 method:"GET",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
}) .then((response)=>{
return response.json();
}).then((data1)=>{
if(data1.statusCashFund==="phieuThu"){
 localStorage.setItem("phieu","a")
 renderSearchResultfixthu(data1);
 rendercodeandatebc(data1)
 return;
}else{
 localStorage.setItem("phieu","b")
 renderSearchResultfix(data1);
 rendercodeandateunc(data1)
 return;
}


}).catch((error)=>{getlist()})   
}
//sửa phieu chi
const searchfix = document.getElementById("searchfix")
searchfix.addEventListener("click",handleSearchClickFix);
function handleSearchClickFix(e){
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
 console.log(data1);
 renderSearchResultsearchfix(data1)
}).catch((error)=>{getlist()})  
}

function savefix(){
var datefix = document.querySelector('input[name="datefix"]').value;
var cccdkhfix = document.querySelector('input[name="cccdkhfix"]').value;
var namekhfix = document.querySelector('input[name="namekhfix"]').value;
var addresskhfix = document.querySelector('input[name="addresskhfix"]').value;
var phonekhfix = document.querySelector('input[name="phonekhfix"]').value;
var notefix = document.querySelector('input[name="notefix"]').value;
var moneyfix = document.querySelector('input[name="moneyfix"]').value;
localStorage.setItem("datefix",datefix)
localStorage.setItem("cccdkhfix",cccdkhfix)
localStorage.setItem("namekhfix",namekhfix)
localStorage.setItem("addresskhfix",addresskhfix)
localStorage.setItem("phonekhfix",phonekhfix)
localStorage.setItem("notefix",notefix)
localStorage.setItem("moneyfix",moneyfix)
}

function updateCourse(){
const token = localStorage.getItem("token")
var idfix = localStorage.getItem("idfix")
var datefix = localStorage.getItem("datefix")
var cccdkhfix = localStorage.getItem("cccdkhfix")
var namekhfix = localStorage.getItem("namekhfix")
var addresskhfix = localStorage.getItem("addresskhfix")
var phonekhfix = localStorage.getItem("phonekhfix")
var notefix = localStorage.getItem("notefix")
var moneyfix = localStorage.getItem("moneyfix")
var check = localStorage.getItem("phieu")
console.log(check);
if(check==="b"){
 fetch(`http://localhost:8080/phieuchi/update?cccd=${cccdkhfix}`,{
method:"POST",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
body:JSON.stringify({
         id:idfix,
         paymentDate:datefix,
         money:moneyfix,
         note:notefix,
         library:{
             id:id
         }
     })
}).then((response)=>{
return response.json();
}).then((data1)=>{
getlist()
}).catch((error)=>{console.log(error);})
}else{
 fetch(`http://localhost:8080/phieuthu/update?cccd=${cccdkhfix}`,{
method:"POST",
headers:{
'Content-Type': 'application/json',
'Authorization': 'Bearer '+ token,
},
body:JSON.stringify({
         id:idfix,
         collectionDate:datefix,
         money:moneyfix,
         note:notefix,
         library:{
             id:id
         }
     })
}).then((response)=>{
return response.json();
}).then((data1)=>{
getlist()
}).catch((error)=>{console.log(error);})
}

}
//sửa phiếu thu
const searchthufix = document.getElementById("searchthufix")
searchthufix.addEventListener("click",handleSearchClickthuFix);
function handleSearchClickthuFix(e){
const token = localStorage.getItem("token")
 e.preventDefault();
 var cccdkhthufix= document.querySelector('input[name="cccdkhthufix"]').value;
 if (cccdkhthufix === "") {
 alert("Vui lòng nhập CCCD/Tax");
 return;
}
 fetch(`http://localhost:8080/supplier/getByCCCDORTax?id=${id}&cccd=${cccdkhthufix}`,{
     method:"GET",
 headers:{
 'Content-Type': 'application/json',
 'Authorization': 'Bearer '+ token,
 },
 }) .then((response)=>{
     return response.json();
}).then((data1)=>{
 console.log(data1);
 renderSearchResultsearchthufix(data1)
}).catch((error)=>{getlist()})  
}  
function savethufix(){
var datefix = document.querySelector('input[name="datethufix"]').value;
var cccdkhfix = document.querySelector('input[name="cccdkhthufix"]').value;
var namekhfix = document.querySelector('input[name="namekhthufix"]').value;
var addresskhfix = document.querySelector('input[name="addresskhthufix"]').value;
var phonekhfix = document.querySelector('input[name="phonekhthufix"]').value;
var notefix = document.querySelector('input[name="notethufix"]').value;
var moneyfix = document.querySelector('input[name="moneythufix"]').value;
localStorage.setItem("datefix",datefix)
localStorage.setItem("cccdkhfix",cccdkhfix)
localStorage.setItem("namekhfix",namekhfix)
localStorage.setItem("addresskhfix",addresskhfix)
localStorage.setItem("phonekhfix",phonekhfix)
localStorage.setItem("notefix",notefix)
localStorage.setItem("moneyfix",moneyfix)
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
