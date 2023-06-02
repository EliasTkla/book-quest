import React, { Component } from 'react';
import ContentLoader from "react-content-loader";
import './Styles/BookCard.css'

export default class Placeholder extends Component{
    render () {
        return (
            <div>
                <ContentLoader height={375} width={200} speed={2} primarycolor="#f3f3f3" secondarycolor="#ecebeb" style={{ display: "block", float: "left", margin: "15px"}}>
                    <rect x="0" y="0" width="200" height="280" />
                    <rect x="0" y="300" width="200" height="025" />
                </ContentLoader>
            </div>
        )
    }
}