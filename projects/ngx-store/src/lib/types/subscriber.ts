export interface Subscriber {
    (payload: string): void;
    __id?: number;
}
