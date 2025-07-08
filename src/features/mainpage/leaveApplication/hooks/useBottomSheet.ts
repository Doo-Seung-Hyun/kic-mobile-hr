import useBottomSheetStore from "../../../../stores/bottomSheetStore.ts";

const useBottomSheet = () => {
    const {isOpen, openBottomSheet, closeBottomSheet} = useBottomSheetStore();

    return {
        isOpen,
        openBottomSheet,
        closeBottomSheet
    }
}

export default useBottomSheet;