<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [typeioc](./typeioc.md) &gt; [IWithSubstituteResult](./typeioc.iwithsubstituteresult.md) &gt; [intercept](./typeioc.iwithsubstituteresult.intercept.md)

## IWithSubstituteResult.intercept property

Create a subject with members substituted by given parameters. For the instances of an object - interceptInstance method is used, for prototypical/constructible functions - interceptPrototype is used

<b>Signature:</b>

```typescript
intercept: <R extends (Function | Object)>(subject: R) => R;
```
