<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type='index' label="#" width="50"> </el-table-column>
      <el-table-column prop="authName" label="权限名称" > </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="level" label="权限等级"
     > 
       <template slot-scope="scope">
        <el-tag
           :type="scope.row.level === '一级' ? 'primary' : (scope.row.level==='二级'?'success':'warning')"
         >{{scope.row.level}}</el-tag>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "../../http/index";

export default {
  created() {
    http({
      url: "rights/list",
    }).then((res) => {
        this.tableData=res.data;
        // console.log(res.data);
  return this.tableData.forEach((item)=>{
        if(item.level==0){
            item.level="一级"
        }else if(item.level==1){
            item.level="二级"
             
        }else if(item.level==2){
            item.level="三级"
        }
       })
    });
  },
  props: {},
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
      
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>
