import { useRef, useEffect } from "react";
import Header from "../components/Header.tsx";

const CONSTRAINTS = {
    video: true,
    // audio: true
};

const LivePage = () => {
    const liveRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    // const chunks: Blob[] = [];

    let sequence = 0

    const uploadVideo = async (blob: Blob) => {
        try {
            const formData = new FormData();
            formData.append('file_name', String(sequence));  // 원하는 파일 이름으로 설정
            formData.append('video', blob);

            const response = await fetch('http://13.209.86.34:5001/api/video/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('서버 응답:', responseData);
            } else {
                console.error('서버 응답 오류:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('API 요청 중 에러:', error);
        }
    };

    const startLive = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);

            if (liveRef.current && !liveRef.current.srcObject) {
                liveRef.current.srcObject = stream;

                // MediaRecorder 생성
                mediaRecorderRef.current = new MediaRecorder(stream);

                console.log('MediaRecorder 생성', stream)

                // 녹화가 준비되었을 때 이벤트 처리
                mediaRecorderRef.current.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        uploadVideo(e.data);
                        console.log('onDataAvailable', e.data);
                    }
                };

                // 녹화 중지 시 이벤트 처리
                mediaRecorderRef.current.onstop = () => {
                    // chunks 배열에 녹화된 데이터가 있으면 서버에 전송하는 로직을 추가할 수 있습니다.
                    console.log("Recording stopped. Sending data to the server...");
                };

                // 녹화 시작
                mediaRecorderRef.current.start(1000); // 1초 간격으로 데이터 수집
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    // 컴포넌트가 언마운트될 때 녹화 중지
    useEffect(() => {
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                mediaRecorderRef.current.stop();
            }
        };
    }, []);

    return (
        <>
            <video className="video" width="100%" autoPlay ref={liveRef} />
            <div className="fixed top-0 left-0 p-6">
                <Header />
                <div>
                    <button className="small-button" onClick={startLive}>Start</button>
                </div>
            </div>
        </>
    );
};

export default LivePage;
