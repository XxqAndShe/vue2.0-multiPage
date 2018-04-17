import SockJS from 'sockjs-client'

export default function initSocket (options, connectFn, errorFn) {
  const Stomp = require('stompjs/lib/stomp.js').Stomp
  const ws = new SockJS(process.env.SOCK_URL)
  const client = Stomp.over(ws)

  client.heartbeat.outgoing = 0
  client.heartbeat.incoming = 0

  const connect = function () {
    client.subscribe('/exchange/chh-MQ/Admin::' + options.id, function (data) {
      if (typeof connectFn === 'function') {
        connectFn(data.body)
      }
    })
  }

  const error = function (error) {
    setTimeout(() => {
      initSocket(options, connectFn, errorFn)
    }, options.reconnectTime || 3000)
    if (typeof errorFn === 'function') {
      errorFn(error)
    }
  }

  client.connect(options.acount, options.password, connect, error, '/')
}
