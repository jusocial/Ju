# ju-core
#

This package contains the ju-core contract SDK code. This package targets the current generation of ju protocol on the v0.1.0 release line.

## Developing

In order to update the generated lib when the rust contract was updated please run:

```
yarn gen:api
```

NOTE: at this point this only generates the IDL json file but later will generate TypeScript
definitions and SDK code as well, derived from that IDL.

## LICENSE

Apache v2.0