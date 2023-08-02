
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
//
let currentPage = 1;
const pageSize = 10; // Số mục trên mỗi trang
let totalPages = 0; // Tổng số trang
//
//1 thêm
const customer = document.getElementById("form");
customer.addEventListener("submit", function (e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  if (!id) {
    alert("Yêu cầu đăng nhập");
    return;
  }
  var cccd = document.querySelector('input[name="CCCD"]').value;
  var name = document.querySelector('input[name="name"]').value;
  var phone = document.querySelector('input[name="phone"]').value;
  var email = document.querySelector('input[name = "gmail"]').value;
  var address = document.querySelector('input[name="address"]').value;
  fetch("http://localhost:8080/supplier/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      taxcode: cccd,
      name: name,
      phone: phone,
      address: address,
      gmail: email,
      user: {
        id: id,
      },
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      alert(data.message);
      getlist();
    })
    .catch((error) => console.log(error));
});
getlist();
// tìm kiếm
var search = document.getElementById("form-search");
search.addEventListener("submit", function (e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  var sub12 = localStorage.getItem("subs");
  var cccd = document.querySelector('input[name="search"]').value;
  fetch(
    `http://localhost:8080/supplier/getByPhone?taxcode=${cccd}&sub=${sub12}&id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (cccd === "") {
        getlist();
      } else {
        //
        const totalItems = data.length;
        totalPages = Math.ceil(totalItems / pageSize);

        render(
          data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        );

        updatePagination();
        //
      }
    })
    .catch((error) => {
      getlist();
    });
});
//3  get danh sách
function getlist() {
  const token = localStorage.getItem("token");
  const read = document.getElementById("list-course");
  var sub1 = "customer";
  var sub2 = "supplier";
  localStorage.setItem("sub", sub1);
  localStorage.setItem("subs", sub2);
  var sub12 = localStorage.getItem("subs");

  fetch(`http://localhost:8080/customer/getAll?sub=${sub12}&id=${id}`, {
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
    var list = data[i].subjectenums.length;

    var list2 = [];
    for (let j = 0; j < list; j++) {
      list2.push(data[i].subjectenums[j].sub);
    }
    localStorage.setItem("numberrole", list2.length);
    const isChecked = list2.length === 2 ? "checked" : "";
    row.innerHTML += `<form>
      <tr>
  <td><input style="border: none; width: 120px; " type="number" name="tax" id="${data[i].taxcode}" value="${data[i].taxcode}" disabled required></td>
  <td style="display:none"><input style="border: none;width: 120px; " type="number" name="cccd" id="${data[i].cccd}" value="${data[i].cccd}" disabled required></td>
  <td><input style="border: none; " type="text" name="name" id="${data[i].name}" value="${data[i].name}" disabled required></td>
  <td><input style="border: none; " type="number" name="phone" id="${data[i].phone}"  value="${data[i].phone}"disabled required></td>
  <td><input style="border: none; " type="text" name="gmail" id="${data[i].gmail}"  value="${data[i].gmail}" disabled required></td>
  <td><input style="border: none; " type="text"name="address" id="${data[i].address}"  value="${data[i].address}"disabled required></td>
  <td style="display:none"><input style="border: none; " type="checkbox" name="myCheckbox" id="${data[i].id}" ${isChecked} onchange="checkbox(this,${list2.length})" disabled ></td>
  <td>
      <a href="#" onclick="getupdate1(${data[i].id})" class="btn btn-orange"><i class="fa fa-edit"></i></a>
      <a href="#ex1" onclick="getcccd(${data[i].id})" class="btn btn-red" rel="modal:open"><i class="fa fa-trash"></i></a>
      <a href="#ex2" id="updatecus_${data[i].id}" name="save" style="display:none" rel="modal:open" class="btn btn-orange">save</a>
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
  localStorage.setItem("supplierid", id);
}

function deleteCourse() {
  const token = localStorage.getItem("token");
  var cccd = localStorage.getItem("supplierid");
  fetch(`http://localhost:8080/supplier/delete?id=${cccd}`, {
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
  var cccdvalue = document
    .getElementById(id)
    .parentNode.parentNode.querySelector('input[name="tax"]').value;
  var namevalue = document
    .getElementById(id)
    .parentNode.parentNode.querySelector('input[name="name"]').value;
  var phonevalue = document
    .getElementById(id)
    .parentNode.parentNode.querySelector('input[name="phone"]').value;
  var gmailvalue = document
    .getElementById(id)
    .parentNode.parentNode.querySelector('input[name="gmail"]').value;
  var addressvalue = document
    .getElementById(id)
    .parentNode.parentNode.querySelector('input[name="address"]').value;
  localStorage.setItem("customerid", id);
  localStorage.setItem("suppliertax", cccdvalue);
  localStorage.setItem("customername", namevalue);
  localStorage.setItem("customerphone", phonevalue);
  localStorage.setItem("customergmail", gmailvalue);
  localStorage.setItem("customeraddress", addressvalue);
  if (update % 2 == 0) {
    update++;
    isClicked = true;
    document.getElementById(id).disabled = false;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="tax"]'
      ).disabled = false;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="name"]'
      ).disabled = false;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="phone"]'
      ).disabled = false;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="gmail"]'
      ).disabled = false;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="address"]'
      ).disabled = false;
    document.getElementById(`updatecus_${id}`).style.display = "none";
  } else {
    update++;
    isClicked = false;
    document.getElementById(id).disabled = true;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="tax"]'
      ).disabled = true;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="name"]'
      ).disabled = true;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="phone"]'
      ).disabled = true;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="gmail"]'
      ).disabled = true;
    document
      .getElementById(id)
      .parentNode.parentNode.querySelector(
        'input[name="address"]'
      ).disabled = true;
    document.getElementById(`updatecus_${id}`).style.display = "inline";
  }
  var listrole2;
  // Kiểm tra ô checkbox đã được chọn hay chưa
  var checkbox = document
    .getElementById(id)
    .parentNode.parentNode.querySelector('input[name="myCheckbox"]');
  if (checkbox.checked) {
    listrole2 = [supplierup, customerup];
    localStorage.setItem("listrole2", JSON.stringify(listrole2));
  } else {
    listrole2 = [supplierup];
    localStorage.setItem("listrole2", JSON.stringify(listrole2));
  }
}
var customerup = { id: 1 };
var supplierup = { id: 2 };

