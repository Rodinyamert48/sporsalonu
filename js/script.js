// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('mobile-menu-open');
  mobileMenu.classList.remove('mobile-menu-open', 'mobile-menu-closed');
  mobileMenu.classList.add(isOpen ? 'mobile-menu-closed' : 'mobile-menu-open');
});

// Close mobile menu on link click
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('mobile-menu-open');
    mobileMenu.classList.add('mobile-menu-closed');
  });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== BMI CALCULATOR =====
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const bmiBtn = document.getElementById('bmiBtn');
const bmiResult = document.getElementById('bmiResult');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const bmiAdvice = document.getElementById('bmiAdvice');

function calculateBMI() {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (!height || !weight || height < 50 || height > 250 || weight < 20 || weight > 300) {
    alert('Lütfen geçerli boy (50-250 cm) ve kilo (20-300 kg) değerleri girin.');
    return;
  }

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const roundedBMI = Math.round(bmi * 10) / 10;

  let category, color, advice;

  if (bmi < 18.5) {
    category = 'Zayıf';
    color = '#FBBF24';
    advice = 'Sağlıklı bir kilo alımı için beslenme danışmanlığı almanızı öneririz.';
  } else if (bmi < 25) {
    category = 'Normal';
    color = '#22C55E';
    advice = 'İdeal kilonuzdasınız! Bu formu korumak için düzenli egzersize devam edin.';
  } else if (bmi < 30) {
    category = 'Fazla Kilolu';
    color = '#F97316';
    advice = 'Sağlıklı bir kilo verme programı için antrenörlerimizle görüşebilirsiniz.';
  } else {
    category = 'Obez';
    color = '#EF4444';
    advice = 'Uzman bir sağlık profesyoneline danışmanızı ve özel programımızı öneririz.';
  }

  bmiValue.textContent = roundedBMI;
  bmiValue.style.color = color;
  bmiCategory.textContent = category;
  bmiCategory.style.color = color;
  bmiAdvice.textContent = advice;

  bmiResult.classList.remove('hidden');
  bmiResult.style.borderColor = color;
}

bmiBtn.addEventListener('click', calculateBMI);

heightInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') calculateBMI();
});

weightInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') calculateBMI();
});

// ===== INTERSECTION OBSERVER (FADE-IN ANIMATION) =====
const hiddenElements = document.querySelectorAll('.section-hidden');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

hiddenElements.forEach(el => observer.observe(el));
