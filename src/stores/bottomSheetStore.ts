import {create} from "zustand";
import React from "react";

interface BottomSheetStore {
    isOpen : boolean;
    isHide : boolean;
    type : 'basic' | 'withButton';
    bottomSheetContent : ((setContentState:(contentState:any)=>void)=>React.ReactNode) | React.ReactNode;
    bottomSheetContentState : any;
    buttonText : string;

    openBottomSheet: (bottomSheetContent? : ((setContentState:(contentState:any)=>void)=>React.ReactNode) | React.ReactNode,
                      type?: 'basic'|'withButton',
                      buttonText? : string,
                      onButtonClick? : (bottomSheetContentState:any)=>void)=>void;
    closeBottomSheet: ()=>void;
    onClosingAnimationComplete: ()=>void;
    setContentState: (contentState:any)=>void;
    onButtonClick? : ()=>void;
}

const initialState = {
    isOpen: false,
    isHide: false,
    type: 'basic' as const,
    bottomSheetContent: null,
    bottomSheetContentState: null,
    buttonText: '확인',
}

const useBottomSheetStore = create<BottomSheetStore>((set,get)=>({
    ...initialState,

    openBottomSheet: (bottomSheetContent, type, buttonText, onButtonClick) => {
        set(()=>({
            isOpen: true,
            isHide: true,
            ...(type && {type}),
            ...(bottomSheetContent && {bottomSheetContent}),
            ...(buttonText && {buttonText}),
            ...(onButtonClick && {
                onButtonClick : ()=>{
                    onButtonClick(get().bottomSheetContentState);
                }
            })
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
    },

}));

export default useBottomSheetStore;