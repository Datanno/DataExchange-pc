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
import React, { Component, PureComponent } from 'react';
import { deleteFile, updateFile } from '@/redux/actions/uploaderAction'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Icon, Popconfirm } from 'antd'
import { FormattedMessage } from 'react-intl'
import uploader from '../uploader'
import { deleteFileCache } from '@/utils/uploadingFileCache'

import _File from 'webuploader/lib/file'
import WUFile from 'webuploader/file'
// console.log('_File, WUFile', _File, WUFile);

import messages from '@/locales/messages'
const PersonalAssetMessages = messages.PersonalAsset


function BeforeIcon({percent, status}) {
  if (percent == 100 || status == 'done') {
    return <Icon type="check" />
  } else if (status == 'uploading') {
    return <Icon type="loading" />;
  } else if (status == 'error') {
    return <Icon type="exclamation-circle-o" />
  }
}

function PlayAndPauseIcon({status}) {
  switch (status) {
    case 'inited':
      return <Icon type="clock-circle-o" />
    case 'uploading':
      return <Icon type="pause" />
    case 'done':
      return null
    default:
      return <Icon type="play-circle-o" />
  }
}

class UploadingFile extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteFileFormList = this.deleteFileFormList.bind(this)
    this.handlePlayOrPause = this.handlePlayOrPause.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  deleteFileFormList() {
    const { deleteFile, id } = this.props
    deleteFile(id)
    if (uploader.getFiles().some(file => file.id == id)) {
      uploader.removeFile(id)
    }
  }

  handlePlayOrPause(e) {
    const { id, status, updateFile } = this.props
    let info = Object.assign({}, this.props)
    delete info.updateFile
    delete info.deleteFile
    if (status == 'uploading') {
      uploader.stop(id)
      updateFile({...info, status: 'interrupt'})
    } else if (status == 'error') {
      // let file = uploader.getFiles().find(file => file.id == id)
      // if (!file) {
      //
      // }
      // uploader.retry(file)
    } else if (status == 'interrupt' ) {
      uploader.upload(id)
      updateFile({...info, status: 'uploading'})
    } else if (status == 'cache') {
      // console.log('cache file info', info);
      uploader.upload(id)
    }
  }

  handleClose(e) {
    e.stopPropagation()
    const { deleteFile, id, status, percent } = this.props
    // console.log('status', status);
    if (status == 'uploading' && percent != 100) {
      return ;
    }
    deleteFile(id)
    deleteFileCache(id)
    // if (uploader.getFiles().findIndex(f => f.id == id) != -1) {
      uploader.cancelFile(id)
    // }
  }

  render() {
    let { name, status, percent, cache, progressing_slice_chunk, hashList } = this.props
    if (cache && percent < 90) {
      let remanentRate = progressing_slice_chunk.length / hashList.length
      let hasDoneRate = 1 - remanentRate
      percent = 90 * hasDoneRate + remanentRate * percent
    }
    const __percent = (percent || 0) - 100 + '%'
    return <div className='file-upload-item' style={{'--percent': __percent}}>
      <div></div>
      <span>
        {BeforeIcon({status, percent})}
      </span>
      <div className='file-upload-item-name'>{name}</div>
      <div className='file-upload-functional-icons'>
        {/* <Popconfirm
          title={<FormattedMessage {...PersonalAssetMessages.SureToDelete} />}
          onConfirm={this.deleteFileFormList}
          placement="topRight"
          > */}
          <span className='file-upload-item-pause' onClick={this.handlePlayOrPause}>
            { PlayAndPauseIcon({status}) }
          </span>
          <span className='file-upload-item-close' onClick={this.handleClose}>
            <Icon type="close" />
          </span>
          {/* </Popconfirm> */}
      </div>
    </div>
  }
}

UploadingFile.propTypes = {
  status: PropTypes.oneOf(['inited', 'uploading', 'done', 'error', 'interrupt', 'cache']),
};

UploadingFile.defaultProps = {
  percent: 0
};

class ProgressList extends Component {

  render() {

    const { fileList, progressMap, deleteFile, updateFile } = this.props

    const list = fileList.map((file) => {
      return <UploadingFile
        key={file.guid || file.id}
        {...file}
        percent={progressMap[file.guid]}
        deleteFile={deleteFile}
        updateFile={updateFile}
      />;
    })

    return (
      <div className='file-upload-list'>{list}</div>
    );
  }

}

function mapStateToProps(state) {
  const { fileList, progressMap } = state.uploaderState
  return { fileList, progressMap };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteFile(f) {
      dispatch( deleteFile(f) )
    },
    updateFile(file) {
      dispatch( updateFile(file) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressList);
