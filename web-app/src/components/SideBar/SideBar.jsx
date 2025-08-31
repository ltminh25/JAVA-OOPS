import {Layout, Menu, Button, message, Skeleton, Tooltip} from 'antd';
import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import { Image, Badge, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
const { Sider } = Layout;

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [manualCollapse, setManualCollapse] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKey(pathName);
  }, [location.pathname]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
    setManualCollapse(true);
  };

  const menuItems = [
    {
      label: "Thư viện",
      key: "/library",
    },
    {
      label: "Thêm mục",
      key: "/add-item",
    },
    {
      label: "Thêm Bộ sưu tập",
      key: "/add-collection",
    },
    {
      label: "Xuất bản",
      key: "/publish",
    },
    {
      label: "Bảng điều khiển",
      key: "/dashboard",
    },
    {
      label: "Cài đặt",
      key: "/settings",
    },
    {
      label: "Hỗ trợ",
      key: "/Support",
    },
    
  ];

  return (
    <>

      <Sider
        className="Sidebar-form"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="md"          // < 768px coi là “broken”
        collapsedWidth={60}      // khi collapse sẽ còn 60px
        onBreakpoint={(broken) => {
          // Thu nhỏ khi vào mobile, tự mở lại khi quay về desktop
          setCollapsed(broken);
        }}
        trigger={null}
        width={250}
        style={{
          backgroundColor: "white",
          border: "1px solid darkgray",
          overflow: "hidden",
        }}
      >
        <Menu
          key={ "light"}
          mode="inline"
          className="custom-menu"
          onClick={(item) => {
            navigate(item.key);
          }}
          selectedKeys={[selectedKey]}
          style={{
            height: "100%", // cho menu full chiều cao sider
            overflowY: "auto", // để menu scroll độc lập
            paddingBottom: "60px", // <<< chừa chỗ cho nút dưới
          }}
          items={
            menuItems
          }
        />

        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            paddingLeft: "3px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            zIndex: 1000,
            boxSizing: "border-box",
          }}
        >
          <Tooltip title="Đóng/mở rộng thanh bên" placement="right">
            <Button
              key={"light"}
              wave="false"
              size="large"
              type="primary"
              onClick={toggleCollapsed}
              style={{
                position: "absolute",
                width: "60px",
                height: "40px",
                backgroundColor: "gray",
                border: "none",
                color: "white",
                boxShadow: "none",
              }}
            > 
            dong
              {collapsed }
            </Button>
          </Tooltip>
        </div>
      </Sider>
    </>
  );
}

export default SideBar; 