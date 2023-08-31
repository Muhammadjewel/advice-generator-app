function init () {
  const elGenerateAdviceButton = document.querySelector('#generate-advice-button');
  const elCardIndex = document.querySelector('.card__index');
  const elCardQuoteText = document.querySelector('.card__quote-text');

  // Functions
  function displayAdvice (advice) {
    elCardIndex.textContent = advice.slip.id;
    elCardQuoteText.textContent = advice.slip.advice;
  }

  async function getAdvice () {
    elCardIndex.textContent = "...";
    elCardQuoteText.textContent = "Loading...";

    try {
      const adviceResponse = await fetch('https://api.adviceslip.com/advice');
      const advice = await adviceResponse.json();
      displayAdvice(advice);
    } catch (error) {
      console.error('Error', error);
    }
  }


  // DOM handlers
  function generateAdviceButtonClickHandler () {
    getAdvice();
  }

  function documentKeyUpHandler (evt) {
    if (evt.code !== "Space" || document.activeElement === elGenerateAdviceButton) {
      return;
    }

    getAdvice();
  }


  // Event listeners
  if (elGenerateAdviceButton) {
    elGenerateAdviceButton.addEventListener('click', generateAdviceButtonClickHandler);
  }
  document.addEventListener('keyup', documentKeyUpHandler);
}

document.addEventListener('DOMContentLoaded', init);
