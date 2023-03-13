import { NSkeleton, NSpace, NSpin, NCard, NThing, NAvatar, NH2, NEllipsis, NText, NA, NButton, NIcon, NDropdown, NPopconfirm } from 'naive-ui';
import type { CSSProperties, PropType } from 'vue';
import { getComment } from '@/tools/issues';
import request from '@/tools/fetch';
import { useRouter } from 'vue-router';

// @ts-ignore
import BiPlusSquareDotted from '~icons/bi/plus-square-dotted';
// @ts-ignore
import BiArrowUpShort from '~icons/bi/arrow-up-short';
// @ts-ignore
import BiArrowDownShort from '~icons/bi/arrow-down-short';
// @ts-ignore
import BiUiChecksGrid from '~icons/bi/ui-checks-grid';
// @ts-ignore
import BiGear from '~icons/bi/gear';
// @ts-ignore
import BiXCircle from '~icons/bi/x-circle';
// @ts-ignore
import BiTornado from '~icons/bi/tornado';
// @ts-ignore
import BiArrowRepeat from '~icons/bi/arrow-repeat';
import useDialog from '@/tools/useDialog';
import addTpl from '@/components/tpl/add.vue';
import updateTpl from '@/components/tpl/update.vue';
import editTpl from '@/components/tpl/edit.vue';
import { addRaw } from '@/tools/raw';

const _props = {
  /**
   * 是否有修改权限
   */
  auth: {
    type: Boolean,
    default: () => false,
  },
  /**
   * 基本信息
   */
  base: {
    type: Object,
    default: () => {},
  },
  /**
   * 类型
   */
  type: {
    type: String as PropType<'create' | 'add' | 'update' | 'edit' | ''>,
    default: () => '',
  },
};
const ncardStyle = {
  '--n-padding-left': '10px',
  '--n-padding-bottom': '10px',
};
const spaceStyle: CSSProperties = {
  lineHeight: 0,
  gap: '8px 10px',
};
const descriptionStyle: CSSProperties = {
  marginTop: '5px',
  position: 'relative',
};

/**
 * 变量
 */
const vars = {
  /**
   * 头像
   */
  avatar: {
    width: 48,
    height: 48,
    sharp: false,
    style: { background: 'transparent' },
  },
  /**
   * 标题
   */
  header: {
    width: 100,
    height: 28,
    sharp: false,
    style: { lineHeight: '28px', height: '28px', margin: 0 },
  },
  /**
   * 描述
   */
  description: {
    width: 200,
    height: 20,
    sharp: false,
    style: { lineHeight: '20px', height: '20px', margin: 0, width: '196px' },
  },
  headerExtra: {
    width: 20,
    height: 20,
    sharp: false,
  },
  /**
   * 图标
   */
  icon: {
    width: 28,
    height: 28,
    sharp: false,
  },
  /**
   * 加载
   */
  spin: {
    style: {
      display: 'inline-block',
    },
  },
};

/**
 * 组件
 */

const iconsNs = (props: any, ctx: any) => {
  return (
    <div style="min-height: 33px;height: 33px;overflow: hidden;">
      <div style="min-height:28px;margin-top:5px;">{ctx.slots.default?.()}</div>
    </div>
  );
};

const arrow = (that: any) => {
  if (that.$props.type == 'add') {
    return () => null;
  }
  return (
    <div style="position:absolute;right:-12px;top:4px;cursor: pointer;">
      <NButton text onClick={that.upClick} style={{ display: 'block', opacity: that.updown > 0 ? 1 : 0 }}>
        <NIcon size={14} depth="3">
          <BiArrowUpShort></BiArrowUpShort>
        </NIcon>
      </NButton>
      <NButton text onClick={that.downClick} style={{ display: 'block', opacity: that.updown < that.base.list.length - 1 ? 1 : 0 }}>
        <NIcon size={14} depth="3">
          <BiArrowDownShort></BiArrowDownShort>
        </NIcon>
      </NButton>
    </div>
  );
};

