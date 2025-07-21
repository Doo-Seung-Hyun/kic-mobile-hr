import {useLocation} from "react-router-dom";

interface ProcessResultPageProps {
    resultIcon? : React.ReactNode;
    title? : string;
    description? : React.ReactNode;
}

const ProcessResultPage = () => {
    const location = useLocation();
    const {
        resultIcon = <img src = "/src/assets/images/check.png" alt = "체크박스" width={48}/>,
        // title = '처리 완료되었습니다',
        // description
    }:ProcessResultPageProps = (location.state | {});

    //삭제 예정
    const title = '휴가를 신청했습니다'
    const subMessage = '그룹웨어 전자결재로 결재가 진행됩니다'
    const description = <div>
        <div>
            <div className={"font-semibold flex justify-center gap-1 pb-2"}>
                <span>📅</span>
                <div className={"flex flex-col text-left"}>
                    <span>7월 21일(월,오후반차) - 7월 22일(화)</span>
                </div>
            </div>
            <div>연차휴가</div>
            <div>1일</div>
        </div>
    </div>

    return (<div className={'flex flex-col gap-4 justify-center text-center items-center h-[100vh] p-4'}>
        <div>{resultIcon}</div>
        <div className={'font-bold text-2xl'}>{title}</div>
        <div>{subMessage}</div>
        <div className={'rounded-lg bg-white w-full max-w-96 p-4 m-4'}>{description}</div>
    </div>)
};

export default ProcessResultPage;