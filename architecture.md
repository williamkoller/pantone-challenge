# Architecture

```bash
── src
│   ├── application
│   │   ├── exceptions
│   │   │   └── producer
│   │   │       ├── ProducerAlreadyExistsException.spec.ts
│   │   │       ├── ProducerAlreadyExistsException.ts
│   │   │       └── ProducerNotFoundException.ts
│   │   ├── interfaces
│   │   │   ├── farm
│   │   │   │   └── FarmRepository.ts
│   │   │   └── producer
│   │   │       └── ProducerRepository.ts
│   │   ├── mappers
│   │   │   ├── FarmMapper.spec.ts
│   │   │   ├── FarmMapper.ts
│   │   │   ├── ProducerMapper.spec.ts
│   │   │   └── ProducerMapper.ts
│   │   └── usecases
│   │       ├── farm
│   │       │   ├── CreateFarm
│   │       │   │   ├── CreateFarmDTO.ts
│   │       │   │   ├── CreateFarmUseCase.spec.ts
│   │       │   │   ├── CreateFarmUseCase.ts
│   │       │   │   └── ICreateFarmUseCase.ts
│   │       │   └── GetFarms
│   │       │       ├── GetFarmsUseCase.ts
│   │       │       └── IGetFarmsUseCase.ts
│   │       └── producer
│   │           ├── CreateProducer
│   │           │   ├── CreateProducerDTO.ts
│   │           │   ├── CreateProducerUseCase.spec.ts
│   │           │   ├── CreateProducerUseCase.ts
│   │           │   └── ICreateProducerUseCase.ts
│   │           ├── DeleteProducer
│   │           │   ├── DeleteProducerDTO.ts
│   │           │   ├── DeleteProducerUseCase.spec.ts
│   │           │   ├── DeleteProducerUseCase.ts
│   │           │   └── IDeleteProducerUseCase.ts
│   │           ├── GetProducers
│   │           │   ├── GetProducersUseCase.spec.ts
│   │           │   ├── GetProducersUseCase.ts
│   │           │   └── IGetProducersUseCase.ts
│   │           └── UpdateProducer
│   │               ├── IUpdateProducerUseCase.ts
│   │               ├── UpdateProducerDTO.ts
│   │               ├── UpdateProducerUseCase.spec.ts
│   │               └── UpdateProducerUseCase.ts
│   ├── app.module.ts
│   ├── domain
│   │   ├── crop
│   │   │   ├── Crop.spec.ts
│   │   │   └── Crop.ts
│   │   ├── farm
│   │   │   ├── Farm.spec.ts
│   │   │   └── Farm.ts
│   │   ├── farm-crop
│   │   │   ├── FarmCrop.spec.ts
│   │   │   └── FarmCrop.ts
│   │   ├── producer
│   │   │   ├── Producer.spec.ts
│   │   │   └── Producer.ts
│   │   └── services
│   │       └── farm
│   │           ├── FarmAreaValidationService.spec.ts
│   │           └── FarmAreaValidationService.ts
│   ├── infrastructure
│   │   ├── database
│   │   │   └── models
│   │   │       ├── CropModel.ts
│   │   │       ├── FarmCropModel.ts
│   │   │       ├── FarmModel.ts
│   │   │       └── ProducerModel.ts
│   │   └── repositories
│   │       ├── farm
│   │       │   └── FarmRepositoryImplementation.ts
│   │       └── producer
│   │           ├── ProducerRepositoryImplementation.spec.ts
│   │           └── ProducerRepositoryImplementation.ts
│   ├── main.ts
│   ├── presentation
│   │   ├── controllers
│   │   │   ├── farm
│   │   │   │   └── FarmController.ts
│   │   │   ├── health-check
│   │   │   │   ├── health-check.controller.spec.ts
│   │   │   │   └── health-check.controller.ts
│   │   │   └── producer
│   │   │       ├── producer.controller.spec.ts
│   │   │       └── producer.controller.ts
│   │   └── modules
│   │       ├── farm
│   │       │   └── FarmModule.ts
│   │       ├── health-check
│   │       │   └── health-check.module.ts
│   │       └── producer
│   │           └── producer.module.ts
│   └── shared
│       ├── config
│       │   └── configuration.ts
│       ├── decorators
│       │   └── IsCPFOrCNPJConstraint.ts
│       ├── docs
│       │   └── swagger.ts
│       ├── domain
│       │   ├── AggregateRoot.spec.ts
│       │   ├── AggregateRoot.ts
│       │   ├── ArrayList.spec.ts
│       │   ├── ArrayList.ts
│       │   ├── CNPJ.spec.ts
│       │   ├── CNPJ.ts
│       │   ├── CPF.spec.ts
│       │   ├── CPF.ts
│       │   ├── DomainValidationException.spec.ts
│       │   ├── DomainValidationException.ts
│       │   ├── Entity.spec.ts
│       │   ├── Entity.ts
│       │   ├── events
│       │   │   ├── DomainEvents.interface.ts
│       │   │   ├── DomainEvents.spec.ts
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
├── structure.md
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```
