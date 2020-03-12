<template>
	<div class="table">
		<div style="text-align:left; color:#888888">数据更新至{{current}}
			<el-tooltip class="item" effect="dark" content="趋势图与国家卫健委官网发布一致，每日更新" placement="bottom">
				<span style="float:right; color:"><span class="el-icon-warning-outline"></span>数据说明</span>
			</el-tooltip>
		</div>
		
		<el-row :gutter="24">
			<el-col :span="8" >
				<el-card shadow="always">
				<span class="content-title">现有确诊</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #FF6633;">{{tableData[0]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #FF6633"><span v-if="yesterday[0]>=0">+</span><span v-else>-</span>{{yesterday[0]}}</span>
					</span>
				</el-card>
			</el-col>
			<el-col :span="8" >
				<el-card shadow="always" >
				<span class="content-title">现有疑似</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #FFCC00">{{tableData[1]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #FFCC00"><span v-if="yesterday[1]>=0">+</span><span v-else>-</span>{{yesterday[1]}}</span>
					</span>
				</el-card>
			</el-col>
			<el-col :span="8" >
				<el-card shadow="always" >
				<span class="content-title">现有重症</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #006699">{{tableData[2]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #006699"><span v-if="yesterday[2]>=0">+</span><span v-else>-</span>{{yesterday[2]}}</span>
					</span>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="24" style="margin-top: 5px;">
			<el-col :span="8" >
				<el-card shadow="always" >
				<span class="content-title">累计确诊</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #FF0000">{{tableData[3]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #FF0000"><span v-if="yesterday[3]>=0">+</span><span v-else>-</span>{{yesterday[3]}}</span>
					</span>
				</el-card>
			</el-col>
			<el-col :span="8" >
				<el-card shadow="always" >
				<span class="content-title">累计治愈</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #67C23A">{{tableData[4]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #67C23A"><span v-if="yesterday[4]>=0">+</span><span v-else>-</span>{{yesterday[4]}}</span>
					</span>
				</el-card>
			</el-col>
			<el-col :span="8" >
				<el-card shadow="always" >
				<span class="content-title">累计死亡</span> <br>
				<div style="margin-top:5px;"></div>
				<span class="content-number" style="color: #000000">{{tableData[5]}}</span> <br>
				<span class="content-yesterday">昨日
					<span style="color: #000000"><span v-if="yesterday[5]>=0">+</span><span v-else>-</span>{{yesterday[5]}}</span>
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
			tableData: [0,0,0,0,0,0],
			yesterday: [0,0,0,0,0,0],
			currentDate: null
		}
	},
	computed: {
		current: function() {
			return new Date().toLocaleDateString();
		}
	},
	method: {
		
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