import { createChart } from 'lightweight-charts';
import { CHART_COLORS } from './constants';

export function initializeChart(container) {
  const chart = createChart(container, {
    width: container.clientWidth,
    height: 500,
    layout: {
      background: { color: CHART_COLORS.backgroundColor },
      textColor: '#333',
    },
    grid: {
      vertLines: { color: '#f0f0f0' },
      horzLines: { color: '#f0f0f0' },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
  });

  const candlestickSeries = chart.addCandlestickSeries({
    upColor: CHART_COLORS.upColor,
    downColor: CHART_COLORS.downColor,
    borderVisible: false,
    wickUpColor: CHART_COLORS.upColor,
    wickDownColor: CHART_COLORS.downColor,
  });

  const handleResize = () => {
    chart.applyOptions({
      width: container.clientWidth,
    });
  };

  window.addEventListener('resize', handleResize);

  return {
    chart,
    candlestickSeries,
    cleanup: () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    },
  };
}

export function formatCandleData(klineData) {
  return {
    time: klineData.k.t / 1000,
    open: parseFloat(klineData.k.o),
    high: parseFloat(klineData.k.h),
    low: parseFloat(klineData.k.l),
    close: parseFloat(klineData.k.c),
  };
}