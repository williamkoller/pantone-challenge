# Architecture

```bash
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── application
│   │   ├── dtos
│   │   │   └── producer
│   │   │       └── CreateProducerDTO.ts
│   │   ├── interfaces
│   │   │   └── ProducerRepository.ts
│   │   ├── mappers
│   │   │   ├── FarmMapper.ts
│   │   │   └── ProducerMapper.ts
│   │   └── usecases
│   │       └── producer
│   │           └── CreateProducer
│   │               ├── CreatePruducerUseCase.ts
│   │               └── ICreatePruducerUseCase.ts
│   ├── app.module.ts
│   ├── domain
│   │   ├── Crop.ts
│   │   ├── FarmCrop.ts
│   │   ├── Farm.ts
│   │   ├── Producer.ts
│   │   └── services
│   │       └── FarmAreaValidationService.ts
│   ├── infrastructure
│   │   ├── database
│   │   │   └── models
│   │   │       ├── CropModel.ts
│   │   │       ├── FarmCropModel.ts
│   │   │       ├── FarmModel.ts
│   │   │       └── ProducerModel.ts
│   │   └── repositories
│   │       └── producer
│   │           └── ProducerRepositoryImplementation.ts
│   ├── main.ts
│   ├── presentation
│   │   ├── controllers
│   │   │   ├── health-check
│   │   │   │   ├── health-check.controller.spec.ts
│   │   │   │   └── health-check.controller.ts
│   │   │   └── producer
│   │   └── modules
│   │       └── health-check
│   │           └── health-check.module.ts
│   └── shared
│       ├── config
│       │   └── configuration.ts
│       ├── decorators
│       │   └── IsCPFOrCNPJConstraint.ts
│       ├── docs
│       │   └── swagger.ts
│       ├── domain
│       │   ├── AggregateRoot.ts
│       │   ├── ArrayList.spec.ts
│       │   ├── ArrayList.ts
│       │   ├── CNPJ.spec.ts
│       │   ├── CNPJ.ts
│       │   ├── CPF.ts
│       │   ├── DomainValidationException.spec.ts
│       │   ├── DomainValidationException.ts
│       │   ├── Entity.spec.ts
│       │   ├── Entity.ts
│       │   ├── events
│       │   │   ├── DomainEvents.interface.ts
│       │   │   └── DomainEvents.ts
│       │   ├── Identifier.spec.ts
│       │   ├── Identifier.ts
│       │   ├── UniqueEntityId.spec.ts
│       │   ├── UniqueEntityId.ts
│       │   ├── ValueObject.spec.ts
│       │   └── ValueObject.ts
│       ├── global.module.ts
│       ├── guards
│       │   └── Guard.ts
│       ├── http
│       │   ├── filters
│       │   │   └── http-all-exceptions.filter.ts
│       │   ├── interceptors
│       │   │   ├── EventsDispatcherInterceptor.ts
│       │   │   └── timeout-interceptor.ts
│       │   └── pipes
│       ├── mappers
│       ├── middleware
│       │   └── logger.middleware.ts
│       ├── types
│       │   ├── Mapper.ts
│       │   ├── Result.ts
│       │   └── UseCase.ts
│       └── utils
│           └── CommonUtils.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```
