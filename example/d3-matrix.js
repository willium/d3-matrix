(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-scale'), require('d3-array')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-scale', 'd3-array'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3Scale,global.d3Array));
}(this, function (exports,d3Scale,d3Array) { 'use strict';

  function matrix(data) {
    var matrix  = {},
        size    = [],
        padding,
        cell,
        rows,
        columns,
        sortRows,
        sortColumns;

    matrix.data = function(_data) {
      if (!arguments.length) return data;
      data = _data;
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
      rows = matrix.x.domain(data.map(_rows));
      return matrix;
    }

    matrix.columns = function(_columns) {
      if (!arguments.length) return columns;
      columns = matrix.y.domain(data.map(_columns));
      return matrix;
    }

    matrix.sortRows = function(_sortfn) {
      if (!arguments.length) return sortRows;
      sortRows = _sortfn;
      return matrix;
    }

    matrix.sortColumns = function(_sortfn) {
      if (!arguments.length) return sortColumns;
      sortColumns = _sortfn;
      return matrix;
    }

    function dimensions(o) {
      return (Array.isArray(o)) ? o : [o, o];
    }

    return matrix;
  }

  exports.matrix = matrix;

  Object.defineProperty(exports, '__esModule', { value: true });

}));