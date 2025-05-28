import {
    useMemo,
    Dispatch,
    useEffect,
    useReducer,
    createContext,
    PropsWithChildren,
} from "react";

interface State {
    openSidenav: boolean;
    mobileSidenav: boolean;
}

interface Action {
    type: string;
    value: any;
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "OPEN_SIDENAV": {
            return { ...state, openSidenav: action.value };
        }
        case "MOBILE_SIDENAV": {
            return { ...state, mobileSidenav: action.value };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

export const AppContext = createContext<[State, Dispatch<Action>] | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
    const initialState: State = {
        openSidenav: true,
        mobileSidenav: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo<[State, Dispatch<Action>]>(
        () => [state, dispatch],
        [state, dispatch]
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                dispatch({ type: "OPEN_SIDENAV", value: false });
            } else {
                dispatch({ type: "OPEN_SIDENAV", value: true });
            }
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Predefine functions
export const setOpenSidenav = (dispatch: Dispatch<Action>, value: boolean) =>
    dispatch({ type: "OPEN_SIDENAV", value });

export const setMobileSidenav = (dispatch: Dispatch<Action>, value: boolean) =>
    dispatch({ type: "MOBILE_SIDENAV", value });
