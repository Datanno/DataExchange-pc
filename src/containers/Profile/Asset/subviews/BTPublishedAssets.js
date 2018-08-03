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
import React,{PureComponent} from 'react'
import { Icon } from 'antd';
import { getSignaturedParam } from "../../../../utils/BTCommonApi";
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import {getAccount} from "../../../../tools/localStore";
import { getDateAndTime } from '@/utils/dateTimeFormat'
import { BTDownloadFile } from '@/utils/BTDownloadFile'
import { selectType } from '@/utils/keyMaps'
import TokenPNG from '@/components/TokenPNG'
import BTTable from '@/components/BTTable'

const PersonalAssetMessages = messages.PersonalAsset;

const columns = [
  {
    title: <FormattedMessage {...PersonalAssetMessages.AssetName}/>,
    dataIndex: 'asset_name',
    render: (item) => {
      return <span title={item}>
         {item.length < 25? item:item.substring(0,25)+'...'}
      </span>
    }
  },
  {
    title: <FormattedMessage {...PersonalAssetMessages.ExpectedPrice}/>,
    dataIndex: 'price',
    render: (price) => <div>
      <TokenPNG />
      <span>{price/Math.pow(10, 8)}</span>
    </div>
  },
  {
    title: <FormattedMessage {...PersonalAssetMessages.ExpireTime}/>,
    dataIndex: 'expire_time',
    render: getDateAndTime
  },
  {
    title: <FormattedMessage {...PersonalAssetMessages.AssetType}/>,
    dataIndex: 'asset_type',
    render: asset_type => selectType[asset_type]
  },
  { title: <FormattedMessage {...PersonalAssetMessages.Download} />, dataIndex: 'storage_hash',
    render: (text) => <a onClick={()=> BTDownloadFile(text, getAccount().username)}>
        <Icon type="download" style={{color:"black",fontWeight:900}} />
    </a>
  }
]


// "assetType": 0,

function BTPublishedAssets(props) {
  return <BTTable
    columns={columns}
    rowKey='asset_id'
    url='/asset/queryMyAsset'
    options={getSignaturedParam(getAccount())}
    catchError={(err) => message.error(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])}
    {...props}
  />
}

export default BTPublishedAssets
