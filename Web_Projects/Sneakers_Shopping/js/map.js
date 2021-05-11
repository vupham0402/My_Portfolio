var map;
require([
	"esri/map", 
	"esri/geometry/Point",
	/*"esri/symbols/PictureMarkerSymbol",*/
	"esri/symbols/SimpleMarkerSymbol", 
	"esri/graphic", 
	"esri/layers/GraphicsLayer",
	"dojo/domReady!"
	], function(
		Map, Point, SimpleMarkerSymbol, /*PictureMarkerSymbol*/Graphic, GraphicsLayer
		) {
			  map = new Map("map", {
			  basemap: "streets",  //For full list of pre-defined basemaps, navigate to http://arcg.is/1JVo6Wd
			  center: [-120.5534718, 47.0050192], // longitude, latitude
			  zoom: 16
			});
			  map.on("load", function() {
			  var gl = new GraphicsLayer();
			  var p = new Point(-120.5534718, 47.0050192);
			  var s = new SimpleMarkerSymbol().setSize(80);
			  //var s = new PictureMarkerSymbol('/images/location.png', 25, 25);
			  var g = new Graphic(p, s);
			  gl.add(g);
			  map.addLayer(gl);
			});
});