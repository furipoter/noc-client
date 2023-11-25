import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import {useParams} from "react-router-dom";
import Chat from "../components/Chat.tsx"; // video.js 스타일 파일

const ViewPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { video } = useParams();

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }
        const videoOptions = {
            controls: true,
            fluid: true,
            sources: [{
                src: `https://furiosa-video.s3.ap-northeast-2.amazonaws.com/convert/${video}`,
                type: 'video/mp4',
            }],
        };

        const player = videojs(videoRef.current, videoOptions, function onPlayerReady() {
            console.log('Player is ready');
        });

        // 컴포넌트가 언마운트될 때 플레이어 해제
        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, [video]);

    return (
        <>
            <div data-vjs-player>
                <video ref={videoRef} className="video-js vjs-big-play-centered" />
            </div>
            <Chat video={video} />
        </>
    );
};

export default ViewPage;
