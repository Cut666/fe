
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
            //tìm sp
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
      function searchProducts(keyword) {
      var results = [];
      var regex = new RegExp(keyword, "i");
        var products = JSON.parse(localStorage.getItem("productfind"))
        console.log(products);
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
    var searchInputbuyadd = document.getElementById("searchInputbuyadd");
      var searchResultsbuyadd = document.querySelector("#searchResultsbuyadd");
      searchInputbuyadd.addEventListener("input", function (event) {
        
        var keyword = event.target.value;
        if (keyword.length === 0) {
          // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
          searchResultsbuyadd.innerHTML = "";
          searchResultsbuyadd.style.display = "none";
        } else {
          var results = searchProducts(keyword);

          // Xóa danh sách kết quả hiện tại
          searchResultsbuyadd.innerHTML = `<tr>
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
            searchResultsbuyadd.appendChild(row);

            row.addEventListener("click", function () {
                searchInputbuyadd.value = product.code;
              searchResultsbuyadd.style.display = "none";
            });
          });
          searchResultsbuyadd.style.display = "block";
        }
      });
      // Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
    var searchInputbuyfix = document.getElementById("searchInputbuyfix");
      var searchResultsbuyfix = document.querySelector("#searchResultsbuyfix");
      searchInputbuyfix.addEventListener("input", function (event) {
        
        var keyword = event.target.value;
        if (keyword.length === 0) {
          // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
          searchResultsbuyfix.innerHTML = "";
          searchResultsbuyfix.style.display = "none";
        } else {
          var results = searchProducts(keyword);

          // Xóa danh sách kết quả hiện tại
          searchResultsbuyfix.innerHTML = `<tr>
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
            searchResultsbuyfix.appendChild(row);

            row.addEventListener("click", function () {
                searchInputbuyfix.value = product.code;
              searchResultsbuyfix.style.display = "none";
            });
          });
          searchResultsbuyfix.style.display = "block";
        }
      });

        // Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
    var searchInputselladd = document.getElementById("searchInputselladd");
      var searchResultsselladd = document.querySelector("#searchResultsselladd");
      searchInputselladd.addEventListener("input", function (event) {
        
        var keyword = event.target.value;
        if (keyword.length === 0) {
          // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
          searchResultsselladd.innerHTML = "";
          searchResultsselladd.style.display = "none";
        } else {
          var results = searchProducts(keyword);

          // Xóa danh sách kết quả hiện tại
          searchResultsselladd.innerHTML = `<tr>
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
            searchResultsselladd.appendChild(row);

            row.addEventListener("click", function () {
                searchInputselladd.value = product.code;
              searchResultsselladd.style.display = "none";
            });
          });
          searchResultsselladd.style.display = "block";
        }
      });
        // Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
    var searchInputsellfix = document.getElementById("searchInputsellfix");
      var searchResultssellfix = document.querySelector("#searchResultssellfix");
      searchInputsellfix.addEventListener("input", function (event) {
        
        var keyword = event.target.value;
        if (keyword.length === 0) {
          // Nếu từ khóa tìm kiếm là rỗng, xóa danh sách kết quả hiển thị
          searchResultssellfix.innerHTML = "";
          searchResultssellfix.style.display = "none";
        } else {
          var results = searchProducts(keyword);

          // Xóa danh sách kết quả hiện tại
          searchResultssellfix.innerHTML = `<tr>
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
            searchResultssellfix.appendChild(row);

            row.addEventListener("click", function () {
                searchInputsellfix.value = product.code;
              searchResultssellfix.style.display = "none";
            });
          });
          searchResultssellfix.style.display = "block";
        }
      });
           //hiển thị mã code
