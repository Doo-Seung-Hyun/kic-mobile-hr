import {QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries : {
            throwOnError: false,
        }
    }
});

export default queryClient