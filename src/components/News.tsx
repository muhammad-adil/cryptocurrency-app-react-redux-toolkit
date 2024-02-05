import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptosQuery } from "../services/cryptoApi.ts";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi.ts";
import Loader from "./Loader.tsx";
import { cryptoNewsApi } from "../services/cryptoNewsApi.ts";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({count: simplified ? 6 : 12, newsCategory});
  console.log("cryptoNews", cryptoNews);

  if (!cryptoNews?.data) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {/* {!simplified && (
        <div>cryptoNews</div>

        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )} */}
      {!simplified && cryptoNews?.data.map((news, i) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={i}>
          {/* style={{ width: 240 }} */}
          <Card
            hoverable
            style={{
              height: '100%',
              maxHeight: 580
            }}
            className="news-card"
            cover={
              <div
                style={{
                  overflow: "hidden",
                  minWidth: "100%",
                  height: "320px",
                }}
              >
                <img
                  alt={news.title}
                  style={{ width: "100%", height: "100%" }}
                  src={news?.thumbnail || demoImage}
                />
              </div>
            }
          >
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                  {/* {news.title.length > 70
                  ? `${news.title.substring(0, 70)}...`
                  : news.title} */}
                </Title>
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <Text>{moment(news.createdAt).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
