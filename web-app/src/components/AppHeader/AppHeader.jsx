import {
  Space,
  Image,
  Badge,
  Drawer,
  Tooltip,
  Avatar,
  Dropdown,
  Skeleton,
  message,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notificationicon from "../../assets/notification.png";
import messageicon from "../../assets/message.png";
import avataricon from "../../assets/avatar.png";
import "./AppHeader.css";

function AppHeader() {

    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    const onClose = () => {
        serOpenDrawer(false);
    }

    const menuItems = [
        {
            key: "profile",
            label:"thông tin cá nhân",
            onclick: () => navigate("/thong-tin-ca-nhan")
        },
        {
            key: "settings",
            label:"cài đặt",
            onclick: () => navigate("/cai-dat")
        },
        {
            key: "logout",
            label:"đăng xuất",
            onclick: () => {
                message.success("Đăng xuất thành công");
                navigate("/dang-nhap");
            }
        }
    ]

    return(
        <>
            <div className="AppHeader">
                <Space className="header-icons" size="large">
                    <Tooltip title="Thông báo">
                        <Badge count={6}>
                            <Image
                                width={32}
                                src={notificationicon}
                                preview={false}
                            />
                        </Badge>
                    </Tooltip>
                    <Tooltip title="Tin nhắn">
                        <Badge count={3}>
                            <Image
                                width={32}
                                src={messageicon}
                                preview={false}
                            />
                        </Badge>
                    </Tooltip>
                    <Avatar
                        src={avataricon}
                        size={50}
                        onClick={() => setOpenDrawer(true)}
                    />
                </Space>
            </div>
        </>
    )
}

export default AppHeader;