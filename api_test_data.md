# SwiftRide API Test Data

## Quick Start Sequence

### 1. Register Users

**POST** `http://localhost:3000/api/users/register`

**Rider:**

```json
{
  "full_name": "John Doe",
  "email": "john.doe@gmail.com",
  "phone": "9876543210",
  "password": "password123",
  "role": "rider",
  "license_number": null
}
```

**Driver:**

```json
{
  "full_name": "Mike Johnson",
  "email": "mike.johnson@gmail.com",
  "phone": "9123456789",
  "password": "password123",
  "role": "driver",
  "license_number": "DL123456789"
}
```

### 2. Login Users

**POST** `http://localhost:3000/api/users/login`

**Login:**

```json
{
  "email": "john.doe@gmail.com",
  "password": "password123"
}
```

### 3. Register Vehicle (GraphQL)

**POST** `http://localhost:3000/graphql`

```json
{
  "query": "mutation RegisterVehicle($input: VehicleInput!) { registerVehicle(input: $input) { vehicle_id make model plate_number color year } }",
  "variables": {
    "input": {
      "driver_id": 2,
      "make": "Toyota",
      "model": "Camry",
      "plate_number": "DL01AB1234",
      "color": "White",
      "year": 2020
    }
  }
}
```

### 4. Request Ride

**POST** `http://localhost:3000/api/rides/request`

```json
{
  "rider_id": 1,
  "pickup_location": "Connaught Place, New Delhi",
  "drop_location": "India Gate, New Delhi"
}
```

### 5. Accept Ride

**PUT** `http://localhost:3000/api/rides/accept/1`

```json
{
  "driver_id": 2
}
```

### 6. Complete Ride

**PUT** `http://localhost:3000/api/rides/complete/1`

### 7. Process Payment (SOAP)

**POST** `http://localhost:3000/soap/payment`

Headers:

- Content-Type: text/xml; charset=utf-8
- SOAPAction: createPaymentRequest

Body:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://localhost:3000/soap/payment">
  <soap:Body>
    <tns:createPaymentRequest>
      <tns:ride_id>1</tns:ride_id>
      <tns:amount>150.00</tns:amount>
      <tns:method>credit_card</tns:method>
    </tns:createPaymentRequest>
  </soap:Body>
</soap:Envelope>
```

### 8. Add Rating (GraphQL)

**POST** `http://localhost:3000/graphql`

```json
{
  "query": "mutation AddRating($input: RatingInput!) { addRating(input: $input) { rating_id ride_id score comment } }",
  "variables": {
    "input": {
      "ride_id": 1,
      "given_by": 1,
      "given_to": 2,
      "score": 5,
      "comment": "Excellent service!"
    }
  }
}
```

## All API Endpoints with Sample Data

### REST API

#### Users

- **Register:** `POST /api/users/register`
- **Login:** `POST /api/users/login`
- **Get User:** `GET /api/users/{id}`
- **Delete User:** `DELETE /api/users/{id}`

#### Rides

- **Request Ride:** `POST /api/rides/request`
- **Get All Rides:** `GET /api/rides`
- **Get Ride:** `GET /api/rides/{ride_id}`
- **Accept Ride:** `PUT /api/rides/accept/{ride_id}`
- **Complete Ride:** `PUT /api/rides/complete/{ride_id}`
- **Cancel Ride:** `PUT /api/rides/cancel/{ride_id}`

### GraphQL API

#### Queries

```graphql
# Get vehicle by driver
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

# Get ratings by user
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
# Register vehicle
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

# Add rating
mutation AddRating($input: RatingInput!) {
  addRating(input: $input) {
    rating_id
    ride_id
    score
    comment
  }
}

# Update vehicle
mutation UpdateVehicle($driver_id: Int!, $input: VehicleUpdateInput!) {
  updateVehicle(driver_id: $driver_id, input: $input) {
    vehicle_id
    make
    model
    plate_number
    color
    year
  }
}

# Delete vehicle
mutation DeleteVehicle($driver_id: Int!) {
  deleteVehicle(driver_id: $driver_id)
}
```

### SOAP API

#### Payment Processing

- **Endpoint:** `POST /soap/payment`
- **SOAPAction:** `createPaymentRequest`

## Test User Credentials

| Role   | Email                  | Password    | Phone      | License     |
| ------ | ---------------------- | ----------- | ---------- | ----------- |
| Rider  | john.doe@gmail.com     | password123 | 9876543210 | -           |
| Driver | mike.johnson@gmail.com | password123 | 9123456789 | DL123456789 |

## Sample Data Values

### Locations

- Connaught Place, New Delhi
- India Gate, New Delhi
- Karol Bagh, New Delhi
- Lajpat Nagar, New Delhi
- Saket, New Delhi

### Vehicles

- Toyota Camry, DL01AB1234
- Honda City, DL02CD5678
- Maruti Swift, DL03EF9012

### Payment Methods

- credit_card
- cash
- wallet
- upi

## Import Instructions

1. **Postman Collection:** Import `postman_collection.json`
2. **Manual Testing:** Copy-paste the JSON bodies above
3. **Environment:** Set `base_url` to `http://localhost:3000`

## Testing Flow

1. Start backend server
2. Register rider and driver
3. Login as rider, request ride
4. Login as driver, accept ride
5. Complete ride
6. Process payment
7. Add rating
8. Check all data via GET endpoints
