# 🚖 Ride Sharing Hybrid API Project

A comprehensive backend system for a ride-sharing application implementing a **Hybrid API Architecture**. This project demonstrates the integration of three different communication protocols:

- **REST API** for User and Ride management.
- **GraphQL** for Vehicle management and querying.
- **SOAP** for secure Payment processing.

---

## 📸 API Workflows & Screenshots

### 👤 User Management (REST API)

**1. User Registration**
_(Endpoint: POST /api/users/register)_
![User Registration](./assets/image.png)

**2. User Login**
_(Endpoint: POST /api/users/login)_
![User Login](./assets/image-1.png)

---

### 🚖 Ride Operations (REST API)

**3. Request a Ride**
_(Endpoint: POST /api/rides/request)_
![Request Ride](./assets/image-2.png)

**4. Accept a Ride (Driver)**
_(Endpoint: PUT /api/rides/accept/:id)_
![Accept Rides](./assets/image-5.png)

**5. Update Rider Details**
_(Endpoint: PUT /api/rides/update-rider/:id)_
![Rider Update](./assets/image-6.png)

---

### 💳 Payment Gateway (SOAP API)

**6. Payment Processing**
_(Endpoint: POST /soap/payment)_
![Payment](./assets/image-3.png)

---

### 🚙 Vehicle Management (GraphQL API)

**7. Vehicle Registration**
_(Mutation: registerVehicle)_
![Vehicle Registration](./assets/image-4.png)

---

## 💾 Database Architecture

**Overall Database Design & Snapshot**
![Database Snapshot](./assets/image-7.png)

---

## 👥 Contributors

| Component    | Developers                      |
| :----------- | :------------------------------ |
| **REST API** | Diya Adhikary & Soumyata Sarkar |
| **SOAP API** | Adarsh Ranjan                   |
| **GraphQL**  | Anamika Ghosh & Gyaneshwer Jha  |
