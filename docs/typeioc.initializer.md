<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [typeioc](./typeioc.md) &gt; [Initializer](./typeioc.initializer.md)

## Initializer type

Specifies an instance of the initialization action to be used during resolution instantiation. Receives an instance of a container [IContainer](./typeioc.icontainer.md) and an instance of the resolved service

<b>Signature:</b>

```typescript
export declare type Initializer<T> = (c: IContainer, item: T) => T;
```
