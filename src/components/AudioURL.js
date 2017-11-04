import React from 'react';

export default class AudioURL extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        // this.props.onChange(e.target.value);
    }
    handleSubmit(e) {
        // alert('A name was submitted: ' + this.state.value);
        e.preventDefault();
        this.props.onSubmit(this.state.value);
    }
    render() {
        return (
            <div className="audioURL">
                <h2 className="audioURL-title tc">Submit a <a href="https://soundcloud.com" target="_blank">soundcloud</a> URL</h2>
                <form className="audioURL-main center w-50-ns" onSubmit={this.handleSubmit} >
                    <input id="audioURL-input" className="audioURL-input" type="text" placeholder={this.state.value} value={this.state.value} onChange={this.handleChange} />
                    <button id="audioURL-submit" className="audioURL-submit" type="submit">submit</button>
                </form>
            </div>
        );
    }
}
