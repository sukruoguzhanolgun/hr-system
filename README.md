# İnsan Kaynakları Sistemi Front-End

##Giriş
Bu sistem iş başvurusu yapmak ve bu başvuruları görüntülemek için geliştirilmiştir.

Sisteme giriş yapabilmek için üyelik oluşturulması gerekmektedir. 2 Farklı üyelik türü vardır;
```json
{
  "Role": "Admin",
  "Role": "User"
}
```
Admin rolü ile iş başvurularını listeleyebilir, silebilir ve admin rolünde kullanıcı oluşturabilirsiniz.
User rolü ile yeni başvuru yapabilirsiniz.

##Uygulama Ayrıntıları

Uygulama 2 kısımdan oluşmaktadır. Back-end için **Java 8** ve **Maven** kullanılmıştır. İlgili kodlara [buradan](https://github.com/sukruoguzhanolgun/hr-system-back-end.git)
ulaşabilirsiniz.

Front-end **JavaScript**, **HTML5** ve **CSS** kullanılarak hazırlanmıştır.

Projenin HTML sayfalarının yapısı aşağıdaki gibidir:
```
-pages
    -admin
        -add_user.html
        -application_list.html
        -user_list.html
    -auth
        -login.html
        -register.html
    -user
        -hr_application.html
-index.html
```

Projenin JavaScript yapısı aşağıdaki gibidir:
```
-js
    -admin.js
    -auth.js
    -main.js
    -user.js
```

Projenin CSS yapısı aşağıdaki gibidir:
```
-css
     -admin.css
     -auth.css
     -main.css
     -user.css
```

JavaScript ile Back-end tarafındaki sunuculara istek göndermek için **Fetch** fonksiyonu kullanılmıştır.
Bu fonksiyonla;

```
async function login(loginBody) {

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
```

http://localhost:8080/api/user/signin

http://localhost:8080/api/user/signup

http://localhost:8080/api/user/list

http://localhost:8080/api/user/adminsignup

http://localhost:8080/api/user/delete

http://localhost:8080/api/application/list

http://localhost:8080/api/application/save

http://localhost:8080/api/application/delete

Url' lerine istek gönderilmiştir. Metodların dönüş değerlerine göre ilgili sayfalara yönlendirilme yapılmıştır.

Uygulamanın açılış sayfası ```login.html``` 'dir. Kullanıcı bu sayfa üzerinden yeni kayıt oluşturabilir veya 
giriş yapabilir. Giriş yapan kullanıcının rolüne göre sayfalar arasında yönlendirme yapılmaktadır.

Eğer kullanıcının rolü User ise ```hr_application.html``` sayfasına yönlendirilir.

Eğer kullanıcının rolü Admin ise ```user_list.html``` sayfasına yönlendirilir. Bu sayfa üzerinden Admin rolünde
yeni kullanıcı oluşturulabilir veya silinebilir. Aynı zamanda bu sayfadan ```application_list.html``` 
sayfasına erişim sağlanabilir. ```application_list.html``` sayfasından başvurular silinebilir ve listelenebilir.


# Projeyi çalıştırabilmek için:

1. İlgili kodları **Visual Studio Code** üzerinden çalıştırmanızı öneririm. Uygulamaya [buradan](https://code.visualstudio.com/download) ulaşabilirsiniz.


2. GitHub üzerinden projeyi bilgisayarınıza indirin.

```
$ git clone https://github.com/sukruoguzhanolgun/hr-system-front-end.git
```

3. Uygulamanın indirileceği klasörü seçin.

```
$ cd //sizin dosya adınız
```

4. Herhangi bir sunucu kullanarak ```index.html``` sayfasını açın.


5. Uygulamaya giriş yaparak sayfalar arasında dolaşabilirsiniz.
