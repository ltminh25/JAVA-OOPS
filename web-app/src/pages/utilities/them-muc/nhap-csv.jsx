import React, { useRef } from "react";
import { Select, Radio, Button, Card } from "antd";
import { useEffect, useState } from "react";
import "./tim-kiem.css";
function CSVImport() {
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Selected file:", file);
        }
    };
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

                    <button className="upload-button" onClick={handleButtonClick} style={{ width: "150px", border: "1px solid #d9d9d9", borderRadius: "8px", padding: "10px", fontSize: "14px", cursor: "pointer" }}>
                        Tải lên tệp CSV
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }} 
                    />
                </div>
            </Card>
        </>
    );
}
export default CSVImport;