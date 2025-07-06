import Button from "../ui/Button.tsx";

const SubmitFooter = ({
    text = '제출하기'
}: {text?:string}) =>{
    return <Button className={"w-full"}>
        {text}
    </Button>
};

export default SubmitFooter;