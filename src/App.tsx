import './index.css'
import LivePage from "./pages/LivePage.tsx";
import Splash from "./components/Splash.tsx";
import {useEffect, useState} from "react";

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
            {showModal && (<Splash/>)}
            <LivePage/>
        </>
    )
}

export default App
