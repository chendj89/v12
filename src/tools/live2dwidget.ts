/**
 * 添加二次元角色
 */
export default function live2dwidget() {
  const js: any = document.createElement('script');
  js.src = `https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js`;
  js.onload = js.onreadystatechange = function () {
    //@ts-ignore
    window.L2Dwidget.init({
      model: {
        jsonPath: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json',
        scale: 1,
      },
      display: {
        position: 'right',
        width: 90,
        height: 130,
        hOffset: 0, // 左右
        vOffset: 5, // 上下
      },
    });
  };
  document.body.appendChild(js);
}
