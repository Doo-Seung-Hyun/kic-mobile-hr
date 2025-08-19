import Button from "../ui/Button.tsx";
import {useNavigate} from "react-router-dom";
import useSubmitFooterStore from "../../stores/submitFooterStore.ts";
import {useShallow} from "zustand/react/shallow";
import {LoadingSpinner} from "../ui/LoadingSpinner.tsx";

const SubmitFooter = ({
                          text = '제출하기',
                          linkTo = '/',
                      }: { text?: string, linkTo?: string, useValidation?: boolean }) =>{
    const navigate = useNavigate();
    const {isValid, submitHandler, isSubmitting} = useSubmitFooterStore(useShallow(state => ({
        isValid : state.isValid,
        submitHandler : state.submitHandler,
        isSubmitting : state.isSubmitting,
    })));

    return <Button className={"w-full py-3"}
                   onClick={()=> {
                       if(submitHandler)
                           submitHandler();
                       else
                           navigate(linkTo);
                   }}
                   disabled={!isValid || isSubmitting}
    >
        {isSubmitting ? <div className={"text-center"}>
            <LoadingSpinner size={24}
                            strokeWidth={12}
                            color={"#66666666"}
                            className={"inline-block"}
            />
        </div> : text}
    </Button>
};

export default SubmitFooter;