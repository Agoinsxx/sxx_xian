import axios from '../utils/http'
import base from './base'

const api = {
   login(params){
     return axios.post(base.baseUrl+base.login,params);
   },
    //商品查询接口
    getSelectTbItemAllByPage(params){
      return axios.get(base.baseUrl + base.selectTbItemAllByPage,{
          params
      })
    },
    //商品类目接口
    getSelectItemCategoryByParentId(params){
      return axios.get(base.baseUrl + base.selectItemCategoryByParentId,{
        params
      })
    },
    //商品添加接口
    getInsertTbItem(params){
      return axios.get(base.baseUrl + base.insertTbItem,{
        params
      })
    },
    //商品删除接口
    getDeleteItemById(params){
      return axios.get(base.baseUrl + base.deleteItemById,{
          params
      })
    },
    //预更新
    getPreUpdateItem(params){
      return axios.get(base.baseUrl + base.preUpdateItem,{
        params
      });
    },
    //修改商品信息
    getUpdateTbItem(params){
      return axios.get(base.baseUrl + base.updateTbItem,{
        params
      })
    },
      /**
     * 规格参数 查询
     */
    getSelectItemParamAll(params){
      return axios.get(base.baseUrl + base.selectItemParamAll,{
          params:params
      })
  },
  /**
   * 规格参数 添加
   */
  getInsertItemParam(params){
      return axios.get(base.baseUrl + base.insertItemParam,{
          params:params
      })
  },
  //规格参数删除
  getDeleteItemParamById(params){
    return axios.get(base.baseUrl + base.deleteItemParamById,{
      params
    })
  },
  //内容管理查询
  getSelectContentCategoryByParentId(params){
    return axios.get(base.baseUrl + base.selectContentCategoryByParentId,{
      params
    })
  },
  //内容管理添加
  getInsertContentCategory(params){
    return axios.get(base.baseUrl + base.insertContentCategory,{
      params
    })
  },
  //内容管理删除
  getDeleteContentCategoryById(params){
    return axios.get(base.baseUrl + base.deleteContentCategoryById,{
      params
    })
  },
  //内容管理修改
  getUpdateContentCategory(params){
    return axios.get(base.baseUrl + base.updateContentCategory,{
      params
    })
  },
  //内容管理内容 查询
  getSelectTbContentAllByCategoryId(params){
    return axios.get(base.baseUrl + base.selectTbContentAllByCategoryId,{
      params
    })
  },
  //内容管理内容 添加
  getInsertTbContent(params){
    return axios.get(base.baseUrl + base.insertTbContent,{
      params
    })
  },
  //内容管理内容 删除
  getDeleteContentByIds(params){
    return axios.get(base.baseUrl + base.deleteContentByIds,{
      params
    })
  }
      
}

export default api