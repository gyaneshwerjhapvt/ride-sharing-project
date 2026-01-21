# SwiftRide - Integrated Ride-Sharing Platform

A comprehensive ride-sharing platform built with multiple frontend implementations and a robust backend supporting REST, GraphQL, and SOAP APIs.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend-1    │    │   Frontend-2    │    │     Backend     │
│ (Vanilla JS)    │    │   (Angular)     │    │  (Node.js)      │
│                 │    │                 │    │                 │
│ • REST API      │    │ • REST API      │    │ • REST API      │
│ • SOAP Payments │    │ • SOAP Payments │    │ • GraphQL API   │
│ • GraphQL       │    │ • Services      │    │ • SOAP Service  │
│ • Single Page   │    │ • SSR Enabled   │    │ • MySQL DB      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────────┐
                    │     Database        │
                    │   (MySQL)           │
                    │                     │
                    │ • Users             │
                    │ • Rides             │
                    │ • Payments          │
                    │ • Ratings           │
                    │ • Vehicles          │
                    └─────────────────────┘
```

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 8.0+
- **ORM**: Sequelize
- **APIs**:
  - REST API (Express)
  - GraphQL API (Apollo Server)
  - SOAP API (soap module)
- **Authentication**: Session-based (no JWT)

### Frontend-1 (Vanilla JavaScript)

- **HTML5/CSS3/JavaScript (ES6+)**
- **Styling**: Custom CSS with Font Awesome icons
- **API Integration**: Fetch API for REST/GraphQL/SOAP

### Frontend-2 (Angular)

- **Framework**: Angular 18+
- **Language**: TypeScript
- **Styling**: Component-specific CSS
- **Server-Side Rendering**: Angular Universal
- **State Management**: Signals (Angular 17+)

## 📋 Features

### Core Features

- ✅ User Registration & Authentication (Rider/Driver roles)
- ✅ Ride Request & Management
- ✅ Driver Ride Acceptance
- ✅ Real-time Ride Status Updates
- ✅ Vehicle Registration & Management
- ✅ Payment Processing (SOAP-based)
- ✅ Rating System (GraphQL-based)
- ✅ Responsive Design

### Advanced Features

- 🔄 Auto-refresh ride data (10-second intervals)
- 📊 Dashboard views for Riders and Drivers
- 🎯 Role-based UI components
- 🔒 Input validation and error handling
- 📱 Mobile-responsive design
- 🚀 Server-side rendering (Frontend-2)

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Database Setup

```sql
CREATE DATABASE ride_sharing_db;
```

### Backend Setup

```bash
cd backend
npm install
# Configure database in config/db.js
npm start  # Runs on http://localhost:3000
```

### Frontend-1 Setup

```bash
cd frontend-1
# No build required - open index.html in browser
# Or use a local server
python -m http.server 8080
# Access at http://localhost:8080
```

### Frontend-2 Setup

```bash
cd frontend-2
npm install
npm run build:ssr
npm run serve:ssr  # Runs on http://localhost:4000
```

## 📊 Database Schema

### Users Table

```sql
- user_id (PK, Auto Increment)
- full_name (VARCHAR 255)
- email (VARCHAR 255, UNIQUE)
- phone (VARCHAR 255)
- password (VARCHAR 255)
- role (ENUM: 'rider', 'driver')
- createdAt, updatedAt (Timestamps)
```

### Rides Table

```sql
- ride_id (PK, Auto Increment)
- rider_id (FK → Users)
- driver_id (FK → Users, NULL)
- pickup_location (VARCHAR 255)
- drop_location (VARCHAR 255)
- status (ENUM: requested, ongoing, completed, cancelled)
- start_time, end_time (DATETIME, NULL)
- fare (FLOAT, NULL)
```

### Payments Table

```sql
- payment_id (PK, Auto Increment)
- ride_id (FK → Rides, UNIQUE)
- amount (DECIMAL 10,2)
- method (ENUM: cash, credit_card, wallet, upi)
- status (ENUM: pending, completed, failed)
- payment_date (DATETIME)
```

### Ratings Table

```sql
- rating_id (PK, Auto Increment)
- ride_id (FK → Rides)
- given_by (FK → Users)
- given_to (FK → Users)
- score (INT 1-5)
- comment (TEXT, NULL)
```

### Vehicles Table

```sql
- vehicle_id (PK, Auto Increment)
- driver_id (FK → Users, UNIQUE)
- make (VARCHAR 255)
- model (VARCHAR 255)
- plate_number (VARCHAR 255, UNIQUE)
- color (VARCHAR 255, NULL)
- year (INT, NULL)
```

## 🔄 Application Flow

### User Journey

#### Rider Flow

1. **Registration**: Sign up as rider with email, phone, password
2. **Login**: Authenticate with email/password
3. **Dashboard**: View rider dashboard
4. **Request Ride**: Enter pickup/drop locations
5. **Track Ride**: Monitor ride status in real-time
6. **Make Payment**: Process payment via SOAP after ride completion
7. **Rate Driver**: Submit rating via GraphQL

#### Driver Flow

1. **Registration**: Sign up as driver with license info
2. **Vehicle Registration**: Register vehicle via GraphQL
3. **Login**: Authenticate with email/password
4. **Dashboard**: View driver dashboard
5. **Available Rides**: Browse and accept ride requests
6. **Manage Ride**: Start/complete rides
7. **View Ratings**: Check received ratings

### Navigation Flow

```
Landing Page
├── Login → Dashboard
├── Register → Login
└── Guest View

