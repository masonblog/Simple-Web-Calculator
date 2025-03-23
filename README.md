# Simple-Web-Calculator

[English](README.md) | [中文](README_CN.md)

## Overview

This is a web-based scientific calculator features standard and scientific calculation, supports light and dark theme, and provides an intuitive and user-friendly interface. The calculator utilizes responsive design and displays well on various devices.

## Features

### Features
- **Standard Calculations**: Addition, subtraction, multiplication, division, percentages, and parentheses
- **Scientific Calculations**: Trigonometric functions, logarithms, square roots, exponentiation, and factorials
- **Constant Support**: π (Pi), e (Euler's number)
- **Angle/Radian Toggle**: Supports switching between degree and radian modes
- **Real-time Calculation**: Displays calculation results in real-time as you type expressions
- **History**: Displays the expression from the previous calculation
- **Copy Function**: One-click copy of calculation results to the clipboard
- **Theme Switching**: Supports light and dark theme modes
- **Keyboard Support**: Supports keyboard input for calculations

## Usage

### Interface

The calculator interface is divided into the following sections:
1. **Top Title Bar**: Displays the calculator name and theme toggle button
2. **Display Area**: Contains history record, current expression, calculation result, and copy button
3. **Scientific Function Area**: Contains buttons related to scientific calculations
4. **Standard Calculation Area**: Contains number buttons and basic operator buttons

### Operations

- **Enter Numbers**: Click number buttons or use keyboard input
- **Basic Operations**: Click +, -, ×, ÷ buttons or use keyboard input +, -, *, /
- **Clear**: Click the C button or press the Esc key
- **Backspace**: Click the backspace button or press the Backspace key
- **Calculate Result**: Click the = button or press the Enter key
- **Copy Result**: Click the copy button in the bottom right of the display area

### Scientific Calculation

- **Trigonometric Functions**: Click sin, cos, tan buttons to calculate the trigonometric function value of the current input
- **Logarithmic Functions**:
  - log: Calculate base-10 logarithm
  - ln: Calculate natural logarithm (base e)
- **Square Root**: Click the √ button to calculate the square root
- **Power Operation**: Click the x^y button, then input the base and exponent
- **Factorial**: Click the x! button to calculate the factorial
- **Constants**:
  - π: Insert the value of Pi
  - e: Insert Euler's number
- **Angle/Radian Toggle**:
  - Rad: Switch to radian mode
  - Deg: Switch to degree mode

### Theme Switching

Click the theme toggle button in the top right corner of the calculator to switch between light and dark modes. The system will remember your theme preference and automatically apply it the next time you open the calculator.

## Technical Implementation

### Technology Stack
- **HTML5**: Builds the basic structure of the calculator
- **CSS3**: Implements the calculator's style and responsive design
- **JavaScript**: Implements the calculator's functional logic
- **Font Awesome**: Provides icon support

### Core Functionality Implementation

#### Expression Calculation
The calculator uses JavaScript's Function constructor to safely calculate expressions, avoiding the use of eval(). Before calculation, special symbols (such as π, e, ^) are replaced.

```javascript
function evaluateExpression(expr) {
    // Remove thousands separators
    expr = expr.replace(/,/g, '');
    
    // Replace special constants
    expr = expr.replace(/π/g, 'Math.PI');
    expr = expr.replace(/e/g, 'Math.E');
    
    // Replace power operations
    expr = expr.replace(/\^/g, '**');
    
    // Safely calculate the expression
    try {
        // Use Function constructor instead of eval
        return Function('return ' + expr)();
    } catch (error) {
        throw new Error('Calculation Error');
    }
}
```

#### Scientific Function Implementation
The scientific calculator supports various mathematical functions and performs appropriate conversions based on the current angle/radian mode.

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
            // Other functions...
        }
        
        // Replace the last number in the expression with the calculation result
        replaceLastNumber(result);
        
    } catch (error) {
        updateResult('错误');
    }
}
```

#### Theme Switching
The calculator supports both light and dark themes, using CSS variables for theme switching and localStorage to save the user's theme preference.

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

## Responsive Design
The calculator features a responsive design, ensuring it displays well on devices of various sizes.

```css
@media (max-width: 480px) {
    .calculator-container {
        max-width: 100%;
    }
    
    .btn {
        padding: 12px 0;
        font-size: 1rem;
    }
    
    /* Other responsive styles... */
}
```

## Usage Examples

### Basic Calculation
1. Input: `2 + 3 * 4`
2. Result: `14`

### Scientific Calculation
1. Trigonometric Function: Enter `30`, click the `sin` button (in degree mode)
   - Result: `0.5`
2. Logarithmic Calculation: Enter `100`, click the `log` button
   - Result: `2`
3. Exponentiation: Enter `2`, click the `x^y` button, enter `3`
   - Result: `8`

## Notes

- The calculator displays "ERROR" when an invalid expression is entered
- The angle/radian mode affects the results of trigonometric functions
- The copy function requires browser support for Clipboard API

## Browser Compatibility

The calculator is compatible with all modern browsers, including:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## Local Run

1. Clone or download the project code
2. Open `index.html` file with a browser
3. Or run the project using a local server (e.g., Python's http.server)

   ```
   python -m http.server 8000
   ```
   Then visit: http://localhost:8000/