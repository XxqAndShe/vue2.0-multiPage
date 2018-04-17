const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function merge (o, p) {
  for (const k in p) {
    if (o.hasOwnProperty[k]) continue
    o[k] = p[k]
  }
  return o
}

export function extend (to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

// 倒计时
export function countDown (n, cb, context) {
  cb && cb(n)
  setTimeout(() => {
    n > 0 && !context._isDestroyed && countDown(--n, cb, context)
  }, 1000)
}

// 序列化
export function param (json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
          encodeURIComponent(json[key])
  })).join('&')
}

// 反序列
export function param2Obj (param) {
  if (!param) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(param).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}
