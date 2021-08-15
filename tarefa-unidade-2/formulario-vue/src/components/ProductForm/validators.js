import * as yup from 'yup';

function shapeWrapper(shapeFn) {
  return function (required) {
    if (required) return shapeFn().required();
    return shapeFn();
  }
}

const yupShapes = {
  url: shapeWrapper(() => yup.string().url()),
  text: shapeWrapper(yup.string),
  number: shapeWrapper(yup.number)
}

export function useYup(formShape = {}) {
  return yup.object().shape(
    Object
      .entries(formShape)
      .reduce((acc, [field, { type, required }]) => {
        acc[field] = yupShapes[type](required);
        return acc;
      }, {})
  );
}