# Endpoints

## Create a new Producer

### Request

`POST /api/v1/producers`

```json
{
  "name": "Inovações Tecnológicas Ltda",
  "document": "47381479000117",
  "documentType": "CNPJ"
}
```

### Response

```json
{
  "id": "73249cc7-3e98-4452-9b73-045f13821261",
  "name": "Inovações Tecnológicas Ltda",
  "document": "47.381.479/0001-17",
  "documentType": "CNPJ"
}
```

## Get all Producers

### Response

`GET /api/v1/producers`

```json
[
  {
    "id": "73249cc7-3e98-4452-9b73-045f13821261",
    "name": "Inovações Tecnológicas Ltda",
    "document": "47.381.479/0001-17",
    "documentType": "CNPJ"
  }
]
```

## Edit a Producer

### Request

`PUT /api/v1/producers/{id}`

```json
{
  "name": "Inovações Tecnológicas Ltda",
  "document": "47381479000117",
  "documentType": "CNPJ"
}
```

### Response

```json
{
  "id": "73249cc7-3e98-4452-9b73-045f13821261",
  "name": "Inovações Tecnológicas Ltda",
  "document": "47.381.479/0001-17",
  "documentType": "CNPJ"
}
```

## Delete a Producer

### Request

`DELETE /api/v1/producers/{id}`

### Response

```json
204 No Content
```

## Create a new Farm

### Request

`POST /api/v1/farms/producer/{producerId}`

```json
{
  "name": "Sítio Vida MG",
  "state": "MG",
  "arableArea": 400,
  "vegetationArea": 300
}
```

### Response

```json
{
  "id": "ee7e1ed0-6b59-4222-97e8-13d3ba8ba721",
  "producerId": "a717c485-cd82-4da0-ac6a-b3d7b2553867",
  "name": "Sítio Vida MG 2",
  "state": "MG",
  "arableArea": 400,
  "vegetationArea": 300,
  "totalArea": 700,
  "createdAt": "2024-12-27T20:31:25.731Z",
  "updatedAt": "2024-12-27T20:31:25.731Z"
}
```

## Get all Farms

### Response

`GET /api/v1/farms`

```json
[
  {
    "id": "ee7e1ed0-6b59-4222-97e8-13d3ba8ba721",
    "producerId": "a717c485-cd82-4da0-ac6a-b3d7b2553867",
    "name": "Sítio Vida MG 2",
    "state": "MG",
    "arableArea": 400,
    "vegetationArea": 300,
    "totalArea": 700,
    "createdAt": "2024-12-27T20:31:25.731Z",
    "updatedAt": "2024-12-27T20:31:25.731Z"
  }
]
```

## Edit a Farm

### Request

`PUT /api/v1/farms/{id}`

```json
{
  "name": "Sítio Verde Vida SP",
  "state": "SP",
  "arableArea": 1000,
  "vegetationArea": 300
}
```

### Response

```json
{
  "id": "d3d9128c-d4b3-466c-a645-fdb765a0eef3",
  "producerId": "a717c485-cd82-4da0-ac6a-b3d7b2553867",
  "producer": {
    "id": "a717c485-cd82-4da0-ac6a-b3d7b2553867",
    "name": "Maria Tecnologia e Inovação Ltda",
    "document": "09.450.245/0001-95",
    "documentType": "CNPJ"
  },
  "name": "Sítio Verde Vida SP",
  "state": "SP",
  "arableArea": 1000,
  "vegetationArea": 300,
  "totalArea": 1300,
  "createdAt": "2024-12-27T20:08:25.131Z",
  "updatedAt": "2024-12-27T20:26:29.661Z"
}
```