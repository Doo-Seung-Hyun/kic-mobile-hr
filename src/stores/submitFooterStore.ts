import {create} from "zustand";

interface SubmitFooterStore {
    isValid : boolean;
    setValidation : (isValid:boolean) => void;

    submitHandler : (()=>void) | null;
    setSubmitHandler : (submitHandler : (()=>void) | null)=>void;

    isSubmitting : boolean;
    setIsSubmitting: (isSubmitting:boolean) => void;

    footerButtonText : string;
    setFooterButtonText : (footerButtonText:string) => void;

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

    isSubmitting : false,
    setIsSubmitting : (isSubmitting:boolean) => set({
        isSubmitting
    }),

    footerButtonText : '',
    setFooterButtonText : footerButtonText => set({
        footerButtonText
    }),

    reset : () => set({
        isValid : true,
        submitHandler : null,
        isSubmitting : false,
        footerButtonText : '',
    })
}));

export default useSubmitFooterStore;