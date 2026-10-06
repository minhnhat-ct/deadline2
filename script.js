const progress=document.getElementById("progress");
function updateProgress(){const s=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?s/h*100:0)+"%"}window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const dot=document.getElementById("cursorDot"),ring=document.getElementById("cursorRing");let mx=0,my=0,rx=0,ry=0;window.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});function animate(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(animate)}animate();document.querySelectorAll("a").forEach(a=>{a.addEventListener("mouseenter",()=>ring.classList.add("active"));a.addEventListener("mouseleave",()=>ring.classList.remove("active"))});
document.querySelectorAll('.project[href="#"]').forEach(a=>a.addEventListener("click",e=>e.preventDefault()));

// --- LOGIC MÔ PHỎNG KHTN ---
const labTabs = document.querySelectorAll('.lab-tab-btn');
const labContents = document.querySelectorAll('.lab-tab-content');

labTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    labTabs.forEach(b => b.classList.remove('active'));
    labContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.getAttribute('data-target')).classList.add('active');
  });
});

// Vật lý
const angleSlider = document.getElementById('angle-slider');
const angleVal = document.getElementById('angle-val');
const incidentRay = document.getElementById('incident-ray');
const refractedRay = document.getElementById('refracted-ray');

if (angleSlider) {
  angleSlider.addEventListener('input', (e) => {
    const i = parseFloat(e.target.value);
    angleVal.innerText = i;
    incidentRay.style.transform = `rotate(${-90 - i}deg)`;
    const n1 = 1.0;
    const n2 = 1.33;
    const iRad = i * (Math.PI / 180);
    const sinR = (n1 * Math.sin(iRad)) / n2;
    const rRad = Math.asin(sinR);
    const r = rRad * (180 / Math.PI);
    refractedRay.style.transform = `rotate(${90 - r}deg)`;
  });
}

// Hóa học
const chemBtns = document.querySelectorAll('.chem-btn');
const liquid = document.getElementById('liquid');
const chemStatus = document.getElementById('chem-status');
const resetChemBtn = document.getElementById('reset-chem');
let selectedChems = [];

if (chemBtns) {
  chemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chem = btn.getAttribute('data-chem');
      if (selectedChems.length < 2 && !selectedChems.includes(chem)) {
        selectedChems.push(chem);
        updateChemistry();
      }
    });
  });
}

function updateChemistry() {
  liquid.style.height = `${selectedChems.length * 45}%`;
  
  if (selectedChems.length === 1) {
    chemStatus.innerText = "Đã thêm 1 chất...";
    liquid.style.backgroundColor = "rgba(200, 200, 200, 0.4)";
  } else if (selectedChems.length === 2) {
    if (selectedChems.includes('base') && selectedChems.includes('indicator')) {
      liquid.style.backgroundColor = 'rgba(216, 27, 96, 0.85)';
      chemStatus.innerText = 'Dung dịch hồng (Môi trường Base)';
    } else if (selectedChems.includes('acid') && selectedChems.includes('base')) {
      liquid.style.backgroundColor = 'rgba(173, 216, 230, 0.6)';
      chemStatus.innerText = 'Trung hòa (Muối + Nước)';
    } else if (selectedChems.includes('acid') && selectedChems.includes('indicator')) {
      liquid.style.backgroundColor = 'rgba(240, 240, 240, 0.8)';
      chemStatus.innerText = 'Không đổi màu (Môi trường Acid)';
    }
  }
}

if (resetChemBtn) {
  resetChemBtn.addEventListener('click', () => {
    selectedChems = [];
    liquid.style.height = '0%';
    liquid.style.backgroundColor = 'transparent';
    chemStatus.innerText = 'Cốc trống';
  });
}

// Sinh học
const focusSlider = document.getElementById('focus-slider');
const cellImage = document.getElementById('cell-image');

if (focusSlider) {
  focusSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    const blurAmount = Math.abs(70 - val) / 5; 
    cellImage.style.filter = `blur(${blurAmount}px)`;
  });
}


// --- PLICKERS: mở/thu gọn nội dung ---
const plickersToggle = document.getElementById('plickersToggle');
const plickersContent = document.getElementById('plickersContent');

function setPlickersOpen(open, shouldScroll = false) {
  if (!plickersToggle || !plickersContent) return;
  plickersToggle.setAttribute('aria-expanded', String(open));
  plickersContent.hidden = !open;
  if (shouldScroll) {
    requestAnimationFrame(() => {
      const y = plickersToggle.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }
}

if (plickersToggle && plickersContent) {
  plickersToggle.addEventListener('click', () => {
    const isOpen = plickersToggle.getAttribute('aria-expanded') === 'true';
    setPlickersOpen(!isOpen, false);
  });

  const plickersNav = document.querySelector('.nav a[href="#plickers"]');
  if (plickersNav) {
    plickersNav.addEventListener('click', (e) => {
      e.preventDefault();
      setPlickersOpen(true, true);
    });
  }
}
if (location.hash === '#plickers') setPlickersOpen(true);
