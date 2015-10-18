import React from 'react'
import Importer from './importer.jsx'
import Table from './table.jsx'
import { get,post,api_delete } from './api.js'

export default React.createClass({
  getInitialState: function() {
    return {
      columns: [],
      data: [],
      importvalues: {}
    };
  },
  componentWillMount: function() {
    get('/histories/columns').then(data => {
      this.setState({columns: data.map(row => row.column_name)});
    });
    this.loadData();
  },
  loadData: function() {
    get('/histories').then(data => {
      this.setState({data: data});
    });
  },
  import: function(values) {
    post('/histories',values).then(() => {
      this.loadData();
    });
  },
  selectRow: function(row) {
    this.setState({importvalues: row});
  },
  deleteRow: function(id) {
    api_delete('/history/'+id).then(() => {
      this.loadData();
    });
  },
  render: function() {
    return <div>
      <h3>this is main</h3>
      <Importer submit={this.import} columns={this.state.columns} values={this.state.importvalues}/>
      <Table deleteRow={this.deleteRow} selectRow={this.selectRow} columns={this.state.columns} data={this.state.data}/>
    </div>
  }
});
