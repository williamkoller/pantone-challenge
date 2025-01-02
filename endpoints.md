# Endpoints

## Create a new Producer

### Request

`POST /api/producers`

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

`GET /api/producers`

```json
[
  {
    "id": "e935326d-7409-4de9-96f1-a5363405fe9f",
    "name": "Tech Solutions Ltda",
    "document": "47.822.326/0001-68",
    "documentType": "CNPJ",
    "farms": [
      {
        "id": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
        "producerId": "e935326d-7409-4de9-96f1-a5363405fe9f",
        "name": "Sítio Vida",
        "arableArea": "100",
        "state": "MG",
        "totalArea": "200",
        "vegetationArea": "70",
        "landUse": "Agriculture",
        "createdAt": "2025-01-02T19:59:03.961Z",
        "updatedAt": "2025-01-02T19:59:03.961Z"
      }
    ]
  }
]
```

## Edit a Producer

### Request

`PUT /api/producers/{id}`

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

`DELETE /api/producers/{id}`

### Response

```json
204 No Content
```

## Create a new Farm

### Request

`POST /api/farms/producer/{producerId}`

```json
{
  "name": "Sítio Vida",
  "state": "MG",
  "arableArea": 1000000,
  "vegetationArea": 700000,
  "totalArea": 2000000,
  "landUse": "Agriculture"
}
```

### Response

