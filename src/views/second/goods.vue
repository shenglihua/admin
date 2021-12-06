<template>
  <div class="goods">
    <p class="title"><span>首页</span> > 商品管理 > 商品列表</p>
    <div class="content" v-show="addshow">
      <ul>
        <li>
          <input type="text" v-model="searchs" id="" placeholder="请输入内容" />

          <el-button
            type="primary"
            icon="el-icon-search"
            class="search"
            @click="search"
          ></el-button>
          <button @click="shows">添加商品</button>
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
    <div class="addshop" v-show="!addshow">
      <template>
        <el-alert
          title="添加商品信息"
          type="info"
          center
          :closable="false"
          show-icon
        >
        </el-alert>
      </template>
      <div class="liuc">
        <!--  -->
        <el-steps
          :space="200"
          :active="num - 0"
          finish-status="success"
          class="cheng"
        >
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div class="">
        <el-tabs
          :tab-position="tabPosition"
          @tab-click="show"
          v-model="num"
          :before-leave="beforeTabLeave"
        >
          <el-tab-pane label="基本信息">
            <el-form
              :label-position="labelPosition"
              label-width="50px"
              :model="formLabelAlign"
            >
              <el-form-item label="商品名称" :required="true" tab-click="show">
                <el-input v-model="formLabelAlign.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" :required="true">
                <el-input v-model="formLabelAlign.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" :required="true">
                <el-input v-model="formLabelAlign.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" :required="true">
                <el-input v-model="formLabelAlign.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" :required="true">
                <el-cascader
                  v-model="cat_name"
                  :options="options"
                  @change="handleChange"
                  :props="opads"
                ></el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <p>参数详情</p>
            <p class="detail">
              <el-checkbox
                v-model="checked"
                v-for="item in conts"
                :key="item.iattr_id"
              >
                <span>
                  {{ item.attr_name }}
                </span>
              </el-checkbox>
            </p>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <!-- 商品属性 -->
            <el-form
              :label-position="labelPosition"
              label-width="50px"
              :model="formLabelAlign"
            >
              <el-form-item
                v-for="item in listdata"
                :key="item.attr_id"
                :label="item.attr_name"
                tab-click="show"
              >
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              :headers="headerObj"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <!-- 富文本编辑框 -->
            <quill-editor size="large"></quill-editor>
            <el-button type="primary" @click="submits">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="addform">
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          :required="true"
        >
          <el-input v-model="addform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格"
          :label-width="formLabelWidth"
          :required="true"
        >
          <el-input v-model="addform.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品数量"
          :label-width="formLabelWidth"
          :required="true"
        >
          <el-input v-model="addform.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品重量"
          :label-width="formLabelWidth"
          :required="true"
        >
          <el-input v-model="addform.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" :label-width="formLabelWidth">
          <el-input v-model="addform.introduce" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeshop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "../../http/index";