const iconsList = (that: any) => {
  if (that.base.list && that.base.list.length) {
    const getStyle = (cell: any) => {
      let style = {};
      if (that.$props.type == 'create') {
        style = {
          href: 'javascript:void(0);',
          style: { display: 'inline-block' },
        };
      } else if (that.$props.type == 'edit') {
        style = {
          href: 'javascript:void(0);',
          style: { display: 'inline-block', transition: ' all 0.25s', transform: cell.active ? 'translateY(-5px)' : null },
          onClick: () => that.activeMenu(cell),
        };
      } else if (cell.isAdd && that.$props.type !== 'add') {
        // 添加按钮，但不能是添加弹窗
        style = {
          href: 'javascript:void(0);',
          style: { display: 'inline-block' },
          onClick: () => that.addMenu(),
        };
      } else if (that.$props.type == 'add' && cell.isAdd) {
        style = {
          href: 'javascript:void(0);',
          style: { display: 'inline-block', transform: 'translateY(-5px)' },
        };
      } else if (that.$props.type == 'add') {
        style = {
          href: 'javascript:void(0);',
          style: { display: 'inline-block' },
        };
      } else if (cell.url.startsWith('/')) {
        style = {
          href: 'javascript:void(0)',
          style: { display: 'inline-block' },
          onClick: () => {
            router.push(cell.url);
          },
        };
      } else {
        style = {
          href: cell.url || 'javascript:void(0);',
          target: cell.url ? '_blank' : null,
          style: { display: 'inline-block' },
        };
      }
      return style;
    };
    const getCell = (cell: any) => {
      if (['edit'].includes(that.$props.type as string) && cell.isAdd) {
        return null;
      } else {
        if (/^<svg/.test(cell.icon)) {
          return h(NA, getStyle(cell), {
            default: () => h(NIcon, { innerHTML: cell.icon, size: 28, style: { '--n-color': cell.padding ? null : '#e5e5e5', padding: cell.padding ? null : '4px' } }),
          });
        } else
          return h(NA, getStyle(cell), {
            default: () => <NAvatar size={28} src={cell.icon} style={{ '--n-color': cell.padding ? null : '#e5e5e5', padding: cell.padding ? null : '4px' }}></NAvatar>,
          });
      }
    };
    const arrowIcon = arrow(that);
    return (
      <>
        <div style="min-height: 33px;height: 33px;overflow: hidden;">
          <div style={{ transform: `translateY(-${that.updown * 33}px)`, transition: 'all 0.5s' }}>
            {that.base.list.map((item: any) => (
              <div style="min-height:28px;margin-top:5px;">
                <NSpace style={spaceStyle}>{item.map((cell: any) => getCell(cell))}</NSpace>
              </div>
            ))}
          </div>
        </div>
        <arrowIcon></arrowIcon>
      </>
    );
  } else {
    if (that.loading) {
      return (
        <iconsNs>
          <NSpace style={spaceStyle}>
            {new Array(7).fill(1).map(() => (
              <NSkeleton {...vars.icon} />
            ))}
          </NSpace>
        </iconsNs>
      );
    }
    if (that.auth) {
      return (
        <iconsNs>
          <NSpace style={spaceStyle}>
            {new Array(7).fill(1).map(() => (
              <NSkeleton {...vars.icon} />
            ))}
          </NSpace>
        </iconsNs>
      );
    } else {
      return (
        <iconsNs>
          <NSpace style={spaceStyle}></NSpace>
        </iconsNs>
      );
    }
  }
};
/**
 * 下拉菜单
 */
