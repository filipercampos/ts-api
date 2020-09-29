# tfs-api
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