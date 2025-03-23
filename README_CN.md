# 简易网页计算器

[English](README.md) | [中文](README_CN.md)

## 概述

这是一个基于Web技术开发的科学计算器，具有标准计算和科学计算功能，支持明暗主题切换，提供直观友好的用户界面。计算器采用响应式设计，可在不同设备上良好显示。

## 功能特点

### 基本功能
- **标准计算**：加减乘除、百分比、括号运算
- **科学计算**：三角函数、对数、平方根、幂运算、阶乘
- **常数支持**：π (圆周率)、e (自然对数的底)
- **角度/弧度切换**：支持在角度和弧度模式间切换
- **实时计算**：输入表达式时实时显示计算结果
- **历史记录**：显示上一次计算的表达式
- **复制功能**：一键复制计算结果到剪贴板
- **主题切换**：支持明亮和暗黑两种主题模式
- **键盘支持**：支持键盘输入进行计算

## 使用说明

### 界面布局

计算器界面分为以下几个部分：
1. **顶部标题栏**：显示计算器名称和主题切换按钮
2. **显示区域**：包含历史记录、当前表达式和计算结果，以及复制按钮
3. **科学功能区**：包含科学计算相关的按钮
4. **标准计算区**：包含数字和基本运算符按钮

### 基本操作

- **输入数字**：点击数字按钮或使用键盘输入
- **基本运算**：点击 +、-、×、÷ 按钮或使用键盘输入 +、-、*、/
- **清除**：点击 C 按钮或按键盘 Esc 键
- **退格**：点击退格按钮或按键盘 Backspace 键
- **计算结果**：点击 = 按钮或按键盘 Enter 键
- **复制结果**：点击显示区域右下角的复制按钮

### 科学计算功能

- **三角函数**：点击 sin、cos、tan 按钮，会计算当前输入数值的三角函数值
- **对数函数**：
  - log：计算以10为底的对数
  - ln：计算自然对数（以e为底）
- **平方根**：点击 √ 按钮计算平方根
- **幂运算**：点击 x^y 按钮，输入底数和指数
- **阶乘**：点击 x! 按钮计算阶乘
- **常数**：
  - π：插入圆周率值
  - e：插入自然对数的底
- **角度/弧度切换**：
  - Rad：切换到弧度模式
  - Deg：切换到角度模式

### 主题切换

点击计算器右上角的主题切换按钮可以在明亮模式和暗黑模式之间切换。系统会记住您的主题偏好，下次打开时自动应用。

## 技术实现

### 技术栈
- **HTML5**：构建计算器的基本结构
- **CSS3**：实现计算器的样式和响应式设计
- **JavaScript**：实现计算器的功能逻辑
- **Font Awesome**：提供图标支持

### 核心功能实现

#### 表达式计算
计算器使用JavaScript的Function构造函数安全地计算表达式，避免使用eval()。在计算前，会对特殊符号（如π、e、^）进行替换处理。

```javascript
function evaluateExpression(expr) {
    // 移除千分位符
    expr = expr.replace(/,/g, '');
    
    // 替换特殊常量
    expr = expr.replace(/π/g, 'Math.PI');
    expr = expr.replace(/e/g, 'Math.E');
    
    // 替换幂运算
    expr = expr.replace(/\^/g, '**');
    
    // 安全地计算表达式
    try {
        // 使用Function构造函数而不是eval
        return Function('return ' + expr)();
    } catch (error) {
        throw new Error('计算错误');
    }
}
```

#### 科学函数实现
科学计算器支持多种数学函数，并根据当前的角度/弧度模式进行适当的转换。

```javascript
function applyFunction(func) {
    try {
        let result;
        const lastNumber = extractLastNumber();
        
        switch (func) {
            case 'sin':
                result = isInRadianMode ? 
                    Math.sin(parseFloat(lastNumber)) : 
                    Math.sin(parseFloat(lastNumber) * Math.PI / 180);
                break;
            // 其他函数实现...
        }
        
        // 替换表达式中的最后一个数字为计算结果
        replaceLastNumber(result);
        
    } catch (error) {
        updateResult('错误');
    }
}
```

#### 主题切换
计算器支持明暗两种主题，使用CSS变量实现主题切换，并通过localStorage保存用户的主题偏好。

```javascript
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'true');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'false');
    }
}
```

## 响应式设计

计算器采用响应式设计，可以在不同尺寸的设备上良好显示：

```css
@media (max-width: 480px) {
    .calculator-container {
        max-width: 100%;
    }
    
    .btn {
        padding: 12px 0;
        font-size: 1rem;
    }
    
    /* 其他响应式样式... */
}
```

## 使用示例

### 基本计算
1. 输入：`2 + 3 * 4`
2. 结果：`14`

### 科学计算
1. 三角函数：输入 `30`，点击 `sin` 按钮（在角度模式下）
   - 结果：`0.5`
2. 对数计算：输入 `100`，点击 `log` 按钮
   - 结果：`2`
3. 幂运算：输入 `2`，点击 `x^y` 按钮，输入 `3`
   - 结果：`8`

## 注意事项

- 计算器在输入非法表达式时会显示"错误"提示
- 角度/弧度模式会影响三角函数的计算结果
- 复制功能需要浏览器支持Clipboard API

## 浏览器兼容性

计算器兼容所有现代浏览器，包括：
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## 本地运行

1. 克隆或下载项目代码
2. 使用浏览器打开 `index.html` 文件
3. 或者使用本地服务器运行项目（如 Python 的 http.server）
   ```
   python -m http.server 8000
   ```
   然后访问 http://localhost:8000/