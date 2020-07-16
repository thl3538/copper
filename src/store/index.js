import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import device from "./modules/device";
import copper from "./modules/copper";
import employee from "./modules/employee";
import code from "./modules/code";
import conf from "./modules/conf";
import breadcrumb from './modules/breadcrumb';
import energy from './modules/energy';
import partCopper from './modules/partCopper';
import copperChart from './modules/copperChart';
import allEfficiency from './modules/allEfficiency';
import singleEfficiency from './modules/singleEfficiency';
import maintenance from './modules/maintenance';
import maintenanceDet from './modules/maintenanceDet';
<<<<<<< HEAD
import warn from './modules/warn'
import timeCard from './modules/timeCard'
=======

>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4

Vue.use(Vuex);

/**
 * vuex 管理
 */
export default new Vuex.Store({
  /**
   * 模块导出
   */
  modules: {
    user,
    device,
    code,
    copper,
    employee,
    conf,
    breadcrumb,
    energy,
    partCopper,
    copperChart,
    allEfficiency,
    singleEfficiency,
    maintenance,
<<<<<<< HEAD
    maintenanceDet,
    warn,
    timeCard
=======
    maintenanceDet
>>>>>>> c9fed1eff3963a469a8a98f4fb6a8e456b038db4
  }
});
