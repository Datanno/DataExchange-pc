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

export const UPDATE_CACHED_BLOCKS = 'UPDATE_CACHED_BLOCKS'
export const UPDATE_LATEST_BLOCK = 'UPDATE_LATEST_BLOCK'
export const SET_NODE_INFOS = 'SET_NODE_INFOS'

export const updateCachedBlocks = (blocks) => {
    return {
        type: UPDATE_CACHED_BLOCKS,
        blocks
    }
}

export const updateLatestBlock = (block) => {
  // console.log('block', block);
    return {
        type: UPDATE_LATEST_BLOCK,
        block
    }
}

export const setNodeInfos = (infos) => {
  // console.log('block', block);
    return {
        type: SET_NODE_INFOS,
        infos
    }
}
