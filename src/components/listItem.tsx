import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {IResultItem} from '../misc/interfaces';


export default function ListItem({item}: { item: IResultItem }) {
    return (
        <div className="hcResultListDetail">
            <h2><Link to={'/detail/' + item.key}>{item.title}</Link></h2>
        </div>
    );
}
