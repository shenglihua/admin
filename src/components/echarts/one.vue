<template>
  <div id="main" style="width: 1000px; height: 400px"></div>
</template>

<script>
import http from "../../http/index";
export default {
  props: {},
  data() {
    return {
      tabs: {},
    };
  },
  methods: {
    req() {
      http({
        url: "reports/type/1",
      }).then((res) => {
        this.tabs = res.data;
        this.table();
      });
    },

    table() {
      const echarts = require("echarts/lib/echarts");
      require("echarts/lib/component/title");
      require("echarts/lib/component/toolbox");
      require("echarts/lib/component/tooltip");
      require("echarts/lib/component/grid");
      require("echarts/lib/component/legend");
      require("echarts/lib/chart/line");

      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
      option = this.tabs;
      /* option = {
        title: {
          text: "Stacked Area Chart",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: [
            "2017-12-27",
            "2017-12-28",
            "2017-12-29",
            "2017-12-30",
            "2017-12-31",
            "2018-1-1",
          ],
          top: "10%",
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      }; */

      option && myChart.setOption(option);
    },
  },
  components: {},
  created() {},
  mounted() {
    this.req();
    // this.table();
  },
};
</script>

<style scoped lang="scss">
</style>
