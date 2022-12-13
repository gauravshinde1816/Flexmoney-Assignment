
### Run Locally

#### Using Docker-Compose File

### 1) Build Backend Image
- `cd backend-template`
- `docker build -t gauravshinde1816/node-mongodb-backend .`

### 2) Build Frontend Image
- `cd client`
- `docker build -t gauravshinde1816/client .`

### Run Compose File
- `docker-compose up -d`


#### Backend : 

- `cd backend-template`
- `npm install`
- `npm start`


#### Frontend :

- `cd client`
- `npm install`
- `npm start`

