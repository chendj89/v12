const avatar = (props: any, ctx: any) => {
  return <div {...props}>{ctx.slots?.default()}</div>;
};
export default defineComponent({
  name: 'VMenu3',
  props: {
    /**
     * 是否有修改权限
     */
    auth: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    watch(
      () => props,
      () => {
        hasAuth.value=props.auth;
      },
      {
        deep: true,
      }
    );
    const hasAuth = ref(props.auth);
    
    const vars = ref({
      width: 48,
      height: 48,
      style: { background: 'transparent' },
    });
    const click = () => {
      console.log(1);
    };
    return {
      vars,
      click,
      hasAuth,
    };
  },
  render() {
    console.log(this.hasAuth);
    
    return (
      <div>
        <div>{this.hasAuth?1:0}</div>
        <avatar onClick={this.click} {...this.vars}>
          111
        </avatar>
      </div>
    );
  },
});
