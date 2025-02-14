import React from "react";
import DetailPage from "./detailPage";

export function Detail({data}: { data: any }) {
    return (
        <DetailPage data={data}/>
    );
}