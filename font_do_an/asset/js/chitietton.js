   
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
date();
async function date() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:8080/product/FirstDayOfMonth`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const response2 = await fetch(
      `http://localhost:8080/product/LastDayOfMonth`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data1 = await response.json();
    const data2 = await response2.json();
    renderdate(data1, data2);
  } catch (error) {
    console.log(error);
  }
}
function find() {
  var startDate = document.querySelector('input[name="startDate"]').value;
  var endDate = document.querySelector('input[name="endDate"]').value;
  if(startDate>endDate){
      alert("ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc")
}else{
  renderdate(startDate, endDate);
}
}
//hiển thị ngày
function renderdate(date1, date2) {
  table = `<div class="group" style="margin: 1rem 0rem; display: inline-block;" id="ta1">
                  <label for="">Từ:</label>
                  <input type="date" name="startDate" value="${date1}">
                  <label for="" style="margin-left: 1rem;">Đến:</label>
                  <input type="date"name="endDate" value="${date2}">
              </div>
              <button type="submit" style="height: 30px; border-radius: 5px; border:none; background-color: #00C86F;color: white;padding:0px 10px;margin-left: 20px;"onclick="find()" > Lọc</button>`;
  document.getElementById("ta1").innerHTML = table;
  product();
}
//
async function product() {
  const token = localStorage.getItem("token");
  var listproduct = [];
  try {
    var startDate = document.querySelector('input[name="startDate"]').value;
    var endDate = document.querySelector('input[name="endDate"]').value;
    if (startDate == "" || endDate == "") {
      alert("nhập đầy đủ ngày bắt đầu và kết thúc");
      return;
    } else if (startDate > endDate) {
      alert("ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc");
    } else {
      const response = await fetch(
        `http://localhost:8080/product/getall?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data1 = await response.json();
      for (let index = 0; index < data1.length; index++) {
        listproduct.push(data1[index]);
      }
      console.log(data1[0].code);
      for (let i = 0; i < data1.length; i++) {
        
        const response2 = await fetch(
          `http://localhost:8080/product/listproduct?id=${id}&code=${data1[i].code}&startDate=${startDate}&endDate=${endDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const response3 = await fetch(
          `http://localhost:8080/product/getbycodes?id=${id}&name=${data1[i].code}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data2 = await response2.json();
        const data3 = await response3.json();
        listproduct[i].warehouseProduct = data2;
        listproduct[i].quantityBefore = data3.quantity;
      }
      
      renderDebt(listproduct);
    }
  } catch (error) {
    console.log(error);
  }
}
//
var search = document.getElementById("form-search");
search.addEventListener("submit", search1);
async function search1(e) {
  const token = localStorage.getItem("token");
    var listproduct = [];
  e.preventDefault();
  try {
    var startDate = document.querySelector(
      'input[name="startDate"]'
    ).value;
    var endDate = document.querySelector('input[name="endDate"]').value;
    var cccd = document.querySelector('input[name="search"]').value;
    if (!cccd) {
      product();
    } else {
      const response = await fetch(
        `http://localhost:8080/product/getbycodes?id=${id}&name=${cccd}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      const response2 = await fetch(
      `http://localhost:8080/product/listproduct?id=${id}&code=${data.code}&startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const response3 = await fetch(
      `http://localhost:8080/product/getbycodes?id=${id}&name=${data.code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data2 = await response2.json();
    const data3 = await response3.json();
    
    data.warehouseProduct = data2;
    data.quantityBefore = data3.quantity;
     
    listproduct.push(data);
    
  }
  renderDebt(listproduct);
  } catch (error) {
    console.log(error);
  }
}
function renderDebt(data) {
  console.log(data.length);
  table = `<tr>
                      <th>code</th>
                      <th>Mã sp</th>
                      <th>Tên sản phẩm</th>
                      <th>Ngày nhập</th>
                      <th>Ngày xuất</th>
                      <th>Sl nhập</th>
                      <th>Sl xuất</th>
                      <th>Sl tồn</th>
                  </tr>`;
  for (let i = 0; i < data.length; i++) {
    var a = data[i].code;
    var data1 = data[i].warehouseProduct;
    table += `
      <tr>
        <th ></th>
        <th >${a}</th>
          <th >Số lượng</th>
          <th ></th>
          <th ></th>
          <th ></th>
          <th ></th>
          <th >${data[i].quantityBefore}</th>
      </tr>`;
    var g = 0;
    var f = 0;
    for (let j = 0; j < data1.length; j++) {
      // console.log(data1[j]);
      if (data1[j].warehouse.statusWareHouse == "warehouse") {
        var c = data1[j].warehouse.dateadd;
        var b = 0;
        var d = data1[j].quantity;
        var e = 0;
      } else {
        var b = data1[j].warehouse.exportdate;
        var c = 0;
        var d = 0;
        var e = data1[j].quantity;
      }
      g += d - e;
      table += `<tr>
  <td ><input style="border: none; " type="text"  value="${data1[j].warehouse.code}"disabled required></td>
  <td ><input style="border: none; " type="text"  value="${a}" disabled required></td>
  <td "><input style="border: none; " type="text"  value="${data[i].name}" disabled required></td>
  <td ><input style="border: none; " type="date" value="${c}"disabled required></td>
  <td ><input style="border: none; " type="date"  value="${b}"disabled required></td>
  <td ><input style="border: none; " type="number"  value="${d}"disabled required></td>
  <td ><input style="border: none; " type="number"  value="${e}"disabled required></td>
  <td ><input style="border: none; " type="number"  value=""disabled required></td>
  </tr> `;
    }
  }
  document.getElementById("ta").innerHTML = table;
}
getlistproduct()
      function getlistproduct() {
  const read = document.getElementById("list-course");
  const token = localStorage.getItem("token");
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
// Lặp qua danh sách sản phẩm và tìm kiếm sản phẩm phù hợp
for (var i = 0; i < products.length; i++) {
  var product = products[i];
  var productName = product.name;

  if (regex.test(productName)) {
    results.push(product);
  }
}

return results;
}
// Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
var searchInput = document.getElementById("search");
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