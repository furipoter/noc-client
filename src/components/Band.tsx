import BandItem, {BandItemType} from "./BandItem.tsx";

interface Props {
    title: string
    videoList?: { count:number, list: BandItemType[] }
}

const Band = ({title, videoList}: Props) => {
    return(
        <div className="p-6">
            <span className="text-2xl font-bold mb-2">{title}</span>
            <div className="flex flex-row gap-4 w-full overflow-x-scroll mb-4">
                {videoList?.list?.map((item, index) => {
                    return <BandItem key={index} title={item.name} date={item.created_at} />
                })}
            </div>
        </div>
    )
}
export default Band
