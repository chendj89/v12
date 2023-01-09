import { NAvatar, NSpace, NLoadingBarProvider, useLoadingBar } from 'naive-ui';
import type { CSSProperties } from 'vue';

const barStyle: CSSProperties = {
  position: 'fixed',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(255,255,255,0.4)',
  boxShadow: '0 4px 12px -1px rgb(18 22 33 / 10%)',
  borderRadius: '4px',
  backdropFilter: 'blur(5px)',
  padding: '8px',
  lineHeight: 0,
};
const son = defineComponent({
  setup() {
    const loadingBar = useLoadingBar();
    return () => {
      return h('div', { onClick: () => loadingBar.start() }, 'son');
    };
  },
});
export default defineComponent({
  setup() {
    const g_data = inject('g_data');
    const elRef: any = ref(null);
   
    return {
      elRef,
      g_data,
    };
  },
  render() {
    return (
      <div ref="elRef" style="position:relative">
        <NLoadingBarProvider to={this.elRef} containerStyle="position:absolute">
          {{
            default: () => <son></son>,
          }}
        </NLoadingBarProvider>
      </div>
    );
  },
});
