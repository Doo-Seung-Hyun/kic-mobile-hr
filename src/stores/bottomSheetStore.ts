import {create} from "zustand";

interface BottomSheetStore {
    isOpen : boolean;
    isHide : boolean;
    content : React.ReactNode;

    openBottomSheet: (content:React.ReactNode)=>void;
    closeBottomSheet: ()=>void;
    onClosingAnimationComplete: ()=>void;
}

const useBottomSheetStore = create<BottomSheetStore>(set=>({
    isOpen: false,
    isHide: false,
    content: null,

    openBottomSheet: (content) => {
        set({
            isOpen: true,
            isHide: true,
            content: content
        });
        requestAnimationFrame(()=>set({
            isHide: false
        }))
    },

    closeBottomSheet: () => set({
        isHide: true
    }),

    onClosingAnimationComplete: () => set(state=>{
        if(state.isHide)
            return {
                isOpen: false,
                isClosing: false,
                content: null,
            };
        return state;
    })
}));

export default useBottomSheetStore;