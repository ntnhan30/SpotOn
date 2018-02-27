class ColorChart {
    getColor = num => {
        let colorToReturn = '';
        switch(num) {
            case 0:
                colorToReturn = '#232aa8'
                break;
            case 1:
                colorToReturn = '#414bff'
                break;
            case 2:
                colorToReturn = '#5697ff'
                break;
            case 3:
                colorToReturn = '#6ae3ff'
                break;
            case 4:
                colorToReturn = '#6752ff'
                break;
            case 5:
                colorToReturn = '#8c5aff'
                break;
            case 6:
                colorToReturn = '#b850d6'
                break;
            case 7:
                colorToReturn = '#c32d83'
                break;
            case 8:
                colorToReturn = '#e60a3b'
                break;
            case 9:
                colorToReturn = '#bf0a1b'
                break;
            default:
        }
        return colorToReturn;
    }

    getNormColor = num => {
        let colorToReturn = '';
        switch(num) {
            case 0:
                colorToReturn = '#bd4f1e'
                break;
            case 1:
                colorToReturn = '#d26c24'
                break;
            case 2:
                colorToReturn = '#e68829'
                break;
            default:
        }
        return colorToReturn;
    }
}

export default ColorChart;
