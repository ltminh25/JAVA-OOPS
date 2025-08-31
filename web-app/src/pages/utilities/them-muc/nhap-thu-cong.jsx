import React from "react";
import { Select, Radio, Button, Card } from "antd";
import { useEffect, useState } from "react";
import "./tim-kiem.css";
import ManualEntryItem from "./nhap-thu-cong-muc";
import ManualEntryTag from "./nhap-thu-cong-the";
function ManualEntry() {
    const [activeTab, setActiveTab] = useState("manual-entry-list-item");

    return (
        <>
            <Card className="search-card">
                <div className="search-item">
                    {/* Bộ sưu tập */}
                    <div className="search-collection">
                    <label className="large-label">Chọn bộ sưu tập</label>
                    <Select
                        placeholder="Chọn bộ sưu tập"
                        style={{ width: "100%" }}
                        options={[
                        { value: "collection1", label: "Bộ sưu tập 1" },
                        { value: "collection2", label: "Bộ sưu tập 2" },
                        { value: "collection3", label: "Bộ sưu tập 3" },
                        ]}
                    />
                    </div>

                    {/* Loại mục */}
                    <fieldset className="search-item-fieldset">
                    <label className="large-label">Chọn loại mục</label>
                    <Radio.Group>
                        <Radio value="book">Sách</Radio>
                        <Radio value="article">Bài viết</Radio>
                        <Radio value="video">Video</Radio>
                        <Radio value="audio">Audio</Radio>
                    </Radio.Group>
                    </fieldset>

                    <ul className="manual-entry-list" style={{display:"flex" ,listStyleType: "none", padding: 0 }}>
                        <li>
                            <button onClick={() => setActiveTab("manual-entry-list-item")}>
                                Mục
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveTab("manual-entry-list-tags")}>
                                Thẻ, Ghi chú, Nhóm
                            </button>
                        </li>
                    </ul>

                    <div className="manual-entry-list-content">
                        {activeTab === "manual-entry-list-item" && <ManualEntryItem/>}
                        {activeTab === "manual-entry-list-tags" && <ManualEntryTag/>}
                    </div>
                    
                    <Button type="primary" size="large" block style={{ width: "150px", borderRadius: "8px", padding: "10px", fontSize: "16px", cursor: "pointer", backgroundColor: "#1890ff" }}>
                        Submit
                    </Button>
                    
                </div>
            </Card>
        </>
    );
}
export default ManualEntry;