// import { createStore } from "vuex";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";
import { Weather } from "@/type/weather";
// export default createStore({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });
export interface State {
  weatherInfo: Weather;
}
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol("key");
export const store = createStore<State>({
  state: {
    weatherInfo: {
      adcode: "",
      city: "",
      humidity: "",
      info: "",
      province: "",
      reportTime: "",
      temperature: 0,
      weather: "",
      windDirection: "",
      windPower: "",
    },
  },
  mutations: {
    getWeatherInfo(
      state,
      payload: {
        data: Weather;
      }
    ) {
      state.weatherInfo = payload.data;
    },
  },
});
export function useStore() {
  return baseUseStore(key);
}
