# Radar

<!--meta

-->

Radar displays continuous data across n-number of categories (rows) and n-number of series (columns).


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Radar } from "@hpcc-js/chart";

      new Radar()
          .target("placeholder")
          .columns(["Category", "Value"])
          .data([
              ["A", 34],
              ["B", 55],
              ["C", 89],
              ["D", 144]
          ])
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_fontFamily_ and _fontSize_ can be used to control the font family and size used for the labels and guidelines.

_pointShape_ and _pointSize_ can be used to control the shape and size of the data points. 

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Radar } from "@hpcc-js/chart";

      new Radar()
          .target("placeholder")
          .columns(["Hour", "Value"])
          .data([
              ["Dec", 134],
              ["Jan", 95],
              ["Feb", 80],
              ["Mar", 65],
              ["Apr", 59],
              ["May", 51],
              ["Jun", 58],
              ["Jul", 72],
              ["Aug", 79],
              ["Sep", 104],
              ["Oct", 134],
              ["Nov", 124]
          ])
          .fontFamily("Verdana")
          .fontSize(14)
          .pointShape("circle")
          .pointSize(3)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_fillOpacity_ can be used to control the opacity of the background color created by each series.

_valueGuideRatios_ can be used to control placement, and count, of the guide lines.

_labelPaddingRatio_ shrinks the chart's visible area between its column labels.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Radar } from "@hpcc-js/chart";

      new Radar()
          .target("placeholder")
          .columns(["Category", "Value 1", "Value 2"])
          .data([
              ["A", 34, 190],
              ["B", 55, 150],
              ["C", 89, 35],
              ["D", 144, 36]
          ])
          .valueGuideRatios([0.5, 1.0])
          .labelPaddingRatio(0.8)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

## API

## Published Properties
```@hpcc-js/chart:Radar
```
