import {Routes, Route, BrowserRouter} from "react-router-dom";
import MainPage from "./MainPage.tsx";
import RootLayout from "../components/layout/RootLayout.tsx";
import LeaveApplicationPage from "./LeaveApplicationPage.tsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={
                    <RootLayout>
                        <Routes>
                            <Route path="" element={<MainPage/>}/>
                            <Route path={"leave/apply"} element={<LeaveApplicationPage/>} />
                        </Routes>
                    </RootLayout>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;