!function(t,e){"function"==typeof define&&define.amd?define(["d3","handsontable","../common/Widget","../common/HTMLWidget","../common/PropertyExt","../common/Utility","css!handsontable","css!./Table"],e):t.handson_Table=e(t.d3,t.Handsontable,t.common_Widget,t.common_HTMLWidget,t.common_PropertyExt,t.common_Utility)}(this,function(t,e,o,i,n,l){function r(t){n.call(this),this._owner=t}function a(){i.call(this),this._tag="div",this._selectionBag=new l.Selection,this._widgetCache={},this._widgetCache2={}}function s(t,e){this.rowIdx=t,this.colIdx=e}return r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.prototype._class+=" handson_Table.Column",r.prototype.publish("label","","set","Only show column properties of the table",function(){return this._owner?this._owner.columns():[]}),r.prototype.publish("minRange",null,"number","Minimum value of a handsontable",{}),r.prototype.publish("maxRange",null,"number","Maximum value of a handsontable",{}),r.prototype.publish("belowMinRangeColor","#ff0000","html-color","Series Color",{}),r.prototype.publish("aboveMaxRangeColor","#0000ff","html-color","Series Color",{}),r.prototype.publish("rangeColor","#00ff00","html-color","Series Color",{}),a.prototype=Object.create(i.prototype),a.prototype.constructor=a,a.prototype._class+=" handson_Table",a.prototype.Column=r,a.prototype.publish("columnFormatting",[],"propertyArray","Source Columns",null,{autoExpand:r}),a.prototype.publish("editLastRow",!0,"boolean","To make last row editable",null,{tags:["Basic"],optional:!0}),a.prototype.publish("renderHtmlDataCells",!1,"boolean","enable or disable HTML within cells",null,{tags:["Basic"]}),a.prototype.publish("fixedColumn",!1,"boolean","Enable or disable fixed first column",null,{tags:["Basic"]}),a.prototype.publish("multiSelect",!1,"boolean","Multiple Selection",null,{tags:["Basic"]}),a.prototype.publish("minWidgetWidth",100,"number","Minimum width of a child widget",null,{tags:["Basic"],optional:!0}),a.prototype.publish("minWidgetHeight",100,"number","Minimum height of a child widget",null,{tags:["Basic"],optional:!0}),s.prototype.get=function(t){return t._widgetCache[this.rowIdx]||(t._widgetCache[this.rowIdx]={}),t._widgetCache[this.rowIdx][this.colIdx]||(t._widgetCache[this.rowIdx][this.colIdx]={}),t._widgetCache2[this.colIdx]||(t._widgetCache2[this.colIdx]={}),t._widgetCache2[this.colIdx][this.rowIdx]||(t._widgetCache2[this.colIdx][this.rowIdx]=!0),t._widgetCache[this.rowIdx][this.colIdx]},a.prototype.enter=function(t,o){i.prototype.enter.apply(this,arguments),o.style("overflow","hidden");var n=this;this._table=new e(t,{columnSorting:!0,readOnlyCellClassName:"",manualColumnResize:!0,sortIndicator:!0,wordWrap:!1,manualRowResize:!0,formulas:!0,colHeaders:!0,stretchH:"all",currentRowClassName:"currentRow",rowHeights:function(t){return n._table.sortIndex.length&&(t=n._table.sortIndex[t][0]),n.minWidgetHeight_exists()&&n._widgetCache[t]?n.minWidgetHeight():void 0},colWidths:function(t){return n.minWidgetWidth_exists()&&n._widgetCache2[t]?n.minWidgetWidth():void 0},beforeOnCellMouseDown:function(t,e,o){if(!t.shiftKey&&!t.ctrlKey){t.stopImmediatePropagation(),t.preventDefault();var i=this.getDataAtRow(e.row);n.selectionBagClick(i,e.row,t);var l=n._selectionBag.isSelected(n._createSelectionObject(e.row));n.click(n.rowToObj(i),e.col,l),l?n._table.selectCell(e.row,e.col,e.row,e.col,!1,!1):n._table.deselectCell(),n._table.render()}},afterRenderer:function(t,e,o,i,l,r){l instanceof s&&document.body.contains(l.get(n).domNode)&&setTimeout(function(){l.get(n).widget.resize().lazyRender()},0)},cells:function(t,o,i){return{renderer:function(t,o,i,l,r,a,c){if(n.minWidgetWidth_exists()&&n.minWidgetHeight_exists()&&a instanceof s){var d=new s(i,l),h=Math.max(n._table.getColWidth(l)||50,n.minWidgetWidth())-8,u=Math.max(n._table.getRowHeight(i)||16,n.minWidgetHeight());return d.get(n)&&!a.get(n).domNode&&(d.get(n).domNode=document.createElement("DIV"),d.get(n).widget.width(h).height(u).target(d.get(n).domNode)),e.Dom.empty(o),o.appendChild(d.get(n).domNode),d}var m=n.fields()[l],g=n.renderHtmlDataCells()?e.renderers.HtmlRenderer:e.renderers.TextRenderer;switch(m.type()){case"string":a=m.transform(a),g.call(this,t,o,i,l,r,a,c);break;case"number":e.renderers.NumericRenderer.call(this,t,o,i,l,r,a,c);break;case"boolean":e.renderers.CheckboxRenderer.call(this,t,o,i,l,r,a,c);break;default:a=m.transform(a),g.call(this,t,o,i,l,r,a,c)}if(n._selectionBag.isSelected({_id:i})?(o.style.color="white",o.style.background="#f48a00"):(o.style.color=null,o.style.background=null),n.editLastRow()===!0){if(i===n.data().length-1&&(c.readOnly=!1,l===n.columns().indexOf(m.label())&&(c.formulas=!0,a==="sum("+m.label()+")"))){for(var p=0,f=0;f<n.data().length;f++)for(var b=n.data()[f],_=0;_<b.length;_++){var w=parseFloat(b[l]);if("number"==typeof w&&!isNaN(w)){p+=parseFloat(w);break}}o.textContent=p}n.editLastRow()===!1&&(c.readOnly=!0)}else c.readOnly=!0;if(n.columnFormatting().length>0)for(var y=0;y<n.columns().length;y++)void 0!==n.columnFormatting()[y]&&n.columnFormatting()[y].label_exists()&&n.columnFormatting()[y].label()===m.label()&&(n.columnFormatting()[y].minRange_exists()&&a<n.columnFormatting()[y].minRange()?o.style.color=n.columnFormatting()[y].belowMinRangeColor():n.columnFormatting()[y].maxRange_exists()&&a>n.columnFormatting()[y].maxRange()?o.style.color=n.columnFormatting()[y].aboveMaxRangeColor():n.columnFormatting()[y].minRange_exists()&&a>=n.columnFormatting()[y].minRange()&&n.columnFormatting()[y].maxRange_exists()&&a<=n.columnFormatting()[y].maxRange()&&(o.style.color=n.columnFormatting()[y].rangeColor()));return o}}},columns:[],fixedColumnsLeft:1,width:this.width(),height:this.height(),data:[]})},a.prototype.update=function(t,e){i.prototype.update.apply(this,arguments);var n=this,l={};l.colHeaders=n.columns(),l.columns=this.fields().map(function(t){return{sortFunction:function(e){return function(o,i){var n=e?t.parse(o[1]):t.parse(i[1]),l=e?t.parse(i[1]):t.parse(o[1]);return n===l?0:l>n?-1:1}}}}),l.fixedColumnsLeft=this.fixedColumn()?1:0,l.width=this.width(),l.height=this.height(),l.data=this.data().map(function(t,e){return t.map(function(t,i){if(t instanceof o){var l=new s(e,i);return l.get(n).widget!==t&&(delete l.get(n).domNode,l.get(n).widget=t),l}return t})}),this._table.updateSettings(l),this._table.sortingEnabled&&this._table.sort(this._table.sortColumn,this._table.sortOrder)},a.prototype.exit=function(t,e){i.prototype.exit.apply(this,arguments)},a.prototype._createSelectionObject=function(e){return{_id:e,element:function(){return t.select()}}},a.prototype.selection=function(t){return arguments.length?(this._selectionBag.set(t.map(function(t){return this._createSelectionObject(t)},this)),this):this._selectionBag.get().map(function(t){return t._id})},a.prototype.selectionBagClick=function(t,e,o){if(this.multiSelect()&&o.shiftKey&&this._selectionPrevClick){var i=!1,n=[],l=this.data().filter(function(e,o){var l=!1;return(e===t||e===this._selectionPrevClick)&&(i&&(l=!0),i=!i,n.push(o)),i||l},this);this.selection(l)}else if(this.multiSelect())this._selectionBag.click(this._createSelectionObject(t),o),this._selectionPrevClick=t;else{var r=this._createSelectionObject(e);this._selectionBag.click(r,{ctrlKey:this._selectionBag.isSelected(r)}),this._selectionPrevClick=t}},a.prototype.click=function(t,e,i){function n(t,e){return e instanceof o?"Widget with class: "+e.classID():e}console.log("Click:  "+JSON.stringify(t,n)+", "+e+","+i)},a});