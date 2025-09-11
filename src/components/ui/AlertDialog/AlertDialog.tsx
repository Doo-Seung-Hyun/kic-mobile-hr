import useAlertDialogStore from "../../../stores/alertDialogStore.ts";
import {useShallow} from "zustand/react/shallow";
import DimmedBackground from "../DimmedBackground.tsx";
import Button from "../Button.tsx";
import {LoadingSpinner} from "../LoadingSpinner.tsx";
import {useState} from "react";

const AlertDialog = ()=> {
    const {
        isOpen,
        closeAlertDialog,
        title,
        content,
        buttonType,
        confirmButtonContent,
        cancelButtonContent,
        onCancel,
        onConfirm,
    } = useAlertDialogStore(useShallow(state => ({
        isOpen : state.isOpen,
        closeAlertDialog : state.closeAlertDialog,
        title : state.title,
        content : state.content,
        buttonType : state.buttonType,
        confirmButtonContent : state.confirmButtonContent,
        cancelButtonContent : state.cancelButtonContent,
        onConfirm : state.onConfirm,
        onCancel : state.onCancel,
    })));

    //버튼 로딩스피너 state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if(!isOpen)
        return null;

    // 확인버튼 핸들러
    const handleConfirmClick = async () => {
        if (onConfirm) {
            const result = onConfirm();
            if(result instanceof Promise) {
                setIsLoading(true);
                await result;
                setIsLoading(false);
            }
        }
        closeAlertDialog();
    }

    return <DimmedBackground onBackgroundClick={closeAlertDialog}
                             type={"alertDialog"}>
        <div onClick={e=>e.stopPropagation()}
             className={'bg-white p-6 text-center rounded-xl w-full'}
        >
            {title && <h2 className={'font-bold text-lg'}>{title}</h2>}
            {content &&
                <div className={'py-2'}>
                    {content}
                </div>}
            <div className={'pt-6 flex flex-row-reverse gap-3'}>
                {/*확인버튼*/}
                {isLoading ?
                    <Button className={'flex-1 flex justify-center items-center'}
                            style={{padding: '0.5rem 1rem'}}
                            size={'md'}
                            disabled
                    >
                        <LoadingSpinner size={16} color={'#9e9e9e'}/>
                    </Button> :
                    <Button className={'flex-1 flex justify-center items-center'}
                            style={{padding: '0.5rem 1rem'}}
                            size={'md'}
                            onClick={handleConfirmClick}
                    >
                        {confirmButtonContent}
                    </Button>}

                {/*취소버튼*/}
                {buttonType==='confirm' &&
                    <Button variant={'outline'}
                            style={{padding: '0.5rem 1rem'}}
                            size={'md'}
                            className={'flex-1'}
                            onClick={()=>{
                                if(onCancel)
                                    onCancel();
                                closeAlertDialog();
                            }}
                    >
                    {cancelButtonContent}
                </Button>}
            </div>
        </div>
    </DimmedBackground>
}

export default AlertDialog