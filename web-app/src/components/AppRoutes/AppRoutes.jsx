import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "../ProtectedRoute.jsx";

import SearchItem from "../../pages/utilities/them-muc/tim-kiem.jsx";
import AddItem from "../../pages/utilities/them-muc/them-muc.jsx";
import ManualEntry from "../../pages/utilities/them-muc/nhap-thu-cong.jsx";
import CSVImport from "../../pages/utilities/them-muc/nhap-csv.jsx";
import { Divider } from "antd";

function AppRoutes() {
    return (
        
        <Routes>
            <Route index element={<div>Homepage</div>} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/add-item/search" element={<SearchItem />} />
            <Route path="/add-item/manual-entry" element={<ManualEntry />} />
            <Route path="/add-item/csv-import" element={<CSVImport />} />
        </Routes>
    );
}
export default AppRoutes;