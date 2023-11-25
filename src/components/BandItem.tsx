import {useNavigate} from "react-router-dom";
import thumbnail from "../assets/thumbnail.png";

interface Props {
    title: string
    date: string
}

export interface BandItemType{
    name: string
    created_at: string
}


const BandItem = ({ title, date }:Props) => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate(`/view/${title}`)
    }
    return (
        <button onClick={onClick} >
            <div className="rounded-xl w-[12rem] overflow-hidden text-left">
                <img src={thumbnail} alt="thumbnail"/>
                <div className="font-bold truncate">{title}</div>
                <span className="text-[14px]">{date}</span>
            </div>
        </button>
    )
}
export default BandItem
