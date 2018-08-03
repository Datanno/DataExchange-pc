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
import React, { PureComponent } from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import './styles.less';

import BTPublishedAssets from './subviews/BTPublishedAssets'
import BTHaveBought from "./subviews/BTHaveBought"
import { FormattedMessage } from 'react-intl'
import messages from '../../../locales/messages'
const PersonalAssetMessages = messages.PersonalAsset;

import CustomTabBar from '@/components/CustomTabBar'


const keyMap = [
  <FormattedMessage {...PersonalAssetMessages.PublishedAsset} />,
  <FormattedMessage {...PersonalAssetMessages.HaveBoughtAsset} />,
]

export default class BTProfileAsset extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '0'
    };
  }
  handleChange = (key) => {
    this.setState({
      activeKey: key
    });
  }

  render(){
    if ( React.isValidElement(this.props.children) ) {
      return this.props.children
    }
    return(
      <div className='container column'>
        <CustomTabBar onChange={this.handleChange} keyMap={keyMap} activeKey={this.state.activeKey} />

        <Tabs className="tabs" activeKey={this.state.activeKey}>
          <TabPane tab={<FormattedMessage {...PersonalAssetMessages.PublishedAsset} />} key="0">
            <BTPublishedAssets/>
          </TabPane>
          <TabPane tab={<FormattedMessage {...PersonalAssetMessages.HaveBoughtAsset} />} key="1" >
            <BTHaveBought/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
