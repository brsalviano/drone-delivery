## Preparando o ambiente de desenvolvimento

Suba o container do banco de dados:

```
docker-compose up -d db
```

Execute as migrações através do container da aplicação:

```
docker-compose run app yarn typeorm:container migration:run
```