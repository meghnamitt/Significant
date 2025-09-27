type CallbackFunction<T> = (items: T[]) => void;

class Buffer<T> {
    private buffer: T[] = [];
    private readonly bufferSize: number;
    private readonly nullItem: T;
    private callbacks: CallbackFunction<T>[] = [];

    constructor(bufferSize: number, nullItem: T) {
        if (bufferSize <= 0) {
            throw new Error('Buffer size must be greater than 0');
        }
        this.bufferSize = bufferSize;
        this.nullItem = nullItem;
    }

    /**
     * Add a callback function to be triggered when buffer is full
     */
    addCallback(callback: CallbackFunction<T>): void {
        this.callbacks.push(callback);
    }

    /**
     * Remove a specific callback function
     */
    removeCallback(callback: CallbackFunction<T>): boolean {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Clear all callbacks
     */
    clearCallbacks(): void {
        this.callbacks = [];
    }

    /**
     * Add an item to the buffer. Triggers callbacks if buffer becomes full.
     */
    add(item: T): void {
        this.buffer.push(item);

        while (this.buffer.length >= this.bufferSize) {
            this.buffer.shift();
        }
    }

    /**
     * Manually flush the buffer, always sending exactly bufferSize items.
     * Remaining slots are filled with the null item.
     */
    flush(): void {
        if (this.buffer.length === 0) return;

        // Create array of exactly bufferSize length
        const itemsToProcess: T[] = new Array(this.bufferSize);

        // Copy existing buffer items
        for (let i = 0; i < this.buffer.length; i++) {
            itemsToProcess[i] = this.buffer[i];
        }

        // Fill remaining slots with null item
        for (let i = this.buffer.length; i < this.bufferSize; i++) {
            itemsToProcess[i] = this.nullItem;
        }

        this.buffer = []; // Clear the buffer

        // Trigger all callbacks with the padded items
        this.callbacks.forEach(callback => {
            try {
                callback(itemsToProcess);
            } catch (error) {
                console.error('Error in callback:', error);
            }
        });
    }

    /**
     * Get current buffer size
     */
    getCurrentSize(): number {
        return this.buffer.length;
    }

    /**
     * Get maximum buffer size
     */
    getMaxSize(): number {
        return this.bufferSize;
    }

    /**
     * Check if buffer is full
     */
    isFull(): boolean {
        return this.buffer.length >= this.bufferSize;
    }

    /**
     * Get a copy of current buffer contents (for debugging/inspection)
     */
    getBufferCopy(): T[] {
        return [...this.buffer];
    }

    clear(): void {
        this.buffer = [];
    }
}

export default Buffer;