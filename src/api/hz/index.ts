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



/** 用户登录API */
export async function loginApi(options: Object) {
  return http(`/login`, {
    method: 'GET',
    ...(options || {}),
  });
}


/** 全部寸照类型API */
export async function inchTypesApi(options: Object) {
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

// 上传图片base64
export async function uploadBase64Api(options: Object) {
  // /img/upload2
  return http('/img/uploadbase64', {
    method: 'POST',
    ...(options || {}),
  })
}

// 上传图片
export async function upload2Api(options: Object) {
  // /img/upload2
  return http('/img/upload2', {
    method: 'POST',
    ...(options || {}),
  })
}


// 图片排版APi
export async function layoutApi(options: Object) {
  return http('/img/layout', {
    method: 'POST',
    ...(options || {}),
  })
}


// 订单信息API
export async function inchOrderApi(options: Object) {
  return http('/order/inchorder', {
    method: 'POST',
    ...(options || {}),
  })
}

// 订单详情API
export async function orderDetailApi(options: Object) {
  return http('/order/orderdetail', {
    method: 'POST',
    ...(options || {}),
  })
}


