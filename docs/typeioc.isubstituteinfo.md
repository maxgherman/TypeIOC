<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [typeioc](./typeioc.md) &gt; [ISubstituteInfo](./typeioc.isubstituteinfo.md)

## ISubstituteInfo interface

Represents substitute information encapsulation interface

<b>Signature:</b>

```typescript
export interface ISubstituteInfo 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [method](./typeioc.isubstituteinfo.method.md) | <code>string</code> | Original subject member name. If omitted, substitution is applied to all members |
|  [type](./typeioc.isubstituteinfo.type.md) | <code>CallInfoType</code> | Original subject member type. Used to specify partial substitution of getters and setters. If omitted, original subject member type is used [CallInfoType](./typeioc.callinfotype.md) |
|  [wrapper](./typeioc.isubstituteinfo.wrapper.md) | <code>(callInfo: ICallInfo) =&gt; any &#124; void</code> | Specifies substitute action/behavior (lambda expression executed during substitution call) |

## Remarks

Multiple substitutions for the same member form an execution chain. Every predecessor in the chain can pass a result of the execution to its successor. Every successor in the chain can receive a result of predecessor execution. If substitution does not invoke its successor, execution chain stops

