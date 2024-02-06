// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Col, Row, Typography } from "antd";

// const { Title } = Typography;
// // import { Chart, Line, registerables } from 'chart.js';
// // Chart.register(...registerables);
// // 
// // 
// // Define the shape of the coin history data
// interface CoinHistoryData {
//   price: number;
//   timestamp: string;
// }

// // Define the shape of the props
// interface LineChartProps {
//   coinHistory: {
//     data: {
//       history: CoinHistoryData[];
//       change: number;
//     };
//   };
//   currentPrice: number | string; // Accept both number and string types
//   coinName: string;
// }

// const LineChart: React.FC<LineChartProps> = ({
//   coinHistory,
//   currentPrice,
//   coinName,
// }) => {
//   const coinPrice: number[] = [];
//   const coinTimestamp: string[] = [];

//   // Extract price and timestamp in a single loop
//   if (coinHistory?.data?.history) {
//     coinHistory.data.history.forEach((item) => {
//       coinPrice.push(item.price);
//       coinTimestamp.push(new Date(item.timestamp).toLocaleDateString());
//     });
//   }

//   const data = {
//     labels: coinTimestamp,
//     datasets: [
//       {
//         label: "Price In USD",
//         data: coinPrice,
//         fill: false,
//         backgroundColor: "#0071bd",
//         borderColor: "#0071bd",
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         // Updated for Chart.js v3+
//         beginAtZero: true,
//       },
//     },
//   };

//   // Ensure currentPrice is a number
//   const currentPriceNumber =
//     typeof currentPrice === "string" ? parseFloat(currentPrice) : currentPrice;

//   return (
//     <>
//       <Row className="chart-header">
//         <Title level={2} className="chart-title">
//           {coinName} Price Chart
//         </Title>
//         <Col className="price-container">
//           <Title level={5} className="price-change">
//             Change: {coinHistory?.data?.change}%
//           </Title>
//           <Title level={5} className="current-price">
//             Current {coinName} Price: ${" "}
//             {isNaN(currentPriceNumber) ? "N/A" : currentPriceNumber.toFixed(2)}
//           </Title>
//         </Col>
//       </Row>
//       <Line data={data} options={options} />
//     </>
//   );
// };

// export default LineChart;
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
  Legend
} from 'chart.js';

const { Title: AntTitle } = Typography;

// Register Chart.js components here
ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define the shape of the coin history data
interface CoinHistoryData {
  price: number;
  timestamp: string;
}

// Define the shape of the props
interface LineChartProps {
  coinHistory: {
    data: {
      history: CoinHistoryData[];
      change: number;
    };
  };
  currentPrice: number | string; // Accept both number and string types
  coinName: string;
}

const LineChart: React.FC<LineChartProps> = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice: number[] = [];
  const coinTimestamp: string[] = [];

  // Extract price and timestamp in a single loop
  if (coinHistory?.data?.history) {
    coinHistory.data.history.forEach((item) => {
      coinPrice.push(item.price);
      coinTimestamp.push(new Date(item.timestamp).toLocaleDateString());
    });
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear', // Specify the type explicitly
        beginAtZero: true,
      },
    },
  };

  // Ensure currentPrice is a number
  const currentPriceNumber = typeof currentPrice === 'string' ? parseFloat(currentPrice) : currentPrice;

  return (
    <>
      <Row className="chart-header">
        <AntTitle level={2} className="chart-title">
          {coinName} Price Chart
        </AntTitle>
        <Col className="price-container">
          <AntTitle level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </AntTitle>
          <AntTitle level={5} className="current-price">
            Current {coinName} Price: $ {isNaN(currentPriceNumber) ? "N/A" : currentPriceNumber.toFixed(2)}
          </AntTitle>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;