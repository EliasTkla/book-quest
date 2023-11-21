import React, { Component } from 'react';
import ContentLoader from "react-content-loader";
import './Styles/placeholder.css';

export default class Placeholder extends Component {
    render() {
        return (
            <span>
                <ContentLoader width={0} height={0} speed={3} primarycolor="#faebd7" secondarycolor="#faebd7" className='placeholder'>
                    <rect x="0" y="0" width="475" height="350" />
                </ContentLoader>
            </span>
        )
    }
}