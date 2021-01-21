export class EventBus {
    constructor(description = '') {
        this.eventTarget = typeof document === 'object'
            ? document.appendChild(document.createComment(description))
            : new EventTarget();
    }
    on(type, listener, signal) {
        this.eventTarget.addEventListener(type, listener);
        if (signal)
            signal.addEventListener('abort', () => this.off(type, listener));
    }
    once(type, listener, signal) {
        this.eventTarget.addEventListener(type, listener, { once: true });
        if (signal)
            signal.addEventListener('abort', () => this.off(type, listener));
    }
    off(type, listener) {
        this.eventTarget.removeEventListener(type, listener);
    }
    emit(type, detail) {
        return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
    }
}
//# sourceMappingURL=index.js.map