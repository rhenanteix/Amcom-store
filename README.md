<h3 align="center">
  Aplicação para gerenciamento de carrinho de compras: Projeto REACT NATIVE
</h3>
### Tecnologias

- React Native
- Axios
- Styled Components

### Scripts CLI

#### yarn
Instalação de todas as dependências necessárias.

#### yarn json-server server.json -p 3333
Este projeto foi criado com o Json Server para fornecimento de dados Fake API. A configuração default está no endereço localhost, caso vá utilizar outro endereço IP para
testes no ambiente de desenvolvimento utilize o comando:
```yarn json-server server.json -p 3333 -H 192.168.0.2```
192.168.0.2 é um endereço de exemplo. Será necessário alterar a baseURL de acesso em src\services\api.ts.

#### yarn android OU yarn android OU yarn start
Dependendo da vizualização em dispositivo físico ou emulador, utilize um dos comandos.
