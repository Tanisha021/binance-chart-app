import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_CANDLES = 1000; // Maximum number of candles to store per pair

const useChartStore = create(
  persist(
    (set, get) => ({
      selectedPair: 'ETHUSDT',
      selectedTimeframe: '1m',
      chartData: {
        ETHUSDT: [],
        BNBUSDT: [],
        DOTUSDT: []
      },
      
      // Actions
      setSelectedPair: (pair) => set({ selectedPair: pair }),
      setSelectedTimeframe: (timeframe) => set({ selectedTimeframe: timeframe }),
      
      // Add new candle data
      addCandleData: (pair, candle) => {
        const { chartData } = get();
        const pairData = [...(chartData[pair] || [])];
        
        // Check if we need to update an existing candle or add a new one
        const existingCandleIndex = pairData.findIndex(
          (existing) => existing.time === candle.time
        );
        
        if (existingCandleIndex !== -1) {
          // Update existing candle
          pairData[existingCandleIndex] = candle;
        } else {
          // Add new candle
          pairData.push(candle);
          // Keep only the latest MAX_CANDLES
          if (pairData.length > MAX_CANDLES) {
            pairData.shift();
          }
        }
        
        set({
          chartData: {
            ...chartData,
            [pair]: pairData,
          },
        });
      },
      
      // Clear data for a specific pair
      clearPairData: (pair) =>
        set((state) => ({
          chartData: {
            ...state.chartData,
            [pair]: [],
          },
        })),
      
      // Clear all chart data
      clearAllData: () =>
        set({
          chartData: {
            ETHUSDT: [],
            BNBUSDT: [],
            DOTUSDT: [],
          },
        }),
    }),
    {
      name: 'crypto-chart-storage',
      version: 1,
      partialize: (state) => ({
        chartData: state.chartData,
        selectedPair: state.selectedPair,
        selectedTimeframe: state.selectedTimeframe,
      }),
    }
  )
);

export default useChartStore;