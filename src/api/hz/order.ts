// @ts-ignore
/* eslint-disable */
import { http } from '../http';


/** 全部寸照类型API */
export async function readOrderList(options: Object) {
  return http('/order/inchorder', {
    method: 'POST',
    ...(options || {}),
  });
}
