版本: 1.0.0
这个版本为初始化第一个版本

版本：1.0.1
EDA增加ADC Process ID输入框。
EDA ProductId加入手动输入。
EDA 修复进行下一步时接口报错，next按钮一直loading问题。
ModelManagement createModel：修复通过filter选择defectCode后，表格数据展示不全的问题。
ModelList和Confidence Threshold List固定高度。每页多条数据显示滚动条。

版本: 1.0.2
修复bug labeling Tool 68810 重新加载图片列表后，Defect筛选并未随之更新。
修复bug labeling Tool 68798 Image List中图片名称没有左对齐。
修复bug ModelDetail 68813 Main Page界面Training Progress没有实时变化。
修复bug ModelDetail 68814 Main Page界面Testing Progress没有实时变化。
修复bug ModelDetail 68841  Main Page界面Training Progress 小数点后位数太长。
修复bug ModelDetail 68843  Main Page界面Testing Progress 小数点后位数太长。
Model training和testing：点击发送命令按钮时，增加loading状态。
Model部分：model/progress 接口新增deviceHash参数。
LicenseManagement部分：修改为 judging service 和training service两个输入框。