<template>
  <div class="order">
    <p class="title"><span>首页</span> > 订单管理 > 订单列表</p>
    <div class="content">
      <ul>
        <li>
          <input type="text" v-model="searchs" id="" placeholder="请输入内容" />
          <el-button
            type="primary"
            icon="el-icon-search"
            class="search"
          ></el-button>
          <!-- @click="search" -->
        </li>
      </ul>
      <ul>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :row-style="{ height: '43px' }"
          :cell-style="{ padding: '0' }"
        >
          <el-table-column fixed prop="date" type="index" label="#" width="50">
          </el-table-column>
          <el-table-column prop="order_number" label="订单编号" width="220">
          </el-table-column>
          <el-table-column prop="order_price" label="订单价格" width="170">
          </el-table-column>
          <el-table-column prop="is_send" label="是否付款" width="170">
            <el-button type="danger" size="small" disabled v-show="false"
              >未付款</el-button
            >
            <el-button type="success" size="small" disabled v-show="true"
              >已付款</el-button
            >
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货" width="160">
          </el-table-column>
          <el-table-column prop="update_time" label="下单时间" width="170">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="handleClick(scope.row)"
              ></el-button>
              <el-button
                type="success"
                size="small"
                icon="el-icon-location"
                @click="handleClick(scope.row)"
              ></el-button>
              <el-button
                type="info"
                size="small"
                icon="el-icon-reading"
                @click="handleClick(scope.row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-set-up"
                size="small"
                @click="handleClick(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </ul>
      <ul>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "../../http/index";
export default {
  props: {},
  data() {
    return {
      // 搜索框
      searchs: "",
      // table 数据
      tableData: [],
    };
  },
  methods: {
    // 表格编辑
    handleClick(row) {
      console.log(row);
    },
    // 获取数据列表
    datalist() {
      http({
        url: "orders",
        params: {
          query: "",
          pagenum: "1",
          pagesize: "10",
        },
      }).then((res) => {
        this.tableData = res.data.goods;
        // console.log(this.tableData);
        // console.log(res);
      });
    },
    //分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  components: {},
  mounted() {
    this.datalist();
  },
};
</script>

<style scoped lang="scss">
.order {
  width: 100%;
  background-color: #eaedf1;
  padding: 0px 23px;
  .title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 12px;
    overflow: hidden;
    span {
      color: #303133;
      font-size: 12px;
      font-weight: 600;
    }
  }
  .content {
    padding: 15px 20px 8px;
    background-color: white;
    ul:nth-child(1) {
      li {
        overflow: hidden;
        input {
          height: 38px;
          width: 288px;
          border: 1px solid #c0c4cc;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          float: left;
          padding-left: 15px;
          margin-bottom: 20px;
        }
        .search {
          width: 55px;
          height: 38px;
          border-radius: 0;
          background-color: #f5f7fa;
          border: none;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          color: #9a98a6;
          border: 1px solid #dcdfe6;
          float: left;
          border-left: none;
        }
      }
    }
    ul:nth-child(3) {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 2px;
    }
  }
}
</style>
