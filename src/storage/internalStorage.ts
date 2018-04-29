'use strict';

import { StorageKeyNotFoundError } from '../exceptions';
import { HashTable } from 'hashes';
import Internal = Typeioc.Internal;

export class InternalStorage<K,T> implements Internal.IInternalStorage<K, T> {

    private _collection  : hashes.IHashTable<K, T>;

    constructor() {
        this._collection = new HashTable<K, T>();
    }

    public add(key : K, value : T) : void {
        this._collection.add(key, value, true)
    }

    public get(key : K) : T {

        if(!this.contains(key)) {
            var error = new StorageKeyNotFoundError();
            error.data = {key : key};
            throw error;
        }

        return this._collection.get(key).value;
    }

    public tryGet(key : K) : T {
        return this.contains(key) ? this._collection.get(key).value : undefined;
    }

    public register(key: K, defaultValue: () => T) : T {
        if(!this.contains(key)) {
            var result = defaultValue();
            this.add(key, result);
        } else {
            result = this.get(key);
        }

        return result;
    }

    public contains (key : K) : boolean {
        return this._collection.contains(key);
    }

    public clear() {
        this._collection.clear();
    }
}