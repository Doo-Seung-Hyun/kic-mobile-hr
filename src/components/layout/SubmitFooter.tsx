import Button from "../ui/Button.tsx";
import {useNavigate} from "react-router-dom";
import useSubmitFooterStore from "../../stores/submitFooterStore.ts";
import {useShallow} from "zustand/react/shallow";

const SubmitFooter = ({
                          text = '제출하기',
                          linkTo = '/',
                          useValidation = false
                      }: { text?: string, linkTo?: string, useValidation?: boolean }) =>{
    const navigate = useNavigate();
    const {isValid, submitHandler} = useSubmitFooterStore(useShallow(state => ({
        isValid : state.isValid,
        submitHandler : state.submitHandler
    })));

    return <Button className={"w-full py-3"}
                   onClick={()=> {
                       if(useValidation && submitHandler)
                           submitHandler();
                       else
                           navigate(linkTo);
                   }}
                   disabled={!isValid}
    >
        {text}
    </Button>
};

export default SubmitFooter;