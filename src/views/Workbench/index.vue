<script>
import * as echarts from 'echarts'
import { infoAPI, rentInfoAPI } from '@/api/user'
export default {
  data() {
    return {
      infolist: {},
      page: 1,
      pageSize: 10,
      total: 0,
      rowlist: []
    }
  },
  created() {

  },
  mounted() {
    this.getinfo()
    this.initChart()
  },
  methods: {
    async getinfo() {
      const infores = await infoAPI()
      this.infolist = infores.data
      const rentInfores = await rentInfoAPI({ page: this.page, pageSize: this.pageSize })
      console.log(rentInfores)
      this.rowlist = rentInfores.data.row
      this.total = rentInfores.data.total
    },
    // echarts数据
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('income-chart'))
      // 绘制图表
      myChart.setOption({

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月']
          }],
        yAxis: [
          {
            type: 0
          }
        ],
        series: [
          {
            name: '物业费',
            type: 'bar',
            barWidth: 10,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            color: '#3656ff',
            data:
              [3708.34, 3750, 3708.34, 3750, 3750, 3625, 3750, 3708.34, 3750, 3708.34, 3750, 5291.67]
          },
          {
            name: '行车收入',
            type: 'bar',
            barWidth: 10,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            color: '#cde4ff',
            data:
              [560, 0, 1000, 2300, 360, 1050, 360, 560, 600, 1200, 0, 2040]
          }
        ]
      })
    },
    // 分页处理数据
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getinfo()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getinfo()
    }
  }

}
</script>

<template>
  <div class="databoard-container">
    <div class="left">
      <div class="info-wrapper">
        <p class="info-wrapper__title">园区数据</p>
        <div class="pard-data">
          <div class="item">
            <span class="label">年度累计收费（元）</span>
            <span class="value">{{ infolist.annualIncome }}</span>
          </div>
          <div class="item">
            <span class="label">入驻企业总数（个）</span>
            <span class="value">{{ infolist.enterpriseTotal }}</span>
          </div>
          <div class="item">
            <span class="label">月卡车辆总数（辆）</span>
            <span class="value">{{ infolist.monthCardTotal }}</span>
          </div>
          <div class="item">
            <span class="label">一体杆总数（台）</span>
            <span class="value">{{ infolist.chargePoleTotal }}</span>
          </div>
        </div>
      </div>
      <div class="info-wrapper">
        <p class="info-wrapper__title">年度收入统计</p>
        <div id="income-chart" class="chart-container" />
      </div>
      <div class="info-wrapper">
        <p class="info-wrapper__title">临期合同提醒</p>
      </div>
      <div class="contract-list">
        <el-table :data="rowlist" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="enterpriseName" label="企业名称" />
          <el-table-column prop="buildingName" label="租赁楼宇" />
          <el-table-column label="租赁时间">
            <template slot-scope="scope">
              <span>{{ scope.startTime }}</span>至<span>{{ scope.endTime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="操作">
            <template>
              <el-button type="text" size="small">续签</el-button>
              <el-button type="text" size="small">退租</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="rowlist" class="pagebox">
          <el-pagination
            :current-page="page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, prev, pager, next, sizes"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          /></div>
      </div>
    </div>
    <div class="right">
      <div class="info-wrapper">
        <p class="info-wrapper__title">快捷入口</p>
        <div class="fast-enter">
          <div class="item">
            <img src="../../assets/add-enterprise.png" class="img">
            <div class="label">添加企业</div>
          </div>
          <div class="item">
            <img src="../../assets/employee-manage.png" class="img">
            <div class="label">员工管理</div>
          </div>
          <div class="item">
            <img src="../../assets/add-bill.png" class="img">
            <div class="label">添加账单</div>
          </div>
          <div class="item">
            <img src="../../assets/data-screen.png" class="img">
            <div class="label">数据大屏</div>
          </div>
        </div>
      </div>
      <div class="info-wrapper">
        <p class="info-wrapper__title">设备告警派单</p>
        <div class="warn-list">
          <img src="../../assets/empty.svg" alt="" class="icon">
          <el-button
            type="primary"
            round
            style="margin-top: 20px;
            border-radius: 22px!important;
            width: 100%;
            height: 36px;"
          >更多<i class="el-icon-arrow-right el-icon--right" /></el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.databoard-container {
  padding: 0;
  margin: 0;
  background: #f4f6f8;
  display: flex;

  .left {
    flex-basis: 70%;
    margin-right: 20px;
  }

  .right {
    flex-basis: calc(30% - 20px);
  }

  .info-wrapper {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    min-width: 260px;

    .fast-enter {
      display: flex;
      justify-content: space-between;

      .item {
        display: flex;
        text-align: center;
        flex-direction: column;
        cursor: pointer;

        .img {
          width: 44px;
          height: 44px;
          margin-bottom: 9px;
        }

        .label {
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
        }
      }
    }

    .warn-list {
      padding-left: 20px;
      text-align: center;

      .icon {
        width: 160px;
        height: 160px;
      }
    }

    .chart-container {
      width: 100%;
      height: 300px;
    }

    &__title {
      font-size: 14px;
      color: #303035;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .pard-data {
      display: flex;
      justify-content: space-between;

      .item {
        display: flex;
        flex-direction: column;

        .label {
          color: #909399;
          margin-bottom: 12px;
        }

        .value {
          color: #303035;
          font-weight: 500;
          font-size: 24px;
        }
      }
    }
  }
}
.pagebox{
  display: flex;
  justify-content: flex-end;
}
</style>
