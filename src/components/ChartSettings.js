import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from 'lucide-react';
import useChartStore from '@/store/chartStore';

export function ChartSettings() {
  const { clearPairData, clearAllData, selectedPair } = useChartStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => clearPairData(selectedPair)}>
          Clear Current Pair Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={clearAllData}>
          Clear All Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}