import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { CONFIG } from '../shared/config';
import { Partner } from '../shared/models/partner';

export const request = axios.create({
  baseURL: CONFIG.API_URL as string,
});

export const get = <T = any>(url: string, { headers, ...rest }: AxiosRequestConfig = {}): AxiosPromise<T> => {
  return request({
    method: 'GET',
    url,
    headers,
    ...rest,
  });
};

export const post = <T = any>(
  url: string,
  data?: any,
  { headers, ...rest }: AxiosRequestConfig = {},
): AxiosPromise<T> => {
  return request({
    method: 'POST',
    url,
    headers,
    data,
  });
};

export const put = <T = any>(
  url: string,
  data?: any,
  { headers, ...rest }: AxiosRequestConfig = {},
): AxiosPromise<T> => {
  return request({
    method: 'PUT',
    url,
    headers,
    data,
  });
};

export const deleteReq = <T = any>(url: string, { headers }: AxiosRequestConfig = {}): AxiosPromise<T> => {
  return request({
    method: 'DELETE',
    url,
    headers,
  });
};

export interface ApiGetResponse {
  items: Partner[];
  totalCount: number;
}

export interface SyncResponse {
  startedAt: string;
  elapsedSeconds: number;
  partnersCreated: number;
  partnersUpdated: number;
  partnersRemoved: number;
}
