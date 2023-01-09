export interface IVMenu {
  /**
   * 名称
   */
  name: string;
  /**
   * 头像
   */
  icon: string;
  /**
   * 描述
   */
  desc: string;
  /**
   * 链接
   */
  url: string;
  /**
   * 圆角
   */
  padding: boolean;
  /**
   * 排序
   */
  sort:number;
  /**
   * 下级
   */
  list?: IVMenu[];
  [props: string]: any;
}
