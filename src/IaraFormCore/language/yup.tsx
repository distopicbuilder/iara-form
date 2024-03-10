/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yupCore from 'yup';

const toString = Object.prototype.toString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString =
  typeof Symbol !== 'undefined'
    ? Symbol.prototype.toString
    : function () {
        return '';
      };
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;

function printNumber(val: any) {
  if (val !== +val) return 'NaN';
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? '-0' : '' + val;
}

function printSimpleValue(val: any, quoteStrings: any) {
  if (quoteStrings === void 0) {
    quoteStrings = false;
  }

  if (val === null || val === true || val === false) return '' + val;
  const typeOf = typeof val;
  if (typeOf === 'number') return printNumber(val);
  if (typeOf === 'string') return quoteStrings ? '"' + val + '"' : val;
  if (typeOf === 'function') return '[Function ' + (val.name || 'anonymous') + ']';
  if (typeOf === 'symbol') return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
  const tag = toString.call(val).slice(8, -1);
  if (tag === 'Date') return isNaN(val.getTime()) ? '' + val : val.toISOString(val);
  if (tag === 'Error' || val instanceof Error) return '[' + errorToString.call(val) + ']';
  if (tag === 'RegExp') return regExpToString.call(val);
  return null;
}
function printValue(value: any, quoteStrings: any) {
  const result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;
  return JSON.stringify(
    value,
    function (key, value) {
      const result = printSimpleValue(this[key], quoteStrings);
      if (result !== null) return result;
      return value;
    },
    2,
  );
}

const mixed = {
  default: 'Inválido.',
  required: 'Obrigatório.',
  oneOf: 'Deve ter um dos seguintes valores: ${values}.',
  notOneOf: 'Não deve ter nenhum dos seguintes valores: ${values}.',
  notType: ({ type, value, originalValue }: any) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg = `${
      `Deve ser do tipo \`${type}\`, ` + `mas o valor final é: \`${printValue(value, true)}\``
    }${isCast ? ` (cast do valor \`${printValue(originalValue, true)}\`).` : '.'}`;

    if (value === null) {
      msg +=
        '\nSe a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`.';
    }

    return msg;
  },
  defined: 'Não deve ser indefinido.',
};

const string = {
  length: ({ length }: { length: number }) =>
    `Deve ter exatamente ${length} ${length === 1 ? 'caractere' : 'caracteres'}.`,
  min: ({ min }: { min: number }) =>
    `Deve ter pelo menos ${min} ${min === 1 ? 'caractere' : 'caracteres'}.`,
  max: ({ max }: { max: number }) =>
    `Deve ter no máximo ${max} ${max === 1 ? 'caractere' : 'caracteres'}.`,
  matches: 'Deve corresponder ao padrão: "${regex}".',
  email: 'Deve ser um e-mail válido.',
  url: 'Deve ser uma URL válida.',
  trim: 'Não deve conter espaços adicionais no início nem no fim.',
  lowercase: 'Deve estar em letras minúsculas.',
  uppercase: 'Deve estar em letras maiúsculas.',
};

const number = {
  min: 'Deve ser maior ou igual a ${min}.',
  max: 'Deve ser menor ou igual a ${max}.',
  lessThan: 'Deve ser menor que ${less}.',
  moreThan: 'Deve ser maior que ${more}.',
  notEqual: 'Não deve ser igual a ${notEqual}.',
  positive: 'Deve ser um número positivo.',
  negative: 'Deve ser um número negativo.',
  integer: 'Deve ser um número inteiro.',
};

const date = {
  min: 'Deve ser posterior a ${min}.',
  max: 'Deve ser anterior a ${max}.',
};

const boolean = {};

const object = {
  noUnknown: 'Existem chaves desconhecidas: ${unknown}.',
};

const array = {
  min: ({ min }: { min: number }) => `Deve ter pelo menos ${min} ${min === 1 ? 'item' : 'itens'}.`,
  max: ({ max }: { max: number }) => `Deve ter no máximo ${max} ${max === 1 ? 'item' : 'itens'}.`,
};

const pt = {
  __proto__: null,
  mixed,
  string,
  number,
  date,
  boolean,
  object,
  array,
};
yupCore.setLocale(pt);

export { yupCore as iaraSchema };
