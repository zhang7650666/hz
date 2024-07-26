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
export async function inchTypesApi(options: Object) {
  return http('/inchTypes', {
    method: 'GET',
    ...(options || {}),
  });
}
