<template>
  <div class="users">
    <p class="title"><span>首页</span> > 用户管理 > 用户列表</p>
    <div class="content">
      <ul>
        <li>
          <input type="text" name="" id="" placeholder="请输入内容" />
          <el-button
            type="primary"
            icon="el-icon-search"
            class="search"
          ></el-button>
          <button>添加用户</button>
        </li>
      </ul>
      <!-- 用户信息 -->
      <ul>
        <el-table :data="tableData" border style="width: 88%">
          <el-table-column fixed prop="date" label="#" width="47">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="170">
          </el-table-column>
          <el-table-column prop="zip" label="邮箱" width="170">
          </el-table-column>
          <el-table-column prop="province" label="电话" width="170">
          </el-table-column>
          <el-table-column prop="city" label="角色" width="170">
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态"
            width="170"
            @cell-click="swi"
          >
            <el-switch v-model="value1" class="swit" @click="swi"></el-switch>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180" class="icon">
            <!--  <i class="el-icon-edit"></i>

            <i class="el-icon-delete"></i>

            <i class="el-icon-setting"></i> -->

            <!--  <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template> -->
          </el-table-column>
        </el-table>
      </ul>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http/index";
export default {
  props: {},
  data() {
    return {
      value1: false, // switch
      //   currentPage1: 5,
      //   currentPage2: 5,
      //   currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          date: "#",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {
    //人员列表方法
    handleClick(row) {
      console.log(row);
    },
    //分页器方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //switch 开关
    swi() {
      console.log(this.value1);
      this.value1 = !this.value1;
    },
  },
  components: {},
  created() {
    http({
      url: "/roles",
      /*  data: {
        username: this.form.name,
        password: this.form.pass,
      }, */
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style scoped lang="scss">
.users {
  height: 100%;
  width: 100%;
  background-color: #eaedf1;
  padding: 0px 23px;
  .title {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 12px;
    span {
      color: #303133;
      font-size: 12px;
      font-weight: 600;
    }
  }
  .content {
    width: 100%;
    height: 100%;
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
          height: 38px;
          background-color: #409eff;
          float: left;
          margin-right: 21px;
          color: white;
          font-size: 13px;
        }
      }
    }
    ul:nth-child(2) {
      margin-top: 15px;
      .cell {
        display: inline-flex;
        justify-content: space-evenly;
        align-items: center;
        icon {
          size: 30px;
        }
        span {
          width: 44px;
          height: 28px;
          background-color: violet;
        }
      }
    }
  }
}
</style>
