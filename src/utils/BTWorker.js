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
class BTWorker{
    constructor(props){
        this.initWorker()
    }

    initWorker(){
        const worker = new Worker("worker.js")
        worker.postMessage = this.postMessage
        worker.onmessage = this.onmessage

    }

    postMessage(params){
        console.log("postMessage",params)
    }

    onmessage(e){
        console.log("onmessage",e)
    }
}


export default new BTWorker()