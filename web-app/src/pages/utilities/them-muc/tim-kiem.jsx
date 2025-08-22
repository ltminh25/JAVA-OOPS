import React from "react";
import { Select, Radio, Button, Card } from "antd";
import { useEffect, useState } from "react";
import "./tim-kiem.css";
function SearchItem() {

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

                {/* Tìm kiếm */}
                <div className="search-collection">
                <label className="large-label">Tìm kiếm</label>
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

                {/* Button */}
                <div className="search-button-wrapper">
                <Button type="primary" size="large" block>
                    Tìm kiếm
                </Button>
                </div>
            </div>
            </Card>
        </>
    );
}
export default SearchItem;