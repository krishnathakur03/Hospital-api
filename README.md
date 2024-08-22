
# Hospital Api
This project is a RESTful API designed to manage COVID-19 patient data for a government-allocated hospital. The API allows doctors to log in, register patients, create medical reports, and retrieve patient reports based on specific criteria.

## Features

- **Doctor Management:**
    Doctors can register and log in to the system.

- **Patient Management:**
    Doctors can register patients using their phone numbers.


- **Report Management:**
    After each checkup, doctors can create reports with predefined statuses and list all reports for a patient.

- **Filtering:**
    Reports can be filtered by their status.
## Tech Stack

**Backend:** Node.js, Express.js, Mongoose

**Database:** MongoDB

**Authentication:** JSON Web Token (JWT)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL=mongodb://localhost:27017/hospital_api`

`port=3000`

`SECRET=JWT_SECRET`

## Run Locally

Clone the project

```bash
  git clone https://github.com/krishnathakur03/Hospital-api.git
```

Go to the project directory

```bash
  cd hospital-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Demo

👉 https://issue-tracker-p7xy.onrender.com/

## API Endpoints

### Doctor routes

- **Register a doctor**
    - **Endpoint:** `POST /api/doctors/register`
    - **Request body:**
    ```bash
        {
            "name": "doctor_name",
            "phone": doctor_phone_no,
            "password": "password"
        }
    ```

- **Doctor login**
    - **Endpoint:** `POST /api/doctors/login`
    - **Request body:**
    ```bash
        {
            "phone": doctor_phone_no,
            "password": "password"
        }
    ```
### Patient routes

- **Register a patient**
    - **Endpoint:** `POST /api/patients/register`
    - **Request body:**
    ```bash
        {
            "name": "patient_name",
            "phone": patient_phone_no
        }
    ```

- **Create a report**
    - **Endpoint:** `POST /api/patients/:id/create_report`
    - **Request params:** `id` (patientId)
    - **Request body:**
    ```bash
        {
            "status": "status" (eg. "positive-admit")
        }
    ```

- **Get all reports of a patient**
    - **Endpoint:** `GET /api/patients/:id/all_reports`
    - **Request params:** `id` (patientId)

### Report routes

- **Get reports by status**
    - **Endpoint:** `GET /api/reports/:status`
    - **Request params:** `status` (eg. negative)
## Security

This API uses JWT for authentication. Ensure the `JWT_SECRET` is kept secure and never exposed publicly.
## 🛠 Skills
 Node.js, MongoDB

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
