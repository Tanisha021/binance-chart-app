import { useEffect, useRef } from 'react';
import { initializeChart, formatCandleData } from '@/lib/chartUtils';
import { wsService } from '@/lib/websocket';
import useChartStore from '@/store/chartStore';

export function CryptoChart({ pair, timeframe, initialData }) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const addCandleData = useChartStore(state => state.addCandleData);

  useEffect(() => {
    if (!containerRef.current) return;

    const { chart, candlestickSeries, cleanup } = initializeChart(containerRef.current);
    chartRef.current = { chart, candlestickSeries };

    // Set initial data from Zustand store
    if (initialData?.length > 0) {
      candlestickSeries.setData(initialData);
    }

    return cleanup;
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const handleWebSocketMessage = (data) => {
      const candleData = formatCandleData(data);
      chartRef.current.candlestickSeries.update(candleData);
      addCandleData(pair, candleData);
    };

    const unsubscribe = wsService.subscribe(pair, timeframe, handleWebSocketMessage);

    return () => {
      unsubscribe();
    };
  }, [pair, timeframe, addCandleData]);

  // Update chart when pair changes
  useEffect(() => {
    if (chartRef.current && initialData?.length > 0) {
      chartRef.current.candlestickSeries.setData(initialData);
    }
  }, [pair, initialData]);

  return (
    <div ref={containerRef} className="w-full h-[500px]" />
  );
}