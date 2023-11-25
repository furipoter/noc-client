import React, { useRef, useEffect } from 'react';
import Header from "../components/Header.tsx";

const ViewPage: React.FC = () => {

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        // 비디오 주소
        const videoUrl = "https://furiosa-video.s3.ap-northeast-2.amazonaws.com/upload/2";

        // 비디오 요소 참조
        const videoElement = videoRef.current;

        if (videoElement) {
            // 비디오 주소를 설정하고 비디오 로드
            videoElement.src = videoUrl;

            videoElement.addEventListener('loadedmetadata', () => {
                videoElement.play().catch(error => console.error('비디오 재생 중 오류:', error));
            });
        }
    }, []);

    return (
        <>
            <video ref={videoRef} className="video" width="100%">
                Your browser does not support the video tag.
            </video>
            <div className="fixed top-0 left-0 w-full">
                <Header />
            </div>
        </>
    );
};

export default ViewPage
