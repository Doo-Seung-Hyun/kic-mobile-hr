import Button from "../ui/Button.tsx";
import {useNavigate} from "react-router-dom";
import useSubmitFooterStore from "../../stores/submitFooterStore.ts";
import {useShallow} from "zustand/react/shallow";

const SubmitFooter = ({
                          text = '제출하기',
                          linkTo = '/',
                      }: { text?: string, linkTo?: string, useValidation?: boolean }) =>{
    const navigate = useNavigate();
    const {isValid, submitHandler} = useSubmitFooterStore(useShallow(state => ({
        isValid : state.isValid,
        submitHandler : state.submitHandler
    })));

    // todo : 신청 후 프로그레스바 만들기
    return <Button className={"w-full py-3"}
                   onClick={()=> {
                       if(submitHandler)
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