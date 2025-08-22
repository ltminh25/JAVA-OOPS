import {Layout, Menu, Button, message, Skeleton, Tooltip} from 'antd';
import { useEffect, useState } from "react";
import "./them-muc.css"
function AddItem() {

    return (
        <>
            <div className="add-item">
                <ul className="add-item-tabs">
                    <li>
                        <a href="/add-item/search">Tìm kiếm</a>
                    </li>
                    <li>
                        <a href="/add-item/manual-entry">Nhập thủ công</a>
                    </li>
                    <li>
                        <a href="/add-item/csv-import">Nhập CSV</a>
                    </li>
                </ul>
            
            </div>
        </>
    );
}

export default AddItem;