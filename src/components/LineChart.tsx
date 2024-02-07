import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const { Title: AntTitle } = Typography;

// Register Chart.js components
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the shape of the props
interface LineChartProps {
  coinHistory: {
    data: {
      //   history: CoinHistoryData[];
      history: Array<{
        price: number;
        timestamp: number;
      }>;
      change: number;
    };
  };
  currentPrice: number | string; // Accept both number and string types
  coinColor: string;
  coinName: string;
}

const LineChart: React.FC<LineChartProps> = ({
  coinHistory,
  currentPrice,
  coinColor,
  coinName,
}) => {
  const coinPrice = [];
  const coinTimestamp = [] as string[];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    // @ts-ignore
    coinPrice.push(coinHistory?.data.history[i].price);
    // coinTimestamp.push(new Date(coinHistory?.data?.history[i]?.timestamp*1000).toLocaleDateString());
    coinTimestamp.push(
      coinHistory?.data?.history[i]?.timestamp
        ? new Date(
            coinHistory?.data?.history[i]?.timestamp * 1000
          ).toLocaleDateString()
        : ""
    );
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: `Price of ${coinName} in USD`,
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: coinColor,
        borderColor: coinColor,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          //   type: "linear" as const,
          beginAtZero: true,
        },
      },
    },
  };

  //   const currentPriceNumber = typeof currentPrice === "string" ? parseFloat(currentPrice) : currentPrice;

  return (
    <>
      <Row className="chart-header">
        {/* className="chart-title" */}
        <AntTitle level={2} style={{ color: coinColor }}>
          {coinName} Price Chart
        </AntTitle>
        <Col className="price-container">
          <AntTitle level={5} className="price-change">
            Change:{" "}
            <span style={{ color: coinColor }}>
              {coinHistory?.data?.change}%
            </span>
          </AntTitle>
          <AntTitle level={5} className="current-price">
            Current {coinName} Price: ${" "}
            <span style={{ color: coinColor }}>{currentPrice}</span>
          </AntTitle>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
