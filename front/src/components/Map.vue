<template>
    <div id="mapChart">
        <el-row :span="24">
            <el-col :span="12"><div class="grid-content bg-purple-light" :class="{active: nowActive}" @click="countNow">现有确诊地图趋势</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light" :class="{active: sumActive}" @click="countSum">累计确诊地图趋势</div></el-col>
        </el-row>
        <div :style="{height:'600px',width:'800px',margin:'0 auto'}" ref="myEchart"></div>
    </div>
</template>

<script>
import echarts from "echarts";
import "../../node_modules/echarts/map/js/china.js";
import _ from "lodash";

export default {
    name: "echarts",
    props: ["userJson"],
    data() {
        return {
            chart: null,
            province: null,
            nowActive: true,
            sumActive: false
        };
    },
    created() {
        this.province = this.getData();
    },
    mounted() {
        this.chinaConfigure();
    },
    beforeDestroy() {
        if (!this.chart) {
        return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    computed: {
        populationMax: function() {
            return _.maxBy(this.province, (o)=>{return o.value}).value
        },
        populationMin: function() {
            return _.minBy(this.province, (o)=>{return o.value}).value
        }
    },
    methods: {
        chinaConfigure() {
            console.log(this.userJson);
            let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
            window.onresize = myChart.resize;
            myChart.setOption({
                // 进行相关配置
                backgroundColor: '#f8f8f8',
                title: {
                    text: '地图趋势',
                    left: 'center'
                },
                tooltip: {
                    formatter(params) {
                        if (params.data != null) {
                            return `
                                地区:${params.data.name}<br>确诊:${params.data.value}
                            `
                        }
                    }
                }, // 鼠标移到图里面的浮动提示框
                dataRange: {
                    show: true,
                    min: this.populationMin,
                    max: this.populationMax,
                    // text: ["High", "Low"],
                    realtime: true,
                    calculable: true,
                    color: ["#000066", "lightgray"]
                },
                geo: {
                // 这个是重点配置区
                    map: "china", // 表示中国地图
                    roam: true,
                    label: {
                        normal: {
                            show: false, // 是否显示对应地名
                            textStyle: {
                                color: "rgba(0,0,0,0.4)"
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: "rgba(0, 0, 0, 0.2)"
                        },
                        emphasis: {
                            areaColor: null,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                },
                series: [
                    {
                        type: "scatter",
                        coordinateSystem: "geo" // 对应上方配置
                    },
                    {
                        type: "map",
                        geoIndex: 0,
                        data: this.getData()
                    }
                ]
            });
            myChart.on('click', (params)=>{
                this.$store.state.title=params.data.name
                this.$router.push('/detail')
            })  
        },
        getData() {
            return [
                {
                    name: "北京",
                    value: 800
                },
                {
                    name: "上海",
                    value: 222
                },
                {
                    name: "黑龙江",
                    value: 333
                },
                {
                    name: "湖北",
                    value: 810
                },
                {
                    name: "四川",
                    value: 453
                }
            ]
        },
        countNow() {
            this.nowActive = true
            this.sumActive = false
        },
        countSum() {
            this.nowActive = false
            this.sumActive = true
        },
        
    }
};
</script>

<style>
#mapChart{
    width: 805px;
    margin: 10px auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
}
.active {
    background: #fff;
}
</style>