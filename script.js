function showCalc(type) {
    // Скрываем все карточки
    document.querySelectorAll('.calc-card').forEach(card => {
        card.classList.add('hidden');
    });
    // Показываем нужную
    const active = document.getElementById(type + '-calc');
    active.classList.remove('hidden');
}

function calcLoan() {
    const P = parseFloat(document.getElementById('amount').value);
    const r = parseFloat(document.getElementById('rate').value) / 100 / 12;
    const n = parseFloat(document.getElementById('term').value) * 12;
    
    if (P && r && n) {
        const x = Math.pow(1 + r, n);
        const monthly = (P * x * r) / (x - 1);
        document.getElementById('loan-result').innerText = '$' + monthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    } else {
        document.getElementById('loan-result').innerText = '$0.00';
    }
}

function calcPercent() {
    const val = parseFloat(document.getElementById('p-val').value);
    const total = parseFloat(document.getElementById('p-total').value);
    if (!isNaN(val) && !isNaN(total)) {
        const result = (total * val) / 100;
        document.getElementById('percent-result').innerText = result.toLocaleString('en-US', {maximumFractionDigits: 2});
    }
}

function calcAge() {
    const birthDateInput = document.getElementById('birthdate').value;
    if (!birthDateInput) return;

    const birthDate = new Date(birthDateInput);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }
    if (days < 0) {
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
        months--;
    }

    document.getElementById('age-result').innerText = `${years} Years Old`;
    document.getElementById('age-details').innerText = `${months} months, ${days} days`;
}

// Запуск при загрузке
window.onload = () => {
    calcLoan();
    calcPercent();
};
