<template>
  <div class="main">
    <div class="select-row">
      <div class="select-block">
        <div class="select-item">
          <div class="select-name">请选择省份</div>
          <el-select
            v-model="col"
            placeholder="请选择省份"
            @change="getNewsInfo"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="table-style">
      <el-table :data="tableData" border style="width: 100%" height="550" v-loading="loading">
        <template v-for="(item, index) in tableHeader" :key="index">
          <el-table-column
            :label="item.name"
            :width="item.width"
            :prop="item.prop"
          >
            <template v-slot="scope">
              <div v-if="item.prop === 'allPics'">
                <div
                  v-for="iitem in scope.row[item.prop].pics"
                  :key="iitem.value"
                >
                  <div class="no-pic" v-if="scope.row['allPics'].pics === []">
                    暂无图片
                  </div>
                  <div v-else class="pic-style">
                    <img
                      :src="iitem.imgurl"
                      style="width: 168px; height: 168px; object-fit: cover"
                    />
                  </div>
                </div>
              </div>
              <span v-else-if="item.prop === 'URL'">
                <div @click="goTo(scope.row[item.prop])" class="urlAddress">
                  {{ scope.row[item.prop] }}
                </div>
              </span>
              <span v-else>{{ scope.row[item.prop] || "暂无信息" }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="page"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { getNews } from "@/api/getNews";
export default defineComponent({
  name: "chinaNews",
  data() {
    return {
      tableHeader: [
        {
          name: "标题",
          prop: "title",
          width: 180,
        },
        {
          name: "图集",
          prop: "allPics",
          width: 180,
        },
        {
          name: "评论数量",
          prop: "comment",
          width: 180,
        },
        {
          name: "更新时间",
          prop: "cTime",
          width: 180,
        },
        {
          name: "来源",
          prop: "source",
          width: 180,
        },
        {
          name: "详情",
          prop: "summary",
          // width: 180,
        },
        {
          name: "链接",
          prop: "URL",
          width: 180,
        },
      ],
      options: [
        {
          label: "吉林",
          value: "56314",
        },
        {
          label: "江苏",
          value: "56315",
        },
        {
          label: "辽宁",
          value: "56316",
        },
        {
          label: "黑龙江",
          value: "56317",
        },
        {
          label: "内蒙古",
          value: "56319",
        },
        {
          label: "浙江",
          value: "56320",
        },
        {
          label: "山东",
          value: "56322",
        },
        {
          label: "山西",
          value: "56323",
        },
        {
          label: "陕西",
          value: "56324",
        },
      ],
    };
  },
  setup() {
    const a = ref(1);
    const tableData: any = ref([]);
    const goTo = (address: string) => {
      window.open(address);
    };
    const loading = ref(false,)
    const getNewsInfo = () => {
      loading.value = true
      const params = { page: page.value, col: Number(col.value) };
      getNews(params).then((res) => {
        // console.log(res.data.result.data.list);
        tableData.value = res.data.result.data.list;
        totalCount.value = res.data.result.data.total;
        loading.value = false
      });
    };
    const col = ref("");
    const page = ref(1);
    const totalCount = ref(0);
    const handleCurrentChange = (index: number) => {
      page.value = index;
      getNewsInfo();
    };
    const handleSizeChange = (val: number) => {
      console.log(val);
    };
    getNewsInfo();
    return {
      a,
      tableData,
      goTo,
      handleCurrentChange,
      page,
      totalCount,
      handleSizeChange,
      col,
      getNewsInfo,
      loading,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  margin 30px auto
  .select-row
    // width 100%
    height 100px
    background-color #ffffff
    border-shadow  0px 2px 20px 0px rgba(0, 0, 0, 0.08);
    border 1px solid rgba(0, 0, 0, 0.08)
    .select-block
      display flex
      align-items center
      margin 0 20px
      padding-top 20px
      .select-item
        display flex
        align-items center
        .select-name
          margin-right 10px
  .table-style
    // height 400px
    .urlAddress
      cursor pointer
  .footer
    display flex
    justify-content flex-end
    margin 10px 0
</style>
