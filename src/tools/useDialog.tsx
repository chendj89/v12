import { createVNode, render, defineComponent, ref } from 'vue';

import { NModal, NConfigProvider, zhCN, dateZhCN } from 'naive-ui';
const tpl = defineComponent({
  props: ['com', 'data', 'title'],
  setup() {
    const ins: any = getCurrentInstance();
    const id = ref('');
    const show = ref(false);
    const loaded = ref(false);
    const args = ref(null);
    // 显示
    setTimeout(() => {
      show.value = true;
    }, 300);
    // 加载子组件
    setTimeout(() => {
      loaded.value = true;
    }, 320);
    const close = (args?: any) => {
      show.value = false;
      setTimeout(() => {
        ins?.appContext?.$close(args);
      }, 300);
    };
    const success = (args?: any) => {
      close(args);
    };
    const cancel = (args?: any) => {
      close(args);
    };
    return {
      id,
      show,
      loaded,
      args,
      close,
      success,
      cancel,
    };
  },
  render() {
    return (
      <div ref="id">
        <NConfigProvider locale={zhCN} date-locale={dateZhCN}>
          <NModal
            v-model:show={this.show}
            onClose={this.close}
            preset="dialog"
            title="Dialog"
            maskClosable={false}
            style="--n-padding:16px;--n-close-margin:16px 16px 0 0;margin-top:200px"
            show-icon={false}
            to={this.id}
          >
            {{
              action: () => <div id="footer"></div>,
              default: () => (this.loaded ? h(this.$props.com, { onCancel: this.cancel, onSuccess: this.success, data: this.$props.data }) : null),
              header: () => this.$props.title || <div id="header"></div>,
            }}
          </NModal>
        </NConfigProvider>
      </div>
    );
  },
});

export default function useDialog(opts: { com: any; ins: any; data?: any; title?: any }) {
  return new Promise((resolve) => {
    let container = document.createElement('div');
    const app: any = createVNode(tpl, { com: opts.com, data: opts.data, title: opts.title });
    app.appContext = opts.ins.appContext.app._context;
    // app.appContext.provides=opts.ins.appContext.provides;
    app.appContext.$close = (result: any = false) => {
      render(null, container);
      container.parentNode?.removeChild(container);
      resolve(result);
    };
    render(app, container);
    document.body.appendChild(container);
  });
}
