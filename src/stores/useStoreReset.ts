import {useBottomSheetReset} from "./bottomSheetStore.ts";
import useSubmitFooterStore from "./submitFooterStore.ts";

const useStoreReset = () => {
    const resetBottomSheetStore = useBottomSheetReset();
    const resetSubmitFooterStore = useSubmitFooterStore(state=>state.reset);

    const resetAllStores = ()=>{
        resetBottomSheetStore();
        resetSubmitFooterStore();
    }

    return {resetAllStores};
}

export default useStoreReset;