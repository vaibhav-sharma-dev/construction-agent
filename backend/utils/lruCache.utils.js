class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
};

 export class LRUCache {
    constructor(capacity) {
        if(!Number.isInteger(capacity) || capacity<=0) {
            throw new Error("The capacity of LRU Cache must be an integer.");
        }

        this.capacity = capacity;
        this.store = new Map();

        this.head = new Node(null, null);
        this.tail = new Node(null, null);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // private
    #addAfterHead(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    #removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.next = null;
        node.prev = null;
    }

    #moveToHead(node) {
        this.#removeNode(node);
        this.#addAfterHead(node);
    }

    #evictLRU() {
        const lru = this.tail.prev;
        if(this.head === this.tail.prev) return;

        this.#removeNode(lru);
        this.store.delete(lru.key);
    }

    // public
    get(key) {
        const node = this.store.get(key);

        if(!node) return undefined;
        this.#moveToHead(node);

        return node.value;
    }

    set(key, value) {
        let node = this.store.get(key);

        if(node) {
            node.value = value;
            this.#moveToHead(node);
            return;
        }

        node = new Node(key, value);

        this.store.set(node);
        this.#addAfterHead(node);

        if(this.store.size > this.capacity) {
            this.#evictLRU();
        }
    }

    delete(key) {
        const node = this.store.get(key);

        if(!node) return false;

        this.#removeNode(node);
        this.store.delete(key);

        return true;
    }

    isPresent(key) {
        return this.store.has(key);
    }

    size() {
        return this.store.size;
    }

    clear() {
        this.store.clear();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
}