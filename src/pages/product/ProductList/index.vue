<template>
  <div class="product-list">
    <div>
      <el-button type="primary" @click="dialogVisible = true">添加商品</el-button>
    </div>
    <!-- 产品列表开始 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" prop="id" label="商品ID"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="title" label="商品标题"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="image" label="商品图片"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="sellPoint" label="商品卖点"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="price" label="商品价格"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="cid" label="商品类目"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="num" label="商品库存"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="barcode" label="条形码"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="status" label="状态"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="created" label="创建日期"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updated" label="更新日期"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 表格右边的编辑按钮 -->
          <el-button
            size="mini"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
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
    <!-- 产品列表结束 -->
    <!-- 分页开始 -->
    <ProductPagition @onSend="getFdata" />
    <!-- 分页结束 -->
    <!-- 点击顶部添加商品按钮---跳出添加框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <!-- 二级对话框 -->
      <el-dialog width="60%" title="商品类目" :visible.sync="innerVisible" append-to-body>
        <!-- 商品类目选择tree -->
        <el-tree
          :data="Treedata"
          :props="defaultProps"
          :load="loadTreeNodes"
          lazy
          highlight-current
          @node-click="handleNodeClick"
        ></el-tree>
        <!-- 商品类目tree最下方的确定按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addParamsHandler">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加商品里面的表单 -->
      <el-form ref="form" :model="product" label-width="80px">
        <el-form-item label="商品类目">
          <!-- 点击跳出二层对话框 -->
          <el-button style="float:left" type="primary" @click="productCategoryHandle">选择类目</el-button>
          <!-- 选择类目按钮后边的选择结果视图 -->
          <span style="float:left;margin-left:10px;">{{ currentCategory && currentCategory.name }}</span>
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input v-model="product.title"></el-input>
        </el-form-item>
        <el-form-item label="商品买点">
          <el-input v-model="product.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="product.price"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="product.num"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-button style="float:left" type="primary" @click="uploadImg = true">上传图片</el-button>
          <!-- 上传图片对话框 -->
          <el-dialog 
          title="上传图片" 
          :visible.sync="uploadImg"
          width="40%" 
          :before-close="handleClose"
          append-to-body
          >
            <ProductUpload @onUpload= 'getUploadHandle' />

            <span slot="footer" class="dialog-footer">
              <el-button @click="uploadImg = false">取 消</el-button>
              <el-button type="primary" @click="uploadImg = false">确 定</el-button>
            </span>
          </el-dialog>
          <span>{{uploadData.name}}</span>
        </el-form-item>
        <el-form-item label="商品描述">
          <!-- 富文本 -->
          <ProductUEditor :productDesc="productDesc" @onProductDesc="getProductDesc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitProduct">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProductPagition from "../ProductPagition";
import ProductUEditor from "../ProductUEditor";
import ProductUpload from "../ProductUpload";
export default {
  data() {
    return {
      tableData: [], //表格中的数据
      dialogVisible: false, //默认添加商品框为关闭状态
      product: {},
      innerVisible: false, //二级对话框---商品选择框
      productDesc: "",
      currentCategory: {}, //类目的最终数据
      uploadImg:false,//上传图片对话框
      uploadData:{},//上传成功的图片名称
      updataFlagId:0,//要被修改的数据的id
      Treedata: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  components: {
    ProductPagition,
    ProductUEditor,
    ProductUpload
  },
  mounted() {
    this.http();
  },
  methods: {
    //1.封装一个获取表格数据方法
    http() {
      this.$api
        .getSelectTbItemAllByPage({
          page: 1
        })
        .then(res => {
          // console.log(res);
          if (res.data.status === 200) {
            this.tableData = res.data.data.result;
          } else {
            alert("数据获取失败");
          }
        });
    },
    //2.分页---将子级里拿到的数据存起来
    getFdata(tableData) {
      this.tableData = tableData;
    },
    /* 3.富文本---获取描述信息---从子级传来的数据 */
    getProductDesc(data) {
      this.productDesc = data;
    },
     //4.点击商品类目跳出多级选择框
    productCategoryHandle() {
      this.innerVisible = true;
    },
    //关闭添加商品框
    handleClose() {
      this.dialogVisible = false;
    },
    //选择好后---确定---关闭类目tree
    addParamsHandler() {
      this.innerVisible = false;
    },
    //5.tree的懒加载事件---再次请求数据
    loadTreeNodes(node, resolve) {
      //将最终选择结果显示到视图
      this.currentCategory = node.data;
      // 重新请求数据
      if (node.level === 0) {
        // 第一次调用
        this.$api.getSelectItemCategoryByParentId().then(res => {
          if (res.status === 200) {
            return resolve(res.data.data);
          } else {
            alert("请求失败");
          }
        });
      }
      if (node.level >= 1) {
        // 点击之后触发
        this.$api
          .getSelectItemCategoryByParentId({ id: node.data.cid })
          .then(res => {
            if (res.status === 200) {
              return resolve(res.data.data);
            }else{
              alert('请求失败')
            }
          })
          .catch(error => {
            resolve([]);
          });
      }
    },
    //tree的点击事件---可以拿到你点击的那条数据的id---此处也可以用上边的node获取
    handleNodeClick(data) {
      // console.log(data);
    },
    //6.图片上传成功时存储拿到的数据
    getUploadHandle(data){
      this.uploadData = data
    },
    //7.编辑好商品数据后提交---显示到表格中
    submitProduct(){
      this.dialogVisible = false;
      if(this.updataFlagId){//修改
        this.$api.getUpdateTbItem({
          id:this.updataFlagId,
          title:this.product.title,
          sellPoint:this.product.sellPoint,
          price:this.product.price,
          num:this.product.num, 
          cid:this.currentCategory.cid, 
          desc:this.productDesc, 
          image:this.uploadData.name 
        }).then(res=>{
        // console.log(res.data);
        if(res.data.status === 200){
          //刷新页面
          this.http()
        }else{
          alert('添加失败')
        }
      })
      }else{//新增    
      this.$api.getInsertTbItem({
        title:this.product.title,
        sellPoint:this.product.sellPoint,
        price:this.product.price,
        num:this.product.num, 
        cid:this.currentCategory.cid, 
        desc:this.productDesc, 
        image:this.uploadData.name 
      }).then(res=>{
        // console.log(res.data);
        if(res.data.status === 200){
          //刷新页面
          this.http()
        }else{
          alert('添加失败')
        }
      })
      }

    },
    //8.编辑---右边的小图标
    handleEdit(index, row) {
      this.dialogVisible = true;
      //预更新
        this.$api.getPreUpdateItem({
            itemId:row.id
        }).then(res=>{
          //点开编辑时显示当前行的基本信息
          this.product={
            title:res.data.data.title,
            sellPoint:res.data.data.sellPoint,
            price:res.data.data.price,
            num:res.data.data.num, 
            cid:res.data.data.cid, 
            desc:res.data.data.desc, 
            image:res.data.data.name 
          }
          this.updataFlagId = res.data.data.id
        })
    },
    //9.删除---右边的小图标
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.getDeleteItemById({
          itemId:row.id
        }).then(res=>{
          // console.log(res.data);
        if(res.data.status === 200){
          //刷新页面
          this.http();

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        }    
      })  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
};
</script>

<style scoped>
.product-list {
  width: 1200px;
  margin: 0 auto;
  margin-top: 10px;
}
.upload-img {
  width: 200px;
  float: left;
  margin-left: 10px;
}
</style>