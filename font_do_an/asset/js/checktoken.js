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
  