function generateCodeex3(data){
html=`<div style="text-align:right; font-size:15px" >
                  <i><label for="" >Mã:</label>
                    <input type="text" name="codebuyadd" value="${data}" required></i> 
                </div>`
    document.getElementById("codebuyadd").innerHTML = html; 
}
function generateCodeex4(data){
html=`<div style="text-align:right; font-size:15px" id="codebuyfix">
                  <i><label for="" >Mã:</label>
                    <input type="text" name="codebuyfix" value="${data}" required></i> 
                </div>`
    document.getElementById("codebuyfix").innerHTML = html; 
}
function generateCodeex5(data){
html=`<div style="text-align:right; font-size:15px" >
                  <i><label for="" >Mã:</label>
                    <input type="text" name="codeselladd" value="${data}" required></i> 
                </div>`
    document.getElementById("codeselladd").innerHTML = html; 
}
function generateCodeex6(data){
html=`<div style="text-align:right; font-size:15px" >
                  <i><label for="" >Mã:</label>
                    <input type="text" name="codesellfix" value="${data}" required></i> 
                </div>`
    document.getElementById("codesellfix").innerHTML = html; 
}
   
    // 
    let currentPage = 1;
        const pageSize = 10; // Số mục trên mỗi trang
        let totalPages = 0; // Tổng số trang