function checkbox(checkboxObj, length) {
  var listrole2;
  console.log(length);
  if (length === 1) {
    listrole2 = [supplierup];
    localStorage.setItem("listrole2", JSON.stringify(listrole2));
    if (checkboxObj.checked) {
      listrole2.push(customerup);
      if (listrole2.length > 2) {
        listrole2.splice(1, 3);
      }
    } else {
      listrole2.splice(1, 1);
    }
  } else {
    listrole2 = [supplierup, customerup];
    localStorage.setItem("listrole2", JSON.stringify(listrole2));
    if (checkboxObj.checked) {
      listrole2.push(customerup);
      if (listrole2.length > 2) {
        listrole2.splice(1, 3);
      }
    } else {
      listrole2.splice(1, 1);
    }
  }
  return localStorage.setItem("listrole2", JSON.stringify(listrole2));
}
var subjectenums = localStorage.getItem("listrole2");

function updateCourse() {
  const token = localStorage.getItem("token");
  var subjectenums = localStorage.getItem("listrole2");
  var ab = JSON.parse(subjectenums);
  var l1 = [customerup, supplierup];
  var customerid = localStorage.getItem("customerid");
  var customercccd = localStorage.getItem("suppliertax");
  var customername = localStorage.getItem("customername");
  var customerphone = localStorage.getItem("customerphone");
  var customergmail = localStorage.getItem("customergmail");
  var customeraddress = localStorage.getItem("customeraddress");
  fetch(`http://localhost:8080/supplier/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      id: customerid,
      taxcode: customercccd,
      name: customername,
      phone: customerphone,
      address: customeraddress,
      gmail: customergmail,
      subjectenums: ab,
      user: {
        id: id,
      },
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