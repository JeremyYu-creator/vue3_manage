<template>
  <div class="main">
    <el-skeleton :rows="5" animated v-if="headerLoading" />
    <div v-else>
      <div class="movie-header">
        <div class="movie-pic">
          <div>{{ movieTitle }}</div>
          <img
            :src="moviePic"
            style="width: 270px; height: 400px; object-fit: cover"
          />
        </div>
        <div class="block">
          <div class="movie-name">
            电影名称: <span class="name-style">{{ movieName }}</span>
          </div>
          <div class="movie-rate">
            <span class="rate-text">电影评分:</span>
            <el-rate v-model="movieRateIcon" disabled> </el-rate>
            {{ movieRate || "暂无评分" }}
            <!--            <div>{{ rateDetail["1"] === 0 ? "暂无评分" : rateDetail["1"]}}</div>-->
          </div>
          <div class="movie-year">年份: {{ movieYear }}</div>
          <div class="movie-day">上映日期: {{ showDate || "暂无" }}</div>
          <div class="movie-tag">
            标签:
            <div class="tag-group">
              <el-tag
                v-for="item in movieTag"
                :key="item.label"
                :type="item.type"
                effect="dark"
                style="margin-left: 20px"
              >
                {{ item.label }}
              </el-tag>
            </div>
          </div>
          <div class="movie-time">电影时长：{{ duration }}</div>
          <div class="movie-festival">
            点映时间：
            <div
              v-for="item in festival"
              :key="item.value"
              class="festival-detail"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <el-button
          @click="showList"
          style="height: 30px; margin-left: 250px"
          type="primary"
          >查看近期电影列表</el-button
        >
      </div>
      <div class="swiper-block">
        <div class="movie-content">
          <div>演职员表</div>
          <el-carousel trigger="click" height="150px" style="width: 500px">
            <el-carousel-item
              v-for="item in actorList"
              :key="item.value"
              initial-index="1"
            >
              <div class="actor-style">
                <img
                  :src="item.avatars.large"
                  style="width: 168px; height: 168px; object-fit: cover"
                />
                <div class="actor-block">
                  <div class="actor-detail">英文名：{{ item.name_en }}</div>
                  <div class="actor-detail">中文名：{{ item.name }}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="movie-content">
          <div>导演表</div>
          <el-carousel trigger="click" height="150px" style="width: 500px">
            <el-carousel-item
              v-for="item in directorList"
              :key="item.value"
              initial-index="1"
            >
              <div class="actor-style">
                <img
                  :src="item.avatars.large"
                  style="width: 168px; height: 168px; object-fit: cover"
                />
                <div class="actor-block">
                  <div class="actor-detail">英文名：{{ item.name_en }}</div>
                  <div class="actor-detail">中文名：{{ item.name }}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="footer"></div>
    </div>
    <el-drawer
      title="最新电影列表"
      v-model="drawerShow"
      :close-on-click-modal="false"
    >
      <div v-for="item in movieNewData" :key="item.value" class="drawer-style">
        <div class="drawer-block" @click="getNewsInfo(item.index)">
          <img
            :src="item.pic"
            style="width: 168px; height: 220px; object-fit: cover"
          />
          <div class="drawer-name">{{ item.name }}</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { getLatestMovies } from "@/api/getNews";
export default defineComponent({
  name: "chinaNews",
  data() {
    return {};
  },
  setup() {
    const movieTitle = ref("");
    const moviePic = ref("");
    const movieName = ref("");
    const movieRateIcon = ref(0);
    const movieRate = ref(0);
    const movieYear = ref("");
    const movieTag: any = ref([]);
    const headerLoading = ref(false);
    const rateDetail: any = ref({});
    const duration = ref("");
    const festival: any = ref([]);
    const showDate = ref("");
    const actorList: any = ref([]);
    const directorList: any = ref([]);
    const drawerShow = ref(false);
    const movieNewData: any = ref([]);
    const getNewsInfo = (index: number) => {
      headerLoading.value = true;
      const params = { apikey: "0df993c66c0c636e29ecbb5344252a4a" };
      getLatestMovies(params).then((res) => {
        // console.log(res.data.subjects);
        movieNewData.value = res.data.subjects.map(
          (item: any, index: number) => {
            return {
              pic: item.images.large,
              name: item.title,
              index: index,
            };
          }
        );
        movieTitle.value = res.data.title;
        moviePic.value = res.data.subjects[index].images.small;
        movieName.value = res.data.subjects[index].title;
        movieRateIcon.value = Number(
          parseFloat(
            String((res.data.subjects[index].rating.average * 5) / 10)
          ).toFixed(1)
        );
        movieRate.value = res.data.subjects[index].rating.average;
        movieYear.value = res.data.subjects[index].year;
        movieTag.value = res.data.subjects[index].genres.map((item: string) => {
          return {
            type: "",
            label: item,
          };
        });
        rateDetail.value = res.data.subjects[index].rating.details["1"];
        duration.value = res.data.subjects[index].durations.join();
        festival.value = res.data.subjects[index].pubdates;
        showDate.value = res.data.subjects[index].mainland_pubdate;
        actorList.value = res.data.subjects[index].casts;
        directorList.value = res.data.subjects[index].directors;
        headerLoading.value = false;
        drawerShow.value = false;
      });
    };
    getNewsInfo(0);
    const showList = () => {
      drawerShow.value = true;
    };
    return {
      getNewsInfo,
      movieTitle,
      moviePic,
      movieName,
      movieRate,
      movieRateIcon,
      movieYear,
      movieTag,
      headerLoading,
      rateDetail,
      duration,
      festival,
      showDate,
      actorList,
      directorList,
      drawerShow,
      showList,
      movieNewData,
    };
  },
});
</script>

<style lang="stylus">
.main
  margin 30px auto
  .el-drawer__body
    overflow: auto
  .movie-header
    width 100%
    display flex
    // height 450px
    .movie-pic
      width 40%
      height 600px
    .block
      display flex
      flex-direction column
      .movie-name, .movie-year, .movie-tag, .movie-rate, .movie-time, .movie-festival, .movie-day
        margin 15px
      .movie-name
        .name-style
           font-size 20px
      .movie-rate
        // height 50px
        display flex
        align-items center
        .rate-text
          margin-right 10px
      .movie-tag
        display flex
        align-items center
      .movie-festival
        .festival-detail
          margin-top 10px
          margin-left 10px
  .swiper-block
    display flex
    .movie-content
      display flex
      flex-direction column
      width 600px
      .actor-style
        display flex
        .actor-block
          display flex
          flex-direction column
          margin-left 20px
          .actor-detail
            margin 0 10px
  .drawer-style
    .drawer-block
      display flex
      margin 20px
      cursor pointer
      .drawer-name
        margin-left 10px
</style>
