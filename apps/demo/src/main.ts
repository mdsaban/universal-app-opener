import { generateDeepLink, openLink } from 'universal-app-opener';

const urlInput = document.getElementById('urlInput') as HTMLInputElement;
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const openBtn = document.getElementById('openBtn') as HTMLButtonElement;
const outputSection = document.getElementById('outputSection') as HTMLDivElement;
const jsonOutput = document.getElementById('jsonOutput') as HTMLPreElement;
const toggleDeepLinks = document.getElementById('toggleDeepLinks') as HTMLButtonElement;
const deepLinksContent = document.getElementById('deepLinksContent') as HTMLDivElement;
const exampleLinks = document.querySelectorAll('.example-link');

let currentResult: ReturnType<typeof generateDeepLink> | null = null;

function handleLinkClick(url: string) {
  const result = generateDeepLink(url);
  currentResult = result;
  displayResult(result);
  openLink(url, { fallbackToWeb: true, fallbackDelay: 2500 });
}

function displayResult(result: ReturnType<typeof generateDeepLink>) {
  jsonOutput.textContent = JSON.stringify(result, null, 2);
  outputSection.classList.remove('hidden');
}

exampleLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const url = link.getAttribute('data-url');
    if (url) {
      handleLinkClick(url);
    }
  });
});

generateBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();

  if (!url) {
    alert('Please enter a URL');
    return;
  }

  const result = generateDeepLink(url);
  currentResult = result;
  displayResult(result);
  openBtn.classList.remove('hidden');
});

openBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  if (url) {
    openLink(url, { fallbackToWeb: true, fallbackDelay: 2500 });
  }
});

toggleDeepLinks.addEventListener('click', () => {
  const isHidden = deepLinksContent.classList.contains('hidden');
  deepLinksContent.classList.toggle('hidden');
  const toggleText = toggleDeepLinks.querySelector('.toggle-text') as HTMLElement;
  const toggleIcon = toggleDeepLinks.querySelector('.toggle-icon') as HTMLElement;

  if (isHidden) {
    toggleText.textContent = 'Hide Deep Links';
    toggleIcon.textContent = '▲';
  } else {
    toggleText.textContent = 'Show Deep Links';
    toggleIcon.textContent = '▼';
  }
});

urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});
