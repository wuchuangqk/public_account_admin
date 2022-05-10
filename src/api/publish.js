import request from '@/utils/request'
import qs from 'qs';

// 获取发布内容列表
export function getPublishList(data) {
  return request({
    url: '/v41/gzh/list',
    method: 'post',
    data: qs.stringify(data),
  })
}

// 添加发布内容
export function savePublish(data) {
  return request({
    url: '/v41/gzh/addInfo',
    method: 'post',
    data: qs.stringify(data),
  })
}

// 发送模板消息
export function sendTemplate(data) {
  return request({
    url: '/v41/gzh/sendMsg',
    method: 'post',
    data: qs.stringify(data),
  })
}