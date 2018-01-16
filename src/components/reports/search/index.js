import React, { Component } from 'react';

var SearchBar = React.createClass({
    //class SearchBar extends Component {
    /*
    filterList: function(event){
        var updatedList = this.props.ads;
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
    },
    */
    render: function(){
        return (
            <input type="text" className="form-control form-control-lg" placeholder="Search"/>
        );
    }
});

// export default SearchBar
