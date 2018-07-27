const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getLastDay = num => {
  const date = new Date()
  const time = date.getTime() - num * 24 * 3600000
  const newDate = new Date(time)
  const y = newDate.getFullYear()
  const m = newDate.getMonth() + 1
  const d = newDate.getDate()

  return [y, m, d].map(formatNumber).join('')
}

module.exports = {
  formatTime: formatTime,
  getLastDay: getLastDay
}
