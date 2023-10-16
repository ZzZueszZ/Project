import { request } from '@umijs/max';

export async function upload(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return request('/api/v1/api/upload/image', {
    method: 'POST',
    data: formData,
  });
}
