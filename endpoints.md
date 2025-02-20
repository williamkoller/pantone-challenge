# Endpoints

## Health Check

### Request

`GET /health-check`

### Response

```json
{
  "status": "ok"
}
```

---

## User Management

### Create a new User

### Request

`POST /users`

```json
{
  "name": "William Koller",
  "email": "william-Koller@mail.com",
  "password": "q1w2e3r4t5y6",
  "role": "client"
}
```

### Response

```json
{
  "id": "<generated-uuid>",
  "name": "William Koller",
  "email": "william-Koller@mail.com",
  "role": "client"
}
```

---

### Get all Users

### Request

`GET /users?limit=1&page=1`

### Response

```json
[
  {
    "id": "af31baef-73f9-4edb-9d0b-36ef4bc1d900",
    "name": "William Koller",
    "email": "william-Koller@mail.com",
    "role": "client"
  }
]
```

---

### Get User by ID

### Request

`GET /users/{userId}`

### Response

```json
{
  "id": "af31baef-73f9-4edb-9d0b-36ef4bc1d900",
  "name": "William Koller",
  "email": "william-Koller@mail.com",
  "role": "client"
}
```

---

### Update a User

### Request

`PUT /users/{userId}`

```json
{
  "name": "William C Koller",
  "email": "william-c-koller@mail.com"
}
```

### Response

```json
{
  "id": "4d72b8fc-20b3-47c2-95d9-54a8f2e96c7d",
  "name": "William C Koller",
  "email": "william-c-koller@mail.com",
  "role": "client"
}
```

---

### Delete a User

### Request

`DELETE /users/{userId}`

### Response

```json
204 No Content
```

