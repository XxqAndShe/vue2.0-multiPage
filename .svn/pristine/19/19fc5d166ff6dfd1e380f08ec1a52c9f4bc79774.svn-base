<template>
  <div id="app">
    <layout-table :bIconButton="iconArr[0]" :bIconInput="iconArr[1]">
        <div ref="testdiv" slot="header-left-handler">
        </div>
        <div slot="header-right-filters">
        </div>
        <div slot="header-right-handler">
        </div>

        <!-- 表格table -->
        <el-table slot="main" ref="table" :loading="loading" :data="listDate" :highlight-current-row="true" size="small" border
          stripe tooltip-effect="dark" height="100%" :header-cell-style="{'background-color': '#f5f7fa'}"
          style="width: 100%;height: 100%;">
          <el-table-column show-overflow-tooltip prop="name" label="流程名称">
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="stata" label="流程状态">
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="disResult" label="审核结果">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            width="140"
            label="操作"
            fixed="right">
            <template slot-scope="scope">
              <template>
                <el-button v-if="scope.row.result === 'None'" @click.native="setAdopt(scope.row)" type="text" size="mini">通过</el-button>
                <el-button v-if="scope.row.result === 'None'" @click.native="setnotThrough(scope.row)" type="text" size="mini">不通过</el-button>
              </template>
              <el-button type="text" size="mini" @click.native="getDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer">
          <el-pagination background border :page-sizes="[10, 20, 30, 40]" :page-size="listQuery.len" :total="total" :current-page="listQuery.p + 1"
            @size-change="sizeChange" @current-change="onCurrentPage" layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>    
      </layout-table>  
      <!-- 详情 -->
      <el-dialog
        title="详情"
        :visible.sync="dialogVisible"
        width="560px">
        <div class="details">
          <div class="left">
            <div>
              <span>商家名称:</span>
              <span>{{detailsData.name}}</span>
            </div> 
            <div>
              <span>商家类型:</span>
              <span>{{shopType}}</span>
            </div>
            <div>
              <span>行政区划:</span>
              <span>{{detailsData.area}}</span>
            </div>
            <div>
              <span>商家地址:</span>
              <span>{{detailsData.address}}</span>
            </div>
            <div>
              <span>结算渠道:</span>
              <span>未绑定(没有返回信息)</span>
            </div>
            <div>
              <span>结算账户:</span>
              <span>未绑定(没有返回信息)</span>
            </div>
            <div>
              <span>注册时间:</span>
              <span>{{regTime}}</span>
            </div>
            <div>
              <span>法人名称:</span>
              <span>{{commerce.legalMan}}</span>
            </div>
            <div>
              <span>注册地址:</span>
              <span>{{commerce.registAddress}}</span>
            </div>
            <div>
              <span>注册商铺名:</span>
              <span>{{commerce.fullName}}</span>
            </div>
            <div>
              <span>营业执照号:</span>
              <span>{{commerce.licenseNo}}</span>
            </div>
          </div>
          <div class="right">
            <div class="details-map">
              <span>商家位置</span>
              <div>
                <gad-map :latitude="position[0]" :longitude="position[1]"></gad-map>
              </div>
            </div>
            <div class="details-img">
              <span>营业执照</span>
              <div>
                <img :src="baseUrl + commerce.licenseImage" alt="营业执照">
              </div>
            </div>            
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import notice from "../../../utils/notice";
import { getListDate } from "api/order.js";
import { parseTime } from "utils/index.js";

export default {
  data() {
    return {
      iconArr: [false, false], // 更多图标隐藏
      loading: false,
      baseUrl: process.env.BASE_URL,
      listDate: [], // 表格数据
      detailsData: [], // 详情信息
      shopType: "", // 商家类型
      commerce: {}, // 注册相关信息
      position: ["113.025242", "28.136978"], // 经纬度
      regTime: "", // 注册时间
      dialogVisible: false,
      listQuery: {
        p: 0,
        len: 20,
        sort: "-orderTime"
      },
      total: 0,
      filterTime: ""
    };
  },
  created() {
    notice.init();
    this.getDate();
  },
  mounted() {},
  methods: {
    /**
    *@description 获取列表数据及处理 
    */
    getDate() {
      getListDate(this.listQuery, "/workflow/list?").then(data => {
        // var _this = this
        if (data.success) {
          let stata; // 状态
          let disResult; // 结果
          this.listDate = []; // 数据清零
          this.total = data.data.totalElements; // 总页数
          // 添加审核结果
          data.data.content.forEach(item => {
            if (item.result === "None") {
              disResult = "未审核";
            } else if (item.result === "Approval") {
              disResult = "通过";
            } else {
              disResult = "未通过";
            }
            // 添加审核状态
            if (item.status === "Created") {
              stata = "创建";
            } else if (item.stata === "WaitForNextAudit") {
              stata = "等待下一个审核";
            } else {
              stata = "审核完成";
            }
            item.stata = stata;
            item.disResult = disResult;
            this.listDate.push(item);
          });
        }
      });
    },
    /**
    * @description 审核通过
    * @augments 点击行数据
    */
    setAdopt(row) {
      this.$confirm("是否确认通过？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }).catch(() => {});
    },
    /**
    * @description 审核不通过
    * @augments 点击行数据
    */
    setnotThrough(row) {
      this.$confirm("是否确认拒绝通过？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }).catch(() => {});
    },
    /** 详情接口
    * @augments 点击行数据
    */
    getDetail(row) {
      let param = {
        insId: row["insId"]
      };
      getListDate(param, "/workflow/info?").then(data => {
        if (data.success) {
          console.log(data.data);
          this.dialogVisible = true;
          this.detailsData = data.data;
          // 店铺类型
          if (!this.detailsData.type) {
            this.shopType = "";
          } else if (this.detailsData.type === "Factory") {
            this.shopType = "工厂店";
          } else if (this.detailsData.type === "QuickRepair") {
            this.shopType = "快修店";
          } else if (this.detailsData.type === "FourS") {
            this.shopType = "4S店";
          } else {
            this.shopType = "3S店";
          }
          // 注册相关信息
          this.commerce = this.detailsData.commerce;
          // 定位
          if (this.detailsData.position) {
            this.position = this.detailsData.position.split(",");
          }
          // 注册时间
          this.regTime = parseTime(this.detailsData.regTime, "{y}-{m}-{d}");
        } else {
          this.$message.warning("该商户没有相关详情信息");
        }
      });
    },
    //
    /**每页条数
    *@augments 页码
    */
    sizeChange: function(size) {
      this.listQuery.len = size;
      this.getDate();
    },
    // 当前页
    onCurrentPage: function(page) {
      this.listQuery.p = page - 1;
      this.getDate();
    }
  }
};
</script>

<style lang="less">
html,
body,
#app {
  height: 100%;
  .details {
    display: flex;
    .left {
      flex: 0 0 250px;
      div {
        display: flex;
        span:first-child {
          flex: 0, 0, 80px;
          width: 80px;
        }
        span:last-child {
          flex: 0 0 170px;
        }
      }
    }
    .right {
      flex: 0 0 200px;
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      .details-map {
        flex: 1 0 200px;
        div {
          // width: 250px;
          height: 150px;
        }
      }
      .details-img {
        flex: 1 0 200px;
        div {
          width: 250px;
          height: 150px;
          position: relative;
          border: 1px solid #eee;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            max-width: 100%;
            max-height: 100%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
      }
    }
  }
}
</style>
