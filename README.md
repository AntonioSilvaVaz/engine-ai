
# EngineAi



## Screenshots

![example 1](https://github.com/AntonioSilvaVaz/engine-ai/blob/main/assets/1.png)

![example 2](https://github.com/AntonioSilvaVaz/engine-ai/blob/main/assets/2.png)


## Get Started

### app/frontend

#### Env variables
- ```touch .env```
- `REACT_APP_API -> ex: http://localhost:3001`
#### Commands  
- ```npm i``` to install the required node modules
- ```npm run dev``` to run the client side app

### app/backend

#### Env variables
- ```touch .env```
- `PORT -> ex: 3001`
- `FRONT_END_PORT -> ex: 3000` 
- `DATABASE_URL -> ex: postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
#### Commands
- ```npm i``` to install the required node modules
- ```npm start``` to run the serverdatabase

# Database Type
  id           Int      @id @default(autoincrement())

  ticker       String   @db.VarChar(20)

  securityName String   @db.VarChar(100)

  sector       String   @db.VarChar(50)

  country      String   @db.VarChar(50)

  trend        Float

  prices       Json[]

## Stack

**Front-end:** react, toastify, sass, typescript

**Back-end:** node, express, typescript, prisma

## Author

- [@Antonio](https://github.com/AntonioSilvaVaz)
