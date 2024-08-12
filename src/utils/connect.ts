import { IState, StoreEvents } from "../helpers/Store";
import isEqual from "./isEqual";
import Store from "../helpers/Store";
import Block from "../helpers/block";
import { Constructable } from "../types/types";

type DispatchFunc = (setState: typeof Store.set, ...args: unknown[]) => void;

type DispatchMap = Record<string, DispatchFunc>;

export function connect(
    mapStateToProps: (state: IState) => IState,
    dispatch?: DispatchMap,
) {
    return function (Component: Constructable<Block>) {
        return class extends Component {
            private onChangeStoreCallback: () => void;
            constructor(props: Record<string, unknown>) {
                const store = Store;
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                const dispatchHandler: Partial<DispatchMap> = {};

                Object.entries(dispatch || {}).forEach(([key, handler]) => {
                    dispatchHandler[key] = (...args: unknown[]) =>
                        handler(Store.set.bind(Store), ...args);
                });

                this.setProps({ ...dispatchHandler });

                this.onChangeStoreCallback = () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                };

                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        };
    };
}

export type MapStateToProps = (state: IState) => IState;
