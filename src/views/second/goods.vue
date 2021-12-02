<template>
  <div class="goods">
    <p class="title"><span>首页</span> > 用户管理 > 用户列表</p>
    <div class="content">
      <ul>
        <li>
          <input type="text" v-model="searchs" id="" placeholder="请输入内容" />

          <el-button
            type="primary"
            icon="el-icon-search"
            class="search"
            @click="search"
          ></el-button>
          <button>添加商品</button>
          <!--  @click="shows" -->
        </li>
      </ul>
      <ul>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :row-style="{ height: '39px' }"
          :cell-style="{ padding: '0' }"
        >
          <el-table-column fixed prop="date" type="index" label="#" width="50">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            width="565"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格（元）"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="90"
            height="200px"
          >
          </el-table-column>
          <el-table-column prop="upd_time" label="创建时间" width="170">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="primary"
                size="small"
              >
                <i class="el-icon-edit"></i
              ></el-button>
              <el-button type="danger" size="small" @click="del(scope.row)"
                ><i class="el-icon-delete"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </ul>
    </div>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tatal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import http from "../../http/index";
export default {
  props: {},
  data() {
    return {
      // 商品查找
      searchs: "",
      allshops: [],
      /*商品列表数据 */
      tableData: [],

      // 分页器
      tatal: 0,
      pages: 1,
    };
  },
  methods: {
    //商品查找
    search() {},
    // 获取所有商品
    allpation() {
      http({
        url: "/goods",
        params: {
          query: "",
          pagenum: "1",
          pagesize: this.tatal,
        },
      }).then((res) => {
        this.allshops = res.data.goods;
      });
    },
    // 获取商品列表
    pation() {
      http({
        url: "/goods",
        params: {
          query: "",
          pagenum: this.pages,
          pagesize: "10",
        },
      }).then((res) => {
        console.log(res);
        this.tatal = res.data.total;
        this.tableData = res.data.goods;
        this.allpation(); // 获取所有商品
      });
    },

    //编辑商品
    handleClick() {},
    // 删除商品
    del(data) {
      //   console.log(data);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http({
            url: `/goods/${data.goods_id}`,
            method: "delete",
          }).then((res) => {
            console.log(res);
          });
          this.pation();

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //分页器  方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pages = val;
      this.pation();
      console.log(val);
    },
  },
  components: {},
  created() {
    this.pation();
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.goods {
  height: 100%;
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
    width: 100%;
    // height: 100%;
    background-color: white;
    padding: 20px 20px 0px 20px;
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
        button {
          width: 100px;
          height: 36px;
          background-color: #409eff;
          float: left;
          margin-right: 21px;
          color: white;
          font-size: 13px;
          border-radius: 5px;
        }
      }
    }
  }
  /* 分页器样式 */
  .block {
    //   height: 50px;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
