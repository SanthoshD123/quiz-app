# **Quiz Application** 📝🎯  

A full-stack **Quiz Application** built with **Angular (frontend)** and **Spring Boot (backend)**. Users can take quizzes, view scores, and create new quizzes with a simple and interactive interface.  

## **📌 Features**  

✅ **Secure authentication** - using usernames & hashed passwords.
✅ **Take Quizzes** – Users can attempt quizzes and submit answers.  
✅ **View Results** – See scores with a visual performance summary.  
✅ **Create Quizzes** – Add new quizzes with questions dynamically.  
✅ **REST API Integration** – Communicates with a Spring Boot backend.  
✅ **Modular & Scalable** – Clean architecture with reusable components.  

---

## **🚀 How It Works**  

1️⃣ **Landing Page:** Shows all available quizzes (fetched from the backend).  
2️⃣ **Quiz Attempt:** Users select a quiz and answer multiple-choice questions.  
3️⃣ **Submission:** Answers are sent to the backend for evaluation.  
4️⃣ **Result Page:** Displays scores with a visual breakdown.  
5️⃣ **Quiz Creation:** Admins can add new quizzes dynamically.  

---

## **🛠️ Tech Stack**  

| Layer         | Technology  |
|--------------|------------|
| **Frontend**  | Angular, TypeScript, Bootstrap |
| **Backend**   | Spring Boot, Java, REST API   |
| **Database**  | MySQL (or H2 for testing) |
| **Hosting**   | Can be deployed on Netlify & Railway |

---

## **📸 Screenshots**  

**🏠 Home Page (Quiz List)**  
![Screenshot 2025-03-11 124836](https://github.com/user-attachments/assets/f8fdec2a-c731-4ec4-848a-e0ca35d6e6a3)
 

**📝 Quiz Attempt**  
![Screenshot 2025-03-11 125257](https://github.com/user-attachments/assets/92b3b738-f20b-47f4-8327-0ec5a0d06877)

**Create Quiz**
![Screenshot 2025-03-11 125342](https://github.com/user-attachments/assets/bf14ab52-4be1-458f-b976-3f853541c2df)

**📊 Results Page**  
![Screenshot 2025-03-11 125306](https://github.com/user-attachments/assets/e945e1b3-d6e5-4b3a-8e72-9f77cd38c0fe)

**Admin Module**
![Screenshot 2025-03-14 145511](https://github.com/user-attachments/assets/c2acf91d-9b47-4855-bc94-abd7c8578886)

**Authentication**
![Screenshot 2025-03-14 145524](https://github.com/user-attachments/assets/2b58c6c7-838e-4379-9c96-b6e884f5446a)


---

## **⚙️ Setup & Installation**  

### **Backend (Spring Boot) Setup**  

1. Navigate to `quiz-api/`:  
   ```sh
   cd quiz-api
   ```
2. Run the Spring Boot app:  
   ```sh
   mvn spring-boot:run
   ```
3. Ensure **MySQL is running** (or switch to H2 for testing).  

### **Frontend (Angular) Setup**  

1. Navigate to `quiz-frontend/`:  
   ```sh
   cd quiz-frontend
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the Angular app:  
   ```sh
   ng serve
   ```
4. Open `http://localhost:4200/` in a browser.  

---

## **📌 API Endpoints**  

| Method | Endpoint                 | Description                 |
|--------|--------------------------|-----------------------------|
| GET    | `/quizzes`               | Fetch all quizzes          |
| GET    | `/quizzes/{id}`          | Get a quiz by ID           |
| POST   | `/quizzes`               | Create a new quiz          |
| POST   | `/quizzes/{id}/submit`   | Submit answers & get score |

---

## **📢 Contribution**  

Want to improve this project? Feel free to **fork the repo, create a branch, and submit a pull request!** 🚀  

---

## **📄 License**  
This project is **open-source** and available under the **MIT License**.  
