import {request} from '@umijs/max';
import type {TableListParams, User} from './data.d';
import {emptyModel} from './data.d';

export async function query(params?: TableListParams, options?: { [key: string]: any }) {
  return request('/api/v1/api/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function remove(params: { id: number }, options?: { [key: string]: any }) {
  console.log('params', params)
  return request('/api/v1/api/users', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function findBy(
  params: { action: string; userId: number },
  options?: { [key: string]: any },
) {
  if (params.action === 'ADD')
    return new Promise(function (resolve) {
      resolve({value: emptyModel});
    });
  return request('/api/v1/api/users/findBy', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function findAllRoles() {
  return request('/api/v1/api/roles', {
    method: 'GET',
  });
}

export async function save(params: User, options?: Record<string, any>) {
  return request('/api/v1/api/users', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function changePassword(params: {
  userId: number,
  oldPassword: string,
  password: string,
  passwordConfirm: string
}, options?: Record<string, any>) {
  return request('/api/v1/api/users/change-password', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