// import _ from "lodash";
export default {
  props: {},
  data() {
    return {
      // 商品查找
      searchs: "",
      allshops: [],
      searcharr: [],
      //添加商品
      addshow: true,
      tabPosition: "left",
      labelPosition: "top",
      num: "0",
      formLabelAlign: {
        goods_name: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_cat: "",
        goods_introduce: "",
        pics: [],
        attrs: "",
      },

      /*商品列表数据 */
      tableData: [],

      // 分页器
      tatal: 0,
      pages: 1,
      // 级联选择器
      options: [],
      opads: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      cat_name: "",
      fenval: "",

      // 商品属性
      listdata: [],
      //图片上传
      fileList: [
        {
          //   name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      // 上传图片出现跨域问题
      headerObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
      // 参数
      checked: true,
      conts: [],
      // 商品编辑
      dialogFormVisible: false,
      iscompile: false,
      formLabelWidth: "120px",
      addform: {
        name: "",
        price: 0,
        num: 0,
        weight: 0,
        introduce: "",
      },
      addid: "",
      fenid: "",
      adds: {},
    };
  },
  methods: {
    show() {
      //   this.num++;
      console.log(this.num);
    },
    //商品查找
    search() {
      let ress = this.allshops.filter((item) => {
        return item.goods_name == this.searchs;
      });
      //   console.log(ress);
      if (this.searchs && ress.length != 0) {
        http({
          url: `goods/${ress[0].goods_id}`,
        })
          .then((res) => {
            // console.log(res);
            this.searcharr = [];
            this.searcharr.push(res.data);
            this.tableData = this.searcharr;
          })
          .catch(() => {
            // console.log(111);
            this.$message({
              message: "没有你要找的用户！",
              type: "warning",
            });
          });
      } else {
        this.$message({
          message: "请输入正确的用户信息！",
          type: "warning",
        });
      }
    },
    // 添加商品
    shows() {
      this.addshow = !this.addshow;
    },
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
        // console.log(res);
        this.tatal = res.data.total;
        this.tableData = res.data.goods;
        this.allpation(); // 获取所有商品
      });
    },

    //商品编辑
    handleClick(val) {
      this.addform.name = val.goods_name;
      this.addform.price = val.goods_price;
      this.addform.num = val.goods_number;
      this.addform.weight = val.goods_weight;
      this.addid = val.goods_id;
      this.dialogFormVisible = true;
      http({
        url: `goods/${val.goods_id}`,
      }).then((res) => {
        this.fenid = res.data.goods_cat;
      });
    },
    // 编辑商品提交
    changeshop() {
      if (
        this.addform.name != "" &&
        this.addform.price != "" &&
        this.addform.num != "" &&
        this.addform.weight != ""
      ) {
        http({
          url: `goods/${this.addid}`,
          method: "put",
          data: {
            goods_name: this.addform.name,
            goods_price: this.addform.price,
            goods_number: this.addform.num,
            goods_weight: this.addform.weight,
            goods_introduce: this.addform.introduce,
            goods_cat: this.fenid, // 这个 id需要用根据id查询商品重获得！
            pics: "",
            attrs: "",
          },
        }).then(() => {
          this.$message({
            type: "success",
            message: "商品信息更新成功!",
          });
          this.pation();
          this.dialogFormVisible = false;
        });
      } else {
        this.$message({
          message: "警告哦，这是一条警告消息",
          type: "warning",
        });
      }
    },
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
    // 级联选择器
    handleChange(val) {
      this.formLabelAlign.goods_cat = val;
      this.fenval = val[2];
      console.log(val);
    },
    //商品分类
    classify() {
      http({
        url: "categories",
      }).then((res) => {
        this.options = res.data;
        // console.log(this.options);
      });
    },
    // 钩子函数
    beforeTabLeave() {
      if (this.formLabelAlign.goods_cat.length != 3) {
        this.$message.error("请选择商品分类！");
        return false;
      } else {
        if (this.num === "0") {
          http({
            url: `categories/${this.fenval}/attributes`,
            params: {
              sel: "many",
            },
          }).then((res) => {
            console.log(res);
            this.conts = res.data;
          });
        }
        if (this.num === "1") {
          http({
            url: `categories/${this.fenval}/attributes`,
            params: { sel: "only" },
          }).then((res) => {
            console.log(res);
            this.listdata = res.data;
          });
        }
      }
    },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 数据提交
    submits() {
      let fen = this.formLabelAlign.goods_cat.toString();
      //   console.log(fen);
      http({
        url: "/goods",
        method: "post",
        data: {
          goods_name: this.formLabelAlign.goods_name,
          goods_cat: fen,
          goods_price: this.formLabelAlign.goods_price,
          goods_number: this.formLabelAlign.goods_number,
          goods_weight: this.formLabelAlign.goods_weight,
          goods_introduce: "",
          pics: "",
          attrs: "",
        },
      }).then(() => {
        this.pation();
        this.num = "6";
        this.$message({
          message: "恭喜你，添加用户成功！",
          type: "success",
          onClose: () => {
            this.addshow = true;
          },
        });
      });
    },
  },
  components: {},
  created() {
    this.pation();
  },
  mounted() {
    this.classify();
  },
};
</script>

<style scoped lang="scss">
.goods {
  //   height: 100%;
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
    /* 分页器样式 */
    .block {
      //   height: 50px;
      text-align: center;
      margin-top: 20px;
    }
  }
  .addshop {
    width: 100%;
    // height: 100%;
    background-color: white;
    padding: 20px;
    .liuc {
      margin-top: 20px;
      //   height: 100%;
    }
    /* .contents {
      margin-bottom: 20px;
    } */
    .el-form-item {
      margin-bottom: 0px;
    }
    .detail {
      border: 1px solid #3d9cff;
      padding: 5px;
      margin-top: 10px;
      border-radius: 3px;
    }
  }
  .iscompile {
    width: 100%;
    height: 100%;
    color: red;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .addshow {
      width: 40%;
    }
  }
}
</style>
