import { useNavigate} from "react-router-dom";
import Band from "../components/Band.tsx";
import Footer from "../components/Footer.tsx";

const hot10 = [
    {title: '[LIVE] FURIOSA AI 해커톤 현장'},
    {title: '[단독] 퓨리포터 등장'},
    {title: '[긴급] 세상에 지금이 몇시지'},
    {title: '여긴 어디 나는 누구'}
]


const HomePage = () => {
    const navigate = useNavigate()

    const onClick = () => {
        navigate('/upload')
    }
    return(
        <>
            <div className="flex flex-col justify-between h-full w-full bg-black">
                <div>
                    <div className="mb-[1rem] p-6">
                        <span className="text-[#E21401] text-3xl font-bold ">AI Blur</span>
                    </div>
                    <Band title='HOT 10' band={hot10}/>
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
