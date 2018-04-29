'use strict';

export default class BaseError implements Error {

    private nativeError;

    public get stack() {
        return this.nativeError.stack;
    }

    public get message() : string {
        return this.nativeError.message;
    }

    public get name() : string {
        return this.nativeError.name;
    }

    public set name(value: string) {
        this.nativeError.name = value;
    }

    public data : any;
    public innerError : BaseError = null;

    constructor(message?: string) {
        this.nativeError = new Error(message);

        this.name = "BaseError";
    }
}



