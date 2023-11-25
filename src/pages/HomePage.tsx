import {Link} from "react-router-dom";
import Band from "../components/Band.tsx";
import Footer from "../components/Footer.tsx";

const hot10 = [
    {title: '[LIVE] FURIOSA AI 해커톤 현장'},
    {title: '[단독] 퓨리포터 등장'},
    {title: '[긴급] 세상에 지금이 몇시지'},
    {title: '여긴 어디 나는 누구'}
]

const HomePage = () => {
    return(
        <>
            <div className="flex flex-col grow w-full h-full bg-black p-6">
                <Band title='HOT 10' band={hot10}/>
                <br/>
                <Link to="/live" >[임시] 영상 촬영 페이지</Link>
            </div>
            <Footer />
        </>
    )
}
export default HomePage