Dashboard (Role-based)
├── Rider Dashboard
│   ├── Request Ride
│   ├── My Rides
│   ├── Ratings
│   └── Payments
└── Driver Dashboard
    ├── Vehicle Management
    ├── Available Rides
    ├── My Accepted Rides
    └── Ratings
```

## 📚 API Documentation

### REST API Endpoints

#### Users

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user by ID
- `DELETE /api/users/:id` - Delete user

#### Rides

- `GET /api/rides` - Get all rides
- `POST /api/rides/request` - Request new ride
- `PUT /api/rides/accept/:id` - Accept ride (driver)
- `PUT /api/rides/complete/:id` - Complete ride
- `PUT /api/rides/cancel/:id` - Cancel ride

### GraphQL API

#### Queries

```graphql
query GetVehicleByDriver($driver_id: Int!) {
  getVehicleByDriver(driver_id: $driver_id) {
    vehicle_id
    make
    model
    plate_number
    color
    year
  }
}

query GetRatingsByUser($user_id: Int!) {
  getRatingsByUser(user_id: $user_id) {
    rating_id
    ride_id
    given_by
    score
    comment
  }
}
```

#### Mutations

```graphql
mutation RegisterVehicle($input: VehicleInput!) {
  registerVehicle(input: $input) {
    vehicle_id
    make
    model
    plate_number
    color
    year
  }
}

mutation AddRating($input: RatingInput!) {
  addRating(input: $input) {
    rating_id
    ride_id
    score
    comment
  }
}
```

### SOAP API

#### Payment Service

- **Endpoint**: `/soap/payment`
- **Method**: `createPaymentRequest`
- **Input**:
  ```xml
  <ride_id>1</ride_id>
  <amount>150.00</amount>
  <method>credit_card</method>
  ```
- **Output**:
  ```xml
  <transaction_id>TXN-1234567890</transaction_id>
  <status>SUCCESS</status>
  <message>Payment processed successfully</message>
  ```

## 🎯 Key Components

### Backend Components

- **Models**: Sequelize models with relationships
- **Controllers**: REST API business logic
- **Routes**: API endpoint definitions
- **GraphQL**: Schema and resolvers
- **SOAP**: Payment processing service
- **Config**: Database configuration

### Frontend-1 Components

- **Authentication**: Login/Register modals
- **Dashboard**: Role-based UI sections
- **Ride Management**: Request, accept, track rides
- **Payment**: SOAP integration
- **Rating**: GraphQL integration
- **Vehicle**: GraphQL vehicle management

### Frontend-2 Components

- **Auth Service**: Authentication with localStorage
- **User Component**: Login/Register forms
- **Rides Component**: Ride management
- **Vehicle Component**: Vehicle CRUD
- **Rating Component**: Rating system
- **Payment Component**: Payment processing

## 🔧 Configuration

### Environment Variables

Create `.env` file in backend directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ride_sharing_db
PORT=3000
```

### Database Configuration

Update `backend/config/db.js` with your MySQL credentials.

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration (rider/driver)
- [ ] User login
- [ ] Ride request (rider)
- [ ] Ride acceptance (driver)
- [ ] Vehicle registration (driver)
- [ ] Payment processing
- [ ] Rating submission
- [ ] Dashboard functionality
- [ ] Responsive design

### API Testing

```bash
# Test REST API
curl -X GET http://localhost:3000/api/rides

# Test GraphQL
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getRatingsByUser(user_id: 1) { rating_id score } }"}'
```

## 🚀 Deployment

### Backend Deployment

```bash
cd backend
npm run build  # If using TypeScript
npm start
```

### Frontend-1 Deployment

- Static hosting (GitHub Pages, Netlify, etc.)
- Ensure CORS is configured for API calls

### Frontend-2 Deployment

```bash
cd frontend-2
npm run build:ssr
# Deploy dist/ folder to hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues, please create an issue in the repository.

---

**Demo URLs:**

- Backend API: http://localhost:3000
- Frontend-1: http://localhost:8080
- Frontend-2: http://localhost:4000
- API Docs: http://localhost:3000/api-docs
