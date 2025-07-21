import Button from "../ui/Button.tsx";
import {useNavigate} from "react-router-dom";

const SubmitFooter = ({
                          text = '제출하기',
                          linkTo = '/'
                      }: { text?: string, linkTo?: string }) =>{
    const navigate = useNavigate();
    return <Button className={"w-full py-3"}
                   onClick={()=>navigate(linkTo)}
    >
        {text}
    </Button>
};

export default SubmitFooter;