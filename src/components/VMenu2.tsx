import request from '@/tools/fetch';
import formatBody from '@/tools/formatBody';
import { NThing, NSkeleton, NSpace, NSpin, NCard, NButton, NIcon, NAvatar, NH2, NEllipsis, NText, NA, NDropdown, NPopconfirm } from 'naive-ui';
import type { CSSProperties, PropType } from 'vue';
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
import c2 from '@/components/modal/c2.vue';
import c3 from '@/components/modal/c3.vue';
import c4 from '@/components/modal/c4.vue';
import useDialog from '@/tools/useDialog';
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

export default defineComponent({
  props: {
    data: {
      type: Object as any,
    },
    type: {
      type: String as PropType<'edit' | 'add' | 'create'>,
    },
  },
  setup(props, ctx) {
    const ins = getCurrentInstance();
    const vars = reactive({
      sharp: false,
      // 用户头像
      avatar: {
        width: 48,
        height: 48,
        style: { background: 'transparent' },
      },
      // 头部
      header: {
        width: 100,
        height: 28,
        style: { lineHeight: '28px', height: '28px', margin: 0 },
      },
      description: {
        width: 100 * 2,
        height: 20,
        style: { lineHeight: '20px', height: '20px', margin: 0, width: '196px' },
      },
      // 图标
      icon: {
        width: 28,
        height: 28,
      },
    });
    /**
     * 加载中
     */
    const loading = ref(false);
    /**
     * 初始化完成
     */
    const loaded = ref(false);

    const base = ref<any>({
      name: '',
      icon: '',
      desc: '',
      list: [],
    });
    /**
     * 更新基本信息
     */
    const updateBase = (_base: any) => {
      base.value = _base;
    };
    /**
     * 更新新增菜单
     */
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
    /**
     * 获得子菜单
     */
    const getComment = () => {
      return request('GET ' + base.value.comments_url, {auth:true})
        .then((res: any) => res.json())
        .then((data: any[]) => {
          let arr: any[] = [];
          let ob = [];
          let oList: any[] = [];
          data.map((item: any) => {
            const content = formatBody(item.body);
            oList.push({ ...content, id: item.id });
          });
          oList.sort((a, b) => {
            return b.code.sort - a.code.sort;
          });
          oList.push({
            code: { name: '', desc: '', url: '', icon: 'https://api.iconify.design/bi:plus-square-dotted.svg', padding: true, type: 'add', sort: 999 },
          });
          oList.map((item: any) => {
            if (arr.length >= 7) {
              ob.push(arr);
              arr = [];
            } else {
              arr.push({
                name: item.code.name,
                desc: item.code.desc,
                url: item.code.url,
                icon: item.code.icon,
                padding: item.code.padding,
                type: item.code.type,
                sort: item.code.sort,
                id: item.id,
              });
            }
          });
          if (arr.length) {
            ob.push(arr);
          }
          return ob;
        });
    };

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
    const addMenu = () => {
      useDialog({
        ins: ins,
        com: c2,
        title: '新增',
        data: JSON.parse(JSON.stringify(base.value)),
      }).then(async (data: any) => {
        if (data && data.reload) {
          loading.value = true;
          base.value.list = await getComment();
          loading.value = false;
        }
      });
    };
    /**
     * 关闭当前菜单
     */
    const closeIssue = () => {
      loading.value = true;
      request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        owner: 'chendj89',
        repo: 'data',
        auth:true,
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
    const dropdown = ref([
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
                dropdownShow.value = false;
                closeIssue();
              },
              onNegativeClick: () => {
                dropdownShow.value = false;
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
    const dropdownShow = ref(false);
    const dropdownSelect = (key: string) => {
      if (key !== 'closed') {
        dropdownShow.value = false;
      }
      if (key == 'edit') {
        useDialog({
          com: c3,
          ins: ins,
          title: '修改',
          data: JSON.parse(JSON.stringify(base.value)),
        }).then(async (data: any) => {
          if (data && data.reload) {
            updown.value = 0;
            loading.value = true;
            base.value.list = await getComment();
            loading.value = false;
          }
        });
        return;
      }
      if (key == 'update') {
        useDialog({
          com: c4,
          ins: ins,
          title: '更新',
          data: JSON.parse(JSON.stringify(base.value)),
        }).then(async (data: any) => {
          if (data && data.reload) {
            ctx.emit('reload');
          }
        });
        return;
      }
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
    watch(
      () => props.data,
      () => {
        if (!props.type) {
          base.value.name=props.data.name;
          base.value.icon=props.data.icon;
          base.value.desc=props.data.desc;
        }
      }
    );
    onMounted(async () => {
      /**
       * 创建
       */
      if (props.type == 'create') {
      } else if (props.type == 'add') {
        base.value = props.data;
        if (props.data) {
          setTimeout(() => {
            updown.value = props.data.list.length - 1;
          }, 320);
        }
      } else if (props.type == 'edit') {
        base.value = props.data;
      } else {
        base.value = props.data;
        loading.value = true;
        updown.value = 0;
        base.value.list = await getComment();
        loading.value = false;
      }
    });

    return {
      vars,
      loading,
      loaded,
      base,
      updateBase,
      updateAdd,
      updown,
      upClick,
      downClick,
      addMenu,
      dropdown,
      dropdownShow,
      dropdownSelect,
      activeMenu,
    };
  },
  render() {
    const avatarNs = () => {
      return <NSkeleton width={this.vars.avatar.width} height={this.vars.avatar.height} sharp={this.vars.sharp}></NSkeleton>;
    };
    const headerNs = () => {
      return <NSkeleton width={this.vars.header.width} height={this.vars.header.height} sharp={this.vars.sharp}></NSkeleton>;
    };
    const descriptionNs = () => {
      return <NSkeleton width={this.vars.description.width} height={this.vars.description.height} sharp={this.vars.sharp}></NSkeleton>;
    };
    const iconsNs = (props: any, { slots }: any) => {
      return (
        <div style="min-height: 33px;height: 33px;overflow: hidden;">
          <div style="min-height:28px;margin-top:5px;">{slots?.default()}</div>
        </div>
      );
    };
    const sevenNs = () => {
      return (
        <NSpace style={spaceStyle}>
          {new Array(7).fill(1).map(() => (
            <NSkeleton width={this.vars.icon.width} height={this.vars.icon.height} sharp={this.vars.sharp}></NSkeleton>
          ))}
        </NSpace>
      );
    };
    const addNs = () => {
      return (
        <NSpace style={spaceStyle}>
          <NButton text>
            <NIcon size={28}>
              <BiPlusSquareDotted></BiPlusSquareDotted>
            </NIcon>
          </NButton>
        </NSpace>
      );
    };
    const emptyNs = () => {
      return (
        <NSpace style={spaceStyle}>
          {new Array(7).fill(1).map(() => (
            <NSkeleton width={this.vars.icon.width} height={this.vars.icon.height} sharp={this.vars.sharp}></NSkeleton>
          ))}
        </NSpace>
      );
    };
    const avatar = (icon: string) => {
      return <NAvatar size={this.vars.avatar.width} style={this.vars.avatar.style} src={icon}></NAvatar>;
    };
    const header = (name: string) => {
      return <NH2 style={this.vars.header.style}>{name}</NH2>;
    };
    const description = (desc: string) => {
      return (
        <NEllipsis lineClamp={1} tooltip={false} expandTrigger="click" style={this.vars.description.style}>
          <NText depth={3}>{desc}</NText>
        </NEllipsis>
      );
    };
    const arrow = () => {
      return (
        <div style="position:absolute;right:-12px;top:4px;cursor: pointer;">
          <NButton text onClick={this.upClick} style={{ display: 'block', opacity: this.updown > 0 ? 1 : 0 }}>
            <NIcon size={14} depth="3">
              <BiArrowUpShort></BiArrowUpShort>
            </NIcon>
          </NButton>
          <NButton text onClick={this.downClick} style={{ display: 'block', opacity: this.updown < this.base.list.length - 1 ? 1 : 0 }}>
            <NIcon size={14} depth="3">
              <BiArrowDownShort></BiArrowDownShort>
            </NIcon>
          </NButton>
        </div>
      );
    };
    const iconList = () => {
      if (this.loading) {
        return (
          <iconsNs>
            <emptyNs></emptyNs>
          </iconsNs>
        );
      }
      if (this.base.list && this.base.list.length) {
        const getStyle = (cell: any) => {
          let style = {};
          if (this.$props.type == 'add') {
            style = {
              href: 'javascript:void(0);',
              style: { display: 'inline-block' },
            };
          } else if (this.$props.type == 'edit') {
            style = {
              href: 'javascript:void(0);',
              style: { display: 'inline-block', transition: ' all 0.25s', transform: cell.active ? 'translateY(-5px)' : null },
              onClick: () => this.activeMenu(cell),
            };
          } else {
            style = {
              href: cell.url || 'javascript:void(0);',
              target: cell.url ? '_blank' : null,
              style: { display: 'inline-block' },
              onClick: () => (cell.type ? this.addMenu() : null),
            };
          }
          return style;
        };
        const getCell = (cell: any) => {
          if (['edit'].includes(this.$props.type as string) && cell.type) {
            return null;
          } else {
            return h(NA, getStyle(cell), {
              default: () => <NAvatar size={28} src={cell.icon} style={{ '--n-color': cell.padding ? null : '#e5e5e5', padding: cell.padding ? null : '4px' }}></NAvatar>,
            });
          }
        };
        return (
          <>
            <div style="min-height: 33px;height: 33px;overflow: hidden;">
              <div style={{ transform: `translateY(-${this.updown * 33}px)`, transition: 'all 0.5s' }}>
                {this.base.list.map((item: any) => (
                  <div style="min-height:28px;margin-top:5px;">
                    <NSpace style={spaceStyle}>{item.map((cell: any) => getCell(cell))}</NSpace>
                  </div>
                ))}
              </div>
            </div>
            <arrow></arrow>
          </>
        );
      }
    };
    const headerExtra = () => {
      return (
        <NDropdown trigger="click" show={this.dropdownShow} options={this.dropdown} onSelect={this.dropdownSelect}>
          <NButton text>
            <NIcon size={14}>
              <BiUiChecksGrid onClick={() => (this.dropdownShow = true)}></BiUiChecksGrid>
            </NIcon>
          </NButton>
        </NDropdown>
      );
    };
    if (this.$props.type == 'create') {
      return (
        <NSpin show={this.loading} style="display:inline-block;">
          <NCard style={ncardStyle}>
            <NThing style={{ lineHeight: 0 }} contentStyle={descriptionStyle}>
              {{
                avatar: this.base.icon ? () => avatar(this.base.icon) : avatarNs,
                header: this.base.name ? () => header(this.base.name) : headerNs,
                description: this.base.desc ? () => description(this.base.desc) : descriptionNs,
                default: () => (
                  <iconsNs>
                    <addNs></addNs>
                  </iconsNs>
                ),
              }}
            </NThing>
          </NCard>
        </NSpin>
      );
    } else {
      return (
        <NSpin show={this.loading} style="display:inline-block;">
          <NCard style={ncardStyle}>
            <NThing style={{ lineHeight: 0 }} contentStyle={descriptionStyle}>
              {{
                avatar: this.base.icon ? () => avatar(this.base.icon) : avatarNs,
                header: this.base.name ? () => header(this.base.name) : headerNs,
                description: this.base.desc ? () => description(this.base.desc) : descriptionNs,
                'header-extra': this.$props.type ? null : () => headerExtra(),
                default: () => iconList(),
              }}
            </NThing>
          </NCard>
        </NSpin>
      );
    }
  },
});
