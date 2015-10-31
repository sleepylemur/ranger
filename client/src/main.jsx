import React from 'react';
import Importer from './importer.jsx';
import Table from './table.jsx';
import { get,post,api_delete } from './api.js';

export default React.createClass({
  getInitialState: function() {
    return {
      columns: [],
      data: [],
      importvalues: {},
      filters: {}
    };
  },
  componentWillMount: function() {
    get('/histories/columns').then(data => {
      this.setState({columns: data.map(row => row.column_name)});
    });
    this.loadData();
  },
  loadData: function(filters) {
    let url = '/histories';
    if (filters) {
      url += '?'+Object.keys(filters).map(key =>
        encodeURIComponent(key)+"="+encodeURIComponent(filters[key])
      ).join('&');
    }
    get(url).then(data => {
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
  updateFilters: function(filters) {
    this.loadData(filters);
    this.setState({filters: filters});
  },
  render: function() {
    return <div>
      <h3>ranger</h3>
      <Importer submit={this.import} columns={this.state.columns} values={this.state.importvalues}/>
      <Table filters={this.state.filters} updateFilters={this.updateFilters} deleteRow={this.deleteRow} selectRow={this.selectRow} columns={this.state.columns} data={this.state.data}/>
    </div>;
  }
});
