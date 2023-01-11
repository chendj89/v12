import { NAvatar, NSpace, NLoadingBarProvider, useLoadingBar, NSkeleton, NA,NIcon } from 'naive-ui';
import type { CSSProperties } from 'vue';
import useDialog from '@/tools/useDialog';
import createTpl from '@/components/tpl/create.vue';
// @ts-ignore
import BiPlusSquareDotted from '~icons/bi/plus-square-dotted';
// @ts-ignore
import BiCalendar2DateFill from '~icons/bi/calendar2-date-fill'

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
  height: '40px',
  transition: 'width 0.25s',
};
const VBarLoding = defineComponent({
  setup(props, ctx) {
    const loadingBar = useLoadingBar();
    const start = () => {
      loadingBar.start();
    };
    const finish = () => {
      loadingBar.finish();
    };
    return {
      loadingBar,
      start,
      finish,
    };
  },
  render() {
    return null;
  },
});

const vars = {
  ns: {
    width: 24,
    height: 24,
    sharp: false,
  },
  na: {
    style: {
      display: 'inline-block',
      background: 'transparent',
      transition: 'all 0.25s',
    },
  },
  avatar: {
    width: 24,
    height: 24,
    sharp: false,
    size: 24,
    style: { background: 'transparent' },
  },
  space: {
    style: {
      lineHeight: 0,
      gap: '8px 10px',
      whiteSpace: 'nowrap',
    },
  },
};
export default defineComponent({
  name: 'VBar',
  setup(props,ctx) {
    const ins=getCurrentInstance();
    const g_data: any = inject('g_data');
    const elRef: any = ref(null);
    const loadingRef: any = ref(null);
    const menu: any = ref([]);
    const ids: any = ref([]);
    const auth: any = ref(Boolean(localStorage.getItem('auth') !== null));
    const createIssue = () => {
      useDialog({
        com: createTpl,
        ins: ins,
      }).then((res: any) => {
        if (res && res.reload) {
          ctx.emit('init');
        }
      });
    };
    return {
      elRef,
      loadingRef,
      g_data,
      menu,
      ids,
      auth,
      createIssue
    };
  },
  render() {
    let keys = Object.keys(this.g_data.menu);
    let values = Object.values(this.g_data.menu);
    if (keys.length) {
      return (
        <div style={{ ...barStyle }} ref="elRef">
          <NLoadingBarProvider to={this.elRef} containerStyle="position:absolute">
            <VBarLoding ref="loadingRef"></VBarLoding>
            <NSpace {...vars.space}>
              {this.auth ? (
                <NA style={{ ...vars.na.style }} onClick={this.createIssue}>
                  <NAvatar {...vars.avatar} src="https://api.iconify.design/bi:plus-square-dotted.svg">
                  </NAvatar>
                </NA>
              ) : null}
              {values.map((item: any) => (
                <NA key={item.id} style={{ ...vars.na.style }} href={item.url ? item.url : 'javascript:void(0);'} target={item.url ? '_blank' : null}>
                  <NAvatar {...vars.avatar} src={item.icon}></NAvatar>
                </NA>
              ))}
            </NSpace>
          </NLoadingBarProvider>
        </div>
      );
    } else {
      return (
        <div style={barStyle} ref="elRef">
          <NLoadingBarProvider to={this.elRef} containerStyle="position:absolute">
            <VBarLoding ref="loadingRef"></VBarLoding>
            <NSpace {...vars.space}>
              {new Array(7).fill(1).map((item) => (
                <NSkeleton {...vars.ns} />
              ))}
            </NSpace>
          </NLoadingBarProvider>
        </div>
      );
    }
  },
});
