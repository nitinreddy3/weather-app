var InfoPanel = React.createClass({

    notify() {
        this
            .props
            .changeHandler(this.refs.searchCrit.value);
    },

    render() {
        var data = this.props.today;
        var currentDate = new Date(data.dt * 1000);
        return (
            <div className="row">
                <div className="col-md-6">
                    <input
                        type="text"
                        id="main-info-search"
                        className="form-control main-info-search"
                        placeholder="The weather in ..."
                        ref="searchCrit"
                        onChange={this.notify}/>
                </div>
                <div className="col-md-6">
                    <div className="main-info-city-name">Location: {this.props.city.name}</div>
                    <div className="main-info-further clearfix">
                        <span>Wind direction: {Math.round(data.wind.deg)}
                            degree</span>
                        <span>Wind speed: {Math.round(data.wind.speed)}
                            m/s</span>
                    </div>
                </div>
            </div>
        );
    }
});

export default InfoPanel;