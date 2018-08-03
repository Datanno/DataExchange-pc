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
const {app,ipcMain,dialog} = require('electron')
const fs = require('fs')
const appPath = app.getPath("userData");
const {ipcEventName} = require('../utils/EventName')
const path = require("path")

//  获取keystore文件
ipcMain.on(ipcEventName.get_key_store,(event,accountInfo)=>{
    let userName = accountInfo.username;
    let accountName = accountInfo.account_name;
    let keyStorePath = path.join(appPath,userName+'/'+accountName+'.keystore');
    fs.readFile(keyStorePath,'utf8',(error,result)=>{
        if(error){
            event.returnValue = {
                error
            }
        }else{
            // console.log({result})
            let keyStoreObj = JSON.parse(result)
            event.returnValue = {error,keyStoreObj}
        }
    })
})

ipcMain.on(ipcEventName.import_file,(event,options)=>{
    dialog.showOpenDialog(options,(filePaths)=>{
        if(filePaths!=undefined) {

            let filePath = filePaths[0]
            // console.log('filePath', filePath);
            let parsedPath = path.parse(filePath);
            // console.log('parsedPath', parsedPath);
            let { ext: fileExtern, name } = parsedPath
            if (fileExtern != '.keystore') {
                event.returnValue = {
                    error:'请导入正确的keystore文件'
                }
            }else{
                fs.readFile(filePath, 'utf8', (error,result) => {
                  if (error) {
                    event.returnValue = {
                      error: '文件读取错误'
                    }
                    return ;
                  }

                  event.returnValue = {
                    username: name,
                    result
                  }

                })
            }
        }else{
            event.returnValue = {
                error:'read file failure'
            }
        }
    })
})

ipcMain.on(ipcEventName.mkdir,(event,username)=>{
    let dirpath = path.join(appPath,username)
    let isExists = fs.existsSync(dirpath)
    if(isExists){
        event.returnValue = true;
    }else{
        try{
            fs.mkdirSync(dirpath)
            event.returnValue = true
        }catch(error){
            event.returnValue = false
        }
    }
})

ipcMain.on(ipcEventName.exists,(event,filePath)=>{
    let realPath = path.join(appPath,filePath)
    let isExists = fs.existsSync(realPath)
    event.returnValue = isExists;
})

ipcMain.on(ipcEventName.save_key_store,(event,accountInfo,params)=>{
    let userName = accountInfo.username;
    let accountName = accountInfo.account_name;

    // console.log({appPath,userName})
    let dirPath = path.join(appPath,userName);
    let isDirExists = fs.existsSync(dirPath)
    if(!isDirExists){
        fs.mkdirSync(dirPath)
    }

    let keyStorePath = path.join(appPath,userName+'/'+accountName+'.keystore')
    let keyStoreStr = JSON.stringify(params)
    try{
        fs.writeFileSync(keyStorePath,keyStoreStr)
        event.returnValue = true
    }catch(error){
        event.returnValue = false
    }
})

ipcMain.on(ipcEventName.export_key_store,(event,accountName,params)=>{
    dialog.showSaveDialog({
        defaultPath:accountName+'.keystore'
    },(filePath)=>{
        try{
            fs.writeFileSync(filePath,JSON.stringify(params))
        }catch(error){
            event.returnValue = false
        }
    })
})

ipcMain.on(ipcEventName.key_store_list,(event,username)=>{
    let keyStorePath = path.join(appPath,username)

    try{
        let result = fs.readdirSync(keyStorePath)
        event.returnValue = result
    }catch(error){
        event.returnValue = []
    }
})
