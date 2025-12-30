import { generateDeepLink, openLink } from 'universal-app-opener';

const urlInput = document.getElementById('urlInput') as HTMLInputElement;
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const openBtn = document.getElementById('openBtn') as HTMLButtonElement;
const outputSection = document.getElementById('outputSection') as HTMLDivElement;
const jsonOutput = document.getElementById('jsonOutput') as HTMLPreElement;
const exampleLinks = document.querySelectorAll<HTMLAnchorElement>('.example-link');

let currentResult: ReturnType<typeof generateDeepLink> | null = null;

function handleLinkClick(url: string, openInNewTab: boolean) {
  const result = generateDeepLink(url);
  currentResult = result;
  displayResult(result);
  openLink(url, { fallbackToWeb: true, fallbackDelay: 2500, openInNewTab });
}

function displayResult(result: ReturnType<typeof generateDeepLink>) {
  jsonOutput.textContent = JSON.stringify(result, null, 2);
  outputSection.classList.remove('hidden');
}

function getLinkDetails(link: HTMLAnchorElement, e: MouseEvent) {
  e.preventDefault();
  const isModifierPressed = e.ctrlKey || e.metaKey || e.button === 1;
  const url = link.getAttribute('data-url');
  const target = link.getAttribute('target');
  if (url) {
    handleLinkClick(url, isModifierPressed || target === '_blank');
  }
}

exampleLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    getLinkDetails(link, e);
  });

  // To get mouse wheel click
  link.addEventListener('auxclick', (e) => {
    if (e.button === 1) {
      getLinkDetails(link, e);
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

urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});
