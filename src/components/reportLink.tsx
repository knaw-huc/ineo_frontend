import React from "react";

const user = "report";
const domain = "di.huc.knaw.nl";

export function ReportLink() {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.location.href = `mailto:${user}@${domain}`;
    };

    return (
        <a href="#contact" onClick={handleClick} className="hcReportLink">
            {user}&#64;{domain}
        </a>
    );
}
