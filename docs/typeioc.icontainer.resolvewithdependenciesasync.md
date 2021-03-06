<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [typeioc](./typeioc.md) &gt; [IContainer](./typeioc.icontainer.md) &gt; [resolveWithDependenciesAsync](./typeioc.icontainer.resolvewithdependenciesasync.md)

## IContainer.resolveWithDependenciesAsync() method

Asynchronously resolves a service with dynamic dependencies

<b>Signature:</b>

```typescript
resolveWithDependenciesAsync<R>(service: {}, dependencies: IDynamicDependency[]): Promise<R>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  service | <code>{}</code> | service value registered prior resolution |
|  dependencies | <code>IDynamicDependency[]</code> | an array of [IDynamicDependency](./typeioc.idynamicdependency.md) instances |

<b>Returns:</b>

`Promise<R>`

- promise, resolving with a registered instance of a service If registration not found - rejects the promise with [ResolutionError](./typeioc.resolutionerror.md) If `null` or `undefined` service value rejects the promise with [ArgumentError](./typeioc.argumenterror.md)

## Remarks

A service gets resolved with all the dependencies provided without affecting original registration. All the services resolved with dynamic dependencies get transient (no scope, [scope](./typeioc.scope.md)<!-- -->) life cycle assigned regardless of initial life cycle specified

