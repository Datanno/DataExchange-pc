/*
  Copyright 2017~2022 The Datanno Authors
  This file is part of the Datanno Data Exchange Client
  Created by Developers Team of Datanno.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Datanno. If not, see <http://www.gnu.org/licenses/>.
*/
function isUnixTime(time) {
  // console.log('time', time);
  let _time = time.toString()
  // console.log('_time', _time);
  if (_time.length == 10 && _time.startsWith('1')) {
    return true;
  }
  return false;
}

export function getDateAndTime(dataString) {
  if (dataString == undefined) {
    return ''
  }
  if (isUnixTime(dataString)) {
    // console.log('dataString', dataString);
    dataString = dataString * 1000
  }
  var d = new Date(dataString)
  return d.toLocaleDateString() + ' ' + d.toTimeString().slice(0, 8)
}

export function get_ms_short() {
  let ms = new Date().getTime()
  return parseInt(ms.toString().slice(8))
}
