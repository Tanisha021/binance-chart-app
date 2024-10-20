"use client";
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyPairSelector } from './CurrencyPairSelector';
import { TimeframeSelector } from './TimeframeSelector';
import { CryptoChart } from './CryptoChart';
import { ChartSettings } from './ChartSettings';
import { CURRENCY_PAIRS, TIMEFRAMES } from '@/lib/constants';
import useChartStore from '@/store/chartStore';

export function ChartContainer() {
  const {
    selectedPair,
    selectedTimeframe,
    setSelectedPair,
    setSelectedTimeframe,
    chartData,
  } = useChartStore();

  const handlePairChange = (pair) => {
    setSelectedPair(pair);
  };

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Crypto Chart</CardTitle>
        <ChartSettings />
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <CurrencyPairSelector
            pairs={CURRENCY_PAIRS}
            selectedPair={selectedPair}
            onChange={handlePairChange}
          />
          <TimeframeSelector
            timeframes={TIMEFRAMES}
            selectedTimeframe={selectedTimeframe}
            onChange={handleTimeframeChange}
          />
        </div>
        <CryptoChart
          pair={selectedPair}
          timeframe={selectedTimeframe}
          initialData={chartData[selectedPair]}
        />
      </CardContent>
    </Card>
  );
}