import {Link} from "react-router-dom";
import thumbnail from "../assets/thumbnail.png";

interface Props {
    title: string
}

export interface BandItemType{
    title: string
}

const BandItem = ({ title }:Props) => {
    return (
        <Link to="/view" >
            <div className="rounded-xl w-[12rem] overflow-hidden">
                <img src={thumbnail} alt="thumbnail"/>
                <div>{title}</div>
                <span>FURIPOTER</span>
            </div>
        </Link>
    )
}
export default BandItem
