import { MdOutlineExitToApp } from "react-icons/md";

const Header = () => {
    return (
        <div>
            <div className="text-red font-bold text-3xl">방송 주제 텍스트</div>
            <button className="small-buttonn bg-red">
                <MdOutlineExitToApp />
            </button>
        </div>
    )
}

export default Header
