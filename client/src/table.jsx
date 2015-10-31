import React from 'react';

export default React.createClass({
  clickRow: function(row_id) {
    this.props.selectRow(this.props.data[row_id]);
  },
  deleteRow: function(row_id,e) {
    e.stopPropagation();
    this.props.deleteRow(this.props.data[row_id].id);
  },
  filterUpdate: function(col,e) {
    let filters = this.props.filters;
    let val = e.target.value;
    if (val) filters[col] = val;
    else delete filters[col];
    this.props.updateFilters(filters);
  },
  clearFilters: function() {
    this.props.updateFilters({});
  },
  render: function() {
    return <table className="table table-striped">
      <thead>
        <tr>
          {this.props.columns.map(col => {
            if (col !== 'id') return <th>{col}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {this.props.columns.map(col => {
            if (col !== 'id') return <td><input size="7" type="text" onChange={this.filterUpdate.bind(this,col)} value={this.props.filters[col]}></input></td>;
          })}
          <td><button onClick={this.clearFilters}>Clear</button></td>
        </tr>
      {this.props.data.map((row,row_id) =>
        <tr onClick={this.clickRow.bind(this,row_id)}>
          {this.props.columns.map(col => {
            if (col !== 'id') return <td>{row[col]}</td>;
          })}
          <td>
            <button onClick={this.deleteRow.bind(this,row_id)}>Delete</button>
          </td>
        </tr>
      )}
      </tbody>
    </table>;
  }
});
