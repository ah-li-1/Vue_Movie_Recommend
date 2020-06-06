<template>
  <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入关键词"
          @select="handleSelect">
    <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick">
    </i>
    <template slot-scope="{ item }">
      <div class="name">{{ item.value }}</div>
    </template>
  </el-autocomplete>
</template>

<style scoped>
  .el-autocomplete{
    text-align: center;
  }
    li {
      line-height: normal;
      padding: 7px;
    }
  .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .addr {
    font-size: 12px;
    color: #b4b4b4;
  }
  .highlighted .addr {
    color: #ddd;
  }
</style>

<script>
  export default {
    data() {
      return {
        restaurants: [],
        state: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);//字符串头查询
          //return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);模糊查询
        };
      },
      loadAll() {
        return [
          { "value": "无间盗"},
          { "value": "惊天追逐"},
          { "value": "力王中王"},
          { "value": "变形黑侠3"},
          { "value": "霸王别姬"},
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      }
    },
    mounted() {
      const  _this = this;
      axios.get('http://localhost:8181/movie/findAll/').then(function (resp) {
        _this.restaurants = resp.data;
        // console.log(resp.data[4].star);
      })
      // this.restaurants = this.loadAll();
    }
  }
</script>