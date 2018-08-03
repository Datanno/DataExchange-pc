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
import {bindActionCreators} from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './styles.less'
import * as headerActions from '../redux/actions/HeaderAction'
import { updateFileList } from '../redux/actions/uploaderAction'
import {Button, Modal, Menu, Dropdown, Icon } from 'antd'
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';
import BTFetch from '../utils/BTFetch'
import {importFile,exportFile} from '../utils/BTUtil'
import BTIpcRenderer from '../tools/BTIpcRenderer'
import messages from "../locales/messages";
const HeaderMessages = messages.Header;
const MenuMessages = messages.Menu;

// const pkg = require('../../package.json')

class BTHeader extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            visible:true,
        }

        this.checkAccount = this.checkAccount.bind(this)
    }

    checkAccount(e) {
      message.destroy()
      if( this.props.account_info == null ) {
        // 如果未登录，则提示
        message.info(window.localeInfo["Header.PleaseLogInFirst"]);
        return e.preventDefault()
      }
    }

    logout = () => {
      this.props.setAccountInfo(null)
      this.props.updateFileList([])
      window.message.success(window.localeInfo["Header.SuccessToLogOut"]);
    }

    menu() {
        return <Menu>
            <Menu.Item key="1">
              <a href="#" onClick={this.logout}>
                  <FormattedMessage {...HeaderMessages.Logout}/>
              </a>
            </Menu.Item>
        </Menu>
    }

    importKeyStore(){
        let keyStore = BTIpcRenderer.importFile()
        BTIpcRenderer.saveKeyStore('keystore',keyStore)
    }

    exportKeyStore(){
        // 从本地取出keystore文件
        let keyStore = BTIpcRenderer.getKeyStore('keystore')
        exportFile(keyStore.result,'keystore.bto')

    }

    keyStoreMenu(){
        return(
            <Menu>
                <Menu.Item key="1"><a href="#"  className="file" onClick={()=>this.importKeyStore()}>
                    <FormattedMessage {...HeaderMessages.ImportKeystore}/>
                </a></Menu.Item>
                <Menu.Item key="2"><a href="#" className="file" onClick={()=>this.exportKeyStore()}>
                    <FormattedMessage {...HeaderMessages.ExportKeystore}/>
                </a></Menu.Item>
            </Menu>
        )
    }

    setLocale = () => {
        let storage = window.localStorage;
        let locale = storage.getItem('locale');
        if(locale == 'en-US'){
            storage.setItem('locale','zh-CN')
            this.props.setLocale('zh-CN')
        }else{
            storage.setItem('locale','en-US')
            this.props.setLocale('en-US')
        }
        // 主动刷新当前页面
        window.location.reload()

    }

    render() {
      // console.log('btheader render');
        const { account_info } = this.props
        return(
            <div className="container header">
              {/* <div style={{position: 'absolute', top: 0, right: 10}}>v: {pkg.version}</div> */}

                <div className="logoStyle">
                    <img src="./img/logo.svg" alt=""/>
                </div>

                <div className="loginBtnStyle">
                  <Link to='/publishAsset' onClick={this.checkAccount} >
                    <img src='./img/publishAsset.svg' />
                    <FormattedMessage {...HeaderMessages.PublishAsset}/>
                  </Link>
                  <Link to='/publishDemand' onClick={this.checkAccount}>
                    <img src='./img/publishDemand.svg' />
                    <FormattedMessage {...HeaderMessages.PublishDemand}/>
                  </Link>
                  {
                    account_info != null
                    ?
                    <div className="center">
                      <Dropdown overlay={this.menu()}>
                        <div className='header-username'>{account_info.username}</div>
                        {}
                      </Dropdown>
                    </div>
                    :

                    <Link to='/loginOrRegister'>
                      <div className='flex center' style={{width: 47, height: 47}}>
                        <img src='./img/profile.svg' />
                      </div>
                      <FormattedMessage {...MenuMessages.LoginOrRegister}/>
                    </Link>

                  }

                  <Link to='/profile/wallet' onClick={this.checkAccount}>
                    <img src='./img/wallet.svg' />
                    <FormattedMessage {...MenuMessages.Wallet} />
                  </Link>

                  <Link to='/profile/check' onClick={this.checkAccount}>
                    <img src='./img/check.svg' />
                    <FormattedMessage {...MenuMessages.MyMessages} />
                  </Link>

                </div>
                <div className='switch-locate'>
                  <Button onClick={this.setLocale}>
                    {(this.props.locale == 'en-US') ? '中文' : 'English'}
                  </Button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
  const { account_info, locale } = state.headerState
  return { account_info, locale }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...headerActions, updateFileList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BTHeader)
