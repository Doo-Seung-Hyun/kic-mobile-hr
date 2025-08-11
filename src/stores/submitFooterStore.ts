import {create} from "zustand";

interface SubmitFooterStore {
    isValid : boolean;
    setValidation : (isValid:boolean) => void;

    submitHandler : (()=>void) | null;
    setSubmitHandler : (submitHandler : (()=>void) | null)=>void;

    reset : ()=>void;
}

const useSubmitFooterStore = create<SubmitFooterStore>(set=>({
    isValid : true,
    setValidation : isValid => set({
        isValid
    }),
    submitHandler : null,
    setSubmitHandler : submitHandler => set({
        submitHandler
    }),

    reset : () => set({
        isValid : true,
        submitHandler : null
    })
}));

export default useSubmitFooterStore;