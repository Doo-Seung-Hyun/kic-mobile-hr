import React from "react";
import {create} from "zustand";

interface OpenAlertDialogProps {
    buttonType?: 'alert' | 'confirm';
    title?: string;
    content?: React.ReactNode;
    confirmButtonContent?: React.ReactNode;
    cancelButtonContent?: React.ReactNode;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
}

interface AlertDialogStore extends OpenAlertDialogProps{
    isOpen: boolean;
    openAlertDialog: (props:OpenAlertDialogProps) => void;
    closeAlertDialog: () => void;
}

const initialState = {
    isOpen: false,
    buttonType: 'alert' as const,
    confirmButtonContent: '확인',
    cancelButtonContent: '취소',
}

const useAlertDialogStore = create<AlertDialogStore>((set)=>({

    ...initialState,

    openAlertDialog: ({
        buttonType,
        title,
        content,
        confirmButtonContent,
        cancelButtonContent,
        onConfirm,
        onCancel,
                      }:OpenAlertDialogProps)=>{
        set(()=>({
            isOpen: true,
            ...(buttonType && {buttonType}),
            ...(title && {title}),
            ...(content && {content}),
            ...(confirmButtonContent && {confirmButtonContent}),
            ...(onConfirm && {onConfirm}),
            ...(cancelButtonContent && {cancelButtonContent}),
            ...(onCancel && {onCancel}),
        }))
    },

    closeAlertDialog: () => set(()=>({
        ...initialState
    }))
}));

export default useAlertDialogStore;