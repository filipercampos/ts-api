# ts-api
Usando typescript em uma API Rest com o padrão Clean Architeture<br/>

Boas práticas de API Rest, middleware, autenticação com token jwt e padrões typescript <br/>

# ts-node-dev
```
-r
``` 
executa um script antes
```
--transpile-only
``` 
ignora verificação do código está certo ou errado. Use ESLint
```
---respawn
```  
observar as alterações do código, para transpilar e fazer auto reload da aplicação. Despreza nodemon

# Configuração de ambientes

## config
Mais complexo, com mais dependencias e atualizações mais frequentes. Recomendado para gerenciar várias conexões

## dotenv
Mais utilizado por toda comunidade pela facilidade de uso, maior número de desenvolvedores, além de posuir menos dependencias

[Diff](https://npmcompare.com/compare/config,dotenv,nconf)

# Middleware
O middleware é o software que se encontra entre o sistema operacional e os aplicativos nele executados. Funcionando de forma essencial como uma camada oculta de tradução, o middleware permite a comunicação e o gerenciamento de dados para aplicativos distribuídos.
[Read-me](https://expressjs.com/pt-br/guide/using-middleware.html)

# exports 
### Recommended use: exports 
[Read-me](https://basarat.gitbook.io/typescript/main-1/defaultisbad).

You can have multiple named exports per file. 

export class Foo { }<br/>

import { Foo } from "./foo";

## exports default
### Avoid Export Default
You can have one default export per file 

class Foo {
}
<br/>

export default Foo;<br/>

import Foo from "./foo";

# pm2 
Use mode: fork <br/>
pm2 start ecosystem.config.js -i 0<br/>
Change environment<br/>
pm2 start ecosystem.config.js --env dev<br/>

# About ECMAScript
### ES6 / ES2015
### ES2017 (ES8)
Current using es2017

# Response
## res.json 
equals send status 200

## res.end()

We can use res.end() if we want to end the response without providing any data. This could be useful for a 404 page, for example:
```
res.status(404).end();
```


### tips @ts-api