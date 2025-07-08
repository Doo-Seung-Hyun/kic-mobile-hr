import React from "react";
import useBottomSheetStore from "../../stores/bottomSheetStore.ts";
import DimmedBackground from "./DimmedBackground.tsx";

const BottomSheet = () => {
    const {isOpen, isClosing, content, closeBottomSheet, onClosingAnimationComplete} = useBottomSheetStore();
    if(!isOpen)
        return null;

    return <DimmedBackground type={"bottomSheet"}
                             onBackgroundClick={()=>closeBottomSheet()} >
        <div className={"rounded-t-2xl max-h-[75%] overflow-auto bg-white p-6"}
             style={{transition: 'transform 0.3s',
                 transform: `translateY(${isClosing ? '100%' : '0'})`
             }}
             onTransitionEnd={onClosingAnimationComplete}
        >
            {content}
        </div>
    </DimmedBackground>
}

export default BottomSheet;