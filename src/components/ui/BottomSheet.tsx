import DimmedBackground from "./DimmedBackground.tsx";
import Button from "./Button.tsx";
import {useBottomSheetStore} from "../../stores/bottomSheetStore.ts";

const BottomSheet = () => {
    const {isOpen, isHide, type, bottomSheetContent, validation, setBottomSheetResult, buttonText, onButtonClick, closeBottomSheet, onClosingAnimationComplete, bottomSheetClasses} = useBottomSheetStore();
    if(!isOpen)
        return null;

    const bottomSheetPaddingBottom = type==='withButton' ? 'pb-16':'';

    return <DimmedBackground type={"bottomSheet"}
                             onBackgroundClick={closeBottomSheet} >
        {/*바텀시트 렌더링*/}
        <div className={`rounded-t-2xl max-h-[90%] overflow-auto bg-white p-6 ${bottomSheetPaddingBottom} ${bottomSheetClasses}`.trim()}
             style={{transition: 'transform 0.3s',
                 transform: `translateY(${isHide ? '100%' : '0'})`
             }}
             onTransitionEnd={onClosingAnimationComplete}
        >
            {
                typeof bottomSheetContent ==='function' ?
                    bottomSheetContent(setBottomSheetResult) : // 함수면 바텀시트결과 setter 전달
                    bottomSheetContent
            }
        </div>

        {/*바텀시트 액션버튼*/}
        {
            type==='withButton' &&
            <Button onClick={onButtonClick}
                    className={'fixed left-4 right-4 bottom-4 h-10'}
                    disabled={!validation}
            >
                {buttonText}
            </Button>
        }
    </DimmedBackground>
}

export default BottomSheet;