const extractGridPosition = (key: string): number[] =>
  key.split(",").map(x => Number(x) * 1.2);

export default extractGridPosition;
