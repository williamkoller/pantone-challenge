# Architecture

```bash
── src
│   ├── application
│   │   ├── exceptions
│   │   │   ├── crop
│   │   │   ├── farm
│   │   │   ├── farm-crop
│   │   │   └── producer
│   │   ├── interfaces
│   │   │   ├── crop
│   │   │   ├── farm
│   │   │   ├── farm-crop
│   │   │   └── producer
│   │   ├── mappers
│   │   │   ├── crop
│   │   │   ├── farm
│   │   │   ├── farm-crop
│   │   │   └── producer
│   │   └── usecases
│   │       ├── crop
│   │       │   └── create-crop
│   │       ├── farm
│   │       │   ├── create-farm
│   │       │   ├── get-farms
│   │       │   └── update-farm
│   │       ├── farm-crop
│   │       │   └── create-farm-crop
│   │       └── producer
│   │           ├── create-producer
│   │           ├── delete-producer
│   │           ├── get-producers
│   │           └── update-producer
│   ├── domain
│   │   ├── crop
│   │   ├── events
│   │   │   ├── farm
│   │   │   └── producer
│   │   ├── farm
│   │   ├── farm-crop
│   │   ├── producer
│   │   └── services
│   │       └── farm
│   ├── infrastructure
│   │   └── database
│   │       ├── models
│   │       └── repositories
│   │           ├── crop
│   │           ├── farm
│   │           ├── farm-crop
│   │           └── producer
│   ├── presentation
│   │   ├── controllers
│   │   │   ├── crop
│   │   │   ├── farm
│   │   │   ├── farm-crop
│   │   │   ├── health-check
│   │   │   └── producer
│   │   └── modules
│   │       ├── crop
│   │       ├── farm
│   │       ├── farm-crop
│   │       ├── health-check
│   │       └── producer
│   └── shared
│       ├── config
│       ├── decorators
│       ├── docs
│       ├── domain
│       │   └── events
│       ├── guards
│       ├── http
│       │   ├── filters
│       │   ├── interceptors
│       │   └── pipes
│       ├── mappers
│       ├── middleware
│       ├── types
│       └── utils
└── test

```
