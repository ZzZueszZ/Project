// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev', API_URL, API_SECRET_KEY } = process.env;

export default defineConfig({
  define: {
    API_URL: API_URL || '',
    API_SECRET_KEY: API_SECRET_KEY || '',
  },
  hash: true,
  // targets: {
  //   ie: 11,
  // },
  // umi routes: https://umijs.org/docs/routing
  routes,
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    'root-entry-name': 'variable',
  },

  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  //============== 以下都是max的插件配置 ===============
  model: {},
  initialState: {},
  title: 'CMS',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: {
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  antd: {},
  request: {},
  access: {},
  // headScripts: [
  //   { src: '/scripts/loading.js', async: true },
  // ],
  //================ pro 插件配置 =================
  presets: ['umi-presets-pro'],
  // openAPI: [
  //   {
  //     requestLibPath: "import { request } from '@umijs/max'",
  //     schemaPath: join(__dirname, 'oneapi.json'),
  //     mock: false,
  //   },
  //   {
  //     requestLibPath: "import { request } from '@umijs/max'",
  //     schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //     projectName: 'swagger',
  //   },
  // ],
  mfsu: {
    strategy: 'normal',
  },
  esbuildMinifyIIFE: true,
  requestRecord: {},
});
