import React from 'react';
import {useNavigate, Link} from "react-router-dom";
import logo from '../assets/img/logo.png';


export function Header() {
    const nav = useNavigate();
    return (
        <div>
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom5">
                <header className="hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo">
                            <img src={logo} className="logo"/>
                        </div>
                    </div>
                    <div className="hcSiteTitle" onClick={() => {nav('/')}}>

                    </div>
                </header>
            </div>
        </div>)
}
