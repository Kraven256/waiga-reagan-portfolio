// Typing animation for banner
const typingText = "Hi, I'm Waiga Reagan Francis";
const typingElement = document.querySelector('#banner h2');
let i = 0;

function typeWriter() {
    if (i < typingText.length) {
        typingElement.innerHTML = typingText.substring(0, i + 1) + '<span class="typing">|</span>';
        i++;
        setTimeout(typeWriter, 100);
    } else {
        typingElement.innerHTML = typingText;
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Add active class to navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1000;
`;
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
    }
});

// Animate sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Skills Gauges
window.addEventListener('load', function() {
    const gaugePlugin = {
        id: 'doughnutCenterText',
        beforeDraw: function(chart) {
            const { width, height, ctx } = chart;
            ctx.restore();
            const fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = '#333';
            const text = chart.config.options.centerText;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    };

    const htmlCtx = document.getElementById('htmlChart').getContext('2d');
    const htmlChart = new Chart(htmlCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [90, 10],
                backgroundColor: ['#ff6384', '#e0e0e0'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '50%',
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            centerText: '90%'
        },
        plugins: [gaugePlugin]
    });

    const cssCtx = document.getElementById('cssChart').getContext('2d');
    const cssChart = new Chart(cssCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [75, 25],
                backgroundColor: ['#36a2eb', '#e0e0e0'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '50%',
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            centerText: '75%'
        },
        plugins: [gaugePlugin]
    });

    const jsCtx = document.getElementById('jsChart').getContext('2d');
    const jsChart = new Chart(jsCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [65, 35],
                backgroundColor: ['#ffce56', '#e0e0e0'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '50%',
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            centerText: '65%'
        },
        plugins: [gaugePlugin]
    });
});
