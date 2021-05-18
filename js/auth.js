const registerBtn = document.getElementById("registerBtn");
const registerBtn2 = document.getElementById("registerBtn2");
const loginBtn = document.getElementById("loginBtn");

registerBtn
  ? (registerBtn.onclick = () => {
    location.href = "register.html";
  })
  : null;

registerBtn2
  ? (registerBtn2.onclick = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;

    if (
      username.trim() == "" ||
      password.trim() == "" ||
      repassword.trim() == ""
    ) {
      alert("Fill all blanks!!!");
    } else {
      if (password.trim() !== repassword.trim()) {
        alert("Passwords do not match!!!");
      } else {
        const body = {
          username: username,
          password: password
        };
        register(body);
      }
    }
  })
  : null;

loginBtn
  ? (loginBtn.onclick = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username.trim() == "" || password.trim() == "") {
      alert("Fill all blanks!!!");
    } else {
      const body = {
        username: username,
        password: password
      };
      login(body);
    }

    // location.href='../admin/user_list.html';
    // location.href = '../admin/application_list.html';

  })
  : null;

async function login(loginBody) {
  console.log('istek atılıyor')
  const loginResponse = await fetch('http://localhost:8080/api/user/signin', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',

    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(loginBody)

  }).catch(function (erro) {
    console.log('Error : ', erro);
  });

  const responseData = await loginResponse.json();
  console.log('data: ', responseData);

  if (loginResponse.status == 200) {
    loginSuccess(responseData);
  } else {
    loginFail(responseData);
  }
}

loginSuccess = (data) => {
  localStorage.setItem('user_info', JSON.stringify(data));
  if (data.role == 'ROLE_ADMIN') {
    location.href = '../admin/user_list.html';
  } else {
    location.href = '../user/hr_application.html';
  }
}

loginFail = (data) => {
  alert('Hatalı Giriş');
}

async function register(registerBody) {
  const registerResponse = await fetch('http://localhost:8080/api/user/signup', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',

    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(registerBody)

  })
    .catch(function (erro) {
      console.log(erro);
    });

    if(registerResponse.status == 200){
      const responseData = await registerResponse.json();
      alert('Kayıt başarılı. Lütfen giriş yapın');
      window.location.href='login.html';
    }else{
      alert('Kayıt başarısız.');
    }
}