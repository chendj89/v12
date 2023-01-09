/**
 * 请求
 * @param url
 * @param params
 * @returns
 */
export default async function request(url: string, params: any = {}) {
  let [method, partUrl] = url.split(' ');
  let link = '';
  let base = 'https://api.github.com';
  if (partUrl.startsWith('http')) {
    link = partUrl;
  } else {
    for (let attr in params) {
      if (partUrl.includes(`${attr}`)) {
        partUrl = partUrl.replace(`{${attr}}`, params[attr]);
      }
    }
    link = base + partUrl;
  }
  let token = '';
  if(localStorage.getItem('auth')){
    token=`token ${localStorage.getItem('auth')}`;
  }
  const headers = {
    Authorization: token,
  };
  // params.headers = headers;
  params.cache = 'no-cache';
  params.method = method.trim().toUpperCase();
  return await fetch(link, params);
}
