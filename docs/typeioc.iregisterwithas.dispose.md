<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [typeioc](./typeioc.md) &gt; [IRegisterWithAs](./typeioc.iregisterwithas.md) &gt; [dispose](./typeioc.iregisterwithas.dispose.md)

## IRegisterWithAs.dispose() method

Specifies disposer action during resolution disposal.

<b>Signature:</b>

```typescript
dispose<K extends T>(action: Disposer<K>): RegisterWithLazy<K>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  action | <code>Disposer&lt;K&gt;</code> | disposer action to be called during resolution disposal process ([Disposer](./typeioc.disposer.md)<!-- -->) |

<b>Returns:</b>

`RegisterWithLazy<K>`

- an instance of [RegisterWithLazy](./typeioc.registerwithlazy.md) interface
