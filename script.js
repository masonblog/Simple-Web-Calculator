// DOM元素
const expressionElement = document.getElementById('expression');
const resultElement = document.getElementById('result');
const historyElement = document.getElementById('history');
const themeToggle = document.getElementById('theme-toggle');
const buttons = document.querySelectorAll('.btn');
const copyButton = document.getElementById('copy-button');

// 计算器状态
let currentExpression = '0';
let currentResult = '';
let isInRadianMode = true;
let calculationHistory = [];

// 初始化
function init() {
    // 添加按钮事件监听器
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // 添加按钮动画
            button.classList.add('btn-pulse');
            setTimeout(() => {
                button.classList.remove('btn-pulse');
            }, 200);
            
            handleButtonClick(button.dataset.value);
        });
    });
    
    // 添加键盘事件监听器
    document.addEventListener('keydown', handleKeyPress);
    
    // 主题切换事件监听器
    themeToggle.addEventListener('click', toggleTheme);
    
    // 复制按钮事件监听器
    copyButton.addEventListener('click', copyResult);
    
    // 检查本地存储中的主题设置
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // 更新显示
    updateDisplay();
}

// 处理按钮点击
function handleButtonClick(value) {
    switch (value) {
        case 'clear':
            clearAll();
            break;
        case 'backspace':
            backspace();
            break;
        case '=':
            calculate();
            break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'ln':
        case 'sqrt':
        case 'factorial':
            applyFunction(value);
            break;
        case 'pow':
            appendToExpression('^');
            break;
        case 'pi':
            appendToExpression('π');
            break;
        case 'e':
            appendToExpression('e');
            break;
        case 'rad':
            isInRadianMode = true;
            updateResult('已切换到弧度模式');
            break;
        case 'deg':
            isInRadianMode = false;
            updateResult('已切换到角度模式');
            break;
        default:
            appendToExpression(value);
            break;
    }
    
    updateDisplay();
}

// 处理键盘按键
function handleKeyPress(event) {
    const key = event.key;
    
    // 数字和运算符
    if (/[0-9+\-*/.()%]/.test(key)) {
        appendToExpression(key);
    } 
    // 回车键计算
    else if (key === 'Enter') {
        calculate();
    } 
    // 退格键
    else if (key === 'Backspace') {
        backspace();
    } 
    // Escape键清除
    else if (key === 'Escape') {
        clearAll();
    }
    
    updateDisplay();
}

// 添加到表达式
function appendToExpression(value) {
    // 如果当前表达式只有0，则替换它（除非是小数点）
    if (currentExpression === '0' && value !== '.') {
        currentExpression = value;
    } else {
        currentExpression += value;
    }
    
    // 实时计算结果
    try {
        const result = evaluateExpression(currentExpression);
        if (!isNaN(result)) {
            currentResult = result;
        }
    } catch (error) {
        // 忽略计算错误
    }
}

// 应用数学函数
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
            case 'cos':
                result = isInRadianMode ? 
                    Math.cos(parseFloat(lastNumber)) : 
                    Math.cos(parseFloat(lastNumber) * Math.PI / 180);
                break;
            case 'tan':
                result = isInRadianMode ? 
                    Math.tan(parseFloat(lastNumber)) : 
                    Math.tan(parseFloat(lastNumber) * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(parseFloat(lastNumber));
                break;
            case 'ln':
                result = Math.log(parseFloat(lastNumber));
                break;
            case 'sqrt':
                result = Math.sqrt(parseFloat(lastNumber));
                break;
            case 'factorial':
                result = factorial(parseInt(lastNumber));
                break;
        }
        
        // 替换表达式中的最后一个数字为计算结果
        replaceLastNumber(result);
        
    } catch (error) {
        updateResult('错误');
    }
}

// 提取表达式中的最后一个数字
function extractLastNumber() {
    const match = currentExpression.match(/[\d.]+$/);
    return match ? match[0] : '0';
}

// 替换表达式中的最后一个数字
function replaceLastNumber(newNumber) {
    currentExpression = currentExpression.replace(/[\d.]+$/, newNumber.toString());
}

// 计算阶乘
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// 计算表达式
function calculate() {
    try {
        // 保存当前表达式到历史记录
        if (currentExpression !== '0') {
            historyElement.textContent = currentExpression;
            calculationHistory.push(currentExpression);
        }
        
        // 计算结果
        const result = evaluateExpression(currentExpression);
        
        // 更新表达式和结果
        currentExpression = result.toString();
        currentResult = '';
        
    } catch (error) {
        updateResult('错误');
    }
}

// 评估表达式
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

// 退格
function backspace() {
    if (currentExpression.length > 1) {
        currentExpression = currentExpression.slice(0, -1);
    } else {
        currentExpression = '0';
    }
    
    // 实时计算结果
    try {
        const result = evaluateExpression(currentExpression);
        if (!isNaN(result)) {
            currentResult = result;
        }
    } catch (error) {
        // 忽略计算错误
    }
}

// 清除所有
function clearAll() {
    currentExpression = '0';
    currentResult = '';
    updateDisplay();
}

// 更新结果
function updateResult(text) {
    currentResult = text;
    updateDisplay();
}

// 格式化数字，添加千分位符
function formatNumber(num) {
    // 检查是否为数字
    if (typeof num !== 'string' && typeof num !== 'number') return num;
    
    // 将数字转换为字符串
    let numStr = num.toString();
    
    // 处理科学计数法表示的数字
    if (numStr.includes('e')) {
        const parts = numStr.split('e');
        const base = formatNumber(parts[0]);
        return `${base}e${parts[1]}`;
    }
    
    // 分离整数部分和小数部分
    const parts = numStr.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';
    
    // 处理负数
    const isNegative = integerPart.startsWith('-');
    const absIntegerPart = isNegative ? integerPart.substring(1) : integerPart;
    
    // 添加千分位符
    const formattedInteger = absIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // 重新组合数字
    return (isNegative ? '-' : '') + formattedInteger + decimalPart;
}

// 更新显示
function updateDisplay() {
    // 对于表达式，我们需要保持原始格式以便计算
    expressionElement.textContent = currentExpression;
    
    // 对于结果，我们添加千分位符
    if (currentResult !== '' && !isNaN(currentResult)) {
        resultElement.textContent = formatNumber(currentResult);
    } else {
        resultElement.textContent = currentResult;
    }
}

// 切换主题
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

// 复制结果到剪贴板
function copyResult() {
    // 确定要复制的内容（优先复制结果，如果没有结果则复制表达式）
    const textToCopy = currentResult || currentExpression;
    
    // 使用Clipboard API复制文本
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // 复制成功，提供视觉反馈
            copyButton.classList.add('copied');
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            
            // 2秒后恢复原始状态
            setTimeout(() => {
                copyButton.classList.remove('copied');
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        })
        .catch(err => {
            console.error('复制失败:', err);
            // 复制失败时的反馈
            copyButton.innerHTML = '<i class="fas fa-times"></i>';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', init);