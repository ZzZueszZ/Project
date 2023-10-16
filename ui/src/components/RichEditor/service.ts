import request from 'umi-request';

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return request('/api/v1/api/upload/image', {
    method: 'POST',
    data: formData
  });
}
