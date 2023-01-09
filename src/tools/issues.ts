import request from '@/tools/fetch';
import { formatComment } from '@/tools/format';
/**
 * 获得子菜单
 */
export const getComment = (url: string, cb?: any) => {
  return request('GET ' + url)
    .then((res: any) => res.json())
    .then((data: any[]) => {
      let arr: any[] = [];
      let ob = [];
      let oList: any[] = [];
      data.map((item: any) => {
        const content = formatComment(item.body);
        oList.push({ ...content, id: item.id });
      });
      oList.sort((a, b) => {
        return a.sort - b.sort;
      });
      cb && cb(oList);
      oList.map((item: any) => {
        arr.push(item);
        if (arr.length >= 7) {
          ob.push(arr);
          arr = [];
        }
      });
      if (arr.length) {
        ob.push(arr);
      }
      return ob;
    });
};

/**
 * 获取菜单
 */
export const getIssue = () => {
  return request('GET /repos/{owner}/{repo}/issues?sort=created&direction=asc&labels=menu', {
    owner: 'chendj89',
    repo: 'data',
  }).then((res) => res.json());
};

export {};
