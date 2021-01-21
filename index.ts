export class EventBus<DetailType = any> {
  private eventTarget: EventTarget;
  constructor(description = '') {
    this.eventTarget = typeof document === 'object'
      ? document.appendChild(document.createComment(description))
      : new EventTarget();
  }
  on(type: string, listener: (event: CustomEvent<DetailType>) => void, signal?: AbortSignal) {
    this.eventTarget.addEventListener(type, listener as EventListener);
    if (signal) signal.addEventListener('abort', () => this.off(type, listener));
  }
  once(type: string, listener: (event: CustomEvent<DetailType>) => void, signal?: AbortSignal) {
    this.eventTarget.addEventListener(type, listener as EventListener, { once: true });
    if (signal) signal.addEventListener('abort', () => this.off(type, listener));
  }
  off(type: string, listener: (event: CustomEvent<DetailType>) => void) {
    this.eventTarget.removeEventListener(type, listener as EventListener);
  }
  emit(type: string, detail?: DetailType) {
    return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
