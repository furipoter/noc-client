import { MdOutlineExitToApp } from "react-icons/md";
import {useNavigate} from "react-router-dom";

const Header = ({title}:{title?:string}) => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate(-1)
    }
    return (
        <div className="fixed top-0 left-0 flex w-full justify-between p-6 gradient z-40">
            <div className="text-red font-bold text-2xl break-keep">{title}</div>
            <button onClick={onClick}>
                <MdOutlineExitToApp size="24" />
            </button>
        </div>
    )
}

export default Header
