import { Ask } from '../entities/Ask';

export const getLowest = (asks: Ask[]): Ask => {
  let min = Math.max();
  let result = asks[0];
  asks.map((ask) => {
    if (min > ask.askPrice) {
      min = ask.askPrice;
      result = ask;
    }
  });
  return result;
};
