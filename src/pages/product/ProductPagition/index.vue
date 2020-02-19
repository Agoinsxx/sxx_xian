<template>
  <div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
      :current-page="currentPage"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "ProductPagition",
  data() {
    return {
      currentPage: 1,
      tableData:[]
    };
  },
  methods: {
    //点击不同的页面获取不同的数据
    currentChange(currentPage) {
      this.$api
        .getSelectTbItemAllByPage({
          page:currentPage
        })
        .then(res => {
          console.log(res);
          if (res.data.status === 200) {
            this.tableData = res.data.data.result;
            //将拿到的数据传给父级
            this.$emit('onsend',this.tableData)
          } else {//获取失败时提示并显示第一页数据
            alert(res.data.msg);
            this.currentPage = 1
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>