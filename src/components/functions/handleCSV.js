/***** ============================
 *
 *  This Class takes the CSV data uploaded by the user and returns an Object
 *
============================ ******/

class HandleCSV {
    csvToObject = csvString => {
        // The array we're going to build
        let csvObj   = [];
        // Break it into rows to start
        let csvRows    = csvString.split(/\n/);
        // Take off the first line to get the headers, then split that into an array
        let csvHeaders = csvRows.shift().concat(';i').replace('\r','').split(';');

        // Loop through remaining rows
        for(let rowIndex = 0; rowIndex < csvRows.length; ++rowIndex){
            let rowArray  = csvRows[rowIndex].split(';');

          // Create a new row object to store our data.
          let rowObject = csvObj[rowIndex] = {};

          // Then iterate through the remaining properties and use the headers as keys
          for(let propIndex = 0; propIndex < rowArray.length; ++propIndex){
            // Grab the value from the row array we're looping through...
            let propValue =   rowArray[propIndex].replace('\r','');
            // ...also grab the relevant header (the RegExp in both of these removes quotes)
            let propLabel = csvHeaders[propIndex];

            rowObject[propLabel] = propValue;
          }
        }
        return csvObj;
    }
}

export default HandleCSV;