```json
{
  "id": "ee7e1ed0-6b59-4222-97e8-13d3ba8ba721",
  "producerId": "73249cc7-3e98-4452-9b73-045f13821261",
  "producer": {
    "id": "73249cc7-3e98-4452-9b73-045f13821261",
    "name": "Inovações Tecnológicas Ltda",
    "document": "47.381.479/0001-17",
    "documentType": "CNPJ"
  },
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

`GET /api/farms`

```json
[
  {
    "id": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
    "producerId": "e935326d-7409-4de9-96f1-a5363405fe9f",
    "producer": {
      "id": "e935326d-7409-4de9-96f1-a5363405fe9f",
      "name": "Tech Solutions Ltda",
      "document": "47.822.326/0001-68",
      "documentType": "CNPJ"
    },
    "name": "Sítio Vida",
    "state": "MG",
    "arableArea": 100,
    "vegetationArea": 70,
    "totalArea": 200,
    "landUse": "Agriculture",
    "createdAt": "2025-01-02T19:59:03.961Z",
    "updatedAt": "2025-01-02T19:59:03.961Z"
  }
]
```

## Edit a Farm

### Request

`PUT /api/farms/{id}`

```json
{
  "name": "Sítio Vida",
  "state": "MG",
  "arableArea": 1000000,
  "vegetationArea": 700000,
  "totalArea": 2000000,
  "landUse": "Agriculture"
}
```

### Response

```json
{
  "id": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
  "producerId": "e935326d-7409-4de9-96f1-a5363405fe9f",
  "producer": {
    "id": "e935326d-7409-4de9-96f1-a5363405fe9f",
    "name": "Tech Solutions Ltda",
    "document": "47.822.326/0001-68",
    "documentType": "CNPJ"
  },
  "name": "Sítio Vida MG d994sa",
  "state": "MG",
  "arableArea": 100,
  "vegetationArea": 70,
  "totalArea": 200,
  "landUse": "Agriculture",
  "createdAt": "2025-01-02T19:59:03.961Z",
  "updatedAt": "2025-01-02T21:31:17.151Z"
}
```

## Create a Crop

`POST /api/crops`

### Request

```bash
{
  "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
  "year": 2024,
  "cropType": "Soja"
}
```

### Response

```json
{
  "id": "01c07bb3-c142-43c4-8629-9cd1c3a82356",
  "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
  "farm": null,
  "cropType": "Soja",
  "year": 2024,
  "createdAt": "2025-01-02T21:32:41.461Z",
  "updatedAt": "2025-01-02T21:32:41.461Z"
}
```

## Get all Crops

### Response

`GET /api/crops`

```bash
[
  {
    "id": "6bad8bc9-fa51-4abc-9600-51189dd8e1d5",
    "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
    "farm": {
      "id": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
      "producerId": "e935326d-7409-4de9-96f1-a5363405fe9f",
      "name": "Sítio Vida MG d994sa",
      "arableArea": "100",
      "state": "MG",
      "totalArea": "200",
      "vegetationArea": "70",
      "landUse": "Agriculture",
      "createdAt": "2025-01-02T19:59:03.961Z",
      "updatedAt": "2025-01-02T21:31:17.153Z"
    },
    "cropType": "Café",
    "year": 2023,
    "createdAt": "2025-01-02T20:02:04.708Z",
    "updatedAt": "2025-01-02T20:02:04.708Z"
  },
  {
    "id": "01c07bb3-c142-43c4-8629-9cd1c3a82356",
    "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
    "farm": {
      "id": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
      "producerId": "e935326d-7409-4de9-96f1-a5363405fe9f",
      "name": "Sítio Vida MG d994sa",
      "arableArea": "100",
      "state": "MG",
      "totalArea": "200",
      "vegetationArea": "70",
      "landUse": "Agriculture",
      "createdAt": "2025-01-02T19:59:03.961Z",
      "updatedAt": "2025-01-02T21:31:17.153Z"
    },
    "cropType": "Soja",
    "year": 2024,
    "createdAt": "2025-01-02T21:32:41.461Z",
    "updatedAt": "2025-01-02T21:32:41.461Z"
  }
]
```

## Create a Farm Crop

`POST /api/farm-crops`

### Request

```bash
{
  "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
  "cropId": "01c07bb3-c142-43c4-8629-9cd1c3a82356",
  "seasonYear": 2024,
  "plantedArea": 180.5
}
```

### Response

```bash
{
  "id": "1dba845a-267f-4586-ad86-0b11ac4c7b14",
  "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
  "farm": null,
  "cropId": "01c07bb3-c142-43c4-8629-9cd1c3a82356",
  "crop": null,
  "seasonYear": 2024,
  "plantedArea": "180.50",
  "createdAt": "2025-01-02T21:35:25.991Z",
  "updatedAt": "2025-01-02T21:35:25.991Z"
}
```

## Get all Farm Crops

### Response

`GET /api/farm-crops`

### Response


```bash
[
  {
    "id": "507e75fa-84ad-4c2b-9f63-5886574d51c7",
    "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
    "farm": {
      "id": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
      "producerId": "e935326d-7409-4de9-96f1-a5363405fe9f",
      "name": "Sítio Vida MG d994sa",
      "arableArea": "100",
      "state": "MG",
      "totalArea": "200",
      "vegetationArea": "70",
      "landUse": "Agriculture",
      "createdAt": "2025-01-02T19:59:03.961Z",
      "updatedAt": "2025-01-02T21:31:17.153Z"
    },
    "cropId": "6bad8bc9-fa51-4abc-9600-51189dd8e1d5",
    "crop": {
      "id": "6bad8bc9-fa51-4abc-9600-51189dd8e1d5",
      "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
      "cropType": "Café",
      "year": 2023,
      "createdAt": "2025-01-02T20:02:04.708Z",
      "updatedAt": "2025-01-02T20:02:04.708Z"
    },
    "seasonYear": 2023,
    "plantedArea": "130.50",
    "createdAt": "2025-01-02T20:02:50.981Z",
    "updatedAt": "2025-01-02T20:02:50.981Z"
  },
  {
    "id": "1dba845a-267f-4586-ad86-0b11ac4c7b14",
    "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
    "farm": {
      "id": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
      "producerId": "e935326d-7409-4de9-96f1-a5363405fe9f",
      "name": "Sítio Vida MG d994sa",
      "arableArea": "100",
      "state": "MG",
      "totalArea": "200",
      "vegetationArea": "70",
      "landUse": "Agriculture",
      "createdAt": "2025-01-02T19:59:03.961Z",
      "updatedAt": "2025-01-02T21:31:17.153Z"
    },
    "cropId": "01c07bb3-c142-43c4-8629-9cd1c3a82356",
    "crop": {
      "id": "01c07bb3-c142-43c4-8629-9cd1c3a82356",
      "farmId": "a7a2bf02-c694-44e1-a15a-655326d3a8a4",
      "cropType": "Soja",
      "year": 2024,
      "createdAt": "2025-01-02T21:32:41.461Z",
      "updatedAt": "2025-01-02T21:32:41.461Z"
    },
    "seasonYear": 2024,
    "plantedArea": "180.50",
    "createdAt": "2025-01-02T21:35:25.991Z",
    "updatedAt": "2025-01-02T21:35:25.991Z"
  }
]
```