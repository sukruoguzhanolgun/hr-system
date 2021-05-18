const authorization = "Authorization"

const userStr = localStorage.getItem('user_info');
const user = JSON.parse(userStr);

tabOnclick = (type) => {
  const appTab = document.getElementById("tableTabOne");
  const userTab = document.getElementById("tableTabTwo");

  if (type == "user") {
    console.log("SA");
    userTab.className = "tableTabTwoActive";
    userTab.children[0].className = "tabTextActive";
    appTab.className = "tableTabOne";
    appTab.children[0].classList.remove("tabTextActive");
    appTab.children[0].classList.add("tabText");
    location.href = "user_list.html";
  } else {
    userTab.className = "tableTabTwo";
    userTab.children[0].classList.remove("tabTextActive");
    userTab.children[0].classList.add("tabText");
    appTab.className = "tableTabOneActive";
    appTab.children[0].className = "tabTextActive";
    location.href = "application_list.html";
  }
};

onPressAdd = () => {
  location.href = "add_user.html";
};

function saveUser() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const repass = document.getElementById("repass").value;
  console.log('Email: ', email);
  console.log('pass: ', pass);
  console.log('repass: ', repass);

  if (
    email.trim() == "" ||
    pass.trim() == "" ||
    repass.trim() == ""
  ) {
    alert("Alanları eksiksiz doldurunuz");
  } else {
    if (pass !== repass) {
      alert("Şifreler eşleşmiyor !!!!");
    } else {
      console.log("Kayıt okdir");
      const body = {
        username: email,
        password: pass
      }
      saveUserRequest(body);
    }
  }
};

async function saveUserRequest(body) {
  const addUserResponse = await fetch('http://localhost:8080/api/user/adminsignup', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${user.token}`
    },
    body: JSON.stringify(body)

  })
    .catch(function (erro) {
      console.log(erro);
    });

  if (addUserResponse.status == 200) {
    alert('Kayıt başarılı.');
    location.href = '../admin/user_list.html'
  } else {
    alert('Kayıt başarısız.');
  }
}

async function getAppList() {
  const appResponse = await fetch('http://localhost:8080/api/application/list', {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${user.token}`
    },
  });

  const responseData = await appResponse.json();
  console.log('data: ', appResponse);

  if (appResponse.status == 200) {
    responseData.length > 0 &&
      renderAppList(responseData);
  } else {
    if (appResponse.status == 401) {
      location.href = '../auth/login.html';
    } else {
      alert('Data alınamadı!');
    }
  }

};

renderAppList = (listData) => {
  const tableBody = document.getElementById("listRows");
  listData.map((appItem, appIndex) => {
    const row = document.createElement("tr");

    const col1 = document.createElement("td");
    col1.className = "pl-4";
    col1.innerHTML = appItem.id;
    row.appendChild(col1);

    const col2 = document.createElement("td");
    const col2_h5 = document.createElement("h5");
    col2_h5.className = "font-medium mb-0";
    col2_h5.innerHTML = appItem.fullName;
    const col2_span = document.createElement("span");
    col2_span.className = "text-muted";
    col2_span.innerHTML = appItem.address;
    col2.appendChild(col2_h5);
    col2.appendChild(col2_span);
    row.appendChild(col2);

    const col3 = document.createElement("td");
    const col3_span = document.createElement("span");
    col3_span.className = "text-muted";
    col3_span.innerHTML = appItem.job;
    col3.appendChild(col3_span);
    row.appendChild(col3);

    const col4 = document.createElement("td");
    const col4_span1 = document.createElement("span");
    col4_span1.className = "text-muted";
    col4_span1.innerHTML = appItem.email;
    const br = document.createElement("br");
    const col4_span2 = document.createElement("span");
    col4_span2.className = "text-muted";
    col4_span2.innerHTML = appItem.phoneNumber;
    col4.appendChild(col4_span1);
    col4.appendChild(br);
    col4.appendChild(col4_span2);
    row.appendChild(col4);

    const col5 = document.createElement("td");
    const col5_span = document.createElement("span");
    col5_span.className = "text-muted";
    col5_span.innerHTML = appItem.skills;
    col5.appendChild(col5_span);
    row.appendChild(col5);

    const col6 = document.createElement("td");
    const col6_span = document.createElement("span");
    col6_span.className = "text-muted";
    col6_span.innerHTML = appItem.languages;
    col6.appendChild(col6_span);
    row.appendChild(col6);

    const col7 = document.createElement("td");
    const col7_btn = document.createElement("button");
    col7_btn.type = "button";
    col7_btn.className = "btn btn-outline-info btn-lg";
    col7_btn.innerHTML = "Başvuruyu Sil";
    col7_btn.onclick = () => deleteAppRequest(appItem.id);
    col7.appendChild(col7_btn);
    row.appendChild(col7);
    tableBody.appendChild(row);
  });
}