const setMenu = (that: any) => {
  return (
    <NDropdown trigger="click" show={that.dropdown} options={that.dropdownOption} onSelect={that.dropdownSelect}>
      <NButton text>
        <NIcon size={14}>
          <BiUiChecksGrid onClick={() => (that.dropdown = true)}></BiUiChecksGrid>
        </NIcon>
      </NButton>
    </NDropdown>
  );
};
let router: any = null;
export default defineComponent({
  name: 'VMenu4',
  props: _props,
  setup(props, ctx) {
    router = useRouter();
    let g_data: any = null;
    if (!props.type) {
      g_data = inject('g_data');
    }
    const ins = getCurrentInstance();
    /**
     * 权限
     */
    const auth = ref(props.auth);
    /**
     * 监听
     */
    watch(
      () => props.auth,
      () => {
        auth.value = props.auth;
      }
    );

    /**
     * 加载
     */
    const loading = ref(true);

    const base: any = ref(props.base);
    const getMenu = async () => {
      if (base.value && base.value.comments_url) {
        const comments = await getComment(base.value.comments_url, (list: any) => {
          base.value.raw = list;
          if (auth.value || props.type == 'add') {
            list.push(addRaw);
          }
        });
        base.value.raw.map((raw: any) => {
          if (g_data && g_data.value) {
            if (raw.top) {
              g_data.value.menu[raw.id] = raw;
            }
          }
        });
        base.value.list = JSON.parse(JSON.stringify(comments));
        loading.value = false;
      }
    };

    watch(
      () => props.base,
      async (newVal) => {
        if (props.type !== 'create') {
          base.value = { ...newVal, list: [] };
          getMenu();
        }
      }
    );
    watch(
      () => props.type,
      () => {}
    );
    // 上下滑动
    const updown: any = ref(0);
    const upClick = () => {
      if (updown.value > 0) {
        updown.value--;
      }
    };
    const downClick = () => {
      if (updown.value < base.value.list.length - 1) {
        updown.value++;
      }
    };
    // 下来菜单
    const dropdown = ref(false);
    const dropdownOption = ref([
      {
        label: '更新',
        key: 'update',
        icon: () => h(BiArrowRepeat),
      },
      {
        label: '修改',
        key: 'edit',
        icon: () => h(BiGear),
      },
      {
        label: () =>
          h(
            NPopconfirm,
            {
              negativeText: '取消',
              positiveText: '确定',
              style: 'width:200px',
              onPositiveClick: () => {
                dropdown.value = false;
                closeIssue();
              },
              onNegativeClick: () => {
                dropdown.value = false;
              },
            },
            { default: () => '是否关闭当前问题', trigger: () => '删除' }
          ),
        key: 'closed',
        icon: () => h(BiXCircle),
      },
      {
        label: '取消',
        key: 'cancel',
        icon: () => h(BiTornado),
      },
    ]);
    const dropdownSelect = (key: string) => {
      if (key !== 'closed') {
        dropdown.value = false;
      }
      if (key == 'edit') {
        useDialog({
          com: editTpl,
          ins: ins,
          data: base.value,
        }).then((data: any) => {
          if (data && data.reload) {
            loading.value = true;
            if (!data.type) {
              if (g_data.value) {
                g_data.value.delMenuItem(data.menu);
              }
            }
            getMenu();
          }
        });
      }
      if (key == 'update') {
        useDialog({
          com: updateTpl,
          ins: ins,
          data: base.value,
        }).then((data: any) => {
          if (data) {
            base.value = { ...data.data, list: base.value.list || [] };
          }
        });
      }
    };
    /**
     * 关闭当前菜单
     */
    const closeIssue = () => {
      loading.value = true;
      request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        owner: 'chendj89',
        repo: 'data',
        auth: true,
        issue_number: base.value.number,
        body: JSON.stringify({
          state: 'closed',
        }),
      }).then(async (res) => {
        loading.value = false;
        if (res.status == 200) {
          ctx.emit('reload');
        }
      });
    };
    // 回调函数
    const updateBase = (_value: any) => {
      base.value = { ..._value, list: base.value?.list || [] };
    };
    const updateAdd = (_value: any) => {
      const len = base.value.list.length;
      if (len) {
        const last = base.value.list[len - 1];
        if (last.length) {
          let lastEle = last[last.length - 1];
          let keys = Object.keys(_value);
          keys.map((key) => {
            lastEle[key] = _value[key];
          });
        }
      }
    };
    // 添加菜单
    const addMenu = () => {
      useDialog({
        com: addTpl,
        ins: ins,
        data: JSON.parse(JSON.stringify(base.value)),
      }).then((res: any) => {
        if (res && res.reload) {
          loading.value = true;
          getMenu();
        }
      });
    };
    /**
     * 选中当前菜单
     */
    const activeMenu = (cell: any) => {
      if (base.value && base.value.list) {
        base.value.list.map((i1: any) => {
          i1.map((i2: any) => {
            i2.active = false;
          });
        });
      }
      cell.active = true;
      // 更新菜单
      ctx.emit('updateMenu', cell);
    };
    onMounted(() => {
      if (props.type == 'create') {
        loading.value = false;
      } else if (props.type == 'add') {
        loading.value = false;
        updown.value = base.value.list.length ? base.value.list.length - 1 : 0;
      } else if (props.type == 'edit') {
        loading.value = false;
      } else {
        getMenu();
      }
    });
    return {
      base,
      vars,
      auth,
      loading,
      // 上下
      updown,
      upClick,
      downClick,
      // 下拉菜单
      dropdown,
      dropdownOption,
      dropdownSelect,
      // 回调函数
      updateBase,
      updateAdd,
      addMenu,
      activeMenu,
    };
  },
  render() {
    if (this.base) {
      return (
        <NSpin show={this.loading} {...vars.spin}>
          <NCard style={ncardStyle}>
            <NThing style={{ lineHeight: 0 }} contentStyle={descriptionStyle}>
              {{
                avatar: () =>
                  this.base.icon ? (
                    /^<svg/.test(this.base.icon) ? (
                      h(NIcon, { innerHTML: this.base.icon,size:48, ...vars.avatar})
                    ) : (
                      <NAvatar {...vars.avatar} src={this.base.icon} size={48} />
                    )
                  ) : (
                    <NSkeleton {...vars.avatar} />
                  ),
                header: () => (this.base.name ? <NH2 {...vars.header}>{this.base.name}</NH2> : <NSkeleton {...vars.header} />),
                description: () =>
                  this.base.desc ? (
                    <NEllipsis lineClamp={1} tooltip={false} expandTrigger="click" {...vars.description}>
                      <NText depth={3}>{this.base.desc}</NText>
                    </NEllipsis>
                  ) : (
                    <NSkeleton {...vars.description} />
                  ),
                'header-extra': this.auth ? () => setMenu(this) : null,
                default: () => iconsList(this),
              }}
            </NThing>
          </NCard>
        </NSpin>
      );
    } else {
      return (
        <NSpin show={this.loading} {...vars.spin}>
          <NCard style={ncardStyle}>
            <NThing style={{ lineHeight: 0 }} contentStyle={descriptionStyle}>
              {{
                avatar: () => <NSkeleton {...vars.avatar} />,
                header: () => <NSkeleton {...vars.header} />,
                description: () => <NSkeleton {...vars.description} />,
                'header-extra': this.auth ? () => <NSkeleton {...vars.headerExtra} /> : null,
                default: () => (
                  <iconsNs>
                    <NSpace style={spaceStyle}>
                      {new Array(7).fill(1).map(() => (
                        <NSkeleton {...vars.icon} />
                      ))}
                    </NSpace>
                  </iconsNs>
                ),
              }}
            </NThing>
          </NCard>
        </NSpin>
      );
    }
  },
});
