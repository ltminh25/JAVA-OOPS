import {Layout, Menu, Button, message, Skeleton, Tooltip} from 'antd';
import { useEffect, useState } from "react";
import "./them-muc.css"
import SearchItem from './tim-kiem';
import ManualEntry from './nhap-thu-cong';
import CSVImport from './nhap-csv';
function AddItem() {
    const  [activeTab, setActiveTab] = useState("search");


    return (
        <>
            <div className="add-item">
                <h1>Add Item</h1>
                <ul className="add-item-tabs">
                    <li>
                        <button onClick={() => setActiveTab("search")}>
                            Tìm kiếm
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveTab("manual-entry")}>
                            Nhập thủ công
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveTab("csv-import")}>
                            Nhập từ CSV
                        </button>
                    </li>
                </ul>
            
            </div>

            <div className="add-item-content">
                {activeTab === "search" && <SearchItem activeTab={activeTab}/>}
                {activeTab === "manual-entry" && <ManualEntry /> }
                {activeTab === "csv-import" && <CSVImport />}
            </div>
        </>
    );
}

export default AddItem;