import type {RequestConfig, RequestOptions} from '@@/plugin-request/request';
import {message, notification} from 'antd';
import {getAccessToken, getRefreshToken, setAccessToken, setRefreshToken} from '@/access';
import {getLocale} from '@@/plugin-locale';
import moment from 'moment';
import {
  // RequestInterceptor,
  RequestOptionsInit,
  // ResponseError
} from "umi-request";
import Reqs from 'umi-request';
import {refreshAccessToken} from "@/services/ant-design-pro/api";
import {request as requestUmi} from 'umi';

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

const {cancel} = Reqs.CancelToken.source();

let refreshTokenRequest: Promise<API.LoginResult> | null = null;
const responseInterceptor = async (
  response: any,
) => {
  console.log('responseInterceptor', response)
  const accessTokenExpired = response.status === 401;
  if (accessTokenExpired) {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshTokenRequest) {
        refreshTokenRequest = refreshAccessToken({refreshToken});
      }
      // multiple requests but "await"ing for only 1 refreshTokenRequest, because of closure
      const res = await refreshTokenRequest;
      if (!res) throw new Error();
      if (res.accessToken) setAccessToken(res.accessToken);
      if (res.refreshToken) setRefreshToken(res.refreshToken);
      return requestUmi(
        response.url, {
          baseURL: API_URL,
        }
      );
    } catch (err) {
      setAccessToken("");
      setRefreshToken("");
      cancel('Session time out.');
      throw err;
    } finally {
      refreshTokenRequest = null;
    }
  }

  return response;
};
export const errorConfig: RequestConfig = {
  errorConfig: {
    errorThrower: (res) => {
      const {success, data, errorCode, errorMessage, showType} =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage || '');
        error.name = 'BizError';
        error.info = {errorCode, errorMessage, showType, data};
        throw error;
      }
    },
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const {errorMessage, errorCode} = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        if (error?.response?.data?.messageCode === 'APP201') {
          notification.error({
            message: 'APP201',
            description: 'Email\'s exist'
          });
        } else if (error?.response?.data?.messageCode === 'APP202') {
          notification.error({
            message: 'APP202',
            description: 'Username\'s exist'
          });
        } else if (error?.response?.data?.messageCode === 'APP001') {
          notification.error({
            message: 'APP001',
            description: 'Customer ID not found.'
          });
        } else if (error?.response?.data?.messageCode === 'APP003') {
          notification.error({
            message: 'APP003',
            description: 'Customer ID, Ticket are exists.'
          });
        } else if (error?.response?.data?.messageCode === 'APP004') {
          notification.error({
            message: 'APP004',
            description: 'Customer ID, Ticket, Package  are exists.'
          });
        } else if (error?.response?.data?.messageCode === 'APP005') {
          notification.error({
            message: 'APP005',
            description: 'Customer ID, Ticket, Package  are exists.'
          });
        } else {
          notification.error({
            message: error?.response?.data?.messageCode || '000000',
            description: error?.response?.data?.message || 'Please, call sysadmin'
          });
        }
      } else if (error.request) {
        message.error('None response! Please retry.');
      } else {
        message.error('Request error, please retry.');
      }
    },
  },

  requestInterceptors: [
    (config: RequestOptions) => {
      const url = config?.url;
      return {
        ...config,
        url,
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          'Client-Time': `${moment().format()}`,
          'Accept-Language': getLocale(),
        },
      };
    },
  ],

  responseInterceptors: [
    //Write a function directly as an interceptor
    (response) => {
      // There is no need for asynchronous processing to read the return body content. It can be read directly in data. Some fields can be found in config.
      const {data = {} as any, config} = response;
      // do something
      console.log('responseInterceptors1 -> data', data, 'config', config)

      return response
    },
    // A tuple, the first element is the request interceptor, the second element is the error handler
    [(response) => {
      console.log('responseInterceptors2 -> 1 -> data', response)
      return response
    }, async (error) => {
      console.log('responseInterceptors2 -> 2 -> data', error)
      if (error?.response) {
        return await responseInterceptor(error?.response)
      }
      return new Promise(error)
    }],
    // Array, omit error handling
    [(response) => {
      console.log('responseInterceptors3 -> 1 -> data', response)

      return response
    }]
  ]
};
