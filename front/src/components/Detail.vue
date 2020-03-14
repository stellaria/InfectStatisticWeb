<template>
    <div class="wrapper"><h2 style="text-align: left">{{title}}</h2>
        <div style="text-align:left; color:#888888; margin-bottom: 10px;">数据更新至{{current}}
			<el-tooltip class="item" effect="dark" content="趋势图与国家卫健委官网发布一致，每日更新" placement="bottom">
				<span style="float:right; color:"><span class="el-icon-warning-outline"></span>数据说明</span>
			</el-tooltip>
		</div>
        <el-row :gutter="24">
			<el-col :span="6" >
				<el-card shadow="always">
				<span class="content-title">现有确诊</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #FF6633;">{{tableData[0]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #FF6633"><span v-if="yesterday[0]>=0">+</span><span v-else>-</span>{{yesterday[0]}}</span>
					</span>
				</el-card>
			</el-col>
			<el-col :span="6" >
				<el-card shadow="always" >
				<span class="content-title">累计确诊</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #FF0000">{{tableData[1]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #FF0000"><span v-if="yesterday[1]>=0">+</span><span v-else>-</span>{{yesterday[1]}}</span>
					</span>
				</el-card>
			</el-col>
			<el-col :span="6" >
				<el-card shadow="always" >
				<span class="content-title">累计治愈</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #67C23A">{{tableData[2]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #67C23A"><span v-if="yesterday[2]>=0">+</span><span v-else>-</span>{{yesterday[2]}}</span>
					</span>
				</el-card>
			</el-col>
            <el-col :span="6" >
				<el-card shadow="always" >
				<span class="content-title">累计死亡</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #000000">{{tableData[2]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #000000"><span v-if="yesterday[2]>=0">+</span><span v-else>-</span>{{yesterday[2]}}</span>
					</span>
				</el-card>
			</el-col>
		</el-row>
		<div class="block">
			<el-date-picker
			style="margin-top: 10px; position: absolute; right: 0"
			v-model="date"
			align="right"
			type="date"
			placeholder="选择日期"
			:picker-options="pickerOptions">
			</el-date-picker>
		</div>
		<div 
		v-loading="loading"
		element-loading-text="玩命加载中">
			<div
			:style="{height:'600px',width:'800px',margin:'0 auto'}"
			ref="stats"
			></div>
		</div>
    </div>
</template>

<script>
// import _ from 'lodash'
import echarts from 'echarts';

export default {

    data() {
        return {
			loading: false,
			date: '',
            title: '',
            tableData: [],
            yesterday: [],
			province: {
				name: this.$store.state.title,
				series: [{
                        name: '新增确诊',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '累计确诊',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '累计治愈',
                        type: 'line',
                        data: []
                    },
                    {
                        name: '累计死亡',
                        type: 'line',
                        data: []
					}],
				datelist: []
			},
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > new Date("2020-02-02").getTime() || time.getTime() < new Date('2020-01-18').getTime();
				},
				shortcuts: [{
					text: '今天',
					onClick(picker) {
					picker.$emit('pick', new Date());
					}
				}, {
					text: '昨天',
					onClick(picker) {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24);
					picker.$emit('pick', date);
					}
				}, {
					text: '一周前',
					onClick(picker) {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', date);
					}
				}]
			},
        }
    },
    mounted() {
		this.title = this.$store.state.title
		this.loadData()
    },
    computed: {
		current: function() {
			return new Date('2020-02-02').toLocaleDateString();
		}
	},
	watch: {
		date: function(newDate, oldDate) {
			console.log(newDate, oldDate)
			// this.loading = true
		}
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
					data: this.province.datelist,
					axisLabel: {
						rotate: 45,
						interval: 0,
						color: 'gray'
					}
                },
                yAxis: {
					type: 'value',
					axisLabel: {
						color: 'gray'
					}
                },
				series: this.province.series
            })
        },
		loadData() {
            this.$ajax.get('/find/by/province', {
                params:{
                    provinceName: this.title
                }
            }).then(
                res => {
                    var arr = res.data
					var datelist = []
					for (var i = 0; i < arr.length; i++) {
						datelist.push(arr[i].date.substr(5))
						this.province.series[0].data.push(0)//新增
						this.province.series[1].data.push(arr[i].infect)
						this.province.series[2].data.push(arr[i].cure)
						this.province.series[3].data.push(arr[i].dead)
					}
					this.province.datelist = datelist
					this.tableData.push(0)
					this.tableData.push(arr[arr.length-1].infect)
					this.tableData.push(arr[arr.length-1].cure)
					this.tableData.push(arr[arr.length-1].dead)
					this.statsInit()
                }
            )
        }
	}
}
</script>

<style>
.wrapper {
    width: 800px;
    margin: 0 auto;
}
.block {
	position: relative;
	width: 800px;
	height: 50px;
}
</style>