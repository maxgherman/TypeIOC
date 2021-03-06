<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [typeioc](./typeioc.md) &gt; [IContainerBuilder](./typeioc.icontainerbuilder.md) &gt; [register](./typeioc.icontainerbuilder.register.md)

## IContainerBuilder.register() method

Registers a service using fluent API

<b>Signature:</b>

```typescript
register<R>(service: {}): IRegistration<R>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  service | <code>{}</code> | an instance of a service. If service is <code>null</code> or <code>undefined</code> [ArgumentError](./typeioc.argumenterror.md) is thrown |

<b>Returns:</b>

`IRegistration<R>`

- an instance of [IRegistration](./typeioc.iregistration.md) fluent API interface

