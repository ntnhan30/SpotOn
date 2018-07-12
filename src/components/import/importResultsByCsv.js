import React, { Component } from 'react'
import ReactFileReader from 'react-file-reader' // move to single component later
import { Api, HandleCSV, TabulateAnswers, CountAnswers } from '../constants'
import QuestIcon from '../../Assets/imgs/questionnaire-icon.svg'

class ImportResultsByCSV extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			imported: false
		}

		this.api = new Api()
		this.handleCSV = new HandleCSV()
		this.tabulateAnswers = new TabulateAnswers()
		this.countAnswers = new CountAnswers()
	}

	setStateAsync(state) {
		return new Promise(resolve => {
			this.setState(state, resolve)
		})
	}

	// Returns the csv that the user uploads // move to a single component

	handleFiles = async files => {
		const self = this
		var reader = new FileReader()
		this.setState({
			uploading: true
		})
		reader.onload = async function(e) {
			let results = await self.handleCSV.csvToObject(reader.result)

			self.api.createBulkResults(results)

			// Import to DB the results
			//await self.props.api.createBulkResults(results); -- Import the results
			const KPIs = await self.tabulateAnswers.init(results)
			const extraInfo = self.countAnswers.init(results)
			self.api.updateExtraInfo(extraInfo)

			// Convert the CSV to object and send to API
			self.setStateAsync({
				imported: await self.api.createKPI(KPIs),
				uploading: false
			})
		}
		reader.readAsText(files[0])
	}

	render() {
		const buttonToUpload = () => {
			if (this.state.imported) {
				return (
					<button className="btn" disabled>
						Upload successful
					</button>
				)
			} else {
				if (this.state.uploading) {
					return (
						<button className="btn" disabled>
							Uploading
						</button>
					)
				} else {
					return <button className="btn">Upload Results</button>
				}
			}
		}

		return (
			<div>
				<img src={QuestIcon} alt="Upload Results" />
				<ReactFileReader
					handleFiles={this.handleFiles}
					fileTypes={'.csv'}>
					{buttonToUpload()}
				</ReactFileReader>
				<span>CSV format only</span>
			</div>
		)
	}
}

export default ImportResultsByCSV
