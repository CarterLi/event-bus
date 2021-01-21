export declare class EventBus<DetailType = any> {
    private eventTarget;
    constructor(description?: string);
    on(type: string, listener: (event: CustomEvent<DetailType>) => void, signal?: AbortSignal): void;
    once(type: string, listener: (event: CustomEvent<DetailType>) => void, signal?: AbortSignal): void;
    off(type: string, listener: (event: CustomEvent<DetailType>) => void): void;
    emit(type: string, detail?: DetailType): boolean;
}
