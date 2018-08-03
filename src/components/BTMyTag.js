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
import {Tag} from 'antd'

const {CheckableTag} = Tag;

export default class BTMyTag extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            checked:false
        }
    }

    handleChange(checked){
        this.setState({ checked });
    }

    render(){
        return(
            <CheckableTag style={{fontSize:15}} {...this.props} checked={this.state.checked} onChange={(checked)=>this.handleChange(checked)} />
        )
    }
}