// 
            //1 thêm phiếu mua 
            //nút save thêm phiếu mua
            function buyadd1(){
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
    fetch(`http://localhost:8080/buy/generateCode?id=${id}`,{
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
    function getDate(data){
    html =`<div style="text-align: center; font-size:15px" id="datebuyadd">
                  <i><label for="" >Ngày:</label>
                    <input type="date" name="datebuyadd" value="${data}"></i>
                </div>
    `
    document.getElementById("datebuyadd").innerHTML = html; 
}
function selladd1(){
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
    }
//hiển thị ngày thuê
function getDate1(data){
    html =`<div style="text-align: center; font-size:15px" id="dateselladd">
                  <i><label for="" >Ngày:</label>
                    <input type="date" name="dateselladd" value="${data}"></i>
                </div>
    `
    document.getElementById("dateselladd").innerHTML = html; 
}
    const buyadd = document.getElementById("save-btn-buy-add")
    buyadd.addEventListener("click", function (e){
      const token = localStorage.getItem("token")
        e.preventDefault();
        var notebuyadd = document.querySelector('input[name="notebuyadd"]').value;
        var codebuyadd = document.querySelector('input[name="codebuyadd"]').value;
        var datebuyadd = document.querySelector('input[name="datebuyadd"]').value;
        var cccdkhbuyadd= document.querySelector('input[name="cccdkhbuyadd"]').value;
        var check = localStorage.getItem("statusPay")
        var check1 =localStorage.getItem("statusCashFund")
        var check2 =localStorage.getItem("statusBanks")
        var warehouseProducts = listsp.map(function(product){
            return{
                "product":{
                    "id":product.id,
                    "code":product.code,
                    "quantity":product.quantity,
                    "price":product.price
                }
            }
        })
        console.log(listsp);
        if (datebuyadd === "") {
        alert("Cần nhập ngày");
        return;
    }
    var body
    if(check==="noPay"){
        body=JSON.stringify({
            code:codebuyadd,
                    collectionDate:datebuyadd,
                    note:notebuyadd,
                    receiptDTO:{
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
                code:codebuyadd,
                    collectionDate:datebuyadd,
                    note:notebuyadd,
                    receiptDTO:{
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
                code:codebuyadd,
                    collectionDate:datebuyadd,
                    note:notebuyadd,
                    receiptDTO:{
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
        fetch(`http://localhost:8080/buy/create?cccd=${cccdkhbuyadd}`,
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
    //nút save thêm phiếu bán
    const buysell = document.getElementById("save-btn-sell-add")
    buysell.addEventListener("click", function (e){
      const token = localStorage.getItem("token")
        e.preventDefault();
        var noteselladd = document.querySelector('input[name="noteselladd"]').value;
        var codeselladd = document.querySelector('input[name="codeselladd"]').value;
        var dateselladd = document.querySelector('input[name="dateselladd"]').value;
        var cccdkhselladd= document.querySelector('input[name="cccdkhselladd"]').value;
        var check = localStorage.getItem("statusPay")
        var check1 =localStorage.getItem("statusCashFund")
        var check2 =localStorage.getItem("statusBanks")
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
    if(check==="noPay"){
        body=JSON.stringify({
            code:codeselladd,
                    paymentDate:dateselladd,
                    note:noteselladd,
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
                code:codeselladd,
                    paymentDate:dateselladd,
                    note:noteselladd,
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
                code:codeselladd,
                    paymentDate:dateselladd,
                    note:noteselladd,
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
    console.log(body);
        fetch(`http://localhost:8080/sell/create?cccd=${cccdkhselladd}`,
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

    //nút tìm kiếm đối tượng chức năng phiếu mua sách
    const searchbuyadd = document.getElementById("searchbuyadd")
    searchbuyadd.addEventListener("click",function(e){
      const token = localStorage.getItem("token")
        e.preventDefault();
        var cccdkhbuyadd= document.querySelector('input[name="cccdkhbuyadd"]').value;
        if (cccdkhbuyadd === "") {
        alert("Vui lòng nhập CCCD/Tax");
        return;
    }
        fetch(`http://localhost:8080/supplier/getByCCCDORTax?id=${id}&cccd=${cccdkhbuyadd}`,{
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
        renderSearchResult(data1)
    }).catch((error)=>{getlist()})  
    })
    //nút tìm kiếm đối tượng chức năng phiếu bán sách
    const searchselladd = document.getElementById("searchselladd")
    searchselladd.addEventListener("click",function(e){
      const token = localStorage.getItem("token")
        e.preventDefault();
        var cccdkhselladd= document.querySelector('input[name="cccdkhselladd"]').value;
        if (cccdkhselladd === "") {
        alert("Vui lòng nhập CCCD/Tax");
        return;
    }
        fetch(`http://localhost:8080/supplier/getByCCCDORTax?id=${id}&cccd=${cccdkhselladd}`,{
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
        renderSearchResultselladd(data1)
    }).catch((error)=>{getlist()})  
    })
    //nút thêm sản phẩm vào danh sách sản phẩm chức năng thêm phiếu mua sách
var listsp = [];
    var addbuyadd = document.getElementById("addbuyadd")
    addbuyadd.addEventListener("click",function(e){
    e.preventDefault(); 
    const token = localStorage.getItem("token")
    var code = document.querySelector('input[name="searchcodebuyadd"]').value
    var number = document.querySelector('input[name="addnumberbuyadd"]').value
    var price = document.querySelector('input[name="addpricebuyadd"]').value
    if(code ===""){
        alert("cần nhập tên sản phẩm")
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
    data1.price=parseInt(price, 10);
    listsp.push(data1)
    renderspbuy(listsp)
    
}).catch((error)=>{console.log(error);}) 
            })
//nút thêm sản phẩm vào danh sách sản phẩm chức năng thêm phiếu bán sách
var listspsell = [];
    var addselladd = document.getElementById("addselladd")
    addselladd.addEventListener("click",function(e){
    e.preventDefault();
    const token = localStorage.getItem("token")
    var code = document.querySelector('input[name="searchcodeselladd"]').value
    var number = document.querySelector('input[name="addnumberselladd"]').value
    var price = document.querySelector('input[name="addpriceselladd"]').value
    if(code ===""){
        alert("cần nhập tên sản phẩm")
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
    data1.price=parseInt(price, 10);
    listspsell.push(data1)
    renderspsell(listspsell)
    
}).catch((error)=>{console.log(error);}) 
            })

    //nút lựa chọn phương thức thanh toán phiếu mua add
    function onStatusNewChange(){
        if (document.getElementById("chuattbuyadd").checked) {
            localStorage.setItem("statusPay","noPay")
            localStorage.setItem("statusCashFund","noPay")
            localStorage.setItem("statusBanks","noPay")
        } else if (document.getElementById("tienmatbuyadd").checked) {
            localStorage.setItem("statusPay","pay")
            localStorage.setItem("statusCashFund","phieuChi")
        }else if(document.getElementById("chuyenkhoanbuyadd").checked){
            localStorage.setItem("statusPay","pay")
            localStorage.setItem("statusBanks","UNC")
        }
    }    
//nút lựa chọn phương thức thanh toán phiếu mua add
function onStatusNewChangeselladd(){
        if (document.getElementById("chuattbuyadd").checked) {
            localStorage.setItem("statusPay","noPay")
            localStorage.setItem("statusCashFund","noPay")
            localStorage.setItem("statusBanks","noPay")
        } else if (document.getElementById("tienmatbuyadd").checked) {
            localStorage.setItem("statusPay","pay")
            localStorage.setItem("statusCashFund","phieuChi")
        }else if(document.getElementById("chuyenkhoanbuyadd").checked){
            localStorage.setItem("statusPay","pay")
            localStorage.setItem("statusBanks","UNC")
        }
    } 
   //hàm hiển thị đối tượng cho nút thêm đối tượng phiếu mua add
function renderSearchResult(customer) {
    
    var cccdkh = document.querySelector('input[name="cccdkhbuyadd"]').value;
    const html = `
    <div>
        <label for="">CCCD/TAX:</label>
        <input type="text" name="cccdkhbuyadd" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${cccdkh}" >
        <label for="" style="margin-left: 90px;">Tên:</label>
        <input type="text" name="namekhbuyadd" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${customer.name}" disabled>
    </div>
    <div>
        <label for="">Địa chỉ:</label>
        <input type="text" name="addresskhbuyadd" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${customer.address}"disabled >
        <label for="" style="margin-left: 10px;">SĐT:</label>
        <input type="number" name="phonekhbuyadd" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${customer.phone}" disabled>
    </div>
    
`;
document.getElementById("search-result-buy-add").innerHTML = html; 
}
   //hàm hiển thị đối tượng cho nút thêm đối tượng phiếu bán add
   function renderSearchResultselladd(customer) {
    
    var cccdkh = document.querySelector('input[name="cccdkhselladd"]').value;
    const html = `
    <div>
        <label for="">CCCD/TAX:</label>
        <input type="text" name="cccdkhselladd" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${cccdkh}" >
        <label for="" style="margin-left: 90px;">Tên:</label>
        <input type="text" name="namekhselladd" style="width: 50%; border: none; border-bottom: 1px dotted black;" value="${customer.name}" disabled>
    </div>
    <div>
        <label for="">Địa chỉ:</label>
        <input type="text" name="addresskhselladd" style="width: 55%; border: none; border-bottom: 1px dotted black;" value="${customer.address}"disabled >
        <label for="" style="margin-left: 10px;">SĐT:</label>
        <input type="number" name="phonekhselladd" style="width: 20%; border: none; border-bottom: 1px dotted black;" value="${customer.phone}"disabled >
    </div>
    
`;
document.getElementById("search-result-sell-add").innerHTML = html; 
}
//hiển thị sản phẩm cho nút thêm sản phẩm phiếu mua
function renderspbuy(data){
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
            <a onclick="deletesp(${i})" class="btn btn-red"><i class="fa fa-trash"></i></a>
        </td>
        </tr>` 
        }
        localStorage.setItem("totalbuyadd",a)
        document.getElementById("renderspbuy").innerHTML=table
        totalbuyadd()
}
function totalbuyadd(){
    var total= localStorage.getItem("totalbuyadd")
    table=`<tr>
                        <th style="border: 1px solid black;width: 72.7%;">Tổng</th>
                        <th style="border: 1px solid black;">${total}</th>
                      </tr>`
    document.getElementById("totalbuyadd").innerHTML=table
}
//hiển thị sản phẩm cho nút thêm sản phẩm phiếu bán
function renderspsell(data){
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
            <a onclick="deletespsell(${i})" class="btn btn-red"><i class="fa fa-trash"></i></a>
        </td>
        </tr>` 
        }
        localStorage.setItem("totalselladd",a)
        document.getElementById("renderspsell").innerHTML=table
        totalselladd()
}
function totalselladd(){
    var total= localStorage.getItem("totalselladd")
    table=`<tr>
                        <th style="border: 1px solid black;width: 72.7%;">Tổng</th>
                        <th style="border: 1px solid black;">${total}</th>
                      </tr>`
    document.getElementById("totalselladd").innerHTML=table
}
//nút xóa sản phẩm cho danh sách sản phẩm mua
function deletesp(i){
listsp.splice(i,1)
renderspbuy(listsp)

}
//nút xóa sản phẩm cho danh sách sản phẩm bán
function deletespsell(i){
listspsell.splice(i,1)
renderspsell(listspsell)

}


    getlist()
// tìm kiếm
var search = document.getElementById("form-search")
search.addEventListener("submit",function(e){
    e.preventDefault();
    const token = localStorage.getItem("token")
    var cccd = document.querySelector('input[name="search"]').value
    fetch(`http://localhost:8080/buysell/getcode?cccd=${cccd}&id=${id}`,{
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
fetch(`http://localhost:8080/buysell/getall?id=${id}`,{
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
            if(data[i].statusPay==="pay"){
                var a = "Đã TT"
            }else{
                var a = "Chưa TT"
            }
            var b
           if(data[i].statusBuySell==="buy"){
             b = "#ex4"
           }else{
             b = "#ex6"
           }
           
           row.innerHTML +=`<form>
            <tr>
        <td><input style="border: none; " type="text" id="${data[i].id}" value="${data[i].code}" disabled required></td>
        <td><input style="border: none; " type="date"  id="${data[i].collectionDate}" value="${data[i].collectionDate}" disabled required></td>
        <td><input style="border: none; " type="date"id="${data[i].paymentDate}"  value="${data[i].paymentDate}"disabled required></td>
        <td><input style="border: none; " type="number" id="${data[i].money}"  value="${data[i].money}"disabled required></td>
        <td><input style="border: none; " type="text" id="${data[i].note}"  value="${data[i].note}"disabled required></td>
        <td><input style="border: none; " type="text" id="${a}"  value="${a}"disabled required></td>
        <td><input style="border: none; " type="text" id="${data[i].warehouse.subjects.name}"  value="${data[i].warehouse.subjects.name}"disabled required></td>
        <td>
            <a href="${b}" id="render" rel="modal:open" onclick="getupdate1(${data[i].id})" class="btn btn-orange"><i class="fa fa-edit"></i></a>
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
// hiển thị thông tin đối tượng cho phiếu mua sửa
function renderSearchResultfixsubjects(data) {
    if(data.cccd===null){
        var a = data.taxcode
    }else{
        var a = data.cccd
    }
    const html = `
        <div>
            <label for="">CCCD/TAX:</label>
            <input type="text"  name="cccdkhbuyfix" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
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
    document.getElementById("search-result-buy-fix").innerHTML = html;
}
// hiển thị thông tin đối tượng cho phiếu bán sửa
function renderSearchResultfixsubjectssell(data) {
    if(data.cccd===null){
        var a = data.taxcode
    }else{
        var a = data.cccd
    }
    const html = `
        <div>
            <label for="">CCCD/TAX:</label>
            <input type="text"  name="cccdkhsellfix" style="width: 15%; border: none; border-bottom: 1px dotted black;" value="${a}" >
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
    document.getElementById("search-result-sell-fix").innerHTML = html;
}
//hiển thị ngày cho phiếu sửa
function renderdatefix(data){
  html =`<div style="text-align: center; font-size:15px" id="datesellfix">
                  <i><label for="" >Ngày xuất:</label>
                    <input type="date" name="datesellfix" value="${data}"></i>
                </div>
    `
    document.getElementById("datesellfix").innerHTML = html; 
}

            function renderdatefix1(data){
  html =`<div style="text-align: center; font-size:15px" id="datebuyfix">
              <i><label for="" >Ngày:</label>
                <input type="date" name="datebuyfix" value="${data}"></i>
            </div>
    `
    document.getElementById("datebuyfix").innerHTML = html; 
}

// // lấy thông tin note cho phiếu mua sửa
function renderSearchResultfixnote(data){
  const html = `
  <div id="notebuyfix">
                    <label for="" style="font-size:15px">Nội dung:</label>
                    <input type="text" name="notebuyfix" style="width: 75%; border: none; border-bottom: 1px dotted black;" value="${data}" >
                  </div>
  `
  document.getElementById("notebuyfix").innerHTML = html;
  
}
// // lấy thông tin note cho phiếu bán sửa
function renderSearchResultfixnotesell(data){
  const html = `
  <div id="notesellfix">
                    <label for="" style="font-size:15px">Nội dung:</label>
                    <input type="text" name="notesellfix" style="width: 75%; border: none; border-bottom: 1px dotted black;" value="${data}" >
                  </div>
  `
  document.getElementById("notesellfix").innerHTML = html;
  
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
        localStorage.setItem("totalbuyadd",a)
        document.getElementById("renderspbuyfix").innerHTML=table
        totalbuyfix()
}
function totalbuyfix(){
    var total= localStorage.getItem("totalbuyadd")
    table=`<tr>
                        <th style="border: 1px solid black;width: 72.7%;">Tổng</th>
                        <th style="border: 1px solid black;">${total}</th>
                      </tr>`
    document.getElementById("totalbuyfix").innerHTML=table
}
//lấy thông tin sản phẩm cho phiếu bán sửa 
function renderspfixsell(data){
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
            <a onclick="deletespfixsell(${i})" class="btn btn-red"><i class="fa fa-trash"></i></a>
        </td>
        </tr>` 
        }
        localStorage.setItem("totalselladd",a)
        document.getElementById("renderspsellfix").innerHTML=table
        totalsellfix()
}
function totalsellfix(){
    var total= localStorage.getItem("totalselladd")
    table=`<tr>
                        <th style="border: 1px solid black;width: 72.7%;">Tổng</th>
                        <th style="border: 1px solid black;">${total}</th>
                      </tr>`
    document.getElementById("totalsellfix").innerHTML=table
}


// xóa 
function getcccd(id){
  const token = localStorage.getItem("token")
  localStorage.setItem("buysellid",id)
  fetch(`http://localhost:8080/buysell/getid?id=${id}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
    return response.json();
}).then((data1)=>{
  localStorage.setItem("statusBuySell",data1.statusBuySell)
}).catch((error)=>{getlist()})
}
function deleteCourse(){
  const token = localStorage.getItem("token")
    var cccd = localStorage.getItem("buysellid")
var check = localStorage.getItem("statusBuySell")
if(check==="buy"){
  fetch(`http://localhost:8080/buy/delete?id=${cccd}&userid=${id}`,{
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
}else{
  fetch(`http://localhost:8080/sell/delete?id=${cccd}&userid=${id}`,{
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
    fetch(`http://localhost:8080/WarehouseProduct/getbybuysell?id=${id1}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
    return response.json();
}).then((data1)=>{
        renderSearchResultfixsubjects(data1[0].warehouse.subjects);
        renderSearchResultfixsubjectssell(data1[0].warehouse.subjects);
        for (let i = 0; i < data1.length; i++) {
          
          data1[i].product.quantity= data1[i].quantity
          data1[i].product.price= data1[i].price
          listspfix.push(data1[i].product)
        }
        localStorage.setItem("listspfix",JSON.stringify(listspfix))
        renderspfix(listspfix)
        renderspfixsell(listspfix)
   
    // }
}).catch((error)=>{getlist()})   

fetch(`http://localhost:8080/buysell/getid?id=${id1}`,{
        method:"GET",
    headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
    },
    }) .then((response)=>{
    return response.json();
}).then((data1)=>{
    console.log(data1);
    localStorage.setItem("statusBuySell",data1.statusBuySell)
    if(data1.statusBuySell==="sell"){
        localStorage.setItem("statusBuySell","sell")
        renderSearchResultfixnotesell(data1.note);
        generateCodeex6(data1.code)
        renderdatefix(data1.paymentDate)
    }else{
        localStorage.setItem("statusBuySell","buy")
        renderSearchResultfixnote(data1.note);
        generateCodeex4(data1.code)
        renderdatefix1(data1.collectionDate)
    }
}).catch((error)=>{getlist()}) 
}
// //sửa phieu mua hang

// nút tìm kiếm đối tượng chức năng sửa phiếu mua
const searchbuyfix = document.getElementById("searchbuyfix")
searchbuyfix.addEventListener("click",function(e){
  const token = localStorage.getItem("token")
        e.preventDefault();
        var cccdkhfix= document.querySelector('input[name="cccdkhbuyfix"]').value;
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

// nút tìm kiếm đối tượng chức năng sửa phiếu bán
const searchsellfix = document.getElementById("searchsellfix")
searchsellfix.addEventListener("click",function(e){
  const token = localStorage.getItem("token")
        e.preventDefault();
        var cccdkhfix= document.querySelector('input[name="cccdkhsellfix"]').value;
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
        renderSearchResultfixsubjectssell(data1)
    }).catch((error)=>{getlist()})  
    })

    // nút tìm kiếm sản phẩm chức năng sửa phiếu mua
    var addbuyfix = document.getElementById("addbuyfix")
    addbuyfix.addEventListener("click",function(e){
      const token = localStorage.getItem("token")
    e.preventDefault(); 
    var listspfix1 =JSON.parse(localStorage.getItem("listspfix")) 
    var code = document.querySelector('input[name="searchcodebuyfix"]').value
    var number = document.querySelector('input[name="addnumberbuyfix"]').value
    var price = document.querySelector('input[name="addpricebuyfix"]').value
    if(code ===""){
        alert("cần nhập mã sản phẩm")
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
    data1.price=parseInt(price, 10);
    listspfix1.push(data1)
    localStorage.setItem("listspfix",JSON.stringify(listspfix1))
    renderspfix(listspfix1)
}).catch((error)=>{console.log(error);})  
            })
 // nút tìm kiếm sản phẩm chức năng sửa phiếu bán
 var addsellfix = document.getElementById("addsellfix")
 addsellfix.addEventListener("click",function(e){
  const token = localStorage.getItem("token")
    e.preventDefault(); 
    var listspfix1 =JSON.parse(localStorage.getItem("listspfix")) 
    var code = document.querySelector('input[name="searchcodesellfix"]').value
    var number = document.querySelector('input[name="addnumbersellfix"]').value
    var price = document.querySelector('input[name="addpricesellfix"]').value
    if(code ===""){
        alert("cần nhập mã sản phẩm")
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
    data1.price=parseInt(price, 10);
    listspfix1.push(data1)
    localStorage.setItem("listspfix",JSON.stringify(listspfix1))
    renderspfixsell(listspfix1)
}).catch((error)=>{console.log(error);})  
            })
//nút xóa thông tin sản phẩm chức năng sửa phiếu mua
var closes= document.getElementById("close-btn-buy-fix")
closes.addEventListener("click",function(e){
  listspfix2 =[]
  localStorage.setItem("listspfix",JSON.stringify(listspfix2))
})
//nút xóa thông tin sản phẩm chức năng sửa phiếu bán
var closessell= document.getElementById("close-btn-sell-fix")
closessell.addEventListener("click",function(e){
  listspfix2 =[]
  localStorage.setItem("listspfix",JSON.stringify(listspfix2))
})

//nút xóa sản phẩm ở danh sách sản phẩm phiếu mua sửa 

function deletespfix(i){
  var listspfix1 =JSON.parse(localStorage.getItem("listspfix")) 
  listspfix1.splice(i,1)
  localStorage.setItem("listspfix",JSON.stringify(listspfix1))
   renderspfix(listspfix1)
   }

   //nút xóa sản phẩm ở danh sách sản phẩm phiếu bán sửa 

function deletespfixsell(i){
  var listspfix1 =JSON.parse(localStorage.getItem("listspfix")) 
  listspfix1.splice(i,1)
  localStorage.setItem("listspfix",JSON.stringify(listspfix1))
   renderspfixsell(listspfix1)
   }

   // nút lấy thông tin đã sửa phiếu mua 
var savebuyfix=document.getElementById("save-btn-buy-fix")
savebuyfix.addEventListener("click",function(e){
  e.preventDefault();
  var cccdkhbuyfix = document.querySelector('input[name="cccdkhbuyfix"]').value;
  var datebuyfix = document.querySelector('input[name="datebuyfix"]').value;
  var notebuyfix = document.querySelector('input[name="notebuyfix"]').value;
  var codebuyfix = document.querySelector('input[name="codebuyfix"]').value;
  localStorage.setItem("cccdkhbuyfix",cccdkhbuyfix)
  localStorage.setItem("datebuyfix",datebuyfix)
  localStorage.setItem("notebuyfix",notebuyfix)
  localStorage.setItem("codebuyfix",codebuyfix)
})

   // nút lấy thông tin đã sửa phiếu bán 
   var savesellfix=document.getElementById("save-btn-sell-fix")
   savesellfix.addEventListener("click",function(e){
  e.preventDefault();
  var cccdkhsellfix = document.querySelector('input[name="cccdkhsellfix"]').value;
  var datesellfix = document.querySelector('input[name="datesellfix"]').value;
  var notesellfix = document.querySelector('input[name="notesellfix"]').value;
  var codesellfix = document.querySelector('input[name="codesellfix"]').value;
  localStorage.setItem("cccdkhsellfix",cccdkhsellfix)
  localStorage.setItem("datesellfix",datesellfix)
  localStorage.setItem("notesellfix",notesellfix)
  localStorage.setItem("codesellfix",codesellfix)
})

// nút lưu phiếu đã sửa 

function updateCourse(){
  const token = localStorage.getItem("token")
  var listspfix1 =JSON.parse(localStorage.getItem("listspfix"))
    var datebuyfix = localStorage.getItem("datebuyfix")
    var notebuyfix = localStorage.getItem("notebuyfix")
    var cccdkhbuyfix = localStorage.getItem("cccdkhbuyfix")
    var codebuyfix = localStorage.getItem("codebuyfix")
    var datesellfix = localStorage.getItem("datesellfix")
    var notesellfix = localStorage.getItem("notesellfix")
    var cccdkhsellfix = localStorage.getItem("cccdkhsellfix")
    var codesellfix = localStorage.getItem("codesellfix")
    var buysellId = localStorage.getItem("idfix")
    var check = localStorage.getItem("statusPay")
        var check1 =localStorage.getItem("statusCashFund")
        var check2 =localStorage.getItem("statusBanks")
        var check3 = localStorage.getItem("statusBuySell")
    var warehouseProducts = listspfix1.map(function(product){
    return{
      "product":{
        "id":product.id,
        "code":product.code,
        "quantity":product.quantity,
        "price":product.price
      }
    }
  })
  if (datebuyfix === "") {
        alert("Cần nhập ngày");
        return;
    }
    var body
if (check3==="buy") {
  if(check==="noPay"){
        body=JSON.stringify({
          id:buysellId,
          code:codebuyfix,
                    collectionDate:datebuyfix,
                    note:notebuyfix,
                    receiptDTO:{
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
              id:buysellId,
              code:codebuyfix,
                    collectionDate:datebuyfix,
                    note:notebuyfix,
                    receiptDTO:{
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
              id:buysellId,
              code:codebuyfix,
                    collectionDate:datebuyfix,
                    note:notebuyfix,
                    receiptDTO:{
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
    
        fetch(`http://localhost:8080/buy/update?cccd=${cccdkhbuyfix}`,{
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
}).catch((error)=>{console.log(error);})
}else{
  if(check==="noPay"){
        body=JSON.stringify({
          id:buysellId,
          code:codesellfix,
                    paymentDate:datesellfix,
                    note:notesellfix,
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
        if(check1==="phieuThu"){
            body=JSON.stringify({
              id:buysellId,
              code:codesellfix,
                    paymentDate:datesellfix,
                    note:notesellfix,
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
        }else if(check2==="baoCo"){
            body =JSON.stringify({
              id:buysellId,
              code:codesellfix,
                    paymentDate:datesellfix,
                    note:notesellfix,
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
    
        fetch(`http://localhost:8080/sell/update?cccd=${cccdkhsellfix}`,{
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
}).catch((error)=>{console.log(error);})
}
    
}
localStorage.setItem("statusPay","noPay")
//nut chọn hình thức thanh toán mua sửa
function onStatusNewChangefix(){
        if (document.getElementById("chuattbuyfix").checked) {
            localStorage.setItem("statusPay","noPay")
            localStorage.setItem("statusCashFund","noPay")
            localStorage.setItem("statusBanks","noPay")
        } else if (document.getElementById("tienmatbuyfix").checked) {
            localStorage.setItem("statusPay","pay")
            localStorage.setItem("statusCashFund","phieuChi")
        }else if(document.getElementById("chuyenkhoanbuyfix").checked){
            localStorage.setItem("statusPay","pay")
            localStorage.setItem("statusBanks","UNC")
        }
    }   
    function onStatusNewChangesellfix(){
        if (document.getElementById("chuattbuyfix").checked) {
            localStorage.setItem("statusPay","noPay")
            localStorage.setItem("statusCashFund","noPay")
            localStorage.setItem("statusBanks","noPay")
        } else if (document.getElementById("tienmatbuyfix").checked) {
            localStorage.setItem("statusPay","pay")
            localStorage.setItem("statusCashFund","phieuChi")
        }else if(document.getElementById("chuyenkhoanbuyfix").checked){
            localStorage.setItem("statusPay","pay")
            localStorage.setItem("statusBanks","UNC")
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