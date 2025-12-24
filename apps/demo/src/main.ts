import { generateDeepLink, openLink } from 'universal-app-opener';

const urlInput = document.getElementById('urlInput') as HTMLInputElement;
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const openBtn = document.getElementById('openBtn') as HTMLButtonElement;
const outputSection = document.getElementById('outputSection') as HTMLDivElement;
const jsonOutput = document.getElementById('jsonOutput') as HTMLPreElement;
const toggleDeepLinks = document.getElementById('toggleDeepLinks') as HTMLButtonElement;
const deepLinksContent = document.getElementById('deepLinksContent') as HTMLDivElement;
const exampleLinks = document.querySelectorAll('.example-link');

const whatsappTextOption = document.getElementById('whatsappTextOption') as HTMLDivElement;
const addMessageCheckbox = document.getElementById('addMessageCheckbox') as HTMLInputElement;
const whatsappModal = document.getElementById('whatsappModal') as HTMLDivElement;
const closeModal = document.getElementById('closeModal') as HTMLButtonElement;
const cancelMessage = document.getElementById('cancelMessage') as HTMLButtonElement;
const applyMessage = document.getElementById('applyMessage') as HTMLButtonElement;
const whatsappMessageInput = document.getElementById('whatsappMessageInput') as HTMLTextAreaElement;

let currentResult: ReturnType<typeof generateDeepLink> | null = null;
let currentUrl: string = '';

function handleLinkClick(url: string) {
  const result = generateDeepLink(url);
  currentResult = result;
  currentUrl = url;
  displayResult(result);
  openLink(url, { fallbackToWeb: true, fallbackDelay: 2500 });
}

function displayResult(result: ReturnType<typeof generateDeepLink>) {
  jsonOutput.textContent = JSON.stringify(result, null, 2);
  outputSection.classList.remove('hidden');

  if (result.platform === 'whatsapp') {
    whatsappTextOption.classList.remove('hidden');
    addMessageCheckbox.checked = false;
  } else {
    whatsappTextOption.classList.add('hidden');
  }
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
  currentUrl = url;
  displayResult(result);
  openBtn.classList.remove('hidden');
});

openBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  if (url) {
    const result = generateDeepLink(url);

    if (result.platform === 'whatsapp' && addMessageCheckbox.checked) {
      whatsappModal.classList.remove('hidden');
      whatsappMessageInput.value = '';
      whatsappMessageInput.focus();
    } else {
      openLink(url, { fallbackToWeb: true, fallbackDelay: 2500 });
    }
  }
});

addMessageCheckbox.addEventListener('change', () => {
  if (addMessageCheckbox.checked) {
    whatsappModal.classList.remove('hidden');
    whatsappMessageInput.value = '';
    whatsappMessageInput.focus();
  }
});

closeModal.addEventListener('click', () => {
  whatsappModal.classList.add('hidden');
  addMessageCheckbox.checked = false;
});

cancelMessage.addEventListener('click', () => {
  whatsappModal.classList.add('hidden');
  addMessageCheckbox.checked = false;
});

applyMessage.addEventListener('click', () => {
  const message = whatsappMessageInput.value.trim();

  if (message && currentUrl) {
    const phoneMatch = currentUrl.match(/wa\.me\/\+?(\d+)/);
    if (phoneMatch) {
      const phone = phoneMatch[0].replace('wa.me/', '');
      const urlWithMessage = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      urlInput.value = urlWithMessage;
      currentUrl = urlWithMessage;

      const result = generateDeepLink(urlWithMessage);
      currentResult = result;
      displayResult(result);

      whatsappModal.classList.add('hidden');
      addMessageCheckbox.checked = false;
    }
  } else {
    whatsappModal.classList.add('hidden');
    addMessageCheckbox.checked = false;
  }
});

whatsappModal.addEventListener('click', (e) => {
  if (e.target === whatsappModal) {
    whatsappModal.classList.add('hidden');
    addMessageCheckbox.checked = false;
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
