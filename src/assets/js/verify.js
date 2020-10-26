function number(rule, value, callback) {
  if(!value){
    return callback(new Error('请输入数字！'));
  }
  if (value && (!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(value))) {
    return callback(new Error('请输入数字，支持小数'))
  } else {
    return callback()
  }

}

function Density(rule, value, callback) {
  var specialKey = "<>";
  var pattern = /^\d+.?\d{0,1}$/;
  if (!value) {
    return callback(new Error('请输入密度Kg/m³'));
  } else {
    if (pattern.test(value)) {
      callback()
    } else {
      for (var i = 0; i < value.length; i++) {
        if (specialKey.indexOf(value.substr(i, 1)) != -1) {
          callback()
        } else {
          return callback(new Error('可包括< >，小数点保留1位'));
        }
      }
    }
  }
}

function Coefficient(rule, value, callback) {
  var specialKey = "+-";
  var pattern = /^\d+.?\d{0,15}$/;
  if (!value) {
    return callback(new Error('请输入系数'));
  } else {
    if (pattern.test(value)) {
      callback()
    } else {
      for (var i = 0; i < value.length; i++) {
        if (specialKey.indexOf(value.substr(i, 1)) != -1) {
          callback()
        } else {
          return callback(new Error('可包括+ -， 小数点后最多15位'));
        }
      }
    }
  }
}

export { //很关键
  number, Density, Coefficient
}
