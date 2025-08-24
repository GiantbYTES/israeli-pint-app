# 🍺 IPA – Israeli Pint App  

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)  
![Leaflet](https://img.shields.io/badge/Maps-Leaflet-green?logo=leaflet)  
![Supabase](https://img.shields.io/badge/Backend-Supabase-black?logo=supabase)  
![License](https://img.shields.io/badge/License-MIT-yellow)  

**IPA** (Israeli Pint App) is a **full-stack web application** that connects beer enthusiasts with local businesses.  
It features an **interactive map experience**, where customers can discover beers nearby, and businesses can easily add and manage their stores and beer offerings.  

Built with a **modern web stack** and **cloud-native backend**, IPA delivers a smooth and scalable experience for both guests and businesses.  

---

## 🚀 Features  

### 👤 Guests  
- Explore an **interactive Leaflet.js map** with beer spots in real time  
- Browse **stores and their beers** in a clean UI  
- View store details and beer lists  

### 🏪 Businesses  
- Register and authenticate with **Supabase Auth**  
- Add and manage stores on the map  
- Add beers to their store inventory  

---

## 🗺️ Navigation Flow  

- **Map** → Explore nearby beers & stores  
- **Store Page** → View store details & beer list  
- **Business Page** → Manage stores & beers  
- **Login / Register** → Business authentication  

---

## 🛠️ Tech Stack  

### Frontend  
- **React.js** – Component-based UI  
- **Leaflet.js** – Interactive maps & geolocation pins  
- **TailwindCSS** – Utility-first responsive design  

### Backend  
- **Supabase** – Postgres database + Authentication  
- **Supabase REST APIs** – Real-time data fetch & mutations  
- **Node.js** – Business logic & API integrations  

### Infrastructure  
- **Cloud-native architecture** with Supabase  
- **Scalable database schema** with relational mapping  

---

## 🗄️ Database Schema (Supabase)  

**Users (Businesses)**  
- `username`  
- `password`  

**Stores**  
- `name`  
- `location`  
- `business_username` → FK → Users.username  

**Beers**  
- `id`  
- `name`  
- `type`  
- `store_name` → FK → Stores.name  

---

## 🔌 APIs & Integrations  

- **Leaflet.js** – Interactive geospatial mapping  
- **Supabase Auth** – Business authentication & session handling  
- **Supabase Database** – Cloud Postgres for users, stores, beers  

---

## 📸 Mockups  

- **Home/Map Screen** – Explore stores on the map  
- **Store Page** – Store details + beers list  
- **Business Page** – Add/manage stores & beers  
- **Login / Register Page** – Business onboarding  

---

## 💡 Future Roadmap  

- ✅ Interactive beer filtering by type & style  
- ✅ Mobile-first UI optimization  
- 🚀 Social features (ratings, favorites, reviews)  
- 🚀 Push notifications for new beers nearby  
- 🚀 Advanced analytics dashboard for businesses  

---

## 🏗️ Getting Started  

### Clone & Install  
```bash
git clone https://github.com/your-username/IPA.git
cd IPA
npm install
