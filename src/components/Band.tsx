import BandItem, {BandItemType} from "./BandItem.tsx";

interface Props {
    title: string
    band: BandItemType[]
}

const Band = ({title, band}: Props) => {
    return(
        <>
            <span className="text-3xl font-bold mb-2">{title}</span>
            <div className="flex flex-row gap-4 w-full overflow-x-scroll">
                {band.map((item, index) => {
                    return <BandItem key={index} title={item.title} />
                })}
            </div>
        </>
    )
}
export default Band
