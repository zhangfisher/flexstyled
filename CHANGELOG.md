# flexstyled

## 2.1.0

### Minor Changes

- 902f597: [特性] 调整`getStyle`方法的传参方式，从`getStyle(style,props)`调整为`getStyle(props,style)`。注意：此处为不兼容的更新

## 2.0.9

### Patch Changes

- 951c260: 修复当存在并列样式选择器时生成的类名不正确的问题，如`& > div , & .btn"`会错误生成`.abrsrta2 > div, abrsrta2 .btn`，第二个选择器缺少`.`

## 2.0.8

### Patch Changes

- 0d5b3c6: [特性]: 更新`StyledClassName`的入参类型，从`string[]`变更为`(string | undefined)[]`提高容错性

## 2.0.7

### Patch Changes

- 734b30b: styled 的 combindStyle 参数现在支持传入 StyledClassName

## 2.0.6

### Patch Changes

- 9e68b45: className 增加重载签名`className(styles:CSSRuleObject,options?:StyledOptions)`

## 2.0.5

### Patch Changes

- 31e7b14: 修复当声明样式值时，某些属性值如果以!important 结尾会产生类型错误提示
- 37e0d94: 修复 tag 中的类型引用错误

## 2.0.4

### Patch Changes

- 87194cb: 修复当样式声明存在并列（如& > div , & > .primary)时生成样式不准确的问题

## 2.0.3

### Patch Changes

- 2c47ecb: 新增加 className 用于创建仅返回类型的函数

## 2.0.2

### Patch Changes

- cdb33cf: 使用`styled.div`等创建样式组件时，允许在第二个参数传入需要合并的样式对象，请参考以下示例：

  ```tsx
  const Block = styled({
    width: "100%",
  });

  const MyBtn = styled.button(
    {
      //
    },
    [Block]
  );
  ```

- 6af5789: [BUG]: 修复当封装组件时如何传入组合样式不生效的问题

## 2.0.1

### Patch Changes

- 5a9413f: fix: 修复 useStyled 重复注入样式的问题

## 2.0.0

### Major Changes

- 9cf0343: 全面升级，新增加 theme/keyframes/types 等特性

## 1.2.0

### Minor Changes

- ebf34d0: add props method
- 68bd059: add props method

## 1.1.1

### Patch Changes

- 3ce9ea0: fix style error

## 1.1.0

### Minor Changes

- 6b7c001: add `styled.[html tagName]` create component

## 1.0.9

### Patch Changes

- 3e6ca3d: 修复 styled 返回的类型组件的类型错误

## 1.0.8

### Patch Changes

- 42d52dc: feat: add styled(css)

## 1.0.7

### Patch Changes

- f8a9f20: update main->dist/index.umd.js

## 1.0.6

### Patch Changes

- d12f8b0: add umd & iife

## 1.0.5

### Patch Changes

- 13cf5d4: add useStyle

## 1.0.4

### Patch Changes

- 新增加支持 props 动态样式

## 1.0.3

### Patch Changes

- fea85e3: init
- 修复发布包错误
