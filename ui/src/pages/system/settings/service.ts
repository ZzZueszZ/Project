import {request} from '@umijs/max';
import {Setting} from './data';

export async function getSettings(code: string) {
  return request(`/api/v1/api/configuration/${code}`)
}
export async function getSettingGroups() {
  return request('/api/v1/api/configuration/groups');
}
export async function update(code: string, params: Setting[]) {
  return request(`/api/v1/api/configuration/${code}/update`, {
    method: 'POST',
    data: {
      settingInfos: params
    }
  });
}
