class ColorChart {
    getColor = num => {
        let colorToReturn = '';
        switch(num) {
            case 0:
                colorToReturn = '#535c68'
                break;
            case 1:
                colorToReturn = '#8884d8'
                break;
            case 2:
                colorToReturn = '#eb4d4b'
                break;
            case 3:
                colorToReturn = '#6ab04c'
                break;
            default:
        }
        return colorToReturn;
    }
}

export default ColorChart;
