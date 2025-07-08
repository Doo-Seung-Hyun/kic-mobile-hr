import {create} from "zustand";

interface BottomSheetStore {
    isOpen : boolean;
    isClosing : boolean;
    content : React.ReactNode;

    openBottomSheet: (content:React.ReactNode)=>void;
    closeBottomSheet: ()=>void;
    onClosingAnimationComplete: ()=>void;
}

const useBottomSheetStore = create<BottomSheetStore>(set=>({
    isOpen: false,
    isClosing: false,
    content: null,

    openBottomSheet: (content) => set({
        isOpen: true,
        isClosing: false,
        content: content
    }),

    closeBottomSheet: () => set({
        isClosing: true
    }),

    onClosingAnimationComplete: () => set(state=>{
        if(state.isClosing)
            return {
                isOpen: false,
                isClosing: false,
                content: null,
            };
        return state;
    })
}));

export default useBottomSheetStore;