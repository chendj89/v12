export const resetObj = (obj: any) => {
  let _obj: any = {};
  for (let attr in obj) {
    _obj[attr] = '';
  }
  return _obj;
};
export const addRaw = {
  name: '',
  icon: 'https://api.iconify.design/bi:plus-square-dotted.svg',
  desc: '',
  url: '',
  sort: 0,
  isAdd: true,
  padding: true,
  top:false,
};
/**
 * 菜单
 */
export const menuRaw = {
  name: '',
  icon: '',
  desc: '',
  url: '',
  sort: 0,
  padding: true,
  top: false,
};
/**
 * 菜单数组
 */
export const menuKeys = ['name', 'icon', 'desc', 'url', 'sort', 'padding', 'top'];
export const menuRules = {
  name: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
  icon: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
  desc: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
  url: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
  sort: {
    type: 'number',
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
};

/**
 * 基本信息·规则
 */
export const baseRules = {
  name: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
  icon: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
  desc: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
};
/**
 * 基本信息·key
 */
export const baseKeys = ['name', 'icon', 'desc', 'top'];
/**
 * 基本信息
 */
export const baseRaw = {
  name: '',
  icon: '',
  desc: '',
  top: 0,
};

export {};
