appInit();

function appInit() {
  getUser();
}

function getUser() {
  const user = localStorage.getItem("user_info");
  if (user) {
      const parsedUser = JSON.parse(user);
      login(parsedUser);
  } else {
    window.location.href = "pages/auth/login.html";
  }
}

function login(data){
  //localStorage.setItem('user_info', (data));
  if (data.role == 'ROLE_ADMIN') {
    location.href = 'pages/admin/application_list.html';
  } else {
    location.href = 'pages/user/hr_application.html';
  }
}
