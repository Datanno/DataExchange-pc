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
import * as actionTypes from '../consts/HeaderConst'

// // 设置地点
export const setLocale = (locale) => {
    return {
        type: actionTypes.SET_LOCALE,
        locale
    }
}

export const setAccountInfo = (info) => {
  return {
    type: actionTypes.SET_ACCOUNT_INFO,
    info
  }
}

export const setSpin = (isloading) => {
  return {
    type: actionTypes.SET_SPIN,
    isloading
  }
}
