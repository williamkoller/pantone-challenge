# Challenge Brain Agriculture

[Brain Agriculture](./architecture.md)

## Estrutura do Projeto

Este projeto segue uma arquitetura baseada no Domain-Driven Design (DDD), que é organizada em camadas para promover uma separação de responsabilidades e facilitar a manutenção, escalabilidade e testes. Cada camada tem um propósito específico e trabalha de forma coesa com as outras para construir a aplicação.

## Camadas

### 1. application

A camada de Aplicação (Application Layer) contém a lógica de negócios específica e orquestra o fluxo de dados entre o domínio e a camada de apresentação. É onde os casos de uso da aplicação são implementados.

- DTOs (Data Transfer Objects): Contém os objetos que representam os dados que serão transferidos entre as camadas.
- Interfaces: Define as interfaces para os repositórios ou serviços que a camada de aplicação depende.
- Mappers: Responsáveis por converter entidades do domínio em DTOs e vice-versa, promovendo a desacoplamento entre as camadas.
- UseCases: Contém a lógica dos casos de uso específicos da aplicação. Cada arquivo dentro dessa pasta representa uma ação ou tarefa que o sistema deve realizar.

- Por que usar? Esta camada é importante para separar a lógica de negócios do domínio da lógica de manipulação de dados e da interface do usuário, garantindo que as regras de negócio permaneçam independentes de outras camadas.

### 2. domain

A camada de Domínio (Domain Layer) contém as regras de negócio fundamentais do sistema. É onde a lógica do modelo de domínio é representada, e onde a manipulação real de dados ocorre.

- Entidades: Representam as principais abstrações do sistema, como Farm, Producer, Crop, e FarmCrop.
- Serviços de Domínio: Contêm lógicas de negócio complexas que não pertencem a uma única entidade ou agregados, como o FarmAreaValidationService.
- Por que usar? Esta camada é central para o DDD e contém a lógica que modela o negócio real. A ideia é manter as regras de negócio encapsuladas e isoladas das preocupações de infraestrutura e de apresentação.

### 3. infrastructure

A camada de Infraestrutura (Infrastructure Layer) lida com as implementações específicas do sistema, como comunicação com banco de dados, serviços externos e frameworks de apoio.

- Database Models: Representação das tabelas do banco de dados e suas relações com entidades no sistema.
- Repositories: Implementações concretas dos repositórios definidos na camada de aplicação, responsáveis por fornecer a persistência de dados para as entidades do domínio.
- Por que usar? Esta camada abstrai as implementações de infraestrutura, permitindo que a camada de domínio e a aplicação não dependam diretamente de tecnologias específicas, como bancos de dados ou frameworks.

### 4. presentation

A camada de Apresentação (Presentation Layer) é responsável por expor a API da aplicação e interagir com os usuários ou sistemas externos. Normalmente, esta camada inclui controladores que recebem as requisições HTTP e chamam os casos de uso para manipular a lógica de negócios.

- Controllers: São responsáveis por processar as requisições HTTP, invocar os casos de uso da aplicação e retornar as respostas apropriadas.
- Modules: Organizam os controladores e casos de uso em módulos, facilitando a modularização e a reutilização de componentes.
- Por que usar? Esta camada permite que a aplicação exponha suas funcionalidades por meio de APIs RESTful ou outros protocolos, garantindo a separação entre a lógica de negócio e a apresentação.

### 5. shared

A camada Compartilhada (Shared Layer) contém componentes reutilizáveis e utilitários que podem ser usados por outras camadas do sistema.

- Configurações: Contém configurações globais, como arquivos de configuração e variáveis de ambiente.
- Decorators: Contém decoradores personalizados, como a validação de CPF ou CNPJ.
- Docs: Contém arquivos relacionados à documentação, como a configuração do Swagger para a API.
- Domain: Contém conceitos compartilhados entre várias entidades, como Entity, ValueObject, AggregateRoot, e outras abstrações.
- Guards, Filters, Interceptors: São usados para validar ou manipular as requisições e respostas de maneira global.
- Pipes e Middleware: Utilizados para validações de entrada e manipulação de dados durante o fluxo da requisição.
- Por que usar? Esta camada permite a reutilização de componentes que são comuns em várias partes da aplicação. Isso reduz a duplicação de código e melhora a manutenção.

### 6. test

A pasta de Testes (Test Layer) contém os testes da aplicação, sendo tanto testes de unidade quanto testes de integração.

- app.e2e-spec.ts: Contém os testes de integração para a aplicação, testando os fluxos completos.
- jest-e2e.json: Arquivo de configuração do Jest para os testes de integração.

# Por que essa arquitetura foi escolhida?

A estrutura de camadas segue os princípios do Domain-Driven Design (DDD), que prioriza a criação de um modelo de domínio rico e uma arquitetura que separa as preocupações entre as diversas responsabilidades do sistema. A divisão em camadas (Aplicação, Domínio, Infraestrutura, Apresentação e Compartilhada) traz muitos benefícios:

Manutenção Facilitada: Cada camada tem uma responsabilidade clara, tornando o código mais fácil de entender, testar e modificar.
Escalabilidade: Facilita a adição de novas funcionalidades sem alterar o sistema inteiro, já que cada camada pode ser modificada independentemente.
Testabilidade: A separação de responsabilidades torna o sistema mais fácil de testar, com testes unitários e de integração claramente definidos.
Essa arquitetura também facilita a adaptação a diferentes tecnologias, já que cada camada pode ser substituída ou modificada sem impactar diretamente as outras.
