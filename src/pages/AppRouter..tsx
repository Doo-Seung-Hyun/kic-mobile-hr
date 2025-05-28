import {Routes, Route, BrowserRouter} from "react-router-dom";
import MainPage from "./MainPage.tsx";
import RootLayout from "../components/layout/RootLayout.tsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={
                    <RootLayout>
                        <Routes>
                            <Route path="" element={<MainPage/>}/>
                        </Routes>
                    </RootLayout>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;