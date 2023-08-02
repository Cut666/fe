
    const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
    var urlParams = new URLSearchParams(window.location.search);
var responseCode = urlParams.get('vnp_ResponseCode');
      getlist1()
        function getlist1() {
        fetch(`http://localhost:8080/payment/paymentinfor?id=${id}&vnp_ResponseCode=${responseCode}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }).then((data)=>{
            return data.text()
        })
        .then((data) => {
            if(data=="Nâng cấp không thành công"){
                alert("Nâng cấp không thành công")
                window.location.href = "http://127.0.0.1:5500/thuvien.html"
            }else{
                console.log('SS');
                window.location.href = "http://127.0.0.1:5500/accessfully.html"
            }
            
          })
          .catch((error) => {
            console.log(error);
          });
    }
  