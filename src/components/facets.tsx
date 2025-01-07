import React, { useEffect, useState } from "react";
import {FreeTextFacet, SliderFacet, FacetsParams, ListFacet, useListFacet} from '@knaw-huc/browser-base-react';
import { fetchConceptName } from '../utils';

export default function Facets({registerFacet, unregisterFacet, setFacet, searchValues}: FacetsParams) {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

    return <>
        {/*TODO: move this to right panel*/}
        <FreeTextFacet registerFacet={registerFacet} unregisterFacet={unregisterFacet} setFacet={setFacet}/>
        <ListFacet registerFacet={registerFacet}
                   unregisterFacet={unregisterFacet}
                   setFacet={setFacet}
                   name="Research activities"
                   field="properties.researchActivities"
                   url={`${backendUrl}/facet`}
                   flex={false}
                   usePost={true}
                   // searchValues={searchValues.map(value => ({ ...value, name: conceptNames[value.url] || value.url }))} />
        searchValues={searchValues}/>
        <ListFacet registerFacet={registerFacet}
                   unregisterFacet={unregisterFacet}
                   setFacet={setFacet}
                   name="Research domains"
                   field="properties.researchDomains"
                   url={`${backendUrl}/facet`}
                   flex={false}
                   usePost={true}
                   addFilter={true}
                   searchValues={searchValues}/>
        <ListFacet registerFacet={registerFacet}
                   unregisterFacet={unregisterFacet}
                   setFacet={setFacet}
                   name="Resource types"
                   field="properties.resourceTypes"
                   url={`${backendUrl}/facet`}
                   flex={false}
                   usePost={true}
                   searchValues={searchValues}/>

        {/*
        <ListFacet parentCallback={sendCandidateHandler}
                   name="Provincie"
                   field="provincie.provincie"
                   url="http://localhost:8000/facet"
                   flex={true}
        />
        <FilteredListFacet parentCallback={sendCandidateHandler}
                           name="Landelijke bond"
                           field="landelijk.naam"
                           url="http://localhost:8000/filter-facet"/>
        <FilteredListFacet parentCallback={sendCandidateHandler}
                           name="Regionale bond"
                           field="lokaal.naam"
                           url="http://localhost:8000/filter-facet"/>
        <ListFacet parentCallback={sendCandidateHandler}
                   name="Levensbeschouwing"
                   field="levensbeschouwing"
                   url="http://localhost:8000/facet"
                   flex={false}
        />*/}
    </>;
}
