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
import {connect} from 'react-redux'
import {setSpin} from '../../../../redux/actions/HeaderAction'
import PropTypes from 'prop-types';
import { Button, Input, Form, message, InputNumber, Col, Row } from 'antd'
import BTFetch from '../../../../utils/BTFetch';
import {getBlockInfo, getSignaturedFetchParam} from '@/utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
import BTIPcRenderer from "../../../../tools/BTIpcRenderer";
import BTNumberInput from '../../../../components/BTNumberInput'
import ConfirmButton from '@/components/ConfirmButton'
import { getWorker } from '@/workerManage'
import {transactionPack} from '../../../../lib/msgpack/BTPackManager'

import { SIGPOLL } from 'constants';
import * as BTCrypto from 'datanno-crypto-js'
const WalletMessages = messages.Wallet;
const FormItem = Form.Item;


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};


class Transaction extends PureComponent{
    constructor(props){
        super(props)
    }

    async onHandleSubmit(){
        let {resetFields} = this.props.form
        let account_name = this.props.account_name
        let blockInfo = await getBlockInfo()
        let localStorage = window.localStorage

        let accountInfo = JSON.parse(localStorage.account_info)
        let username = accountInfo.username
        const { getFieldDecorator,getFieldsValue,getFieldValue,setFields,setFieldsValue } = this.props.form;
        let fieldValues = getFieldsValue()

        let quantity = Number(fieldValues.quantity)
        if(!fieldValues.to){
            window.message.error(window.localeInfo["Wallet.PleaseEnterTheTargetAccount"])

            return}
        if(!quantity){
            window.message.error(window.localeInfo["Wallet.PleaseEnterTheMoneyToBeTransferred"])
            return}
        if(!fieldValues.password) {
            window.message.error(window.localeInfo["Wallet.PleaseEnterThePassword"])
            return}
        if(quantity<=0){
            window.message.error(window.localeInfo["Wallet.PleaseEnterAvalidTransferAmount"])
            return}
        let keyStoreResult = BTIPcRenderer.getKeyStore({username:username,account_name:account_name})
        let keyStoreObj = keyStoreResult.keyStoreObj
        // 开启遮罩
        this.props.setSpin(true)
        var myWorker = getWorker();
        let postData = {
          type: 'decryptKeystore',
          data: {password:fieldValues.password,keyStoreObj}
        }
        myWorker.postMessage(postData);
        myWorker.onmessage = (e)=>{
            let data = e.data
            let privateKeyStr = data.privateKey
            let privateKey = Buffer.from(privateKeyStr,'hex')
            let did = {
                "from": account_name,
                "to": fieldValues.to,
                "price": quantity * Math.pow(10,8),
                "remark": "April's rent"
            }
            let didBuf = transactionPack(did)
            let fetchParam = {
            "version": 1,
            ...blockInfo,
            "sender": account_name,
            "contract": "datanno",
            "method": "transfer",
            "sig_alg": 1
            }

            fetchParam.param = didBuf
            getSignaturedFetchParam({fetchParam, privateKey})
            let url = '/user/transfer'
            BTFetch(url,'POST', fetchParam)
            .then(res=>{
              if (!res) {
                throw new Error('transfer error')
              }
              if (res.code == 1) {
                  message.success(window.localeInfo["Wallet.SuccessfulToTransferAccounts"])
                  this.props.balanceReduce(quantity)
                  resetFields()
              } else if (res.code == 10102) {
                  message.error(window.localeInfo["Wallet.TheTargetAccountIsInexistence"])
              }
              this.props.setSpin(false)
            }).catch(error=>{
              message.error(window.localeInfo["Wallet.FailedToTransferAccounts"])
              this.props.setSpin(false)
            })
        }

        myWorker.onerror = (e)=>{
            message.error(window.localeInfo["Wallet.TheWrongPassword"])
            this.props.setSpin(false)
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='transaction-form-container route-children-bg'>
              <Form onSubmit={()=>this.onHandleSubmit()} style={{marginTop: 25}}>
                <Row>
                  <Col span='18'>
                    <FormItem label={<FormattedMessage {...WalletMessages.TargetAccount}/>} {...formItemLayout}>
                      {getFieldDecorator('to', {
                        rules: [{ required: true, message: '请填写对方账号!' }],
                      })(<Input />)}
                    </FormItem>

                    <FormItem label={<FormattedMessage {...WalletMessages.TransferAmount}/>} {...formItemLayout} onValuesChange={console.log("onValuesChange")}>
                      {getFieldDecorator('quantity', { rules: [{ required: true, message: '请填写转账金额!' }], })(
                        <BTNumberInput />
                      )}
                      {/* <div><span style={{color:'purple',fontSize:20,marginLeft:10}}>{this.props.coinName}</span></div> */}
                    </FormItem>

                    <FormItem label={<FormattedMessage {...WalletMessages.Password}/>} {...formItemLayout}>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请填写账号密码!' }],
                      })(<Input type="password"/>)}
                    </FormItem>
                  </Col>
                  <Col span='6'>
                    <div className="container marginRight" style={{ height: 100, paddingTop: 60, paddingLeft: 30 }}>
                        <ConfirmButton onClick={()=>this.onHandleSubmit()}>
                            <FormattedMessage {...WalletMessages.Submit}/>
                        </ConfirmButton>
                    </div>
                  </Col>
                </Row>
                  {/**<FormItem label={<FormattedMessage {...WalletMessages.Password}/>} {...formItemLayout}>
                      {getFieldDecorator('password', {
                          rules: [{ required: true, message: '请填写账户密码!' }],
                      })(<Input type="password"/>)}
                  </FormItem>**/}
              </Form>
            </div>
        )
    }
}

const TransactionForm = Form.create()(Transaction)

const mapDispatchToProps = (dispatch) => {
    return {
        setSpin(isloading) {
          dispatch(setSpin(isloading))
        }
    }
}

export default connect(null,mapDispatchToProps)(TransactionForm)
