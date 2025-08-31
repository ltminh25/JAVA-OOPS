import React from "react";

export default function ManualEntryTag(){

    return(
        <>
            <div style={{display:"grid", gap:"50px"}}>
                <div className="nhap-thu-cong-the">
                    <label htmlFor="" style={{margin:"20px"}}>Thẻ:</label>
                    <input type="text" style={{borderRadius:"5px", border:"1px solid gray"}}/>
                </div>
                <div className="nhap-thu-cong-ghi-chu">
                    <label htmlFor=""style={{margin:"20px"}} >Ghi chú:</label>
                    <input type="text" style={{borderRadius:"5px", border:"1px solid gray"}}/>
                </div>
                <div className="nhap-thu-cong-ghi-chu">
                    <label htmlFor="" style={{margin:"20px"}}>Nhóm:</label>
                    <input type="text" style={{borderRadius:"5px", border:"1px solid gray"}}/>
                </div>
            </div>
            
    
        </> 
    );
}
