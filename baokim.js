const configDefaultButton = {
  title: 'Thanh toán',
  style: {
    color: '#333'
  }
};

const configDefaultOrder = {};

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
 * New instance Baokim.
 * @constructor
 * @param {string} selector - The id where button checkout will appear.
 * @param {string} apiKey - The apiKey which baokim given to merchant.
 * @param {object} configOrder - The configOrder which merchant send to baokim.
 * @param {object} configButton - The button decorate.
 * @returns {string} message - The message.
 */
class Baokim {
  constructor(id_selector = '', apiKey = '', configOrder = {}, configButton = {}) {
    this.apiKey = apiKey;
    this.configOrder = configOrder;
    this.configButton = configButton;
    this.id_selector = id_selector;
    this.$selector = document.getElementById(id_selector);

    this.validate();
  }

  validate() {
    if (!this.id_selector) {
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

    if (!this.configOrder.hasOwnProperty('success_url')) {
      throw new NotPresentException('configOrder must has key success_url');
    }

    if (!this.configOrder.hasOwnProperty('cancel_url')) {
      throw new NotPresentException('configOrder must has key cancel_url');
    }

    if (!this.configOrder.hasOwnProperty('total_amount')) {
      throw new NotPresentException('configOrder must has key total_amount');
    }

    if (!this.configOrder.hasOwnProperty('payment_method_type')) {
      throw new NotPresentException('configOrder must has key payment_method_type');
    }
    if (this.$selector == null) {
      throw new DOMException(`not find id ${this.id_selector}`);
    }
  }

  create() {
    // merge configOrder
    const configOrder = mergeDeep(configDefaultOrder, this.configOrder);

    // merge configButton
    const configButton = mergeDeep(configDefaultButton, this.configButton);

    let cssStyle = '';

    if (configButton.hasOwnProperty('style')) {
      for (const attr in configButton.style) {
        cssStyle += `${attr}: ${configButton.style[attr]};`;
      }
    }

    // let banks = sendRequest('get', 'https://api.baokim.vn/payment/api/v4/bpm/list');
    // console.log(banks)
    // return;

    let banks = `{"code":0,"message":[],"count":29,"data":[{"id":0,"name":"V\u00ed B\u1ea3o Kim","bank_id":0,"type":0,"complete_time":"Ngay l\u1eadp t\u1ee9c","bank_name":"V\u00ed B\u1ea3o Kim","bank_short_name":"B\u1ea3o Kim","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/baokim.png"},{"id":15,"name":"Th\u1ebb ATM Vietcombank","bank_id":1,"type":1,"complete_time":"0","bank_name":"Vietcombank - Ng\u00e2n h\u00e0ng TMCP Ngo\u1ea1i th\u01b0\u01a1ng","bank_short_name":"Vietcombank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/1.png"},{"id":60,"name":"Th\u1ebb ATM Techcombank","bank_id":87,"type":1,"complete_time":"","bank_name":"Techcombank - Ng\u00e2n h\u00e0ng K\u1ef9 th\u01b0\u01a1ng Vi\u1ec7t Nam","bank_short_name":"Techcombank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/87.png"},{"id":61,"name":"Th\u1ebb ATM Military Bank","bank_id":84,"type":1,"complete_time":"","bank_name":"Ng\u00e2n h\u00e0ng Qu\u00e2n \u0110\u1ed9i (MB)","bank_short_name":"Military Bank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/84.png"},{"id":62,"name":"Th\u1ebb ATM VIB","bank_id":83,"type":1,"complete_time":"","bank_name":"VIB - Ng\u00e2n h\u00e0ng Qu\u1ed1c T\u1ebf","bank_short_name":"VIB","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/83.png"},{"id":63,"name":"Th\u1ebb ATM Eximbank","bank_id":108,"type":1,"complete_time":"0","bank_name":"Eximbank - Ng\u00e2n h\u00e0ng Xu\u1ea5t nh\u1eadp kh\u1ea9u","bank_short_name":"Eximbank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/108.png"},{"id":64,"name":"Th\u1ebb ATM ACB","bank_id":95,"type":1,"complete_time":"0","bank_name":"ACB - Ng\u00e2n h\u00e0ng \u00c1 Ch\u00e2u","bank_short_name":"ACB","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/95.png"},{"id":91,"name":"Th\u1ebb ATM Vietinbank","bank_id":81,"type":1,"complete_time":null,"bank_name":"Vietinbank - Ng\u00e2n h\u00e0ng C\u00f4ng th\u01b0\u01a1ng Vi\u1ec7t Nam","bank_short_name":"Vietinbank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/81.png"},{"id":94,"name":"Th\u1ebb ATM HDBank","bank_id":121,"type":1,"complete_time":"0","bank_name":"HDBank - Ng\u00e2n h\u00e0ng Ph\u00e1t tri\u1ec3n nh\u00e0 TPHCM","bank_short_name":"HDBank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/121.png"},{"id":96,"name":"Th\u1ebb ATM Nam A Bank","bank_id":136,"type":1,"complete_time":"0","bank_name":"Nam A Bank - Ng\u00e2n h\u00e0ng Nam \u00c1","bank_short_name":"Nam A Bank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/136.png"},{"id":97,"name":"Th\u1ebb ATM Saigonbank","bank_id":117,"type":1,"complete_time":"0","bank_name":"Saigonbank - Ng\u00e2n h\u00e0ng S\u00e0i G\u00f2n C\u00f4ng Th\u01b0\u01a1ng","bank_short_name":"Saigonbank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/117.png"},{"id":98,"name":"Th\u1ebb ATM Sacombank","bank_id":110,"type":1,"complete_time":"0","bank_name":"Sacombank - Ng\u00e2n h\u00e0ng S\u00e0i G\u00f2n Th\u01b0\u01a1ng T\u00edn","bank_short_name":"Sacombank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/110.png"},{"id":101,"name":"Th\u1ebb ATM DongA Bank","bank_id":82,"type":1,"complete_time":"","bank_name":"DongA Bank - Ng\u00e2n h\u00e0ng \u0110\u00f4ng \u00c1","bank_short_name":"DongA Bank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/82.png"},{"id":105,"name":"Th\u1ebb ATM Maritime Bank","bank_id":99,"type":1,"complete_time":"","bank_name":"MSB - Ng\u00e2n h\u00e0ng H\u00e0ng H\u1ea3i Vi\u1ec7t Nam","bank_short_name":"Maritime Bank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/99.png"},{"id":112,"name":"Th\u1ebb ATM Agribank","bank_id":114,"type":1,"complete_time":"","bank_name":"Agribank - Ng\u00e2n h\u00e0ng N\u00f4ng nghi\u1ec7p v\u00e0 Ph\u00e1t tri\u1ec3n N\u00f4ng th\u00f4n Vi\u1ec7t Nam","bank_short_name":"Agribank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/114.png"},{"id":113,"name":"Th\u1ebb ATM VPBank","bank_id":105,"type":1,"complete_time":"","bank_name":"VPBank - Ng\u00e2n h\u00e0ng Vi\u1ec7t Nam Th\u1ecbnh V\u01b0\u1ee3ng","bank_short_name":"VPBank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/105.png"},{"id":115,"name":"Th\u1ebb ATM GPBank","bank_id":135,"type":1,"complete_time":"","bank_name":"GP Bank - Ng\u00e2n h\u00e0ng d\u1ea7u kh\u00ed To\u00e0n C\u1ea7u","bank_short_name":"GPBank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/135.png"},{"id":129,"name":"Th\u1ebb ATM BACA","bank_id":163,"type":1,"complete_time":"","bank_name":"BACABank - Ng\u00e2n h\u00e0ng B\u1eafc \u00c1","bank_short_name":"BACA","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/163.png"},{"id":130,"name":"Th\u1ebb ATM TienPhongBank","bank_id":107,"type":1,"complete_time":"0","bank_name":"TienPhongBank - Ng\u00e2n h\u00e0ng Ti\u00ean  Phong","bank_short_name":"TienPhongBank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/107.png"},{"id":131,"name":"Th\u1ebb ATM BIDV","bank_id":94,"type":1,"complete_time":"0","bank_name":"BIDV - Ng\u00e2n h\u00e0ng \u0110\u1ea7u t\u01b0 v\u00e0 Ph\u00e1t tri\u1ec3n Vi\u1ec7t Nam","bank_short_name":"BIDV","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/94.png"},{"id":148,"name":"Th\u1ebb ATM SHB","bank_id":106,"type":1,"complete_time":"0","bank_name":"SHB - Ng\u00e2n h\u00e0ng S\u00e0i G\u00f2n- H\u00e0 N\u1ed9i","bank_short_name":"SHB","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/106.png"},{"id":150,"name":"Th\u1ebb ATM BAOVIET Bank","bank_id":111,"type":1,"complete_time":"","bank_name":"BAOVIET Bank - Ng\u00e2n h\u00e0ng B\u1ea3o Vi\u1ec7t","bank_short_name":"BAOVIET Bank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/111.png"},{"id":152,"name":"Th\u1ebb ATM LienVietBank","bank_id":129,"type":1,"complete_time":"","bank_name":"LienVietBank - Ng\u00e2n h\u00e0ng Li\u00ean Vi\u1ec7t","bank_short_name":"LienVietBank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/129.png"},{"id":153,"name":"Th\u1ebb ATM SeABank","bank_id":101,"type":1,"complete_time":"0","bank_name":"SeABank - Ng\u00e2n h\u00e0ng \u0110\u00f4ng Nam \u00c1","bank_short_name":"SeABank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/101.png"},{"id":154,"name":"Th\u1ebb ATM ABBank","bank_id":131,"type":1,"complete_time":"","bank_name":"ABBank - Ng\u00e2n h\u00e0ng An B\u00ecnh","bank_short_name":"ABBank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/131.png"},{"id":157,"name":"Th\u1ebb ATM NCB","bank_id":166,"type":1,"complete_time":"","bank_name":"Ng\u00e2n h\u00e0ng Th\u01b0\u01a1ng m\u1ea1i C\u1ed5 ph\u1ea7n Qu\u1ed1c D\u00e2n NCB","bank_short_name":"NCB","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/166.png"},{"id":158,"name":"Th\u1ebb ATM KienLongBank","bank_id":134,"type":1,"complete_time":"","bank_name":"KienLongBank - Ng\u00e2n h\u00e0ng Ki\u00ean Long","bank_short_name":"KienLongBank","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/134.png"},{"id":159,"name":"Th\u1ebb ATM SCB","bank_id":124,"type":1,"complete_time":"","bank_name":"Ng\u00e2n h\u00e0ng TMCP S\u00e0i G\u00f2n (SCB)","bank_short_name":"SCB","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/124.png"},{"id":128,"name":"Th\u1ebb t\u00edn d\u1ee5ng","bank_id":162,"type":2,"complete_time":null,"bank_name":"Th\u1ebb t\u00edn d\u1ee5ng","bank_short_name":"Credit Card","bank_logo":"https:\\/\\/cdn.baokim.vn\\/public\\/uploads\\/banks\\/162.png"}]}`;
    banks = JSON.parse(banks)['data'];

    let html_banks = '';
    for (let bank of banks) {
      if (bank.type == 1) {
        html_banks += `<li>
                        <img class="img-bank" id=${bank.id} style="width: 100%" src=${bank.bank_logo}>
                        <input type="hidden" name="bank_payment_method_id" id=${bank.id} value=${bank.id}>
                      </li>`;
      }
    }

    let html = `<div class="baokim-form-wrapper payment_list"><form method="post" action="http://baokim.vn/payment/checkout" id="form-action">
                <div class="row-fluid customer_info">
                    <div class="info">
                        <h2 class="title">Thông tin đơn hàng<!--<img src="images/safe.png" border="0" style="vertical-align: bottom; margin-left: 5px;" />--></h2>
                        
                          <input type="hidden" name="api_key" value=${this.apiKey}>
                          <input type="hidden" name="success_url" value=${configOrder.success_url}>
                          <input type="hidden" name="cancel_url" value=${configOrder.cancel_url}>
                          <input type="hidden" name="payment_method_type" value=${configOrder.payment_method_type}>

                          <p>
                            <label for="mrc_order_id" class="floatLabel">Mã đơn hàng</label>
                            <input type="text" name="mrc_order_id" id="mrc_order_id" value="${configOrder.mrc_order_id}" readonly required>
                          </p>
                          <p>
                            <label for="description" class="floatLabel">Mô tả</label>
                            <input type="text" name="description" id="description" placeholder="Mô tả đơn hàng" required>
                          </p>
                          <p>
                            <label for="customer_email" class="floatLabel">Email khách hàng:</label>
                            <input type="text" name="customer_email" id="customer_email" placeholder="customer@example.com" required>
                          </p>
                          <p>
                            <label for="customer_phone" class="floatLabel">SĐT khách hàng:</label>
                            <input  type="text" name="customer_phone" id="customer_phone" placeholder="0911111000" required>
                          </p>
                          <p>
                            <label for="customer_phone" class="floatLabel">Số tiền thanh toán:</label>
                            <input id="total_amount" type="text" name="total_amount" value="${configOrder.total_amount}" required readonly>
                          </p>
                    </div>
                </div>

                <div class="row-fluid method" id="4">
                    <div class="icon"><img src="./bkim/sercurity.png" border="0"></div>
                    <div class="info">
                        <span class="title">Sử dụng ví Bảo Kim</span>
                        <span class="desc">Thanh toán bằng ví Bảo Kim (Baokim.vn)</span>
                    </div>
                    <div class="check_box"></div>
                </div>

                <div class="row-fluid method" id="297">
                    <div class="icon"><img src="./bkim/sercurity.png" border="0"></div>
                    <div class="info">
                        <span class="title">Sử dụng QR code</span>
                        <span class="desc">Thanh toán bằng quẹt mã QR code</span>
                    </div>
                    <div class="check_box"></div>
                </div>

                <div class="row-fluid method" id="1">
                    <div class="icon"><img src="./bkim/atm.png" border="0"></div>
                    <div class="info">
                        <span class="title">Sử dụng thẻ ATM nội địa</span>
                        <span class="desc">Chọn thẻ ngân hàng thanh toán</span>

                        <div class="bank_list">
                            <ul id="b_l">
                            ${html_banks}
                            </ul>
                            <div class="clr"></div>
                        </div>
                    </div>
                    <div class="check_box"></div>
                </div>
                <div style="clear: both"></div>
                <div class="row-fluid method" id="3">
                    <div class="icon"><img src="./bkim/atm.png" border="0"></div>
                    <div class="info">
                        <span class="title">Sử dụng thẻ Visa/Master card</span>
                        <span class="desc">Chọn thẻ ngân hàng thanh toán</span>

                        <div class="bank_list">
                            <ul id="b_l">
                            </ul>
                            <div class="clr"></div>
                        </div>
                    </div>
                    <div class="check_box"></div>
                </div>
                <input type="hidden" name="bank_payment_method_id" id="bank_payment_method_id" value="">
                <div class="submit">
                    <input type="submit" class="btn btn-success pm_submit" name="submit" value="Thanh toán">
                </div>
            </form>
            </div>`;

    this.$selector.innerHTML = html;
    return 'created';
  }

  createBtn() {
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

    this.$selector.innerHTML = `
    <form method="post" action="http://baokim.vn/payment/checkout" >
    <input type="hidden" name="api_key" value=${this.apiKey}>
    <input type="hidden" name="mrc_order_id" value=${configOrder.mrc_order_id}>
    <input type="hidden" name="total_amount" value=${configOrder.total_amount}>
    <input type="hidden" name="success_url" value=${configOrder.success_url}>
    <input type="hidden" name="cancel_url" value=${configOrder.cancel_url}>
    <input type="hidden" name="payment_method_type" value=${configOrder.payment_method_type}>
    <button type="submit" id="customButton" class="stripe-button-el" style="${cssStyle}" ">
        <span>${configButton.title}</span>
    </button>
    </form>`;
    // console.log(this.doThis());
    return 'created';
  }
}

function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: {}});
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {[key]: source[key]});
      }
    });
  }
  return target;
}

