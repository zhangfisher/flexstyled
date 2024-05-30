---
"flexstyled": patch
---

修复当存在并列样式选择器时生成的类名不正确的问题，如`& > div , & .btn"`会错误生成`.abrsrta2 > div, abrsrta2 .btn`，第二个选择器缺少`.`
