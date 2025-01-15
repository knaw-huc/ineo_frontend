import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {IResultItem} from '../misc/interfaces';
import {FreeTextFacet} from "@knaw-huc/browser-base-react";


export default function ListItem({item}: { item: IResultItem }) {
    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/detail/' + item.key}>{item.title}</Link></h2>
            <span>{item.intro}</span>
            <div>
                {item.tags && item.tags.length > 0 ? (
                    item.tags.map((tag, index) => (
                        <span key={index} style={{ backgroundColor: 'rgb(197, 242, 229)' }}>{tag}</span>
                    ))
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
}
