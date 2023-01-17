import { button, modal, btnClose } from './nodes.js';
import { view } from './printView.js';

 
button.addEventListener('click', () => {
  modal.style.clipPath =
    'polygon(50% 0%, 100% 0, 100% 60%, 100% 100%, 0 100%, 0% 60%, 0 0)';
});

btnClose.addEventListener('click', () => {
  modal.style.clipPath =
    'polygon(50% 0%, 50% 47%, 100% 60%, 50% 47%, 50% 47%, 0% 60%, 50% 47%)';
});



 
window.addEventListener('load', view); 

