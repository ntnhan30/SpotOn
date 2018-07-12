import React, { Component, Fragment } from 'react'
import {
	LoadingSpinner,
	ColorTag,
	ExportCSV,
	CountryNorm,
	WeightedTour,
	AppContext,
	CellCPA
} from '../../components'
import { StickyTable, Row, Cell } from 'react-sticky-table'
import 'react-sticky-table/dist/react-sticky-table.css'
var _ = require( 'lodash' )

class WeightedReport extends Component {
	constructor( props, context ) {
		super( props, context )

		this.state = {
			open: {}
		}
	}

	render () {
		const headerRow = () => {
			const self = this

			let cells = []
			let valuesCell = []
			let sampleSize = []
			_.mapValues( self.props.selectedAds, single => {
				valuesCell.push( single.shortname )
				sampleSize.push( single.sampleSize )
			} )

			cells.push(
				<Cell key={0}>
					<ExportCSV
						ads={self.props.ads}
						toExport={self.props.selectedAds}
						countryNorms={this.props.countryNorms}
					/>
				</Cell>
			)
			// eslint-disable-next-line
			valuesCell.map( ( single, i ) => {
				cells.push(
					<Cell key={i + 1}>
						{single}
						<span className="sampleSize">{sampleSize[i]}</span>
					</Cell>
				)
			} )

			return <Row>{cells}</Row>
		}

		const kpiRow = ( kpi, nameOfClass, title ) => {
			const self = this

			let cells = []
			let valuesCell = []
			let countries = []
			// eslint-disable-next-line
			_.mapValues( self.props.selectedAds, single => {
				let v =
					single['kpis'] == null || isNaN( single['kpis'][kpi] )
						? 0
						: single['kpis'][kpi]
				valuesCell.push( Math.round( v ) )
				countries.push( single.country )
			} )

			cells.push( <Cell key={0}>{title}</Cell> )
			// eslint-disable-next-line
			valuesCell.map( ( single, i ) => {
				cells.push(
					<Cell key={i + 1}>
						{single}
						{displayColorTag( single, [countries[i]], kpi )}
					</Cell>
				)
			} )

			return <Row className={nameOfClass}>{cells}</Row>
		}

		const CPArow = () => {
			const self = this

			let cells = []
			let valuesCell = []
			// eslint-disable-next-line
			_.mapValues( self.props.selectedAds, single => {
				valuesCell.push( <CellCPA cpa={single.CPA_name} /> )
			} )

			cells.push( <Cell key={0}>{'CPA / GRP'}</Cell> )
			// eslint-disable-next-line
			valuesCell.map( ( single, i ) => {
				cells.push( <Cell key={i + 1}>{single}</Cell> )
			} )

			return <Row className={'level2'}>{cells}</Row>
		}

		const displayColorTag = ( single, countryName, kpi ) => {
			if ( this.props.countryNorms[countryName] !== undefined ) {
				return (
					<ColorTag
						difference={
							single - this.props.countryNorms[countryName][kpi]
						}
					/>
				)
			} else {
				return <ColorTag difference={0} />
			}
		}

		const showTour = () => {
			if ( this.props.profile.firstTime ) {
				return (
					<AppContext>
						{context => (
							<WeightedTour finishTour={context.finishTour} />
						)}
					</AppContext>
				)
			} else {
				return null
			}
		}

		const emotions = {
			'Active Positive': [
				'excited',
				'impressed',
				'intrigued'
			],
			'Passive Positive': [
				'entertained',
				'informed',
				'interested',
			],
			'Passive Negative': [
				'indifferent',
				'bored',
				'confused'
			],
			'Active Negative': [
				'offended',
				'annoyed',
				'irritated'
			]
		}

		const toneOfVoice = {
			'Active Positive': [
				'witty',
				'cool',
				'trustworthy',
				'inspiring'
			],
			'Passive Positive': [
				'friendly',
				'youthful',
				'funny',
				'easyGoing'
			],
			'Passive Negative': [
				'boring',
				'generic',
				'silly',
				'formal'
			],
			'Active Negative': [
				'shocking',
				'aggressive',
				'childish',
				'pretentious'
			]
		}

		const kpiRowToggle = ( kpi, nameOfClass, title ) => {
			const self = this
			let { open } = this.state

			let cells = []
			let valuesCell = []
			let countries = []
			// eslint-disable-next-line
			_.mapValues( self.props.selectedAds, single => {
				let v =
					single['kpis'] == null || isNaN( single['kpis'][kpi] )
						? 0
						: single['kpis'][kpi]
				valuesCell.push( Math.round( v ) )
				countries.push( single.country )
			} )

			cells.push(
				<Cell
					key={0}
					onClick={() => {
						open[kpi] = ( open[kpi] === undefined ? true : !open[kpi] );
						self.setState( {
							open
						} )
					}}
					className={'pointer'}
				>
					{title}
					{' [+]'}
				</Cell>
			)
			// eslint-disable-next-line
			valuesCell.map( ( single, i ) => {
				cells.push(
					<Cell key={i + 1}>
						{single}
						{displayColorTag( single, [countries[i]], kpi )}
					</Cell>
				)
			} )

			return <Row className={nameOfClass}>{cells}</Row>
		}

		const detailsRows = ( pa, kpi ) => {
			let cells = {}
			const { open } = this.state

			// for every ad selected
			// eslint-disable-next-line
			_.mapValues( this.props.selectedAds, singleAd => {
				// Sum of all options
				let sumOfAll = _.values( singleAd[kpi] )
				sumOfAll = _.sum( sumOfAll )

				// For each cat of details
				_.mapKeys( pa, ( v, k ) => {
					let sumOfThis = _.sum(
						_.map( v, o => {
							return singleAd[kpi][o];
						} )
					)

					let valueInPerc = Math.round( ( sumOfThis / sumOfAll ) * 100 )

					if ( _.isEmpty( cells[k] ) ) {
						cells[k] = []
					}
					cells[k].push( valueInPerc )
				} );
			} );

			const rowDisplay = ( name, key ) => {
				let c = [];

				c.push( <Cell key={0}>{name}</Cell> )
				// eslint-disable-next-line
				cells[name].map( ( single, i ) => {
					c.push(
						<Cell key={i + 1}>
							{single}%
						</Cell>
					)
				} )
				return <Row className={'level4'} key={key}>{c}</Row>
			}


			let rows = []
			rows.push( rowDisplay( 'Active Positive', 0 ) )
			rows.push( rowDisplay( 'Passive Positive', 1 ) )
			rows.push( rowDisplay( 'Passive Negative', 2 ) )
			rows.push( rowDisplay( 'Active Negative', 3 ) )


			if ( open[kpi] ) {
				return rows
			} else {
				return null
			}
		}


		if ( _.isEmpty( this.props.countryNorms ) ) {
			return <LoadingSpinner />
		} else {
			return (
				<Fragment>
					{showTour()}
					<StickyTable stickyHeaderCount={1} stickyColumnCount={1}>
						{headerRow()}

						{CPArow()}

						{kpiRow( 'total', 'level1', 'SpotOn score' )}

						{kpiRow(
							'brandRelevance',
							'level2',
							'Brand Relevance'
						)}
						{kpiRow(
							'brandRecall',
							'level3',
							'Brand Recall'
						)}
						{kpiRow( 'relevance', 'level3', 'Relevance' )}
						{kpiRow( 'brandFit', 'level3', 'Brand Fit' )}

						{kpiRow(
							'viewerEngagement',
							'level2',
							'Viewer Engagement'
						)}
						{kpiRow( 'adAppeal', 'level3', 'Ad Appeal' )}
						{kpiRow(
							'shareability',
							'level3',
							'Shareability'
						)}
						{kpiRow(
							'callToAction',
							'level3',
							'Call to Action'
						)}

						{kpiRow( 'adMessage', 'level2', 'Ad Message' )}
						{kpiRowToggle(
							'toneOfVoice',
							'level3',
							'Tone of Voice'
						)}
						{detailsRows( toneOfVoice, 'toneOfVoice' )}
						{kpiRowToggle( 'emotion', 'level3', 'Emotion' )}
						{detailsRows( emotions, 'emotion' )}
						{kpiRow( 'uniqueness', 'level3', 'Uniqueness' )}
						{kpiRow( 'messaging', 'level3', 'Messaging' )}
					</StickyTable>
					<CountryNorm countryNorm={this.props.countryNorms} />
				</Fragment>
			)
		}
	}
}

export default WeightedReport
