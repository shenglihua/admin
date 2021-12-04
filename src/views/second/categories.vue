<template>
  <div>
    <el-button type="primary" class="btn" @click="add()"
      >添加分类</el-button
    >
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="cat_id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column  type='index' label="#" width="52"> 
        <template slot-scope="scope">
           {{scope.row.ind}}  
        </template>
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效">
        <template>
          <i class="el-icon-success" style="color: #90ee90"></i>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序">
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.cat_level === 0
                ? 'primary'
                : scope.row.cat_level === 1
                ? 'success'
                : 'warning'
            "
            >{{ replace(scope.row.cat_level) }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span
        >确认删除 <span style="color: red">{{ info.cat_name }}</span> 吗？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="del()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form>
     
        <el-form-item label="分类名称" class="flex">
          <el-input v-model="name" ></el-input>
        </el-form-item> 
          <el-form-item label="父类分类" prop="name">
          <el-cascader 
         :props="{...da,checkStrictly:true,}"
        :options="option" 
        @change="handleChange"
        clearable
        :show-all-levels="false"></el-cascader>
        </el-form-item >
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑分类 -->
       <el-dialog title="编辑分类" :visible.sync="revise">
      <el-form>
        <el-form-item label="分类层级" prop="name">
          <el-select v-model="value" disabled clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item >
        <el-form-item label="分类名称" class="flex">
          <el-input v-model="name" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="revise = false">取 消</el-button>
        <el-button type="primary" @click="sub()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "../../http/index";

export default {
  props: {},
  data() {
    return {
      add_id:'0',
      add_level:'',
      option:[],
      level:"3",
      pagenum:'1',
      pagesize:'5',
      tableData: [],
      index: [],
      info: {},
      dialogVisible: false,
      dialogFormVisible: false,
      revise:false,
      options: [
        {
          value: 0,
          label: "一级",
        },
        {
          value: 1,
          label: "二级",
        },
        {
          value: 2,
          label: "三级",
        },
      ],
      da:{
        value:'cat_id',
        label:'cat_name',
        children:'children',
        id:'cat_level'
      },
      value: "",
      name: "",
      total:null,
    };
  },
  created() {
    this.request();
    
  },
  methods: {


    // 请求
    request() {
      http({
        url: `/categories`,
        params: {
          type: this.level,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.result;
        console.log(res);
        this.index_()  
        this.total=res.data.total
      });
    },
    // index
    index_() {
      this.tableData.forEach((item, i) => {
      item.ind=i+1;
      });
    },

      //添加角色
      add(){
         http({
        url: `/categories`,
        params: {
          type:2,
        },
      }).then((res) => {
        this.option = res.data;
      });
       this.dialogFormVisible = true,
        this.name=''
        this.value=''
      },
      // 添加级联选择器
    handleChange(value) {
   console.log(value.length);
   this.add_id=value.length
   this.add_level=value[value.length-1]
  //  console.log( value[value.length-1]);
      },
      // 确认添加
    submit() {
      http({
        url: "/categories", 
        method: "post",
        data: {
          cat_pid: this.add_level,
          cat_name: this.name,
          cat_level:this.add_id
        },
      }).then((res) => { 
        this.request();
        console.log(res);
      });
      this.dialogFormVisible = false;
    },
    // 替换
    replace(item) {
      if (item == 0) {
        item = "一级";
      } else if (item == 1) {
        item = "二级";
      } else if (item == 2) {
        item = "三级";
      }
      return item;
    },
    // 编辑
    handleEdit(index, row) {
      this.info = row;
      this.revise=true,
      this.value=row.cat_level,
      this.name=row.cat_name
    },
    // 编辑确认
      sub() {
      http({
        url: `categories/${this.info.cat_id}`,
        method: "put",
        data: {
          cat_name: this.name,
        },
      }).then(() => {
        this.request();
      });
      this.revise = false;
    },
    // 删除
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.info = row;
      // console.log(index, row);
    },
    //确认删除
    del() {
      http({
        url: `categories/${this.info.cat_id}`,
        method: "delete",
      }).then(() => {
        this.request();

      });
      this.dialogVisible = false;
    },
    // 分页器
    handleSizeChange(val) {
      this.pagesize=val
      this.request()
    },
    handleCurrentChange(val) {
      this.pagenum=val
      this.request()
    },
  },

  components: {},
};
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  margin-bottom: 15px;
}
.el-table ::v-deep {
  .el-icon-arrow-right:before {
    // 未展开
    content: "\e7a0";
    font-size: 18px;
  }
  &.el-table__expand-icon--expanded {
    transform: none;
    .el-icon-arrow-right:before {
      // 未展开
      content: "\e7a2";
      font-size: 18px;
    }
  }
}

.flex ::v-deep{
 .el-form-item__content{
  display: flex;
}
}
</style>

