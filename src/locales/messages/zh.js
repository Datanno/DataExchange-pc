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

module.exports = {
    "Menu.Dashboard":"仪表盘",
    "Menu.Asset":"资产",
    "Menu.Demand":"需求",

    "Header.ThereIsNoFileResourceSetForTheTimeBeing":"暂无文件资源库",
    "Header.FailedToGetTheFileResourceSet":"获取文件资源库失败",
    "Header.PleaseLogInFirst":"请先登入",
    "Header.SuccessToLogOut":"退出登录成功",
    "Header.FailedLogOut":"退出登陆失败",
    "Header.FailedQuery":"查询失败",
    "Header.PleaseEnterTheUserName":"请输入账户",
    "Header.PleaseEnterThePassword":"请输入密码",
    "Header.PleaseEnterTheKeystore":"请输入Keystore文本",
    "Header.PleaseEnterTheSurePassword":"请再次输入密码",
    "Header.PleaseEnterTheCompanyName":"请输入公司名",
    "Header.PleaseEnterTheVerificationCode":"请输入验证码",
    "Header.VerificationCodeWrong":"验证码不正确",
    "Header.ThePasswordShouldContainAtLeast8BitCharacters":"密码应该至少包含8位字符",
    "Header.IncorrectPasswordEnteredTwice":"两次输入密码不一致",
    "Header.YourRegistrationHasBeenSuccessfullyCompleted":"注册成功",
    "Header.AccountHasAlreadyExisted":"账号已存在",
    "Header.AccountIsNotExisted":"账号不存在",
    "Header.FailedRegister":"注册失败",
    "Header.LoginFailure":"登入失败",
    "Header.LoginSucceed":"登入成功",
    "Header.PleaseImportTheKeystoreFirst":"请先导入keyStore文件",
    "Header.TheWrongPassword":"密码错误",
    "Header.ThePasswordAndTheKeystoreDoNotMatch":"密码与keystore不匹配",
    "Header.keystoreHasBeenSuccessfullyImported":"keystore导入成功",
    "Header.FailedToImportedThekeystore":"keystore导入失败",
    "Header.keystoreHasBeenSuccessfullyExported":"keystore导出成功",
    "Header.FailedToExportedThekeystore":"keystore导出失败",
    "Header.UserNameIsNotRight":"账户不合规",
    "Header.ImportKeyStoreSuccess":"导入成功",
    "Header.ImportKeyStoreFaild":"导入失败",
    "Header.AccountNameRequire":"3~16个字符 可使用a~z(全小写)、数字 需以字母开头",

    "Asset.ThereIsNoMarketAssetForTheTimeBeing":"暂无市场资产",
    "Asset.FailedToQueryTheMarketSource":"市场资源查询失败",
    "Asset.PleaseLogInFirst":"请先登录账户",
    "Asset.YouAreNotAllowedToBuyYourOwnAssets":"不允许购买自己的资产!",
    "Asset.CannotPurchaseAgain":"已经购买过本资产，不能重复购买",
    "Asset.FailedToGetTheBlockMessages":"获取区块信息失败",
    "Asset.SuccessfulPurchase":"购买成功",
    "Asset.InsufficientBalance":"账户余额不足",
    "Asset.FailedPurchase":"购买失败",
    "Asset.UnexpectedError":"未知错误",
    "Asset.SuccessfulCollect":"收藏成功",
    "Asset.DeleteCollect":"删除收藏成功",
    "Asset.FailedCollect":"收藏失败",

    "Demand.PleaseLogInFirst":"请先登录账户",
    "Demand.ThereIsNoDataForTheTimeBeing":"暂无数据",
    "Demand.ThereIsNoMarketDemandForTheTimeBeing":"暂无市场需求",
    "Demand.FailedToGetTheFileResourceSet":"获取文件资源库失败",
    "Demand.ThereIsNoAssetForTheTimeBeing":"暂无提交资产",
    "Demand.FailedToGetTheRequirementDetails":"获取需求详情失败",
    "Demand.SuccessfulPromote":"推销资产成功",
    "Demand.FailedPromote":"推销资产失败",

    "BlockBrowsing.ThereIsNoDataForTheTimeBeing":"暂无数据",

    "PersonalAsset.FailedToGetTheBlockMessages":"获取区块信息失败",
    "PersonalAsset.SuccessfulModify":"修改发布资产成功",
    "PersonalAsset.FailedModify":"修改发布资产失败",
    "PersonalAsset.ThereIsNoDataForTheTimeBeing":"暂无数据",
    "PersonalAsset.ThereIsNoHaveBoughtAssetForTheTimeBeing":"暂无已购买资产",
    "PersonalAsset.FailedToGetTheHaveBoughtAsset":"查询已购买资产失败",
    "PersonalAsset.UploadFileSize":"上传文件大小不允许大于 2G",
    "PersonalAsset.UploadFileSize200M":"上传文件大小不允许大于 200M",
    "PersonalAsset.FailedToGetUrlOfDocumentStorage":"获取文件存储url失败",
    "PersonalAsset.FailedToUploadTheFile":"文件上传失败",
    "PersonalAsset.SuccessfulToUploadTheFile":"文件上传成功",
    "PersonalAsset.PleaseChooseTheAsset":"请选择要发布的资产",
    "PersonalAsset.PleaseChooseTheAssetType":"请选择资产类型",
    "PersonalAsset.PleaseImproveTheInformation":"请完善发布资产",
    "PersonalAsset.InputPrice":"请输入有效的价格",
    "PersonalAsset.InputDeadline":"请输入截止时间",
    "PersonalAsset.FailedToGetTheGetDataBin":"获取getDataBin失败",
    "PersonalAsset.SuccessfulToRegisterTheAsset":"注册资产成功",
    "PersonalAsset.FailedToRegisterTheAsset":"注册资产失败",
    "PersonalAsset.FailedToDownloadTheFile":"文件下载失败",
    "PersonalAsset.Name":"名称",
    "PersonalAsset.Price":"价格",
    "PersonalAsset.PleaseSelect":"请选择",
    "PersonalAsset.SelectDate":"日期选择",

    "Check.ThereIsNoDataForTheTimeBeing":"暂无数据",
    "Check.QueryFailure":"查询失败",
    "Check.ThereIsNoPersonalMessageForTheTimeBeing":"暂无数据",

    "History.ThereIsNoHistoricalTransactionForTheTimeBeing":"暂无历史交易信息",

    "PersonalDemand.ThereIsNoDataForTheTimeBeing":"暂无数据",
    "PersonalDemand.ThereIsNoHavePublishedDemandForTheTimeBeing":"暂无已发布需求",
    "PersonalDemand.PleaseImproveTheDemand":"请完善发布需求",
    "PersonalDemand.PleaseInputPrice":"请输入合适的价格",
    "PersonalDemand.PleaseChooseTheRequirementType":"请选择需求类型",
    "PersonalDemand.FailedToGetTheBlockMessages":"获取区块信息失败",
    "PersonalDemand.SuccessfulToPublishTheDemand":"发布需求成功",
    "PersonalDemand.FailedToPublishTheDemand":"发布需求失败",
    "PersonalDemand.SelectDate":"日期选择",

    "Wallet.More":"更多",
    "Wallet.PleaseEnterTheTargetAccount":"请输入对方账户",
    "Wallet.PleaseEnterTheMoneyToBeTransferred":"请输入转账金额",
    "Wallet.PleaseEnterThePassword":"请输入密码",
    "Wallet.PleaseEnterAvalidTransferAmount":"请输入有效的转账金额",
    "Wallet.FailedToTransferAccounts":"转账失败",
    "Wallet.SuccessfulToTransferAccounts":"转账成功",
    "Wallet.TheTargetAccountIsInexistence":"目标账户不存在",
    "Wallet.PleaseEnterTheOriginalPassword":"请输入原密码",
    "Wallet.PleaseEnterTheNewPassword":"请输入新密码",
    "Wallet.PleaseEnterTheNewPasswordAgain":"请再次输入新密码",
    "Wallet.InsufficientBalance":"余额不足",
    "Wallet.TheNewPasswordsEnteredDidNotMatch":"输入新密码两次不一致",
    "Wallet.ThePasswordHasBeenModifiedSuccessfully":"密码修改成功",
    "Wallet.FailedToModifyThePassword":"密码修改失败",
    "Wallet.PleaseEnterThePasswordOfKeystore":"请输入keystore文件的密码",
    "Wallet.PleaseLogInFirst":"请先登录账户",
    "Wallet.TheWrongPassword":"密码错误",
    "Wallet.PleaseInputNumber":"请输入数字",
    "Wallet.NumberIsTooBig":"数字太大",
    "Wallet.ImportSuccess":"导入成功",

    "File.FileExisted":"文件已存在",
    "File.UploadFail":"上传失败",

}
