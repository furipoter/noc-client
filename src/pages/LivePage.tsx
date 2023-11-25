import {useRef, useEffect, useState} from "react";
import Header from "../components/Header.tsx";
import { IoMdCloudUpload } from "react-icons/io";
import {useNavigate} from "react-router-dom";

const CONSTRAINTS = {
    video: true,
    // audio: true
};

const LivePage = () => {
    // const isLiveOnRef = useRef(false);
    // const [isLiveOn, setIsLiveOn] = useState(false);
    const liveRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    // const chunks: Blob[] = [];

    // let sequence = 0

    // const uploadVideo = async (blob: Blob) => {
    //     if (!isLiveOnRef.current) {
    //         return;
    //     }
    //     console.log('uploadVideo', blob);
    //     // const mp4 = new Blob([people], { type: 'video/mp4' });
    //     try {
    //         const formData = new FormData();
    //         formData.append('file_name', String(sequence)+'.mp4');  // 원하는 파일 이름으로 설정
    //         formData.append('video', blob);
    //
    //         const response = await fetch('http://14.35.173.13:38228/api/video/upload', {
    //             method: 'POST',
    //             body: formData,
    //         });
    //
    //         sequence += 1
    //
    //         if (response.ok) {
    //             const responseData = await response.json();
    //             console.log('서버 응답:', responseData);
    //         } else {
    //             console.error('서버 응답 오류:', response.status, response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('API 요청 중 에러:', error);
    //     }
    // };

    const startLive = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);

            if (liveRef.current && !liveRef.current.srcObject) {
                liveRef.current.srcObject = stream;

                // MediaRecorder 생성
                mediaRecorderRef.current = new MediaRecorder(stream);

                // console.log('MediaRecorder 생성', stream)

                // 녹화가 준비되었을 때 이벤트 처리
                mediaRecorderRef.current.ondataavailable = (e) => {
                    if (e.data.size > 0){
                        // uploadVideo(e.data);
                        // console.log('onDataAvailable', e.data);
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

    // useEffect(() => {
    //     isLiveOnRef.current = isLiveOn;
    // }, [isLiveOn]);

    // 컴포넌트가 언마운트될 때 녹화 중지
    useEffect(() => {
        startLive()
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                mediaRecorderRef.current.stop();
            }
        };
    }, []);

    // const onClick = () => {
    //     // isLiveOn 값을 토글
    //     setIsLiveOn(!isLiveOn);
    // };

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = () => {
        const file = fileInputRef?.current?.files?.[0];

        console.log(file)

        if (file) {
            setIsLoading(true)

            const formData = new FormData();
            formData.append("video", file);
            formData.append('file_name', file?.name);

            // 여기서 formData를 서버로 전송하거나, axios 등을 사용하여 업로드합니다.
            // 아래는 fetch를 사용한 예제입니다.
            fetch("http://14.35.173.13:38228/api/video/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Upload success:", data);
                })
                .catch((error) => {
                    console.error("Upload error:", error);
                })
                .finally(()=>{
                    setIsLoading(false);
                    navigate(`/view/${file?.name}`)
                })
        }
    }

    return (
        <>
            <video className="video" width="100%" autoPlay ref={liveRef} />
            <div className="fixed top-0 left-0 w-full h-full">
                <Header title="AI BLUR 콘텐츠 등록"/>
                {/*<div className="fixed p-6 right-0">*/}
                {/*    <button className="p-[2px] bg-white rounded-3xl" onClick={onClick}> {isLiveOn ?  <FaCircleStop color="#E21401" size="48"/> : <FaRecordVinyl color="#E21401" size="48"/>} </button>*/}
                {/*</div>*/}
                <div className="h-full flex flex-col justify-center items-center backdrop-blur">
                    {isLoading ?
                        <>
                            <span className="font-bold">블러를 입히는 중 입니다. 잠시만 기다려주세요.</span>
                            <br/>
                            <span className="loader"></span>
                        </>
                        :
                        <>
                            <label htmlFor="file" className="font-bold">블러처리 할 파일을 등록해주세요.</label>
                            <label htmlFor="file" ><IoMdCloudUpload color="#FFFFFF" size="72" /></label>
                            <input id="file" type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange}/>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default LivePage;