function sendRequest(method, url, data = {}) {
  var jqxhr = $.ajax({
    type: method,
    url: url,
    data: data,
    dataType: 'json',
    cache: false,
    async: false
  });

  return jqxhr;
  return {valid: jqxhr.statusText, data: jqxhr.responseJSON};
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

$(document).on('click', '.input-mode', function () {
  var a = $(this).val();
  if (a == 2) {
    $(document).find('#daykeep').css('display', 'block');
  }
  if (a == 1) {
    $(document).find('#daykeep').css('display', 'none');
  }
});

$(document).on('click', '.method', function () {
  $(this).siblings().children().find('img').removeClass('img-active');
  $(document).find('.method').removeClass('selected');
  $(document).find('.check_box').removeClass('checked_box');
  $(this).addClass('selected');
  $(document).find('.selected .check_box').addClass('checked_box');
  var method = $(this).attr('id');
  if (method != 0) {

    if (method == 297) {
      $(document).find('#bank_payment_method_id').val(method);
    }

    //$('.mode').css('display','block');
    // $('.info1').slideDown();
    $('.selected img').click(function () {
      $('.method img').removeClass('img-active');
      $(this).addClass('img-active');
      var id = $(this).attr('id');
      $('#bank_payment_method_id').val(id);
    });
  } else {
    //$('.mode').css('display','none');
    // $('.info1').slideUp('slow');
    $('.method img').removeClass('img-active');
  }
});