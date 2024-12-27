# Challenge Brain Agriculture

[Brain Agriculture - Architecture](./architecture.md)

[Structure of Project](./structure.md)

[Endpoints](./endpoints.md)

## How to run the project

### Requirements

- Docker
- Docker Compose
- Nvm (Node Version Manager)
- Node.js (v22.12.0)

### Running the project

1. Clone the repository

```bash
git clone git@github.com:williamkoller/challenge-brain-agriculture.git
```

2. Access the project folder

```bash

cd challenge-brain-agriculture
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

5 - Access the project in the browser

```bash
http://localhost:3003/api/swagger
```

