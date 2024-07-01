
# Greenhorn

Greenhorn is a transpiler that defines a language transpiled into JavaScript. Creating this project required learning about compiler theory and defining a Context-Free Grammar (CFG) with the language rules.

Test Greenhorn [here](https://py-green-horn-w5fe.vercel.app/).

## Features

- Define variables
- Math expressions
- Define generators
- print expressions




## Usage/Examples

```javascript
def evens-> gen(0,100,2*n+1) for n
```

is transpilted to:

```javascript

        function* evens() {

            for (let n = 0; n <= 100; n++) {

                yield 2*n+1;
            }
        }
```
