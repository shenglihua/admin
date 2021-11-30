<template>
  <div class="users">
    <p class="title"><span>首页</span> > 用户管理 > 用户列表</p>
    <div class="content">
      <ul>
        <li>
          <input
            type="text"
            v-model="searchs"
            name=""
            id=""
            placeholder="请输入内容"
          />
          <el-button
            type="primary"
            icon="el-icon-search"
            class="search"
            @click="search"
          ></el-button>
          <button @click="shows">添加用户</button>
        </li>
      </ul>
      <!-- 用户信息 -->
      <ul>
        <el-table :data="tableData" border style="width: 89%">
          <el-table-column prop="1" label="#" width="47" type="index"
            ><!--type="index" 左边显示第几条数据-->
          </el-table-column>
          <el-table-column prop="username" label="姓名" width="170">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="170">
          </el-table-column>
          <el-table-column prop="mobile" label="电话" width="170">
          </el-table-column>
          <el-table-column prop="role_name" label="角色" width="170">
          </el-table-column>
          <el-table-column prop="address" label="状态" width="170">
            <el-switch
              v-model="value1"
              class="swit"
              @change="swi(index)"
            ></el-switch>
            <!--  @chnag="swi" -->
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180"
            class="icon"
            current-row-key="index"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleClick(scope.row)"
                size="small"
              ></el-button>

              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="del(scope.row)"
                size="small"
              ></el-button>
              <!-- <el-button type="text" size="small">
                <i class="el-icon-delete"></i
              ></el-button> -->
              <el-button
                type="warning"
                size="small"
                icon="el-icon-setting"
                @click="pwo(scope.row)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </ul>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[7]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 添加用户界面 -->
      <div class="add" v-show="isshow">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <p class="adduser">
            <span>添加用户</span> <i class="el-icon-close" @click="yin"> </i>
          </p>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 修改用户信息 -->
      <div class="changeinfo" v-show="usershow">
        <el-form
          :model="changes"
          :rules="rulechan"
          ref="changes"
          label-width="100px"
          class="demo-ruleForm"
        >
          <p class="adduser">
            <span>修改用户</span>
            <i class="el-icon-close" @click="changey"> </i>
          </p>
          <el-form-item label="用户名" prop="userns">
            <el-input v-model="changes.userns" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="uemails">
            <el-input v-model="changes.uemails"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="uphone">
            <el-input v-model="changes.uphone"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="ensure('changes')"
              >确定</el-button
            >
            <el-button @click="cancel('changes')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 分配用户权限 -->
      <div class="userpower" v-show="prowshow">
        <div class="bgcolor">
          <p class="adduser">
            <span>分配角色</span>
            <i class="el-icon-close" @click="you1"> </i>
          </p>
          <ul>
            <li>
              <span>当前用户：{{ nowuser }}</span>
            </li>
            <li>
              <span>当前的角色：{{ nowpow }}</span>
            </li>
            <li>
              <span>分配新角色：</span>
              <p>
                <input type="text" placeholder="请选择" v-model="command" />
                <el-dropdown
                  trigger="click"
                  class="posi"
                  @command="handleCommand"
                >
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="-1">超级管理员</el-dropdown-item>
                    <el-dropdown-item command="30">主管</el-dropdown-item>
                    <el-dropdown-item command="40">副主管</el-dropdown-item>
                    <el-dropdown-item command="员工">员工</el-dropdown-item>
                    <el-dropdown-item command="跑龙套">跑龙套</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </p>
            </li>
            <p class="sub">
              <el-button @click="you1">取消</el-button>
              <el-button type="primary" @click="queren">确定</el-button>
            </p>
          </ul>
        </div>
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
      searchs: "",
      value1: false, // switch
      currentPage4: 4,
      //用户列表数据
      tableData: [],
      searcharr: [],

      // 添加用户
      isshow: false,
      ruleForm: {
        username: "",
        pass: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到  20个字符",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到  15个字符",
            trigger: "blur",
          },
        ],
      },
      //修改用户信息
      usershow: false,
      changes: {
        userns: "",
        uemails: "",
        uphone: "",
      },
      rulechan: {
        uemails: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        uphone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      //存储要修改的用户信息
      userinfo: {},
      // 用户权限分配
      prowshow: false,
      command: "",
      nowuser: "",
      nowpow: "",
      pwoinfo: {},
      //分页器 总数
      total: 0,
    };
  },
  methods: {
    //分页器方法
    handleSizeChange(val) {
      // 这个方法是每页显示的条数
      console.log(val);
    },
    handleCurrentChange(val) {
      //   console.log(val);
      http({
        url: "/users",
        params: {
          // query: "",
          pagenum: val,
          pagesize: "7",
        },
      }).then((res) => {
        // console.log(res.data);
        this.tableData = res.data.users;
      });
    },
    //switch 开关
    swi(aa) {
      console.log(aa);
    },
    //添加用户页面
    shows() {
      this.isshow = true;
      this.ruleForm.username = "";
      this.ruleForm.pass = "";
      this.ruleForm.email = "";
      this.ruleForm.mobile = "";
    },
    yin() {
      this.isshow = false;
    },
    // 重置输入内容
    resetForm() {
      (this.ruleForm.username = ""),
        (this.ruleForm.pass = ""),
        (this.ruleForm.email = ""),
        (this.ruleForm.mobile = "");
    },
    // 添加用户
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(formName);
          http({
            url: "/users",
            method: "post",
            data: {
              username: this.ruleForm.username,
              password: this.ruleForm.pass,
              email: this.ruleForm.email,
              mobile: this.ruleForm.mobile,
            },
          }).then((res) => {
            console.log(res);
            this.userlist();
            // this.tableData.push(this.ruleForm);
            this.isshow = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 用户查找
    search() {
      let ress = this.tableData.filter((item) => {
        return item.username == this.searchs;
      });

      http({
        url: `users/${ress[0].id}`,
      }).then((res) => {
        if (this.searcharr.indexOf(res.data) == -1) {
          this.searcharr.push(res.data);
          this.tableData = this.searcharr;
        }
      });
    },
    //用户列表
    userlist() {
      return http({
        url: "/users",
        params: {
          // query: "",
          pagenum: "1",
          pagesize: "7",
        },
      }).then((res) => {
        console.log(res.data);
        this.tableData = res.data.users;
        this.total = res.data.total; // 所用用户总数
        /* if (this.search == "") {
          this.tableData = res.data.users;
          console.log(this.tableData);
        } */
      });
    },

    //用户删除
    del(index) {
      //   console.log(index);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http({
            url: `/users/${index.id}`,
            method: "delete",
          }).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.userlist();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改用户信息
    handleClick(changes) {
      console.log(changes);
      this.changes.userns = changes.username;
      this.userinfo = changes;
      this.usershow = true;
    },
    ensure(changes) {
      this.$refs[changes].validate((valid) => {
        if (valid) {
          http({
            url: `/users/${this.userinfo.id}`,
            method: "put",
            data: {
              email: this.changes.uemails,
              mobile: this.changes.uphone,
            },
          }).then(() => {
            this.usershow = false;
            this.userlist();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changey() {
      this.usershow = false;
    },
    cancel() {
      this.usershow = false;
    },
    // 分配用户权限
    pwo(index) {
      console.log(index);
      this.pwoinfo = index;
      this.prowshow = true;
      this.nowuser = index.username;
      this.nowpow = index.role_name;
    },
    you1() {
      this.prowshow = false;
    },
    handleCommand(command) {
      console.log(command);
      this.command = command;
    },
    queren() {
      if (this.command != "") {
        console.log(this.pwoinfo.id, this.command);
        http({
          url: `/users/${this.pwoinfo.id}/role`,
          method: "put",
          data: {
            rid: this.command,
          },
        }).then((res) => {
          console.log(res);
          this.userlist();
          this.prowshow = false;
        });
      }
    },
  },
  components: {},
  created() {
    this.userlist();
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
          justify-content: space-evenly;
        }
        span {
          display: inline-block;
          width: 40px;
          height: 25px;
          text-align: center;
          line-height: 28px;
          border-radius: 3px;
          margin-left: 10px;
          color: white;
        }

        span:nth-child(1) {
          background-color: #409eff;
        }
        span:nth-child(2) {
          background-color: #f56c6c;
        }
        span:nth-child(3) {
          background-color: #e6a23c;
        }
      }
    }
    .add {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 666;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      .demo-ruleForm {
        width: 600px;
        height: 430px;
        background-color: white;
        padding: 20px 20px 0px 0px;
        .adduser {
          font-size: 18px;
          padding-left: 20px;
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .changeinfo {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 666;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      .demo-ruleForm {
        width: 600px;
        height: 350px;
        background-color: white;
        padding: 20px 20px 0px 0px;
        .adduser {
          font-size: 18px;
          padding-left: 20px;
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .userpower {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 666;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      .bgcolor {
        position: relative;
        width: 600px;
        height: 350px;
        background-color: white;
        padding: 20px;
        .adduser {
          font-size: 18px;
          //   padding-left: 20px;
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
        }
        ul {
          .sub {
            position: absolute;
            bottom: 20px;
            right: 20px;
          }
          li {
            margin-bottom: 20px;
          }
          li:nth-child(3) {
            display: flex;
            align-items: center;
            p {
              border: 1px solid #409eff;
              width: 215px;
              height: 36px;
              border-radius: 3px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0px 10px;
              input {
                padding-left: 10px;
              }
              .list {
                width: 200px;
              }
            }
            .dropdown-menu-3146 {
              width: 200px;
            }
          }
        }
      }
    }
    .block {
      width: 89%;
      text-align: center;
      margin-top: 15px;
    }
  }
}
</style>
