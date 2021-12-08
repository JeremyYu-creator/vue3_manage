<template>
  <div class="main">
    <div class="table-env-style">
      <el-table :data="tableData" border style="width: 100%" height="600">
        <template v-for="(item, index) in tableHeader" :key="index">
          <el-table-column
            :label="item.name"
            :width="item.width"
            :prop="item.prop"
          >
            <template v-slot="scope">
              <div v-if="item.prop === 'img'">
                <div class="pic-style">
                  <img
                    :src="scope.row[item.prop]"
                    style="width: 168px; height: 168px; object-fit: cover"
                  />
                  <!--                    <span>{{scope.row[item.prop]}}</span>-->
                </div>
              </div>
              <span v-else-if="item.prop === 'link'">
                <div @click="goTo(scope.row[item.prop])" class="urlAddress">
                  {{ scope.row[item.prop] }}
                </div>
              </span>
              <span v-else-if="item.prop === 'isDujia'">
                {{ dujiaMap[scope.row[item.prop]] }}
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
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { getTechonologyNews } from "@/api/getNews";
export default defineComponent({
  name: "TechnologyNews",
  data() {
    return {
      tableHeader: [
        {
          name: "标题",
          prop: "title",
          width: 180,
        },
        {
          name: "图片",
          prop: "img",
          width: 180,
        },
        {
          name: "评论数量",
          prop: "comment",
          width: 180,
        },
        {
          name: "更新时间",
          prop: "date",
          width: 180,
        },
        {
          name: "发布时间",
          prop: "news_date",
          width: 180,
        },
        {
          name: "来源",
          prop: "source",
          width: 180,
        },
        {
          name: "是否独家",
          prop: "isDujia",
          // width: 180,
        },
        {
          name: "链接",
          prop: "link",
          width: 180,
        },
      ],
      dujiaMap: ["否", "是"],
    };
  },
  setup() {
    const a = ref(1);
    const tableData: any = ref([]);
    const goTo = (address: string) => {
      window.open(address);
    };
    const col = ref("");
    const page = ref(1);
    const show_num = 30;
    const totalCount = ref(0);
    const handleCurrentChange = (index: number) => {
      page.value = index;
      getEntNewsRecord();
    };
    const handleSizeChange = (val: number) => {
      console.log(val);
    };
    const getEntNewsRecord = () => {
      const params = {
        page: page.value,
        show_num: show_num,
        ch: 'tech',
      };
      getTechonologyNews(params).then((res) => {
        // console.log(res);
        tableData.value = res.data.data;
        totalCount.value = res.data.count;
      });
    };
    getEntNewsRecord();
    return {
      a,
      tableData,
      goTo,
      handleCurrentChange,
      page,
      totalCount,
      handleSizeChange,
      col,
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
  .table-env-style
    .urlAddress
      cursor pointer
  .footer
    display flex
    justify-content flex-end
    margin 10px 0
</style>
