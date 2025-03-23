# Simple-Web-Calculator

[English](README.md) | [中文](README_CN.md)

## Overview

This is a web-based scientific calculator developed using web technologies. It features both standard and scientific calculation functions, supports light and dark theme switching, and provides an intuitive and user-friendly interface. The calculator employs responsive design, ensuring proper display across various devices.

## Features

### Basic Functions
- **Standard Calculations**: Addition, subtraction, multiplication, division, percentage, and parentheses operations
- **Scientific Calculations**: Trigonometric functions, logarithms, square roots, power operations, factorials
- **Constants Support**: π (Pi), e (Euler's number)
- **Angle/Radian Toggle**: Switch between degree and radian modes
- **Real-time Calculation**: Displays calculation results in real-time as expressions are entered
- **History Record**: Shows the previous calculation expression
- **Copy Function**: One-click copying of calculation results to clipboard
- **Theme Switching**: Supports both light and dark theme modes
- **Keyboard Support**: Supports keyboard input for calculations

## Usage Instructions

### Interface Layout

The calculator interface is divided into the following sections:
1. **Top Title Bar**: Displays the calculator name and theme toggle button
2. **Display Area**: Contains history record, current expression, calculation result, and copy button
3. **Scientific Function Area**: Contains buttons related to scientific calculations
4. **Standard Calculation Area**: Contains number buttons and basic operator buttons

### Basic Operations

- **Enter Numbers**: Click number buttons or use keyboard input
- **Basic Operations**: Click +, -, ×, ÷ buttons or use keyboard input +, -, *, /
- **Clear**: Click the C button or press the Esc key
- **Backspace**: Click the backspace button or press the Backspace key
- **Calculate Result**: Click the = button or press the Enter key
- **Copy Result**: Click the copy button in the bottom right of the display area

### Scientific Calculation Functions

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