import React from 'react';

export default class SearchField extends React.Component {
    state = {
        prevSearch: ''
    }

    handleKeyUp = (evt) => {
        if (this.props.onSearch && !evt.repeat){
            const currentValue = evt.target.value;
            const prevSearchedValue = this.state.prevSearch;
            if (currentValue !== prevSearchedValue)
            {
                this.props.onSearch(currentValue);
                this.setState({ prevSearch: currentValue });
            }
        }
    }

    render(){
        return <input type="search" ref={ this.props.inputRef } autoFocus placeholder={ this.props.placeholder } onKeyUp={ this.handleKeyUp } />
    }
}