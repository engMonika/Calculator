document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display span');
    const buttons = document.querySelectorAll('.button');

    let currentInput = ''; // Current input string
    let previousInput = ''; // Previous input string
    let operator = null; // Current operator

    // Function to handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (!isNaN(value) || value === '.') {
                // Append number or decimal
                currentInput += value;
                display.textContent = currentInput;
            } else if (['+', '-', '*', '/'].includes(value)) {
                // Handle operator
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                }
                operator = value;
            } else if (value === '=') {
                // Calculate the result
                if (currentInput && previousInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = null;
                }
            } else {
                // Handle clear functionality if needed
                currentInput = '';
                previousInput = '';
                operator = null;
                display.textContent = '0';
            }
        });
    });

    // Function to perform calculations
    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return b !== 0 ? (a / b).toString() : 'Error';
            default: return '0';
        }
    }
});
