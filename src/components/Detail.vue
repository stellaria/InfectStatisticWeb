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
			<Stats :province="province"></Stats>
		</div>
    </div>
</template>

<script>
import Stats from '@/components/Statistic.vue';

export default {

    components: {
        Stats
    },
    data() {
        return {
			loading: false,
			date: '',
            title: '湖北',
            tableData: [0,0,0,0],
            yesterday: [0,0,0,0],
			province: {
				name: "湖北",
				series: [{
                        name: '新增确诊',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '累计确诊',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '累计治愈',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '累计死亡',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    }]
			},
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
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
    },
    computed: {
		current: function() {
			return new Date().toLocaleDateString();
		}
	},
	watch: {
		date: function(newDate) {
			console.log(newDate)
			this.loading = true
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