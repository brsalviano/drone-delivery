## Preparando o ambiente de desenvolvimento

### Variáveis de ambiente

O projeto usa o arquivo `./app/.env` para a configuração das variaveis de ambiente. Porém, o arquivo `docker-compose` já está com variáveis de ambientes pré configuradas.

As variáveis de ambiente do sistema (no caso do docker, aquelas que estão no container), tem precedência sobre as variáveis definidas no arquivo `.env`, portanto, se quiser fazer modificações, mude no arquivo `docker-compose.yml`, no trecho especificado:

```
  app:
    build:
      context: .
    ports:
      - '3000:3000'
      - '9229:9229'
    #Variáveis de ambiente de desenvolvimento:
    environment:
      NODE_ENV: development
      DB_HOST: db
      DB_PORT: 3306
      DB_USERNAME: root
      DB_PASSWORD: development123
      DB_DATABASE: drone_delivery
```

### Fazendo as migrações

Suba o container do banco de dados:

```
docker-compose up -d db
```

Execute as migrações através do container da aplicação:

```
docker-compose run app yarn typeorm:container migration:run
```