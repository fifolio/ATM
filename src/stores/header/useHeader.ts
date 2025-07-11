import { create } from 'zustand';

interface Header {
    displayHelpContext: boolean;
    setDisplayHelpContext: (state: boolean) => void;
}

const useHeader = create<Header>((set) => ({
    displayHelpContext: false,
    setDisplayHelpContext: (state) => set({ displayHelpContext: state })
}));

export default useHeader;