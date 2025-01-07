import React from "react";
import {IDetail} from "../misc/interfaces";
import {useNavigate} from 'react-router-dom';

export function Detail({data}: {data: any}) {
    const nav = useNavigate();

    return (
    <>
        <div className="hcContentContainer">
            <div className="hcBasicSideMargin">
                <div className="justify hcMarginBottom1">
                    <h2>{data[0].document.title}</h2>
                    <div className="detailItemTable">
                            <div className="detailItemRow">
                                <div className="detailItemLabel">description:</div>
                                <div className="detailItemValue"><div>{data[0].document.intro}</div></div>
                            </div>
                    </div>
                    <div className="hcClickable" onClick={() => {nav(-1)}}>Terug naar vorige pagina </div>
                </div>
            </div>
        </div>
    </>)
}