import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {values: this.props.values || {}};
  },
  change: function(e) {
    let vals = this.state.values;
    vals[e.target.name] = e.target.value;
    this.setState({values: vals});
  },
  componentWillReceiveProps: function(newProps) {
    let vals = {};
    for (let p in newProps.values) {
      if (p !== 'id' && newProps.values[p]) vals[p] = newProps.values[p];
    }
    this.setState({values: vals});
  },
  submitForm: function(e) {
    e.preventDefault();
    this.props.submit(this.state.values);
  },
  render: function() {
    return <form onSubmit={this.submitForm}>
      <div>
        {this.props.columns.map(col => {
          if (col !== 'id') {
            return <input onChange={this.change} key={col} type="text" name={col} placeholder={col} value={this.state.values[col]}></input>;
          }
        })}
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>;
  }
});
