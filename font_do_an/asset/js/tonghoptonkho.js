
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
      //getcode
      getCode()
      function getCode() {
        const token = localStorage.getItem("token");
        fetch(`http://localhost:8080/product/generateCustomerCode?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            return response.text();
          })
          .then((data) => {
          renderCode(data)
          })
          .catch((error) => {
            console.log(error);
          });
      }
      function renderCode(data){
        table=`<div class="group" id="code">
                <label for="1">Mã</label>
                <input type="text" name="code"  placeholder="" value=${data} required />
              </div>`
        document.getElementById("code").innerHTML=table
      }
      
      //
      let currentPage = 1;
      const pageSize = 10; // Số mục trên mỗi trang
      let totalPages = 0; // Tổng số trang
      //
      //1 thêm
      function onStatusNewChange() {
        if (document.getElementById("newbook").checked) {
          localStorage.setItem("statusbook", "news");
        } else if (document.getElementById("oldbook").checked) {
          localStorage.setItem("statusbook", "old");
        }
      }
      const customer = document.getElementById("form");
      customer.addEventListener("submit", function (e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        var code = document.querySelector('input[name="code"]').value;
        var name = document.querySelector('input[name="name"]').value;
        var quantity = document.querySelector('input[name="quantity"]').value;
        var price = document.querySelector('input[name = "price"]').value;
        var priceRental1 = document.querySelector(
          'input[name="pricerental"]'
        ).value;
        console.log(priceRental1);
        var a = localStorage.getItem("statusbook");
        console.log(a);
        fetch("http://localhost:8080/product/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            code: code,
            name: name,
            quantity: quantity,
            price: price,
            priceRental: priceRental1,
            statusProductNew: a,
            user: { id: id },
          }),
        })
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            alert(data.message);
            getlist();
            location.reload()
          })
          .catch((error) => console.log(error));
      });
      getlist();
      // tìm kiếm
      var search = document.getElementById("form-search");
      search.addEventListener("submit", function (e) {
        var listsearch = []
        const token = localStorage.getItem("token");
        e.preventDefault();
        var name = document.querySelector('input[name="search"]').value;
        fetch(`http://localhost:8080/product/getbycodes?id=${id}&name=${name}`, {
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
            listsearch.push(data)
            if (name === "") {
              getlist();
            } else {
              //
              const totalItems = listsearch.length;
              totalPages = Math.ceil(totalItems / pageSize);

              render(
                listsearch.slice((currentPage - 1) * pageSize, currentPage * pageSize)
              );

              updatePagination();
              //
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
      //3  get danh sách
      function getlist() {
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
            localStorage.setItem("listdata", JSON.stringify(data));
            //
            const totalItems = data.length;
            totalPages = Math.ceil(totalItems / pageSize);

            render(
              data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            );

            updatePagination();
            //
          })
          .catch((error) => {
            console.log(error);
          });
      }
      var tables = JSON.parse(localStorage.getItem("listdata"));

      // Hiển thị
      function render(data) {
        var table = document.getElementById("table-body");
        table.innerHTML = ""; // Xóa nội dung bảng cũ
        for (let i = 0; i < data.length; i++) {
          var row = document.createElement("tr");
          const isChecked =
            data[i].statusProductNew === "news" ? "checked" : "";
          row.innerHTML += `<form>
            <tr>
        <td><input style="border: none; " type="text" name="code" id="${data[i].code}" value="${data[i].code}" disabled required></td>
        <td><input style="border: none; " type="text" name="name" id="${data[i].name}" value="${data[i].name}" disabled required></td>
        <td><input style="border: none; " type="number" name="quantity" id="${data[i].quantity}"  value="${data[i].quantity}"disabled required></td>
        <td><input style="border: none; " type="number" name="price" id="${data[i].price}"  value="${data[i].price}" disabled required></td>
        <td><input style="border: none; " type="number"name="pricerental" id="${data[i].priceRental}"  value="${data[i].priceRental}"disabled required></td>
        <td><input style="border: none; " type="checkbox" name="myCheckbox" id="${data[i].id}"${isChecked} onchange="checkbox(this)" disabled ></td>
        <td>
            <a href="#" onclick="getupdate1(${data[i].id})" class="btn btn-orange"><i class="fa fa-edit"></i></a>
            <a href="#ex1" onclick="getcccd(${data[i].id})" class="btn btn-red" rel="modal:open"><i class="fa fa-trash"></i></a>
            <a href="#ex2" id="updatecus_${data[i].id}" style="display:none" rel="modal:open" class="btn btn-orange">save</a>
        </td>
    
        </tr></form> `;
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
      // xóa
      function getcccd(id) {
        localStorage.setItem("productid", id);
      }

      function deleteCourse() {
        const token = localStorage.getItem("token");
        var cccd = localStorage.getItem("productid");
        fetch(`http://localhost:8080/product/delete?id=${cccd}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data1) => {
            getlist();
          })
          .catch((error) => {
            console.log(error);
          });
      }

      function close() {
        getlist();
      }
      function close1() {
        getlist();
        document.getElementById("updatecus").style.display = "none";
      }

      // sửa
      let isClicked = false;
      var update = 2;
      function getupdate1(id) {
        var codevalue = document
          .getElementById(id)
          .parentNode.parentNode.querySelector('input[name="code"]').value;
        var namevalue = document
          .getElementById(id)
          .parentNode.parentNode.querySelector('input[name="name"]').value;
        var quantityvalue = document
          .getElementById(id)
          .parentNode.parentNode.querySelector('input[name="quantity"]').value;
        var pricevalue = document
          .getElementById(id)
          .parentNode.parentNode.querySelector('input[name="price"]').value;
        var pricerentalvalue = document
          .getElementById(id)
          .parentNode.parentNode.querySelector(
            'input[name="pricerental"]'
          ).value;
        localStorage.setItem("productid", id);
        localStorage.setItem("productcode", codevalue);
        localStorage.setItem("productname", namevalue);
        localStorage.setItem("productquantity", quantityvalue);
        localStorage.setItem("productprice", pricevalue);
        localStorage.setItem("productpricerental", pricerentalvalue);
        if (update % 2 == 0) {
          update++;
          isClicked = true;
          document.getElementById(id).disabled = false;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="code"]'
            ).disabled = false;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="name"]'
            ).disabled = false;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="quantity"]'
            ).disabled = false;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="price"]'
            ).disabled = false;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="pricerental"]'
            ).disabled = false;
          document.getElementById(`updatecus_${id}`).style.display = "none";
        } else {
          update++;
          isClicked = false;
          document.getElementById(id).disabled = true;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="code"]'
            ).disabled = true;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="name"]'
            ).disabled = true;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="quantity"]'
            ).disabled = true;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="price"]'
            ).disabled = true;
          document
            .getElementById(id)
            .parentNode.parentNode.querySelector(
              'input[name="pricerental"]'
            ).disabled = true;
          document.getElementById(`updatecus_${id}`).style.display = "inline";
        }
        // Kiểm tra ô checkbox đã được chọn hay chưa
        var checkbox = document
          .getElementById(id)
          .parentNode.parentNode.querySelector('input[name="myCheckbox"]');
        if (checkbox.checked) {
          localStorage.setItem("statusbook", "news");
        } else {
          localStorage.setItem("statusbook", "old");
        }
      }

      function checkbox(checkboxObj) {
        if (checkboxObj.checked) {
          localStorage.setItem("statusbook", "news");
        } else {
          localStorage.setItem("statusbook", "old");
        }
      }

      function updateCourse() {
        const token = localStorage.getItem("token");
        //     var subjectenums = localStorage.getItem("listrole2")
        //     var ab = JSON.parse(subjectenums)
        //     var l1 = [customerup,supplierup]
        var productid = localStorage.getItem("productid");
        var productcode = localStorage.getItem("productcode");
        var productname = localStorage.getItem("productname");
        var productquantity = localStorage.getItem("productquantity");
        var productprice = localStorage.getItem("productprice");
        var productpricerental = localStorage.getItem("productpricerental");
        var statusbook = localStorage.getItem("statusbook");
        fetch(`http://localhost:8080/product/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            code: productcode,
            id: productid,
            name: productname,
            quantity: productquantity,
            price: productprice,
            priceRental: productpricerental,
            statusProductNew: statusbook,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data1) => {
            alert(data1.message);
            getlist();
          })
          .catch((error) => {
            console.log(error);
          });
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