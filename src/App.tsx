import './index.css'
import LivePage from "./pages/LivePage.tsx";
import Splash from "./components/Splash.tsx";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ViewPage from "./pages/ViewPage.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {
    // const [count, setCount] = useState(0)

    const [showModal, setShowModal] = useState(true);

    // 특정 시간(예: 3초)이 지난 후에 모달을 닫음
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowModal(false);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <BrowserRouter basename='/noc-client'>
                {showModal && <Splash />}
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/live" element={<LivePage/>}/>
                    <Route path="/view" element={<ViewPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
