# Architecture

```text
├── src
│   ├── application
│   │   ├── exceptions
│   │   │   └── user
│   │   │       ├── user-conflict-exception.ts
│   │   │       └── user-not-found-exception.ts
│   │   ├── mappers
│   │   │   └── user
│   │   │       ├── user-mapper.spec.ts
│   │   │       └── user-mapper.ts
│   │   └── usecases
│   │       └── user
│   │           ├── create-user
│   │           │   ├── create-user-dto.ts
│   │           │   ├── create-user-usecase.spec.ts
│   │           │   ├── create-user-usecase.ts
│   │           │   └── icreate-user-usecase.ts
│   │           ├── delete-user
│   │           │   ├── delete-user-dto.ts
│   │           │   ├── delete-user-usecase.spec.ts
│   │           │   ├── delete-user-usecase.ts
│   │           │   └── idelete-user-usecase.ts
│   │           ├── get-user
│   │           │   ├── get-user-dto.ts
│   │           │   ├── get-user-usecase.spec.ts
│   │           │   ├── get-user-usecase.ts
│   │           │   └── iget-user-usecase.ts
│   │           ├── get-users
│   │           │   ├── get-users-dto.ts
│   │           │   ├── get-users-usecase.spec.ts
│   │           │   ├── get-users-usecase.ts
│   │           │   └── iget-users-usecase.ts
│   │           └── update-user
│   │               ├── iupdate-user-usecase.ts
│   │               ├── update-user-dto.ts
│   │               ├── update-user-usecase.spec.ts
│   │               └── update-user-usecase.ts
│   ├── app.module.ts
│   ├── data
│   │   ├── db
│   │   │   ├── base-repository.ts
│   │   │   └── user
│   │   │       └── user-repository.ts
│   │   └── protocols
│   │       └── cryptography
│   │           ├── hash-comparer.ts
│   │           └── hasher.ts
│   ├── domain
│   │   └── user
│   │       ├── user.spec.ts
│   │       └── user.ts
│   ├── infrastructure
│   │   ├── criptography
│   │   │   └── bcrypt
│   │   │       └── bcrypt-adapter.ts
│   │   └── database
│   │       ├── models
│   │       │   └── user-model.ts
│   │       └── repositories
│   │           └── user
│   │               └── user-database.ts
│   ├── main.ts
│   ├── presentation
│   │   ├── controllers
│   │   │   ├── health-check
│   │   │   │   ├── health-check.controller.spec.ts
│   │   │   │   └── health-check.controller.ts
│   │   │   └── user
│   │   │       ├── user.controller.spec.ts
│   │   │       └── user.controller.ts
│   │   └── modules
│   │       ├── health-check
│   │       │   └── health-check.module.ts
│   │       └── user
│   │           └── user.module.ts
│   └── shared
│       ├── config
│       │   └── configuration.ts
│       ├── decorators
│       │   └── is-cpf-or-cnpj-constraint.ts
│       ├── docs
│       │   └── swagger.ts
│       ├── domain
│       │   ├── aggregate-root
│       │   │   ├── aggregate-root.spec.ts
│       │   │   └── aggregate-root.ts
│       │   ├── array-list
│       │   │   ├── array-list.spec.ts
│       │   │   └── array-list.ts
│       │   ├── entity
│       │   │   ├── entity.spec.ts
│       │   │   └── entity.ts
│       │   ├── errors
│       │   │   ├── domain-validation-exception.spec.ts
│       │   │   └── domain-validation-exception.ts
│       │   ├── events
│       │   │   ├── domain-events
│       │   │   │   ├── domain-events.spec.ts
│       │   │   │   ├── domain-events.ts
│       │   │   │   └── idomain-events.ts
│       │   │   └── user
│       │   │       └── user-created-event.ts
│       │   ├── identifier
│       │   │   ├── identifier.spec.ts
│       │   │   └── identifier.ts
│       │   └── unique-entity-id
│       │       ├── unique-entity-id.spec.ts
│       │       └── unique-entity-id.ts
│       ├── global.module.ts
│       ├── guards
│       │   └── guard.ts
│       ├── http
│       │   ├── filters
│       │   │   └── http-all-exceptions.filter.ts
│       │   └── interceptors
│       │       ├── events-dispatcher.interceptor.ts
│       │       └── timeout.interceptor.ts
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
├── swagger-config.txt
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```
