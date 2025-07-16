import {create} from "zustand";
import React from "react";

interface BottomSheetStore {
    isOpen : boolean;
    isHide : boolean;
    type : 'basic' | 'withButton';
    bottomSheetContent : React.ReactNode;
    bottomSheetContentState : any;
    buttonText : string;

    openBottomSheet: (type?: 'basic'|'withButton',
                      bottomSheetContent? : React.ReactNode,
                      buttonText? : string,
                      onButtonClick? : (bottomSheetContentState:any)=>void)=>void;
    closeBottomSheet: ()=>void;
    onClosingAnimationComplete: ()=>void;
    setContentState: (contentState:any)=>void;
}

const initialState = {
    isOpen: false,
    isHide: false,
    type: 'basic' as const,
    bottomSheetContent: null,
    bottomSheetContentState: null,
    buttonText: '확인',
}

const useBottomSheetStore = create<BottomSheetStore>((set)=>({
    isOpen: false,
    isHide: false,
    type: 'basic',
    bottomSheetContent: null,
    bottomSheetContentState: null,
    buttonText: '확인',

    openBottomSheet: (type, bottomSheetContent, buttonText, onButtonClick) => {
        set(()=>({
            isOpen: true,
            isHide: true,
            ...(type && {type}),
            ...(bottomSheetContent && {bottomSheetContent}),
            ...(buttonText && {buttonText}),
        }));
        requestAnimationFrame(()=>set({
            isHide: false
        }))
    },

    closeBottomSheet: () => set({
        isHide: true
    }),

    onClosingAnimationComplete: () => set(state=>{
        if(state.isHide)
            return {...state, ...initialState};
        return state;
    }),

    setContentState: (bottomSheetContentState)=>{
        set({bottomSheetContentState})
    }
}));

export default useBottomSheetStore;