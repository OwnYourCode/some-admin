export const logParams = <T extends any>(...params: T[]) => {
  params.forEach((param) => {
    console.log(param);
  });
};
