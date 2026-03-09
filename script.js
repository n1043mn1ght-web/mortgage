/**
 * SmartCalc Professional Math Suite
 */

// Navigation Logic
function showCalc(type) {
    document.querySelectorAll('.calc-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(type + '-calc').classList.remove('hidden');

    // Update Result Labels Based on Tool
    const labels = {
        'loan': { main: 'Monthly Payment', sub: 'Principal & Interest' },
        'percent': { main: 'Calculated Amount', sub: 'Based on Percentage' },
        'age': { main: 'Current Age', sub: 'Years, Months, Days' }
    };

    document.getElementById('result-label').innerText = labels[type].main;
    document.getElementById('sub-result').innerText = labels[type].sub;
    
    // Trigger Recalculation
    if(type === 'loan') calcLoan();
    if(type === 'percent') calcPercent();
    if(type === 'age') calcAge();
}

// 1. Mortgage Logic (Annuity Formula)
function calcLoan() {
    const P = parseFloat(document.getElementById('amount').value);
    const r = parseFloat(document.getElementById('rate').value) / 100 / 12;
    const n = parseFloat(document.getElementById('term').value) * 12;
    
    const resultDisplay = document.getElementById('main-result');

    if (P > 0 && r > 0 && n > 0) {
        const x = Math.pow(1 + r, n);
        const monthly = (P * x * r) / (x - 1);
        resultDisplay.innerText = '$' + monthly.toLocaleString('en-US', {
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2
        });
    } else {
        resultDisplay.innerText = '$0.00';
    }
}

// 2. Percentage Logic
function calcPercent() {
    const val = parseFloat(document.getElementById('p-val').value);
    const total = parseFloat(document.getElementById('p-total').value);
    const resultDisplay = document.getElementById('main-result');

    if (!isNaN(val) && !isNaN(total)) {
        const res = (total * val) / 100;
        resultDisplay.innerText = res.toLocaleString('en-US', {maximumFractionDigits: 2});
    } else {
        resultDisplay.innerText = '0.00';
    }
}

// 3. Age Logic (Deep Precision)
function calcAge() {
    const bDate = document.getElementById('birthdate').value;
    const resultDisplay = document.getElementById('main-result');
    const detailsDisplay = document.getElementById('sub-result');
    
    if (!bDate) {
        resultDisplay.innerText = "N/A";
        detailsDisplay.innerText = "Please select date";
        return;
    }

    const birth = new Date(bDate);
    const now = new Date();
    
    if (birth > now) {
        resultDisplay.innerText = "Error";
        detailsDisplay.innerText = "Future date selected";
        return;
    }

    let y = now.getFullYear() - birth.getFullYear();
    let m = now.getMonth() - birth.getMonth();
    let d = now.getDate() - birth.getDate();

    if (m < 0 || (m === 0 && d < 0)) { y--; m += 12; }
    if (d < 0) {
        const prev = new Date(now.getFullYear(), now.getMonth(), 0);
        d += prev.getDate();
        m--;
    }

    resultDisplay.innerText = `${y} Years`;
    detailsDisplay.innerText = `${m} months, ${d} days old`;
}

// Init
window.onload = () => {
    calcLoan();
};
