
export interface ProcessResultLayoutProps {
    resultIcon? : React.ReactNode;
    title? : string;
    subMessage? : string;
    children? : React.ReactNode;
}

const ProcessResultLayout = ({
   resultIcon = <img src = "/src/assets/images/check.png" alt = "체크박스" width={48}/>,
   title = '처리 완료되었습니다',
   subMessage,
   children
}:ProcessResultLayoutProps) => {

    return (<div className={'flex flex-col gap-4 justify-center text-center items-center h-[100vh] p-4'}>
        <div>{resultIcon}</div>
        <div className={'font-bold text-2xl'}>{title}</div>
        <div>{subMessage}</div>
        {children &&
            <div className={'rounded-lg bg-white w-full max-w-96 p-4 m-4'}>{children}</div>}
    </div>)
};

export default ProcessResultLayout;