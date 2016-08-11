import {scaleOrdinal} from "d3-scale";
import {array} from "d3-array";

export default function(data) {
  var matrix  = {},
      size    = [],
      padding,
      cell,
      rows,
      columns;

  matrix.data = function(_data) {
    if (!arguments.length) return data;
    data = _data;
    return matrix;
  }

  matrix.sort = function(_fn) {
    data.sort(_fn);
    return matrix;
  }

  matrix.size = function(_size) {
    if (!arguments.length) return size;
    size = dimensions(_size);
    return matrix;
  }

  matrix.padding = function(_padding) {
    if (!arguments.length) return padding;
    padding = _padding;
    return matrix;
  }

  matrix.cell = function(_cell, _padding) {
    if (!arguments.length) return cell;
    cell = _cell;
    matrix.padding(_padding);
    return matrix;
  }

  matrix.layout = function() {
    var each = cell + padding;
    
    var numRows = (size[0] + padding) / each;
    var numColumns = (size[1] + padding) / each;

    var indiciesWidth = Array.apply(null, {length: numRows}).map(Number.call, Number);
    var indiciesHeight = Array.apply(null, {length: numColumns}).map(Number.call, Number);

    matrix.x = d3.scaleOrdinal(indiciesWidth.map(function(i) { return i * each; }))
    matrix.y = d3.scaleOrdinal(indiciesHeight.map(function(i) { return i * each; }))
    
    return matrix;
  }

  matrix.rows = function(_rows) {
    if (!arguments.length) return rows;
    rows = matrix.y.domain(data.map(_rows));
    return matrix;
  }

  matrix.columns = function(_columns) {
    if (!arguments.length) return columns;
    columns = matrix.x.domain(data.map(_columns));
    return matrix;
  }

  function dimensions(o) {
    return (Array.isArray(o)) ? o : [o, o];
  }

  return matrix;
}