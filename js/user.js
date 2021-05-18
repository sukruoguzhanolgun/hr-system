const authorization = "Authorization"
const userStr = localStorage.getItem('user_info');
const user = JSON.parse(userStr);

const saveButton = document.getElementById("saveApp");
const loader = document.getElementById('root');
const form = document.getElementById('app_form');

saveButton.onclick = () => {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById("phone").value;
  const job = document.getElementById("job").value;
  const languages = document.getElementById("languages").value;
  const skills = document.getElementById("skills").value;

  if (
    name.trim() == "" ||
    surname.trim() == "" ||
    email.trim() == "" ||
    address.trim() == "" ||
    phone.trim() == "" ||
    job.trim() == "" ||
    languages.trim() == "" ||
    skills.trim() == ""
  ) {
     alert('Alanları eksiksiz doldurunuz !!!');
  }else{
    const app = {
        userDTO: {
          id: user.id
        },
        fullName: name + ' ' + surname,
        email: email,
        address: address,
        phoneNumber: phone,
        job: job,
        skills: skills,
        languages: languages
    };
    sendUserApp(app);
  }
};

async function sendUserApp (app){
  form.style.display = 'none';
  loader.style.display = 'flex';
    const appResponse = await fetch('http://localhost:8080/api/application/save', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(app)
    });

    if (appResponse.status == 200) {
      loader.style.display = 'none';
      form.style.display = 'block';
      alert('Başvurunuz alındı en kısa zamanda geri dönüş yapılacaktır.');
      localStorage.removeItem('user_info');
      window.location.href ='../auth/login.html';
    } else {
      loader.style.display = 'none';
      form.style.display = 'block';
      alert('Başvurun başarısız. Daha önce başvurduysanız lütfen bekleyin!');
      localStorage.removeItem('user_info');
      window.location.href ='../auth/login.html';
    }
}

window.onload = () => {
  if (!user) {
    window.location.href = '../auth/login.html';
  }

};