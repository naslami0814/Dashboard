import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

function ChartComponent({ type, data, options }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // To store the Chart.js instance

  useEffect(() => {
    // Destroy existing chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: type,
      data: data,
      options: options,
    });

    // Cleanup function: destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, options, type]); // Re-run effect if data, options, or type change

  return <canvas ref={chartRef}></canvas>;
}

export default ChartComponent;
