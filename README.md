
Proje Özeti:

Bu web uygulaması, kullanıcılara sosyal medya benzeri bir platformda etkileşimde bulunabilecekleri bir sistem sunar. Java, Spring Boot, React, MySQL ve Hibernate kullandım. Uygulamanın amacı, kullanıcıların kolayca kayıt olup giriş yapabilmesini sağlamak, içeriklerini paylaşmalarına ve başkalarıyla etkileşimde bulunmalarına olanak tanımaktır.

Özellikler:

•	Kullanıcı Kaydı ve Girişi: Kullanıcılar, sisteme kayıt olabilmekte ve giriş yapabilmektedir. Giriş için JWT Token tabanlı kimlik doğrulama yöntemi kullanılmaktadır. 
•	Post Sistemi: Kullanıcılar kendi postlarını oluşturabilir, düzenleyebilir ve silebilirler. Ayrıca, diğer kullanıcıların postlarına like (beğeni) gönderebilirler.
•	Yorum Sistemi: Kullanıcılar, başkalarının paylaştığı postlara yorum yapabilir.
•	Kullanıcı Profili ve Avatar: Kullanıcılar, hesap ekranlarında profil fotoğraflarını (avatarlarını) seçebilirler. Ayrıca, kendi aktivitelerini (paylaşımlarını ve yorumlarını) görüntüleyebilirler.

Kullanılan Teknolojiler:

•	Backend: Java 17, Spring Boot, Hibernate, Lombok, MySQL
•	Frontend: React
•	Veritabanı: MySQL
•	Güvenlik: JWT Token Authentication (HS512 ile şifreleme)

Projenin Çalıştırılması :
- Backend’i Çalıştırma
1.	MySQL Veritabanını Ayarla, application.properties içinde veritabanı bilgilerini kendi ayarlarına göre düzenle.
2.	Backend’i Başlat
	API, http://localhost:8080 üzerinden çalışacaktır.
- Frontend’i Çalıştırma
1.	Bağımlılıkları Yükle; Terminal de; npm install 
2.	Frontend’i Başlat; npm start
	React uygulaması http://localhost:3000 adresinde çalışacaktır.

Proje Bağlantıları :
•	Backend Repo: [post-app-backend](https://github.com/OZNURKUTLU/post-app-backend)
•	Frontend Repo: [post-app-frontend](https://github.com/OZNURKUTLU/post-app-frontend)

Ekran Görüntüleri :

![image](https://github.com/user-attachments/assets/cc3d3a3e-0ce5-44bd-80dd-3e2f73e41080)
![image](https://github.com/user-attachments/assets/59cdf4af-925a-4d84-8603-29882374a2f0)
![image](https://github.com/user-attachments/assets/7aca5515-06a3-4f79-bb34-77952b16ec7f)










