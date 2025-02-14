import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import ReactMarkdown from 'react-markdown';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const skippableFields = ["resourceTypes", "status"];

interface Document {
    id: string;
    intro: string;
    media: {
        slider: string[];
        thumbnail: string;
    };
    properties: {
        access: { link: string; title: string }[];
        community: any[];
        funding: any[];
        generalContact: any[];
        intro: string;
        learn: any[];
        link: string;
        problemContact: any[];
        programmingLanguages: any[];
        provenance: any[];
        researchActivities: any[];
        researchContact: any[];
        resourceHost: { link: string | null; title: string }[];
        resourceTypes: string[];
        sourceCodeLocation: any[];
        standards: any[];
        versions: any[];
    };
    publishedAt: any[];
    tabs: {
        [key: string]: {
            body: string;
        };
    };
    title: string;
}

interface DataItem {
    document: Document;
    operation: string;
}

interface ErrorData {
    error: string;
}

interface DetailPageProps {
    data: DataItem[] | ErrorData;
}

const isErrorData = (data: any): data is ErrorData => {
    return 'error' in data;
};

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function insertSpaceForCamelCase(string: string) {
    return string.replace(/([a-z])([A-Z])/g, '$1 $2');
}

function prepareLabel(key: string) {
    return capitalizeFirstLetter(insertSpaceForCamelCase(key));
}

function renderProperties(properties: any) {
    return Object.keys(properties).map((key) => {
        if (skippableFields.includes(key)) {
            return null;
        }
        const value = properties[key];
        if (Array.isArray(value) && value.length > 0) {
            let content;
            if (key === 'researchActivities' || key === 'researchDomains') {
                content = value.map((item: string, i: number) => {
                    if (item.startsWith('http://') || item.startsWith('https://')) {
                        const anchorText = item.split(/[#/]/).pop();
                        return (
                            <span key={i}>
                                <a href={item} target="_blank" rel="noopener noreferrer">
                                    {anchorText}
                                </a>
                                {i < value.length - 1 ? ', ' : ''}
                            </span>
                        );
                    } else {
                        return (
                            <span key={i}>
                                {item}
                                {i < value.length - 1 ? ', ' : ''}
                            </span>
                        );
                    }
                });
            } else if (typeof value[0] === 'object' && value[0] !== null && 'link' in value[0] && 'title' in value[0]) {
                content = value.map((item: any, i: number) => (
                    <span key={i}>
                        {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                {item.title}
                            </a>
                        ) : (
                            item.title
                        )}
                        {i < value.length - 1 ? ', ' : ''}
                    </span>
                ));
            } else if (typeof value[0] === 'string') {
                content = value.join('\n');
            }

            if (content) {
                return (
                    <li key={key}>
                        <strong>{prepareLabel(key)}:</strong> {content}
                    </li>
                );
            }
        }
        return null;
    }).filter(Boolean);
}

const DetailPage: React.FC<DetailPageProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<string>('overview');

    if (isErrorData(data)) {
        return (
            <div>
                <h1>Error</h1>
                <p>{data.error}</p>
            </div>
        );
    }
    const item = data[0];

    return (
        <>
            <div className="detail-page">
                <div className="left-panel">
                    <div className="dataset-type">
                        <span>{item.document.properties.resourceTypes.join(', ')}</span>
                    </div>
                    <h1>{item.document.title}</h1>
                    <p>{item.document.intro}</p>
                    {item.document.media && item.document.media.slider && item.document.media.slider.length > 0 && (
                        <Carousel infiniteLoop showThumbs={true} showArrows showStatus={true}>
                            {item.document.media.slider.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`Slide ${index}`} />
                                </div>
                            ))}
                        </Carousel>
                    )}
                    <div className="tabs">
                        <ul className="tab-list">
                            {Object.keys(item.document.tabs).slice().reverse().map((tabKey) => (
                                <li
                                    key={tabKey}
                                    className={activeTab === tabKey ? 'active' : ''}
                                    onClick={() => setActiveTab(tabKey)}
                                >
                                    {capitalizeFirstLetter(tabKey)}
                                </li>
                            ))}
                        </ul>
                        <div className="tab-content">
                            <ReactMarkdown>{item.document.tabs[activeTab].body}</ReactMarkdown>
                        </div>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="properties">
                        <a className="goto-button" target="_self" href={item.document.properties.link}>
                            <span className="button-label">Go to resource</span>
                            <svg className="button-icon" fill="currentColor" viewBox="0 0 16 16"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.8996 0V2H12.5996L5.59961 9.00039L6.99961 10.4004L13.9996 3.4V7.1H15.9996V0H8.8996Z"></path>
                                <path d="M12 14H2V4H5V2H0V16H14V11H12V14Z"></path>
                            </svg>
                        </a>
                        <ul>
                            <li>
                                <h3>{item.document.title}</h3>
                                <p>{item.document.properties.intro}</p>
                            </li>
                            {renderProperties(item.document.properties)}
                        </ul>
                    </div>
                </div>
            </div>
            {/*<pre>{JSON.stringify(item, null, 2)}</pre>*/}
        </>
    );
};

export default DetailPage;