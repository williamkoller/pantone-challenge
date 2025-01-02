# Architecture

```bash
├── src
│   ├── application
│   │   ├── exceptions
│   │   │   ├── crop
│   │   │   │   ├── crop-conflict-exception.ts
│   │   │   │   └── crop-not-found-exception.ts
│   │   │   ├── farm
│   │   │   │   ├── farm-conflict-exception.ts
│   │   │   │   └── farm-not-found-exception.ts
│   │   │   ├── farm-crop
│   │   │   │   └── farm-crop-conflict-exception.ts
│   │   │   └── producer
│   │   │       ├── producer-conflict-exception.spec.ts
│   │   │       ├── producer-conflict-exception.ts
│   │   │       └── producer-not-found-exception.ts
│   │   ├── interfaces
│   │   │   ├── crop
│   │   │   │   └── crop-repository.ts
│   │   │   ├── dashboard
│   │   │   │   └── dashboard-repository.ts
│   │   │   ├── farm
│   │   │   │   └── farm-repository.ts
│   │   │   ├── farm-crop
│   │   │   │   └── farm-crop-repository.ts
│   │   │   └── producer
│   │   │       └── producer-repository.ts
│   │   ├── mappers
│   │   │   ├── crop
│   │   │   │   └── crop-mapper.ts
│   │   │   ├── dashboard
│   │   │   │   └── dashboard-mapper.ts
│   │   │   ├── farm
│   │   │   │   ├── farm-mapper.spec.ts
│   │   │   │   └── farm-mapper.ts
│   │   │   ├── farm-crop
│   │   │   │   └── farm-crop-mapper.ts
│   │   │   └── producer
│   │   │       ├── producer-mapper.spec.ts
│   │   │       └── producer-mapper.ts
│   │   └── usecases
│   │       ├── crop
│   │       │   ├── create-crop
│   │       │   │   ├── create-crop-dto.ts
│   │       │   │   ├── create-crop-usecase.ts
│   │       │   │   └── icreate-crop-usecase.ts
│   │       │   └── get-crops
│   │       │       ├── get-crops-usecase.ts
│   │       │       └── iget-crops-usecase.ts
│   │       ├── dashboard
│   │       │   ├── dashboard-usecase.ts
│   │       │   └── idashboard-usecase.ts
│   │       ├── farm
│   │       │   ├── create-farm
│   │       │   │   ├── create-farm-dto.ts
│   │       │   │   ├── create-farm-usecase.ts
│   │       │   │   └── icreate-farm-usecase.ts
│   │       │   ├── get-farms
│   │       │   │   ├── get-farms-usecase.ts
│   │       │   │   └── iget-farms-usecase.ts
│   │       │   └── update-farm
│   │       │       ├── iupdate-farm-usecase.ts
│   │       │       ├── update-farm-dto.ts
│   │       │       └── update-farm-usecase.ts
│   │       ├── farm-crop
│   │       │   ├── create-farm-crop
│   │       │   │   ├── create-farm-crop-dto.ts
│   │       │   │   ├── create-farm-crop-usecase.ts
│   │       │   │   └── icreate-farm-crop-usecase.ts
│   │       │   └── get-farm-crops
│   │       │       ├── get-farm-crops-usecase.ts
│   │       │       └── iget-farm-crops-usecase.ts
│   │       └── producer
│   │           ├── create-producer
│   │           │   ├── create-producer-dto.ts
│   │           │   ├── create-producer-usecase.spec.ts
│   │           │   ├── create-producer-usecase.ts
│   │           │   └── icreate-producer-usecase.ts
│   │           ├── delete-producer
│   │           │   ├── delete-producer-dto.ts
│   │           │   ├── delete-producer-usecase.spec.ts
│   │           │   ├── delete-producer-usecase.ts
│   │           │   └── idelete-producer-usecase.ts
│   │           ├── get-producers
│   │           │   ├── get-producers-usecase.spec.ts
│   │           │   ├── get-producers-usecase.ts
│   │           │   └── iget-producers-usecase.ts
│   │           └── update-producer
│   │               ├── iupdate-producer-usecase.ts
│   │               ├── update-producer-dto.ts
│   │               ├── update-producer-usecase.spec.ts
│   │               └── update-producer-usecase.ts
│   ├── app.module.ts
│   ├── domain
│   │   ├── crop
│   │   │   ├── crop.spec.ts
│   │   │   └── crop.ts
│   │   ├── events
│   │   │   ├── farm
│   │   │   │   └── farm-created-event.ts
│   │   │   └── producer
│   │   │       └── producer-created-event.ts
│   │   ├── farm
│   │   │   ├── farm.spec.ts
│   │   │   └── farm.ts
│   │   ├── farm-crop
│   │   │   ├── farm-crop.spec.ts
│   │   │   └── farm-crop.ts
│   │   ├── producer
│   │   │   ├── producer.spec.ts
│   │   │   └── producer.ts
│   │   └── services
│   │       └── farm
│   │           ├── farm-area-validation-service.spec.ts
│   │           └── farm-area-validation-service.ts
│   ├── infrastructure
│   │   └── database
│   │       ├── models
│   │       │   ├── crop-model.ts
│   │       │   ├── farm-crop-model.ts
│   │       │   ├── farm-model.ts
│   │       │   └── producer-model.ts
│   │       └── repositories
│   │           ├── crop
│   │           │   └── crop-repository-implementation.ts
│   │           ├── dashboard
│   │           │   └── dashboard-repository-implementation.ts
│   │           ├── farm
│   │           │   └── farm-repository-implementation.ts
│   │           ├── farm-crop
│   │           │   └── farm-crop-repository-implementation.ts
│   │           └── producer
│   │               ├── producer-repository-implementation.spec.ts
│   │               └── producer-repository-implementation.ts
│   ├── main.ts
│   ├── presentation
│   │   ├── controllers
│   │   │   ├── crop
│   │   │   │   └── crop.controller.ts
│   │   │   ├── dashboard
│   │   │   │   └── dashboard.controller.ts
│   │   │   ├── farm
│   │   │   │   └── farm.controller.ts
│   │   │   ├── farm-crop
│   │   │   │   └── farm-crop.controller.ts
│   │   │   ├── health-check
│   │   │   │   ├── health-check.controller.spec.ts
│   │   │   │   └── health-check.controller.ts
│   │   │   └── producer
│   │   │       ├── producer.controller.spec.ts
│   │   │       └── producer.controller.ts
│   │   └── modules
│   │       ├── crop
│   │       │   └── crop.module.ts
│   │       ├── dashboard
│   │       │   └── dashboard.module.ts
│   │       ├── farm
│   │       │   └── farm.module.ts
│   │       ├── farm-crop
│   │       │   └── farm-crop.module.ts
│   │       ├── health-check
│   │       │   └── health-check.module.ts
│   │       └── producer
│   │           └── producer.module.ts
│   └── shared
│       ├── config
│       │   └── configuration.ts
│       ├── decorators
│       │   └── is-cpf-or-cnpj-constraint.ts
│       ├── docs
│       │   └── swagger.ts
│       ├── domain
│       │   ├── aggregate-root.spec.ts
│       │   ├── aggregate-root.ts
│       │   ├── array-list.spec.ts
│       │   ├── array-list.ts
│       │   ├── cnpj.spec.ts
│       │   ├── cnpj.ts
│       │   ├── cpf.spec.ts
│       │   ├── cpf.ts
│       │   ├── domain-validation-exception.spec.ts
│       │   ├── domain-validation-exception.ts
│       │   ├── entity.spec.ts
│       │   ├── entity.ts
│       │   ├── events
│       │   │   ├── domain-events.spec.ts
│       │   │   ├── domain-events.ts
│       │   │   └── idomain-events.ts
│       │   ├── identifier.spec.ts
│       │   ├── identifier.ts
│       │   ├── unique-entity-id.spec.ts
│       │   ├── unique-entity-id.ts
│       │   ├── value-object.spec.ts
│       │   └── value-object.ts
│       ├── global.module.ts
│       ├── guards
│       │   └── guard.ts
│       ├── http
│       │   ├── filters
│       │   │   └── http-all-exceptions.filter.ts
│       │   ├── interceptors
│       │   │   ├── events-dispatcher.interceptor.ts
│       │   │   └── timeout.interceptor.ts
│       │   └── pipes
│       ├── mappers
│       │   ├── pagination-mapper.spec.ts
│       │   └── pagination-mapper.ts
│       ├── middleware
│       │   └── logger.middleware.ts
│       ├── types
│       │   ├── mapper.ts
│       │   ├── paginated-result.ts
│       │   ├── result.ts
│       │   └── usecase.ts
│       └── validation
│           └── common-validation.ts
├── structure.md
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── views
    └── index.hbs


```
