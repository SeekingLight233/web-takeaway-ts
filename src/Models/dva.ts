import { create } from 'dva-core-ts'
import models from './index';
import createLoading from 'dva-loading-ts'
import "./httpConfig"
// 1.创建实例
const app = create();

// 2.初始化model对象
models.forEach(model => {
    app.model(model)
})
app.use(createLoading())//挂载Loading插件
// 3.启动dva
app.start();

// 4.导出dva仓库
export default app._store;