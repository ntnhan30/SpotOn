import React, { Component } from 'react'
import { ImportAdsByCSV, ImportResultsByCSV } from '../../components'

class Import extends Component {
	render() {
		return (
			<div className="container">
				<div className="import-main row boxed">
					<div className="col-6">
						<ImportAdsByCSV />
					</div>

					<div className="col-6">
						<ImportResultsByCSV />
					</div>
				</div>
			</div>
		)
	}
}

export default Import
