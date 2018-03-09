import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner, ColorTag, ExportCSV } from '../../components';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';
import { Auth } from '../../components/auth';
import { FunctionsResults } from '../functions';
import Checkbox from 'rc-checkbox';
var _ = require('lodash');

const auth  = new Auth ();
const functionsResults  = new FunctionsResults ();

class FixedTable extends Component {
    render() {
        console.log(this.props.allResults);
        let trKey = 0;
        let rows = [];


        const displayHeaderTable = () => {
            const self = this;
            trKey++;

            let cells = [];
            let valuesCell = [];
            _.mapValues(self.props.allResults, function (single) {
                valuesCell.push(single.ad.shortname);
            })

            cells.push(<Cell><ExportCSV toExport={self.props.allResults}/></Cell>);
            valuesCell.map( function (single, i) {
                cells.push(<Cell>{single}</Cell>);
            })

            return (
                <Row>
                    { cells }
                </Row>
            );
        }


        const displayAllAdRows = () => {
            const self = this;
            let rows = [];
            this.props.allResults.map( function (ad, i) {
                rows.push(
                    <Row key={i}>
                        <Cell>
                            <Checkbox
                                name = { ad.adname }
                                checked = { ad.selected }
                                onChange = { e => this.handleInputChange(ad, e) }
                            />
                        </Cell>
                        <Cell>{ad.shortname}</Cell>
                        <Cell>{ad.brand}</Cell>
                        <Cell>{ad.campaigndate}</Cell>
                        <Cell>{ad.industry}</Cell>
                        <Cell>{ad.lengthAd}"</Cell>
                        <Cell>{ad.channel}</Cell>
                        <Cell>{ad.state}</Cell>
                        <Cell>
                            <Link to={{ pathname:'/ad/' + ad.adname, query: { ad: ad } }}>
                                <span className="icon-more"></span>
                            </Link>
                        </Cell>
                    </Row>
                );
            })

            console.log ( rows );
        }
        console.log('displayAllAdRows()');
        displayAllAdRows()

            return (
                <StickyTable stickyHeaderCount={1} stickyColumnCount={1}>
                    <Row>
                        <Cell>aaa</Cell>
                        <Cell>bb</Cell>
                    </Row>
                    <Row>
                        <Cell>11</Cell>
                        <Cell>bb</Cell>
                    </Row>
                    <Row>
                        <Cell>a33aa</Cell>
                        <Cell>b4b</Cell>
                    </Row>

                </StickyTable>
            );

    }
}

export default FixedTable;


