import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const inputNumber = document.querySelector('input[type="number"]');
inputNumber.classList.add('input-number');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { delay, state } = event.target.elements;
  const delayValue = +delay.value;
  const stateValue = state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve('fulfilled');
      } else {
        reject('rejected');
      }
    }, delayValue);
  });
  promise
    .then(data => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        backgroundColor: 'green',
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        message: `❌ Rejected promise in ${delayValue}ms`,
        backgroundColor: 'pink',
        position: 'topRight',
      });
    });
}
