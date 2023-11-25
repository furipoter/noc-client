import {useRef} from "react";

const CONSTRAINTS = {video:true}

const LivePage = () => {

    const liveRef = useRef<HTMLVideoElement>(null)
    const startLive = async () => {
        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS)
        if (liveRef?.current && !liveRef.current.srcObject) {
            liveRef.current.srcObject = stream
        }
    }

    return <>
        <div className="text-red font-bold text-3xl">
            LivePage
        </div>
        <video className="video" autoPlay ref={liveRef}/>
        <br/>
        <button onClick={startLive}>start</button>
    </>
}

export default LivePage
