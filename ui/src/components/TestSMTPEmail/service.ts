import request from 'umi-request';

export async function testSMTPEMail(params: any) {
  return request(`/api/v1/api/email/smtp/test`, {
    method: 'POST',
    data: params
  });
}
