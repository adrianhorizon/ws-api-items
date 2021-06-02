# Items api meli

- two microservices local `http://localhost:3001`
- production item `https://ws-api-items.vercel.app/api/items`
- deploy production use [Zeit](Zeit.co)

## Install project

- `$ npm install`

### Set Enviroment to development mode

- `$ npm run init`

### Run project

- `$ npm run develop`

## Docker compile

- `$ npm run docker`

## Docker compose

- docker-compose build
- docker-compose up

### requirements

- `Nodejs`
- `Docker`
- `MongoDb`

### USE item api development Postman or soapUi

- GET search items

```
curl --location --request GET 'https://ws-api-items.vercel.app/api/items?search=iphone'

curl --location --request GET 'http://localhost:3000/api/items?search=iphone'
```

### USE items api development Postman or soapUi

- GET filter query `categoryId`

```
curl --location --request GET 'https://ws-api-items.vercel.app/api/items/MLA922358125'

curl --location --request GET 'http://localhost:3000/api/items/MLA922358125'
```

### File Structure

```
├── config
├── lib
├── routes
├── services
├── test
└── utils
```

**Observaciones!**
- No se encuentra el campo con decimales en price se dejo por defecto el valor 2 para dos decimales.