import React from 'react';
import { get,post,api_delete } from './api.js';

var colnames = [
  'hero_action',
  'hero_position',
  'hero_spr',
  'villain_actions',
  'villain_positions',
  'villain_sprs',
  'num_villains',
  'flop_texture',
  'flop',
  'flop_range',
  'turn_texture',
  'turn',
  'turn_range',
  'river_texture',
  'river',
  'river_range',
  'hand_category'
];

export default React.createClass({
  getInitialState: function() {
    return {selected: [], choicevals: [], colid: 0};
  },
  loadData: function(selected,colid) {
    get('/history_col?col=' + colnames[colid] +
      '&fixedcols=' + JSON.stringify(selected.map(col=>{
        let r = {};
        r[col.key] = col.val;
        return r;
      }))
    ).then(vals => {
      this.setState({choicevals: vals});
    });
  },
  componentWillMount: function() {
    this.loadData(this.state.selected, this.state.colid);
  },
  addchoice: function() {
    let addtextnode = this.refs.addtext.getDOMNode();
    let addtextvalue = addtextnode.value;
    post('/history_col', {prevcols: this.state.selected, newcol: {key: colnames[this.state.colid], val: addtextvalue}}).then(data => {
      let selected = this.state.selected;
      selected.push({key: colnames[this.state.colid], val: addtextvalue});
      this.setState({selected: selected, colid: this.state.colid+1, choicevals: []});
      addtextnode.value = "";
    });
  },
  handleSelect: function(colid,val) {
    let selected = this.state.selected;
    selected.length = colid;
    if (val !== null) {
      selected.push({key: colnames[colid], val: val});
      colid = colid+1;
    }
    this.loadData(selected,colid);
    this.setState({selected: selected, colid: colid});
  },
  handleKeydown: function(e) {
    if (e.keyCode === 13) {
      this.addchoice();
    }
  },
  render: function() {
    return <div className="container">
      <table className="table">
        {// <thead>
        //   <tr><th>column</th><th>selected value</th></tr>
        // </thead>
      }
        <tbody>
        {this.state.selected.map((col,colid) =>
          <tr className="clickable" onClick={this.handleSelect.bind(this,colid,null)}><td>{col.key}</td><td>{col.val}</td></tr>
        )}
        </tbody>
      </table>
      <h4>{colnames[this.state.colid]}</h4>
      <ul>
        {this.state.choicevals.map(val =>
          <li className='choice' onClick={this.handleSelect.bind(this,this.state.colid,val)}>{val}</li>
        )}
      </ul>
      <input onKeyDown={this.handleKeydown} type="text" ref="addtext"/>
      <button onClick={this.addchoice}>add</button>
    </div>;
  }
});
