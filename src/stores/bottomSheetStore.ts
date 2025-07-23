import {create} from "zustand";
import React from "react";
import {useShallow} from "zustand/react/shallow";

interface withButtonConfig<T>{
    buttonText? : string;
    onButtonClick? : (bottomSheetResult:T)=>void;
    validation? : boolean
}

interface BottomSheetStore<T=unknown> {
    isOpen : boolean;
    isHide : boolean;
    type : 'basic' | 'withButton';
    bottomSheetContent : ((setResult:(bottomSheetResult:T)=>void)=>React.ReactNode) | React.ReactNode;
    bottomSheetResult : T;
    buttonText : string;
    bottomSheetClasses? : string;
    validation? : boolean;

    openBottomSheet: (bottomSheetContent? : ((setResult:(bottomSheetResult:T)=>void)=>React.ReactNode) | React.ReactNode,
                      type?: 'basic'|'withButton',
                      withButtonConfig? : withButtonConfig<T>,
                      bottomSheetClasses? : string,)=>void;
    closeBottomSheet: ()=>void;
    onClosingAnimationComplete: ()=>void;
    setBottomSheetResult: (bottomSheetResult:T)=>void;
    onButtonClick? : ()=>void;
    setValidation? : (validation:boolean)=>void;
}

const initialState = {
    isOpen: false,
    isHide: false,
    type: 'basic' as const,
    bottomSheetContent: null,
    bottomSheetResult: null,
    buttonText: '확인',
    validation: false,
}

const _useBottomSheetStore = create<BottomSheetStore>((set,get)=>({
    ...initialState,

    openBottomSheet: (bottomSheetContent,
                      type,
                      withButtonConfig,
                      bottomSheetClasses,
                      ) => {
        const {buttonText, onButtonClick, validation} = withButtonConfig || {};
        set(()=>({
            isOpen: true,
            isHide: true,
            ...(type && {type}),
            ...(bottomSheetContent && {bottomSheetContent}),
            ...(buttonText && {buttonText}),
            ...(validation && {validation}),
            ...(onButtonClick && {
                onButtonClick : ()=>{
                    onButtonClick(get().bottomSheetResult);
                }
            }),
            ...(bottomSheetClasses && {bottomSheetClasses})
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

    setBottomSheetResult: (bottomSheetResult)=>{
        set({bottomSheetResult})
    },

    setValidation: validation => set({
        validation
    })

}));

export const useBottomSheetStore = <T>() => {
    return _useBottomSheetStore() as unknown as BottomSheetStore<T>
}

export const useBottomSheetValidation = <T>() =>
    _useBottomSheetStore(useShallow(state => ({
        validation : state.validation,
        setValidation : state.setValidation
    }))) as unknown as BottomSheetStore<T>

export const useBottomSheetToggle = <T>() =>
    _useBottomSheetStore(useShallow(state => ({
        openBottomSheet : state.openBottomSheet,
        closeBottomSheet : state.closeBottomSheet
    }))) as unknown as BottomSheetStore<T>

