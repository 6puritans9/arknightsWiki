import { create } from "zustand";

//#region State & Action
type State = {
    prvPathname: string | null;
};

type Action = {
    setPrvPathname: (pathname: string) => void;
};
//#endregion

const initialState: State = {
    prvPathname: null,
};

const useNavStore = create<State & Action>((set) => ({
    ...initialState,
    setPrvPathname: (pathname) => set({ prvPathname: pathname }),
}));

export default useNavStore;
