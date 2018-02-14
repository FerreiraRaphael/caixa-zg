import SagaTester from "redux-saga-tester";

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const initSagaTester = (initialState, reducers, sagas) => {
  const sagaTester = new SagaTester({
    initialState,
    reducers
  });
  sagaTester.start(sagas);
  return sagaTester;
};

export const mockPromiseResolve = (mock, ms = 1) => 
  new Promise(async (res, rej) => {
    await delay(ms);
    res(mock);
  });

export const mockPromiseReject = (mock, ms = 1) => 
  new Promise(async (res, rej) => {
    await delay(ms);
    rej(mock);
  });
