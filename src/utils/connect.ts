import { IState, StoreEvents } from "../helpers/Store";
import isEqual from './isEqual';
import Store from "../helpers/Store";
import  Block  from "../helpers/block.ts";
import { Constructable } from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function connect(mapStateToProps: (state: IState) => IState, dispatch?: Record<string, any>) {
    return function (Component: Constructable<Block>) {
        return class extends Component {
            private onChangeStoreCallback: () => void;
            constructor(props: Record<string, unknown>) {
                const store = Store;
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const dispatchHandler: Record<string, any> = {};

                Object.entries(dispatch || {}).forEach(([key, handler]) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    dispatchHandler[key] = (...args: any[]) => handler(Store.set.bind(Store), ...args)
                })

                this.setProps({ ...dispatchHandler });

                this.onChangeStoreCallback = () => {

                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                }

                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        }
    }
}

export type MapStateToProps = (state: IState) => IState
