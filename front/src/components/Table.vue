<template>
	<div class="table">
		<div style="text-align:left; color:#888888">数据更新至{{current}}
			<el-tooltip class="item" effect="dark" content="趋势图与国家卫健委官网发布一致，每日更新" placement="bottom">
				<span style="float:right; color:"><span class="el-icon-warning-outline"></span>数据说明</span>
			</el-tooltip>
		</div>
		
		<el-row :gutter="24" :type="type" :justify="justify">
			<el-col :span="8" >
				<el-card shadow="always">
				<span class="content-title">现有确诊</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #FF6633;">{{tableData.infect}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #FF6633"><span v-if="tableData.infect-yesterday.infect>=0">+</span><span v-else>-</span>{{tableData.infect-yesterday.infect}}</span>
					</span>
				</el-card>
			</el-col>
			<el-col :span="8" >
				<el-card shadow="always" >
				<span class="content-title">现有疑似</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #FFCC00">{{tableData.doubt}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #FFCC00"><span v-if="tableData.infect-yesterday.infect>=0">+</span><span v-else>-</span>{{tableData.infect-yesterday.infect}}</span>
					</span>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="24" style="margin-top: 5px;">
			<el-col :span="8" >
				<el-card shadow="always" >
				<span class="content-title">累计确诊</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #FF0000">{{tableData.sumCount}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #FF0000"><span v-if="tableData.sumCount-yesterday.sumCount>=0">+</span><span v-else>-</span>{{tableData.sumCount-yesterday.sumCount}}</span>
					</span>
				</el-card>
			</el-col>
			<el-col :span="8" >
				<el-card shadow="always" >
				<span class="content-title">累计治愈</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #67C23A">{{tableData.cure}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #67C23A"><span v-if="tableData.cure-yesterday.cure>=0">+</span><span v-else>-</span>{{tableData.cure-yesterday.cure}}</span>
					</span>
				</el-card>
			</el-col>
			<el-col :span="8" >
				<el-card shadow="always" >
				<span class="content-title">累计死亡</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #000000">{{tableData.dead}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #000000"><span v-if="tableData.dead-yesterday.dead>=0">+</span><span v-else>-</span>{{tableData.dead-yesterday.dead}}</span>
					</span>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>

export default {
	data() {
		return {
			tableData: {},
			yesterday: {},
			currentDate: null,
			justify: 'center',
			type: 'flex'
		}
	},
	mounted() {
		this.getTableData()
		this.getYesterday()
	},
	computed: {
		current: function() {
			return new Date('2020-02-02').toLocaleDateString();
		}
	},
	methods: {
		getTableData() {
			this.$ajax.get('/get/all', {
				params: {'date':'2020-02-02'} //数据不全，只能先这样，否则可以调用date函数
			}).then(
				(res)=>{
					var resJson = res.data
					this.tableData = resJson
					var count = 0
					count += this.tableData.infect
					count += this.tableData.cure
					count += this.tableData.dead
					this.tableData.sumCount = count
				}
			)
		},
		getYesterday() {
			this.$ajax.get(('/get/all'), {
				params: {'date': '2020-02-01'}
			}).then(
				(res)=> {
					this.yesterday = res.data
					var count = 0
					count += this.yesterday.infect
					count += this.yesterday.cure
					count += this.yesterday.dead
					this.yesterday.sumCount = count
				}
			)
		}
	}
}
</script>

<style>
.content-title, .content-yesterday{
	font-size: 10px;
}
.content-number{
	font-size: 20px;
}
.card {
	padding: 10px;
}

.table {
    margin: 0 auto;
    width: 800px;
}
</style>