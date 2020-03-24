type Types<M> = { [K in keyof M]: string };

type ReducerCase<S, P> = ((state: S, payload: P) => S)
    | ((state: S) => S);

type Payload<A> = A extends ReducerCase<infer S, infer P>
    ? unknown extends P ? void : P
    : never;

type Action<P> = P extends void
    ? { type: string }
    : { type: string, payload: P };

type ActionCreator<P> = P extends void
    ? () => Action<P>
    : (payload: P) => Action<P>;

type ActionCreators<M> = {
    [K in keyof M]: ActionCreator<Payload<M[K]>>;
}

type State<A> = A extends ReducerCase<infer S, infer P>
    ? S : never;
type Value<T> = T[keyof T];
type Intersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type Overloads<U> = Intersection<U extends any ? (f: U) => void : never>;
type Last<U> = Overloads<U> extends ((a: infer A) => void) ? A : never;
type MapState<T> = Last<State<Value<T>>>;

type MapAction<T> = Action<Payload<Value<T>>>;

type Reducer<T> = (state: MapState<T>, action: MapAction<T>) => MapState<T>;

declare function generateReducer<T>(reducerMap: T, namespace?: string, additionalActions?: string[]): {
    TYPES: Types<T>,
    ACTIONS: ActionCreators<T>,
    reducer: Reducer<T>
};

export default generateReducer;
