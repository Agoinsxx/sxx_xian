<template>
  <div>
    <el-button v-if="addBtn" type="primary" @click="addContentVisible = true">添加{{addContent}}</el-button>
    <el-table :data="contents" style="width:100%">
      <el-table-column show-overflow-tooltip prop="id" label="ID"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="标题"></el-table-column>
      <el-table-column show-overflow-tooltip prop="url" label="URL地址"></el-table-column>
      <el-table-column show-overflow-tooltip prop="image" label="图片地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 表格右边的删除按钮 -->
          <el-button
            size="mini"
            icon="el-icon-delete"
            circle
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加内容对话框 -->
    <el-dialog 
        title="添加内容" 
        :visible.sync="addContentVisible" 
        width="50%" 
        :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width='80px'>
          <el-form-item label='标题'>
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label='URL'>
              <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label='图片地址'>
              <el-input v-model="form.image"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addContentVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHandler">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Content",
  inject: ["reload"],
  data() {
    return {
      contents: [],
      addContentVisible:false,
      form:{},
      addContent:'',
      addBtn:false
    };
  },
  props: {
    contentData: {
      type: Object,
      required: true
    }
  },
  watch: {
    contentData(value, oldValue) {
        if(value.name){
            this.addBtn = true
        }
        this.addContent = value.name;
      this.$api
        .getSelectTbContentAllByCategoryId({
          id: value.pid
        })
        .then(res => {
          if (res.data.status === 200) {
            this.contents = res.data.data;
          } else {
            this.contents = [];
          }
        });
    }
  },
  methods:{
      handleClose(){},
      addHandler(){//添加内容
           this.$api.getInsertTbContent({
              pid:this.contentData.pid,
              name:this.form.name,
              url:this.form.url,
              image:this.form.image
          }).then(res=>{
              if(res.data.status === 200){
                  this.addContentVisible = false
                  this.reload()
              }           
          })
      },
      handleDelete(index,row){//删除按钮
        this.$api.getDeleteContentByIds({
            id:row.id
        }).then(res=>{
            if(res.data.status === 200){
                alert('删除成功')
                this.reload()
            }else{
                alert('删除失败')
            }
        }).catch(error=>{
            alert('删除失败')
        })
      }
  }
};
</script>
<style scoped>
</style>