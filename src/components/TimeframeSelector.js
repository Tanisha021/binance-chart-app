import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

export function TimeframeSelector({timeframes, selectedTimeframe, onChange}){
    return(
        <Select value ={selectedTimeframe} onValueChange={onChange}>
            <SelectTrigger classname="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(timeframes).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    )
}