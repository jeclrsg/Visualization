!function(t,o){"function"==typeof define&&define.amd?define(["d3","d3-tip","../common/Widget","css!./ITooltip"],o):t.api_ITooltip=o(t.d3,t.d3.tip,t.common_Widget)}(this,function(t,o,l,e,i){function r(){if(l.call(this),this._valueFormatter=t.format(this.tooltipValueFormat()),this.layerEnter){var o=this.layerEnter;this.layerEnter=function(t,l,e){this.tooltipEnter(l),o.apply(this,arguments)};var e=this.layerUpdate;this.layerUpdate=function(t){e.apply(this,arguments),this.tooltipUpdate()};var i=this.layerExit;this.layerExit=function(t){i.apply(this,arguments),this.tooltipExit()}}else{var r=this.enter;this.enter=function(t,o){this.tooltipEnter(o),r.apply(this,arguments)};var s=this.update;this.update=function(t,o){s.apply(this,arguments),this.tooltipUpdate()};var p=this.exit;this.exit=function(t,o){p.apply(this,arguments),this.tooltipExit()}}}r.prototype=Object.create(l.prototype),r.prototype.publish("tooltipStyle","default","set","Style",["default","series-table","none"],{}),r.prototype.publish("tooltipFollowMouse",!1,"boolean","If true, the tooltip will follow mouse movement",null,{}),r.prototype.publish("tooltipValueFormat",",.2f","string","Value Format",null,{}),r.prototype.publish("tooltipSeriesColor","#EAFFFF","html-color","Series Color",null,{}),r.prototype.publish("tooltipLabelColor","#CCFFFF","html-color","Label Color",null,{}),r.prototype.publish("tooltipValueColor","white","html-color","Value Color",null,{}),r.prototype.publish("tooltipTick",!0,"boolean","Show tooltip tick",null,{}),r.prototype.publish("tooltipOffset",8,"number","Offset from the cursor",null,{}),r.prototype.tooltipEnter=function(t){var l=this;this.tooltip=o().attr("class","d3-tip").offset(function(t){if(event&&l.tooltipFollowMouse()){var o=document.querySelector(".d3-tip");return o.style.display="block",o.style.left=l.tooltipOffset()+event.clientX+"px",o.style.top=event.clientY+"px",[]}switch(l.tooltip.direction()()){case"e":return[0,l.tooltipOffset()];default:return[-l.tooltipOffset(),0]}}),t.call(this.tooltip)},r.prototype.tooltipUpdate=function(){var t=this.tooltip.attr("class");t=t.split(" notick").join("")+(this.tooltipTick()?"":" notick")+("none"===this.tooltipStyle()?" hidden":""),t=t.split(" ").filter(function(t){return 0!==t.indexOf("ITooltip-tooltipStyle-")}).join(" "),t+=" ITooltip-tooltipStyle-"+this.tooltipStyle(),this.tooltip.attr("class",t)},r.prototype.tooltipExit=function(){this.tooltip&&this.tooltip.destroy()};var s=r.prototype.tooltipValueFormat;return r.prototype.tooltipValueFormat=function(o){var l=s.apply(this,arguments);return arguments.length&&(this._valueFormatter=t.format(o)),l},r.prototype._tooltipHTML=function(t){return t},r.prototype.tooltipHTML=function(t){return this.tooltip.html(t)},r.prototype.tooltipFormat=function(t){switch(t=t||{},t.label=void 0===t.label?"":t.label,t.series=t.series||"",t.value instanceof Date?t.value=t.value||"":t.value=this._valueFormatter(t.value)||"",this.tooltipStyle()){case"none":break;case"series-table":var o='<table class="ITooltip-series-table"><thead><tr><th colspan="2">'+t.label+"</th></tr></thead><tbody>";return t.arr.forEach(function(t){o+="<tr>",o+="<td>",o+='<div class="series-table-row-color" style="background-color:'+t.color+'"></div>',o+='<div class="series-table-row-label">'+t.label+"</div>",o+="</td>",o+='<td><div class="series-table-row-value">'+t.value+"</div></td>",o+="</tr>"}),o+="</tbody>",o+="</table>";default:return t.series?"<span style='color:"+this.tooltipSeriesColor()+"'>"+t.series+"</span> / <span style='color:"+this.tooltipLabelColor()+"'>"+t.label+"</span>:  <span style='color:"+this.tooltipValueColor()+"'>"+t.value+"</span>":"<span style='color:"+this.tooltipLabelColor()+"'>"+t.label+"</span>:  <span style='color:"+this.tooltipValueColor()+"'>"+t.value+"</span>"}},r});