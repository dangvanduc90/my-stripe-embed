const configDefaultButton = {
  title: 'Thanh toán',
  style: {
    color: '#333'
  }
};

const configDefaultOrder = {
};

class NotPresentException extends Error {
  constructor(message = 'bar', name = '') {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message, name);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotPresentException)
    }

    this.name = 'NotPresentException';
    // Custom debugging information
    this.message = message;
  }
}

/**
 * New instance Stripe.
 * @constructor
 * @param {string} selector - The id where button checkout will appear.
 * @param {string} apiKey - The apiKey which baokim given to merchant.
 * @param {object} configOrder - The configOrder which merchant send to baokim.
 * @param {object} configButton - The button decorate.
 * @returns {string} message - The message.
 */
class Stripe {
  constructor(selector = '', apiKey = '', configOrder = {}, configButton = {}) {
    this.selector = selector;
    this.apiKey = apiKey;
    this.configOrder = configOrder;
    this.configButton = configButton;
  }

  create() {
    if (!this.selector) {
      throw new NotPresentException('selector must present selector');
    }

    if (!this.apiKey) {
      throw new NotPresentException('apiKey must present apiKey');
    }

    if (!isObject(this.configOrder)) {
      throw new NotPresentException('configOrder must be object');
    }

    // console.log(this.configOrder);
    if (!this.configOrder.hasOwnProperty('mrc_order_id')) {
      throw new NotPresentException('configOrder must has key mrc_order_id');
    }

    if (!this.configOrder.hasOwnProperty('description')) {
      throw new NotPresentException('configOrder must has key description');
    }

    if (!this.configOrder.hasOwnProperty('total_amount')) {
      throw new NotPresentException('configOrder must has key total_amount');
    }

    const $selector = document.getElementById(this.selector);
    if ($selector == null) {
      throw new DOMException(`not find id ${this.selector}`);
    }

    // merge configOrder
    const configOrder =  mergeDeep(configDefaultOrder, this.configOrder);

    // merge configButton
    const configButton =  mergeDeep(configDefaultButton, this.configButton);

    let cssStyle = '';

    if (configButton.hasOwnProperty('style')) {
      for (const attr in configButton.style) {
        cssStyle += `${attr}: ${configButton.style[attr]};`;
      }
    }

    $selector.innerHTML = `
    <button id="customButton" class="stripe-button-el" style="${cssStyle}" onclick="doCheckout(this)">
        <span>${configButton.title}</span>
    </button>`;
    // console.log(this.doThis());
    return 'created';
  }

  // doThis() {
  //   return 'doThis';
  // }
}

function doCheckout(that) {
  const $this = that;
  $this.disabled = true; // disable btn
  console.log('doCheckout');

  setTimeout(function () {
    $this.disabled = false; // active btn
  }, 2000)
}

function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }
  return target;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}