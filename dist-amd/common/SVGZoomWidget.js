!function(t,o){"function"==typeof define&&define.amd?define(["d3","../common/SVGWidget","../common/Icon","css!./SVGZoomWidget"],o):t.common_SVGZoomWidget=o(t.d3,t.common_SVGWidget,t.common_Icon)}(this,function(t,o,e){function n(t){o.call(this)}return n.prototype=Object.create(o.prototype),n.prototype.constructor=n,n.prototype._class+=" common_SVGZoomWidget",n.prototype.publish("zoomToolbar",!0,"boolean","Show Zoom Toolbar"),n.prototype.publish("zoomDuration",250,"number","Transition Duration"),n.prototype.zoomTo=function(t,o,e){t=t||this._zoom.translate(),o=o||this._zoom.scale(),e=void 0===e?this.zoomDuration():0,this._zoomElement.transition().duration(e).call(this._zoom.translate(t).scale(o).event)},n.prototype.zoomToFit=function(t){var o=this._renderElement.node().getBBox();if(o.width&&o.height){var e=o.x+o.width/2,n=o.y+o.height/2,i=o.width,a=o.height,r=this.width(),s=this.height(),h=1/Math.max(i/r,a/s),m=[r/2-h*e,s/2-h*n];this.zoomTo(m,h,t)}},n.prototype.enter=function(e,n){o.prototype.enter.apply(this,arguments),this._zoomElement=n.append("g"),this._zoomGrab=this._zoomElement.append("rect").attr("class","background"),this._zoomG=this._zoomElement.append("g"),this._renderElement=this._zoomG.append("g");var i=this;this._zoom=t.behavior.zoom().scaleExtent([.05,20]).on("zoom",function(){i._zoomG.attr("transform","translate("+t.event.translate+")scale("+t.event.scale+")")}),this._zoomElement.call(this._zoom)},n.prototype.update=function(t,n){o.prototype.update.apply(this,arguments),this._zoomGrab.attr("width",this.width()).attr("height",this.height());var i=this,a=n.selectAll(".toolbar").data(this.zoomToolbar()?["dummy"]:[]),r=24,s=14;a.enter().append("g").attr("class","toolbar").each(function(t){i._buttonToFit=(new e).target(this).faChar("").shape("square").diameter(r).paddingPercent(100*(1-s/r)).on("click",function(){i.zoomToFit()}),i._buttonPlus=(new e).target(this).faChar("").shape("square").diameter(r).paddingPercent(100*(1-s/r)).on("click",function(){i.zoomTo(null,1.2*i._zoom.scale())}),i._buttonMinus=(new e).target(this).faChar("").shape("square").diameter(r).paddingPercent(100*(1-s/r)).on("click",function(){i.zoomTo(null,i._zoom.scale()/1.2)}),i._buttonLast=i._buttonMinus}),this.zoomToolbar()&&(this._buttonToFit.x(this.width()-r/2-4).y(r/2+4).render(),this._buttonPlus.x(this.width()-r/2-4).y(this._buttonToFit.y()+4+r).render(),this._buttonMinus.x(this.width()-r/2-4).y(this._buttonPlus.y()+r).render()),a.exit().each(function(){i._buttonToFit.target(null).render(),delete i._buttonToFit}).remove()},n.prototype.exit=function(t,e){o.prototype.exit.apply(this,arguments)},n});