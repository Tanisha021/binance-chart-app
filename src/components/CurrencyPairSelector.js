import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  export function CurrencyPairSelector({ pairs, selectedPair, onChange }) {
    return (
      <Select value={selectedPair} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select pair" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(pairs).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }