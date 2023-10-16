import type { Route } from '@umijs/route-utils/dist/types';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    normalRouteFilter: (route: Route) => {
      return true;
      // if(currentUser?.userid === '1') {
      //   return true;
      // }
      // const privilege = currentUser?.privileges?.find((x) => x.path === route.path);
      // // if(currentUser?.userid === '4') return true;
      // return privilege && privilege.read;
      // // return true;
    }, // Only the routes included in the initialState are accessible
    allowWrite: (path: string) => {
      return true;
      // if(currentUser?.userid === '1') {
      //   return true;
      // }
      // const privilege = currentUser?.privileges?.find((x) => x.path === path);
      // // if(currentUser?.userid === '4') return true;
      // return privilege && privilege.write;
      // // return true;
    },
  };
}
export function getRefreshToken() {
  const authorityString = localStorage.getItem('cms-refresh-token');
  let token;
  try {
    if (typeof authorityString === 'string') {
      token = JSON.parse(authorityString);
    }
  } catch (e) {
    token = authorityString;
  }
  // if (typeof token === 'string') {
  //   return [token];
  // }
  return token;
}
export function setRefreshToken(jwt: string) {
  return localStorage.setItem('cms-refresh-token', JSON.stringify(jwt));
}
export function getAccessToken() {
  const authorityString = localStorage.getItem('cms-token');
  let token;
  try {
    if (typeof authorityString === 'string') {
      token = JSON.parse(authorityString);
    }
  } catch (e) {
    token = authorityString;
  }
  if (typeof token === 'string') {
    return [token];
  }
  return token;
}
export function setAccessToken(jwt: string) {
  return localStorage.setItem('cms-token', JSON.stringify(jwt));
}
