<template>
  <div class="stats-wrapper">
    <div
      :style="{height:'600px',width:'800px',margin:'0 auto'}"
      ref="stats"
    ></div>
  </div>
</template>

<script>
import echarts from 'echarts';
// import store from 'vuex'

export default {
    data() {
        return{
            title: '',
            xAxis: [],
            dataset: {}
        }
    },
    props:['province'],
    mounted() {
        this.title = this.province.name
        this.loadData()
    },
    methods: {
        statsInit() {
            let stats = echarts.init(this.$refs.stats);
            window.onresize = stats.resize;
            stats.setOption({
                title: {
                    text: this.title+'趋势图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['新增确诊', '累计确诊', '累计治愈', '累计死亡']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.province.datelist
                },
                yAxis: {
                    type: 'value'
                },
                series: this.province.series
            })
        },
        loadData() {
            this.statsInit()
        }
    }
}
</script>

<style>
.stats-wrapper {
  width: 800px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
</style>

