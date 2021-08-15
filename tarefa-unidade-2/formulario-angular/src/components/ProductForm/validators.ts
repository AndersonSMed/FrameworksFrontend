import * as yup from 'yup';

// @ts-ignore
function shapeWrapper(shapeFn) {
  // @ts-ignore
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
      // @ts-ignore
      .reduce((acc, [field, { type, required }]) => {
        // @ts-ignore
        acc[field] = yupShapes[type](required);
        return acc;
      }, {})
  );
}