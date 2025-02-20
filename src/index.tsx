import React from 'react';
import './index.css';
import './App.css';
import ReactDOM from 'react-dom/client';
import {
    App,
    PageHeader,
    Search,
    Detail as BrowserDetail,
    createSearchLoader,
    createDetailLoader,
    searchUtils,
    SearchParams,
} from '@knaw-huc/browser-base-react';
import {createHashRouter, createBrowserRouter, RouteObject, RouterProvider} from 'react-router-dom';
import Facets from "./components/facets";
import ListItem from "./components/listItem";
import {Detail} from "./components/detail";
import {Header} from "./components/pageHeader";

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://service:8000';
const header = <Header/>
const searchLoader = createSearchLoader(searchUtils.getSearchObjectFromParams, `${backendUrl}/browse`, 10);
const title = 'Ineo Browser';
const detailLoader = createDetailLoader(id => `${backendUrl}/detail?rec=${id}`);
const routeObject: RouteObject = {
    path: '/',
    element: <App header={header}/>,
    children: [
        {
            index: true,
            loader: async ({request}) => searchLoader(new URL(request.url).searchParams),
            element: <Search title={title} pageLength={30} withPaging={true}
                             hasIndexPage={false} showSearchHeader={false} updateDocumentTitle={false}
                             searchParams={SearchParams.PARAMS} FacetsComponent={Facets}
                             ResultItemComponent={ListItem}/>
        }, {
            path: '/detail/:id',
            loader: async ({params}) => detailLoader(params.id as string),
            element: <BrowserDetail title={title} updateDocumentTitle={false} DetailComponent={Detail}/>
        }]
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
            <RouterProvider router={createHashRouter([routeObject])}/>
    </React.StrictMode>
);