async function getUserList() {
  console.log('USER: ', user);

  const userResponse = await fetch('http://localhost:8080/api/user/list', {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${user.token}`
    }
  }).catch(function (erro) {
    console.log('Error : ', erro);
  });

  console.log('RESP: ', userResponse)

  if (userResponse.status == 200) {
    const responseData = await userResponse.json();
    console.log('data: ', responseData);
    responseData.length > 0 &&
      renderUsrList(responseData);
  } else {
    console.log('response: ', userResponse);
    if (userResponse.status == 401 || userResponse.status == 403) {
      location.href = '../auth/login.html';
    } else {
      alert('Data alınamadı!');
    }
  }
};

renderUsrList = (listData) => {
  const tableBody = document.getElementById("listRows");
  listData.map((userItem, userIndex) => {
    const row = document.createElement("tr");

    const col1 = document.createElement("td");
    col1.className = "pl-4";
    col1.innerHTML = userItem.id;
    row.appendChild(col1);

    const col2 = document.createElement("td");
    const col2_h5 = document.createElement("h5");
    col2_h5.className = "font-medium mb-0";
    col2_h5.innerHTML = userItem.username;
    col2.appendChild(col2_h5);
    row.appendChild(col2);

    const col3 = document.createElement("td");
    const col3_span = document.createElement("span");
    col3_span.className = "text-muted";
    col3_span.innerHTML = userItem.role;
    col3.appendChild(col3_span);
    row.appendChild(col3);

    const col4 = document.createElement("td");
    const col4_btn = document.createElement("button");
    col4_btn.type = "button";
    col4_btn.className = "btn btn-outline-info btn-lg";
    col4_btn.innerHTML = " Kullanıcıyı Sil";
    col4_btn.onclick = () => deleteUser(userItem.id);
    col4.appendChild(col4_btn);
    row.appendChild(col4);
    tableBody.appendChild(row);
  });
}

async function deleteUser(id) {
  if (id == user.id) {
    alert("You can't delete this user");
  } else {

    const body = {
      id: id
    }

    const deleteUserResponse = await fetch('http://localhost:8080/api/user/deleteuser', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(body)

    }).catch(function (erro) {
      console.log('Error : ', erro);
    });

    if (deleteUserResponse.status == 200) {
      alert('User successfully deleted.');
      location.reload();
    } else {
      alert('An error occured.');
    }
  }
}

async function deleteAppRequest(id) {

  const body = {
    id: id
  }

  const deleteAppResponse = await fetch('http://localhost:8080/api/application/delete', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${user.token}`
    },
    body: JSON.stringify(body)
  });
  if (deleteAppResponse.status == 200) {
    alert('Application successfully deleted');
    location.reload();
  } else {
    alert('An error occured.')
  }
}

window.onload = () => {
  if (user) {
    if (window.location.pathname === "/pages/admin/user_list.html") {

      getUserList();
    } else if (
      window.location.pathname === "/pages/admin/application_list.html"
    ) {
      getAppList();
    }
  } else {
    window.location.href = '../auth/login.html';
  }

};

function logout() {
  localStorage.removeItem('user_info');
  window.location.href = '../../';
}
