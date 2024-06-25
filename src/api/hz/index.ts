// @ts-ignore
/* eslint-disable */
import { http } from '../http';

/** 接口实例 */
export async function test(
  body: {},
  options?: {},
) {
  return http(
    `xxxxx`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}


/** 全部寸照类型API */
export async function inchtypesApi(options: Object) {
  return http('/inchtypes', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 寸照详情API */
export async function inchdetailApi(options: Object) {
  return http('/inchdetail', {
    method: 'GET',
    ...(options || {}),
  });
}

// 上传图片
export async function inchUploadApi(options: Object) {
  // /img/upload2 
  return http('/img/uploadbase64', {
    method: 'POST',
    ...(options || {}),
  })
}


// 热词殂
export async function getHotwordList (options?: Object) {
  return http('/searchhotwords', {
    method: 'GET',
    ...(options || {}),
  });
}


// 模版搜索
export async function getSearchList(options: Object) {
  return http('/inchsearch', {
    method: 'GET',
    ...(options || {}),
  });
}
