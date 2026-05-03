const RETIREMENT_DATE = new Date('May 12, 2039 00:00:00').getTime();
const START_DATE = new Date('2000-10-26').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = RETIREMENT_DATE - now;

    if (distance < 0) {
        document.getElementById('years').textContent = '0';
        document.getElementById('days').textContent = '0000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor(distance / (1000 * 60 * 60 * 24)) % 365;
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    animateNumber('years', years);
    animateNumber('days', days);
    animateNumber('hours', hours);
    animateNumber('minutes', minutes);
    animateNumber('seconds', seconds);

    const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(distance / (1000 * 60 * 60));
    const totalMinutes = Math.floor(distance / (1000 * 60));
    const totalYears = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));

    document.getElementById('totalYears').textContent = totalYears;
    document.getElementById('totalDays').textContent = formatNumber(totalDays);
    document.getElementById('totalHours').textContent = formatNumber(totalHours);
    document.getElementById('totalMinutes').textContent = formatNumber(totalMinutes);

    const totalTime = RETIREMENT_DATE - START_DATE;
    const elapsed = now - START_DATE;
    const progress = Math.min((elapsed / totalTime) * 100, 100);
    
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressPercent').textContent = progress.toFixed(1) + '%';
}

function animateNumber(id, value) {
    const element = document.getElementById(id);
    const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
    
    if (currentValue !== value) {
        element.style.transform = 'scale(1.2)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }
    
    element.textContent = formatNumber(value);
}

function formatNumber(num) {
    return num.toLocaleString('es-ES');
}

function showDetail(type) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const value = document.getElementById('modalValue');
    const label = document.getElementById('modalLabel');

    const now = new Date().getTime();
    const distance = RETIREMENT_DATE - now;
    
    let titleText = '';
    let modalValue = '';
    let labelText = '';

    switch(type) {
        case 'years':
            titleText = 'Años Totales';
            modalValue = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
            labelText = 'años para tu jubilación';
            break;
        case 'days':
            titleText = 'Días Restantes';
            modalValue = Math.floor(distance / (1000 * 60 * 60 * 24)).toLocaleString('es-ES');
            labelText = 'días para tu jubilación';
            break;
        case 'hours':
            titleText = 'Horas Totales';
            modalValue = Math.floor(distance / (1000 * 60 * 60)).toLocaleString('es-ES');
            labelText = 'horas restantes';
            break;
        case 'minutes':
            titleText = 'Minutos Totales';
            modalValue = Math.floor(distance / (1000 * 60)).toLocaleString('es-ES');
            labelText = 'minutos restantes';
            break;
    }

    title.textContent = titleText;
    value.textContent = modalValue;
    label.textContent = labelText;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        const colors = ['#e94560', '#667eea', '#764ba2', '#4facfe', '#f093fb'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

createParticles();
updateCountdown();
setInterval(updateCountdown, 1000);
