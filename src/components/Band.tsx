import BandItem, {BandItemType} from "./BandItem.tsx";

interface Props {
    title: string
    band: BandItemType[]
}

const Band = ({title, band}: Props) => {
    return(
        <div className="p-6">
            <span className="text-2xl font-bold mb-2">{title}</span>
            <div className="flex flex-row gap-4 w-full overflow-x-scroll mb-4">
                {band.map((item, index) => {
                    return <BandItem key={index} title={item.title} />
                })}
            </div>
        </div>
    )
}
export default Band
