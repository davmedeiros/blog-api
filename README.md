# blog-api

TOP - Educational Project - Blog API

## How to use

### Create a user

```json
// req
POST /user
{
  "username": "johndoe",
  "name": "John",
  "surname": "Doe"
}

// res
{
  "data": {
    "user": {
      "_id": "<id>",
      "username": "johndoe",
      "name": "John",
      "surname": "Doe",
      "__v": 0
    }
  }
}
```

### Get a user

```json
// req
GET /user/:username

// res
{
  "data": {
    "user": {
      "_id": "<id>",
      "username": "johndoe",
      "name": "John",
      "surname": "Doe",
      "__v": 0
    }
  }
}
```
