//import { useLocation } from "react-router-dom";
import AppRoutes from "../AppRoutes/AppRoutes"
import "./PageContent.css";


function PageContent() {
    //const location = useLocation();
    //const isLoginPage = location.pathname === "/login";

    return (
        // <div className={isLoginPage ? "PageContent no-padding" : "PageContent"} style={{
        //     backgroundColor:  "#ffffff",
        // }}
        <div>
            <AppRoutes />
        </div>
    );
}

export default PageContent