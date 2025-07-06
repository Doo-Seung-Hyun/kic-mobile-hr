import {useNavigate} from "react-router-dom";

const backButtonIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
    />
</svg>

const SubHeader = (props:{title:string}) => {
    const {title} = props;
    const navigate = useNavigate();

    return <div className={"relative w-full text-center"}>
        <button className={"absolute left-0"}
                onClick={() => navigate(-1)}
        >
            {backButtonIcon}
        </button>
        <span>
            {title}
        </span>
    </div>;
}

export default SubHeader;