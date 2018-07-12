import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
var _ = require( 'lodash' )

/**
 * Creates a reusable <Multiselect/> element
 *
 * @param {Array} props.values			Array of values selected
 */
class MultiselectFormElement extends Component {
	constructor( ...args ) {
		super( ...args )

		this.state = {
			values: []
		}
	}

	static getDerivedStateFromProps ( nextProps, prevState, prevProps ) {
		let { values } = nextProps
		return values !== undefined ? { values } : null
	}

	render () {
		const self = this
		const { values } = this.state
		const { name, data, passData } = this.props

		const options = []

		_.values( data ).forEach( function ( d ) {
			options.push( {
				label: d,
				value: d
			} )
		} )

		const handleSelectChange = values => {
			self.setState( { values } )

			values = _.values(
				values.map( i => {
					return i['label']
				} )
			)

			let result = {}
			result[name] = values
			passData( result )
		}

		return (
			<Select
				closeOnSelect={true}
				disabled={false}
				multi
				onChange={handleSelectChange}
				options={options}
				placeholder={'Select ' + name}
				removeSelected={true}
				value={values}
			/>
		)
	}
}

export default MultiselectFormElement
