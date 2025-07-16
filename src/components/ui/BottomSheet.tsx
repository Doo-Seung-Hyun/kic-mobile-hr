import useBottomSheetStore from "../../stores/bottomSheetStore.ts";
import DimmedBackground from "./DimmedBackground.tsx";
import Button from "./Button.tsx";
import React from "react";

const BottomSheet = () => {
    const {isOpen, isHide, type, bottomSheetContent, setContentState, buttonText, onButtonClick, closeBottomSheet, onClosingAnimationComplete} = useBottomSheetStore();
    if(!isOpen)
        return null;

    const bottomSheetPaddingBottom = type==='withButton' ? 'pb-16':'';

    return <DimmedBackground type={"bottomSheet"}
                             onBackgroundClick={closeBottomSheet} >
        <div className={`rounded-t-2xl max-h-[90%] overflow-auto bg-white p-6 ${bottomSheetPaddingBottom}`.trim()}
             style={{transition: 'transform 0.3s',
                 transform: `translateY(${isHide ? '100%' : '0'})`
             }}
             onTransitionEnd={onClosingAnimationComplete}
        >
            {
                typeof bottomSheetContent ==='function' ?
                    bottomSheetContent(setContentState) : // 함수면 바텀시트콘텐트 상태 setter 전달
                    bottomSheetContent
            }
        </div>
        {
            type==='withButton' &&
            <Button onClick={onButtonClick}
                    className={'fixed left-4 right-4 bottom-4 h-10'}
            >
                {buttonText}
            </Button>
        }
    </DimmedBackground>
}

export default BottomSheet;