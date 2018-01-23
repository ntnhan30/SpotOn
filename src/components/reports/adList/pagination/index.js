import React, { Component } from 'react';

class Pagination extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 1,
            adsPerPage: 20
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let pageNumber = Number(event.target.id);
        this.props.onClick(pageNumber);
        this.setState({
            currentPage: pageNumber
        });
    }


    render() {
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.ads.length / this.state.adsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                key={number}
                className="page-item"
                >
                    <span
                    className="page-link"
                    id={number}
                    onClick={this.handleClick}
                    >
                        {number}
                    </span>
                </li>
            );
        });

        // The return from the AdList Class
        return (
            <nav className="navigation" aria-label="Page navigation example">
                <ul id="page-numbers" className="pagination">
                    {renderPageNumbers}
                </ul>
            </nav>
        );
    }
}

export default Pagination;
