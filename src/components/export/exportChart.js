import React, { Component } from 'react'
import domtoimage from 'dom-to-image'
import FileSaver from 'file-saver'

class ExportChart extends Component {
	handleClick = () => {
		var node = document.getElementsByClassName(
			'react-tabs__tab-panel--selected'
		)[0]

		domtoimage
			.toBlob(node, { quality: 1, bgcolor: '#21233b' })
			.then(function(blob) {
				FileSaver.saveAs(blob, 'my-SpotOn-chart.jpg')
			})
	}

	render() {
		return (
			<button className="btn download" onClick={this.handleClick}>
				<span className="icon-image" />
				Download as Image
			</button>
		)
	}
}

export default ExportChart
