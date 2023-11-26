import { useNavigate} from "react-router-dom";
import Band from "../components/Band.tsx";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";
import {BandItemType} from "../components/BandItem.tsx";
import axios from "axios";

const HomePage = () => {
    const navigate = useNavigate();
    const [videoList, setVideoList] = useState<{ count:number, list: BandItemType[] } | undefined>(undefined);
    const url = 'http://43.202.196.35:5002/api/video_list';

    const httpInstance = axios.create({
        baseURL: 'http://43.202.196.35:5002'
    })

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await httpInstance.get('/api/video_list');

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                const data = response.data;
                setVideoList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error as needed (e.g., show an error message to the user)
            }
        };

        fetchData();
    }, [url]);
    const onClick = () => {
        navigate('/upload');
    };

    return(
        <>
            <div className="flex flex-col justify-between h-full w-full bg-black">
                <div>
                    <div className="mb-[1rem] p-6">
                        <span className="text-[#E21401] text-3xl font-bold ">AI Blur</span>
                    </div>
                    <Band title='HOT 10' videoList={videoList}/>
                </div>
                <div className="flex items-center flex-col w-full">
                    <div className="flex w-full px-6 my-2">
                        <button onClick={onClick} className="bg-[#E21401] py-2 px-4 w-full text-center rounded-l" >영상 업로드하기</button>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default HomePage
