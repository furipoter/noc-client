import { MdOutlineExitToApp } from "react-icons/md";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate(-1)
    }
    return (
        <div className="flex w-full justify-between p-6 gradient">
            <div className="text-red font-bold text-2xl break-keep">[LIVE] FURIOSA AI 해커톤 현장</div>
            <button onClick={onClick}>
                <MdOutlineExitToApp size="24" />
            </button>
        </div>
    )
}

export default Header
