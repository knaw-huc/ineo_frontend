import * as queryString from "querystring";

export interface IFacetCandidate {
    facet: string,
    field: string,
    candidate: string
}

export interface ISendCandidate {
    (data: IFacetCandidate):void
}

export interface IResultItem {
    key: string,
    title: string,
    resourceTypes: IType[],
    researchActivities: IActivity[],
    researchDomains: IDomain[]
}

export interface IActivity {
    activity: string
}

export interface IDomain {
    domain: string
}

export interface IType {
    type: string
}



export interface IDetail {
    field: string,
    value: string,
    label: string;
}


