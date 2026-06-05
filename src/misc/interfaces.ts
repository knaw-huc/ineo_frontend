
export interface IFacetCandidate {
    facet: string,
    field: string,
    candidate: string
}

export interface IResultItem {
    key: string,
    title: string,
    intro: string,
    tags: string[] | [] | null,
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

