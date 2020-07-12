import Vue from "vue";
import VCharts from "v-charts"; 
import VeLine from "v-charts/lib/line.common"; //折线
import veHistogram from "v-charts/lib/histogram.common"; //柱状
import VeRing from 'v-charts/lib/ring.common' // 环形 
// import VePie from 'v-charts/lib/pie.common' // 饼形

Vue.use(VCharts);

[VeLine, veHistogram, VeRing].forEach(comp => {
  Vue.component(comp.name, comp);
});
