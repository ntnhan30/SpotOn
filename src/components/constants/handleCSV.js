var _ = require('lodash')

class HandleCSV {
	/**
	 * Turns the CSV string into an Object
	 *
	 * @param {String} csvString              String of the CSV imported
	 * @returns {Array}                       Array of object of the CSV rows
	 */
	csvToObject = csvString => {
		// The array we're going to build
		let csvObj = []
		// Break it into rows to start
		let csvRows = csvString.split(/\n/)
		// Take off the first line to get the headers, then split that into an array
		let csvHeaders = csvRows
			.shift()
			.concat(';i')
			.replace('\r', '')
			.split(';')

		// Loop through remaining rows
		for (let rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
			let rowArray = csvRows[rowIndex].split(';')

			// Create a new row object to store our data.
			let rowObject = (csvObj[rowIndex] = {})

			// Then iterate through the remaining properties and use the headers as keys
			for (let propIndex = 0; propIndex < rowArray.length; ++propIndex) {
				// Grab the value from the row array we're looping through...
				let propValue = rowArray[propIndex].replace('\r', '')
				// ...also grab the relevant header (the RegExp in both of these removes quotes)
				let propLabel = csvHeaders[propIndex]
				if (!isNaN(propValue)) {
					propValue = parseInt(propValue, 10)
				}
				rowObject[propLabel] = propValue
			}
		}
		return csvObj
	}

	exportObjectToCSV = (filename, rows) => {
		let toExport = []

		toExport.push(_.keys(rows['0']))

		for (let key in rows) {
			let byKey = _.values(rows[key])
			toExport.push(byKey)
		}

		rows = toExport

		// ---------------------

		var processRow = row => {
			var finalVal = ''
			for (var j = 0; j < row.length; j++) {
				var innerValue = row[j] === null ? '' : row[j].toString()
				if (row[j] instanceof Date) {
					innerValue = row[j].toLocaleString()
				}
				var result = innerValue.replace(/"/g, '""')
				if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"'
				if (j > 0) finalVal += ','
				finalVal += result
			}
			return finalVal + '\n'
		}

		var csvFile = ''
		for (var i = 0; i < rows.length; i++) {
			csvFile += processRow(rows[i])
		}

		var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' })
		if (navigator.msSaveBlob) {
			// IE 10+
			navigator.msSaveBlob(blob, filename)
		} else {
			var link = document.createElement('a')
			if (link.download !== undefined) {
				// feature detection
				// Browsers that support HTML5 download attribute
				var url = URL.createObjectURL(blob)
				link.setAttribute('href', url)
				link.setAttribute('download', filename)
				link.style.visibility = 'hidden'
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
			}
		}
	}
}

export default HandleCSV
