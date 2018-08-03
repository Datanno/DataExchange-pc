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
import {Popconfirm,Table, Upload, Icon, message} from 'antd';
import BTFetch from "../../../../utils/BTFetch"
import {FormattedMessage} from 'react-intl'
import messages from '../../../../locales/messages'
const PersonalDemandMessages = messages.PersonalDemand;
const Dragger = Upload.Dragger;

const props = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            window.message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            window.message.error(`${info.file.name} file upload failed.`);
        }
    },
};



export default class BTMyAssetSet extends PureComponent{
    constructor(props){
        super(props);
        this.columns = [
            { title: 'sampleName', dataIndex: 'sampleName' },
            { title: 'sampleSize', dataIndex: 'sampleSize' },
            { title: 'Date', dataIndex: 'date', },
            { title: "Download", dataIndex: '', key: 'x',
              render: () =>
                <a>
                    <Icon type="download" style={{color:"black",fontWeight:900}}/>
                </a>
            },
            { title: 'Delete', dataIndex: 'delete',
                render: (text, record) => {
                    return (
                        // this.state.dataSource.length > 1 ?
                        //     (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                            <a href="#" style={{color:"#6d6df5"}}>Delete</a>
                        </Popconfirm>
                        // ) : null
                    );
                },
            },
        ];

        const data = [];
        for (let i = 0; i < 7; ++i) {
            data.push({
                key: i,
                sampleName:"samples.zip",
                sampleSize:"3M",
                date: '2018-01-15 23:12:00',
            });
        }

        this.state = {
            data,
        }
    }

    onDelete(key){
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.key !== key) });
    }
    componentDidMount() {
       /* BTFetch("","post",{}).then(data=>{
            console.log(data)
        })*/
    }

    render(){
        const { data } = this.state;
        const columns = this.columns;
        return(
            <div className="set">
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p style={{color:"#666666"}} className="ant-upload-text">
                        <FormattedMessage {...PersonalDemandMessages.ClickOrDragFileToThisAreaToUpload}/>
                    </p>
                </Dragger>
                <Table
                    columns={columns}
                    dataSource={data}
                    className="shadow radius table"
                />
            </div>
        )
    }
}
