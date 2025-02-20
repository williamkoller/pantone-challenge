[![Deployment to Railway](https://github.com/williamkoller/pantone-challenge/actions/workflows/deployment.yml/badge.svg)](https://github.com/williamkoller/pantone-challenge/actions/workflows/deployment.yml)

<p align="left">
  <a href="https://railway.app">
    <img src="https://railway.app/button.svg" alt="Deploy with Railway">
  </a>
</p>

# Pantone Challenge

## Tempo que foi gasto no desenvolvimento

[![wakatime](https://wakatime.com/badge/user/f8b538ef-5e09-4369-8b13-b9baf54326e9/project/870856eb-a2f9-471d-a72d-e5b16d3e0cec.svg)](https://wakatime.com/badge/user/f8b538ef-5e09-4369-8b13-b9baf54326e9/project/870856eb-a2f9-471d-a72d-e5b16d3e0cec)

[Arquitetura](./architecture.md)

[Estrutura do projeto](./structure.md)

[Endpoints/Rotas](./endpoints.md)

## Tecnologias usadas

- Node.js
- Typescript
- Nestjs
- Sequelize
- Postgres
- Docker
- Docker Compose
- Github Actions
- Railway
- Jest
- Swagger

## Como rodar o projeto?!

### Requisitos

- Docker
- Docker Compose
- Nvm (Node Version Manager)
- Node.js (v22.12.0)

### Passos

1. Clone the repository

```bash
git clone git@github.com:williamkoller/pantone-challenge.git
```

2. Access the project folder

```bash

cd git@github.com:williamkoller/pantone-challenge.git
```

3. Install the dependencies

```bash
nvm use
npm install
```

4. Run the project

```bash
docker-compose down && docker-compose up --build
```

5. Access the project in the browser

```bash
http://localhost:3003/api/swagger
```

6. Rodar os testes

```bash
npm run test
```

7. Se quiser entrar no container `pantone-api`

```bash
docker exec -it pantone-api sh
```

8. Se quiser entrar no container `postgres`

```bash
docker exec -it postgres sh
```

## Obs

- A migration roda sozinha quando starta o container da `pantone-api`

## Acesse o container `pantone-api` e rode os comandos abaixo

```bash
docker exec -it pantone-api sh
```

### Para criar uma migation

```bash
npm run migration:create <nome-da-tabela>
```

### Para rodar as migrations

```bash
npm run migration:up
```

### Para reverter as migrations

```bash
npm run migration:down
```

#### Esse projeto foi feito com ❤️ por William Koller
