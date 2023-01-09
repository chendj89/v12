import { NCard, NThing, NSpin, NSkeleton, NSpace, NAvatar, NH2, NEllipsis, NButton, NIcon, NDropdown, NPopconfirm, NA } from 'naive-ui';
import BiUiChecksGrid from '~icons/bi/ui-checks-grid';
import BiBadge3d from '~icons/bi/badge-3d';
import BiPlusSquareDotted from '~icons/bi/plus-square-dotted';
import BiXCircleFill from '~icons/bi/x-circle-fill';
import BiArrowUpShort from '~icons/bi/arrow-up-short';
import BiArrowDownShort from '~icons/bi/arrow-down-short';
import BiGear from '~icons/bi/gear';
import request from '@/tools/fetch';
import useDialog from '@/tools/useDialog';
import addTpl from '@/components/modal/add.vue';
import editTpl from '@/components/modal/edit.vue';
import formatBody from '@/tools/formatBody';

const ncardStyle = {
  '--n-padding-left': '10px',
  '--n-padding-bottom': '10px',
};
const spaceStyle = {
  lineHeight: 0,
  gap: '8px 10px',
};
const descriptionStyle = {
  marginTop: '5px',
  position: 'relative',
};
export default defineComponent({
  props: ['data', 'readonly', 'edit', 'create'],
  setup(props, ctx) {
    const ins = getCurrentInstance();
    // 变量
    const loading = ref(false);
    const loaded = ref(false);
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
        width: 105,
        height: 28,
        style: { lineHeight: '28px', height: '28px', margin: 0 },
      },
      description: {},
      // 图标
      icon: {
        width: 28,
        height: 28,
      },
    });
    const dropdown = ref([
      {
        label: '添加',
        key: 'add',
        icon: () => h(BiPlusSquareDotted),
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
              },
              onNegativeClick: () => {
                dropdownShow.value = false;
              },
            },
            { default: () => '是否关闭当前问题', trigger: () => '关闭' }
          ),
        key: 'closed',
        icon: () => h(BiXCircleFill),
      },
    ]);
    const dropdownShow = ref(false);
    const dropdownSelect = (key) => {
      if (key === 'closed') {
        // deleteIssue().then((res) => {
        //   if (res.status == 200) {
        //     // 删除成功
        //     location.reload();
        //   }
        // });
      } else if (key == 'add') {
        dropdownShow.value = false;
        useDialog({
          ins,
          com: addTpl,
          data: {
            title: '添加',
            base: base.value,
          },
        });
      } else if (key == 'edit') {
        dropdownShow.value = false;
        useDialog({
          ins,
          com: editTpl,
          data: {
            title: '编辑',
            base: base.value,
          },
        });
      } else {
        dropdownShow.value = false;
      }
    };

    const deleteIssue = () => {
      return request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        owner: 'chendj89',
        repo: 'data',
        issue_number: base.value.number,
        body: JSON.stringify({
          state: 'closed',
        }),
      });
    };
    const base = ref({});
    const list = ref([]);
    const listLast = ref({
      name: '',
      icon: 'https://api.iconify.design/bi:plus-square-dotted.svg?color=%231a7f37',
      desc: '',
      url: '',
      sort: 0,
      padding: true,
    });
    const updateIcon = (value) => {
      let len = list.value.length;
      if (len) {
        let last = list.value[len - 1].length;
        if (last) {
          list.value[len - 1][last - 1] = value;
        }
      }
    };
    const updateBase=(value)=>{
      base.value=value;
    };
    const removeCache = () => {};
    ctx.expose({
      updateIcon,
      removeCache,
    });
    /**
     * 获取评论
     */
    const getComment = () => {
      return request('GET /repos/{owner}/{repo}/issues/{issue_number}/comments', {
        owner: 'chendj89',
        repo: 'data',
        issue_number: base.value.number,
      }).then((res) => res.json());
    };
    const sortComment = (data) => {
      let oList = data.map((item) => {
        return {
          ...formatBody(item.body).code,
          id: item.id,
        };
      });
      oList.sort((a, b) => {
        if (a.sort == b.sort) {
          return 0;
        } else {
          return a.sort - b.sort;
        }
      });

      if (props.readonly) {
        oList.push(listLast.value);
      }

      let arr = [];
      let arr2 = [];
      oList.map((item) => {
        if (arr.length >= 7) {
          arr2.push(arr);
          arr = [];
        }
        arr.push(item);
      });
      if (arr.length) {
        arr2.push(arr);
        arr = [];
      }
      list.value = arr2;
    };

    /**
     * 上下滚动
     */
    const updown = ref(0);
    const upClick = () => {
      if (updown.value > 0) {
        updown.value--;
      }
    };
    const downClick = () => {
      if (updown.value < list.value.length - 1) {
        updown.value++;
      }
    };
    watchEffect(() => {
      if (props.readonly) {
        updown.value = list.value.length ? list.value.length - 1 : 0;
      }
    });
    const editClick = (val) => {
      ctx.emit('editFn', val);
    };
    onMounted(async () => {
      base.value = props.data;
      loaded.value = true;
      if (!props.create) {
        loading.value = true;
        let res = await getComment();
        sortComment(res);
        loading.value = false;
      }
    });
    return {
      loading,
      loaded,
      vars,
      base,
      list,
      dropdown,
      dropdownShow,
      dropdownSelect,
      updown,
      upClick,
      downClick,
      editClick,
    };
  },
  render() {
    // 已加载
    if (this.loaded) {
      return (
        <NSpin show={this.loading} style="display:inline-block;width:280px">
          <NCard style={ncardStyle}>
            <NThing style={{ lineHeight: 0 }} contentStyle={descriptionStyle}>
              {{
                avatar: () => <NAvatar size={this.vars.avatar.width} style={this.vars.avatar.style} src={this.base.body.code.icon}></NAvatar>,
                header: () => <NH2 style={this.vars.header.style}>{this.base.body.code.name}</NH2>,
                description: () => (
                  <NEllipsis lineClamp={1} tooltip={false} expandTrigger="click" style={this.vars.header.style}>
                    {this.base.body.code.desc}
                  </NEllipsis>
                ),
                'header-extra':
                  this.$props.readonly || this.$props.edit
                    ? null
                    : () => (
                        <NDropdown show={this.dropdownShow} trigger="click" options={this.dropdown} onSelect={this.dropdownSelect}>
                          <NButton text>
                            <NIcon size={14}>
                              <BiUiChecksGrid onClick={() => (this.dropdownShow = true)}></BiUiChecksGrid>
                            </NIcon>{' '}
                          </NButton>
                        </NDropdown>
                      ),
                default: () => (
                  <>
                    <div style="min-height: 33px;height: 33px;overflow: hidden;">
                      {this.list.length ? (
                        <div style={{ transform: `translateY(-${this.updown * 33}px)`, transition: 'all 0.5s' }}>
                          {this.list.map((item) => (
                            <div style="min-height:28px;margin-top:5px;">
                              <NSpace style={spaceStyle}>
                                {item.map((cell) =>
                                  cell.icon ? (
                                    h(
                                      NA,
                                      this.$props.readonly
                                        ? {
                                            href: 'javascript:void(0);',
                                            target: null,
                                            style: { display: 'inline-block' },
                                          }
                                        : this.$props.edit
                                        ? {
                                            href: 'javascript:void(1);',
                                            target: null,
                                            style: { display: 'inline-block' },
                                            onClick: () => {
                                              this.editClick(cell);
                                            },
                                          }
                                        : {
                                            href: cell.url || 'javascript:void(0);',
                                            target: cell.url && '_blank',
                                            style: { display: 'inline-block' },
                                          },
                                      {
                                        default: () => (
                                          <NAvatar
                                            size={28}
                                            src={cell.icon}
                                            style={{ '--n-color': cell.padding ? null : '#e5e5e5', padding: cell.padding ? null : '4px' }}
                                          ></NAvatar>
                                        ),
                                      }
                                    )
                                  ) : (
                                    <NAvatar size={28} src={cell.icon}></NAvatar>
                                  )
                                )}
                              </NSpace>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style="min-height:28px;margin-top:5px;">
                          <NSpace style={spaceStyle}>
                            {new Array(7).fill(1).map(() => (
                              <NSkeleton width={28} height={28} sharp={false}></NSkeleton>
                            ))}
                          </NSpace>
                        </div>
                      )}
                    </div>
                    {this.list.length > 1 ? (
                      <div style="position:absolute;right:-11px;top:4px;cursor: pointer;">
                        <NButton text onClick={this.upClick} style={{ display: 'block', opacity: this.updown > 0 ? 1 : 0 }}>
                          <NIcon size={14} depth="3">
                            <BiArrowUpShort></BiArrowUpShort>
                          </NIcon>
                        </NButton>
                        <NButton text onClick={this.downClick} style={{ display: 'block', opacity: this.updown < this.list.length - 1 ? 1 : 0 }}>
                          <NIcon size={14} depth="3">
                            <BiArrowDownShort></BiArrowDownShort>
                          </NIcon>
                        </NButton>
                      </div>
                    ) : null}
                  </>
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
            <NThing style={{ lineHeight: 0 }}>
              {{
                avatar: () => <NSkeleton width={this.vars.avatar.width} height={this.vars.avatar.height} sharp={this.vars.sharp}></NSkeleton>,
                header: () => <NSkeleton width={this.vars.header.width} height={this.vars.header.height} sharp={this.vars.sharp}></NSkeleton>,
                description: () => <NSkeleton width={this.vars.header.width * 2} height={this.vars.header.height} sharp={this.vars.sharp}></NSkeleton>,
                default: () => (
                  <NSpace>
                    {new Array(7).fill(1).map(() => (
                      <NSkeleton width={this.vars.icon.width} height={this.vars.icon.height} sharp={this.vars.sharp}></NSkeleton>
                    ))}
                  </NSpace>
                ),
              }}
            </NThing>
          </NCard>
        </NSpin>
      );
    }
  },
});
