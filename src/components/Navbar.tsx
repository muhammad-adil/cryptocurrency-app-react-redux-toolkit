import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const items: MenuProps["items"] = [
  {
    label: <Link to="/">Home</Link>,
    icon: <HomeOutlined />,
    key: "home",
  },
  {
    label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
    icon: <FundOutlined />,
    key: "cryptocurrencies",
  },
  {
    label: <Link to="/exchanges">Exchanges</Link>,
    icon: <MoneyCollectOutlined />,
    key: "exchanges",
  },
  {
    label: <Link to="/news">News</Link>,
    icon: <BulbOutlined />,
    key: "news",
  },
];

const Navbar = () => {
  // States
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  // const [screenSize, setScreenSize] = useState(undefined);

  // useEffect for screen size
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize !== undefined && screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <>
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="logo">
            <Link to="/">Cryptoverse</Link>
          </Typography.Title>

          <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
            <MenuOutlined />
          </Button>
        </div>
        {activeMenu && <Menu mode="vertical" theme="dark" items={items} />}
        {/* <Menu mode="vertical" theme="dark" items={items} /> */}
      </div>
    </>
  );
};
export default Navbar;
