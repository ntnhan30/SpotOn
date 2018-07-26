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
		reader.onload = async function (e) {
			let results = await self.handleCSV.csvToObject(reader.result)

			// First Save the results in the DB
			self.api.createBulkResults(results)

			// Run the formula to get the tabulated KPIS
			const KPIs = await self.tabulateAnswers.init(results)
			// Coun the the Tone Of Voice and Emotions
			const extraInfo = self.countAnswers.init(results)
			// Save the Extra Info into each spot
			await self.api.updateExtraInfo(extraInfo)

			await self.api.createKPI(KPIs)

			// Convert the CSV to object and send to API
			self.setState({
				imported: true,
				uploading: false
			})
			console.log('updated')
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
