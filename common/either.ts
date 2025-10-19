export type Either<TLeft, TRight> = Left<TLeft> | Right<TRight>;

export interface Left<TLeft> {
  readonly isRight: false;
  readonly left: TLeft;
}

export interface Right<TRight> {
  readonly isRight: true;
  readonly right: TRight;
}

export function left<TLeft>(left: TLeft): Left<TLeft> {
  return { isRight: false, left: left };
}

export function right<TRight>(right: TRight): Right<TRight> {
  return { isRight: true, right: right };
}
