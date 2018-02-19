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
                colorToReturn = '#7c83ff'
                break;
            case 3:
                colorToReturn = '#b9bdff'
                break;
            default:
        }
        return colorToReturn;
    }
}

export default ColorChart;
