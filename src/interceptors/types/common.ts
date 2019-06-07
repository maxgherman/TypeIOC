import { CallInfo } from '../../common'
import { IndexedCollection } from '../../types'

/**
 * Represents a substitute parameters specification interface
 * @public
 */
export interface ICallInfo {
    /**
     * Original subject
     */
    source: {}

    /**
     * Original subject member name
     */
    name: string

    /**
     * Substitute invocation parameters
     */
    args: any[]

    /**
     * Invokes original subject member
     * @param args - optional array of invocation parameters
     * @returns - for methods/getters/fields substitution execution result, otherwise void
     */
    invoke: (args?: any | any[]) => any | void

    /**
     * Original subject member type {@link CallInfo}
     */
    type: CallInfo

    /**
     * Invokes original subject getter. If original subject member is not a getter nor a field,
     * this member is undefined
     */
    get?: () => any

    /**
     * Invokes original subject setter. If original subject member is not a setter nor a field,
     * this member is undefined
     */
    set?: ({}) => void

    /**
     * Invokes next substitution in a chain. If only one substitution is present in the chain,
     * this member is undefined
     */
    next?: (result?: any) => any

    /**
     * Represents a result of a previous substitution in a chain, if it exist
     */
    result?: any
}

/**
 * Represents substitute information encapsulation interface
 *
 * @remarks
 * Multiple substitutions for the same member form an execution chain.
 * Every predecessor in the chain can pass a result of the execution to its successor.
 * Every successor in the chain can receive a result of predecessor execution.
 * If substitution does not invoke its successor, execution chain stops
 *
 * @public
 */
export interface ISubstituteInfo {
    /**
     * Original subject member name. If omitted, substitution is applied to all members
     */
    method?: string

    /**
     * Original subject member type. Used to specify partial substitution of
     * getters and setters. If omitted, original subject member type is used {@link CallInfo}
     */
    type?: CallInfo

    /**
     * Specifies substitute action/behavior (lambda expression executed during substitution call)
     *
     * @remarks
     * To execute wrapper in the context of the substitute proxy as opposite to original
     * subject, provide a function instead of a lambda expression. This will give you
     * access to `this` within substituted members
     *
     * @param callInfo - an instance of {@link ICallInfo} interface
     * @returns - for methods/getters/fields substitution execution result, otherwise void
     */
    wrapper: (callInfo: ICallInfo) => any | void
}

export interface ISubstitute extends ISubstituteInfo {
    method?: string
    type: CallInfo
    next?: ISubstitute
}

export interface IList<T> {
    head: T | null
    tail: T | null
}

export const enum PropertyType {
    Method = 1,                 // method
    Getter = 2,                 // get
    Setter = 3,                 // set
    FullProperty = 4,           // get and set
    Field = 5                   // field
}

export interface IStrategyInfo {
    type: PropertyType
    descriptor?: PropertyDescriptor
    substitute?: ISubstitute
    name: string
    source: IndexedCollection<Function | {}>
    destination: IndexedCollection<Function | {}>
    contextName?: string
}

export interface IStorage {
    add(value: ISubstitute): void
    getSubstitutes(name: string, types: CallInfo[]): ISubstitute | null
}