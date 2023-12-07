import { readInput } from "../../lib/helpers";

function getCardCounts(h: Hand) {
  const { cards } = h;

  return cards.reduce(
    (counts, card) => {
      counts[card] = (counts[card] ?? 0) + 1;

      return counts;
    },
    {} as Record<Card, number>,
  );
}

function cardMapper(card: string) {
  switch (card) {
    case "A":
      return Card.A;
    case "K":
      return Card.K;
    case "Q":
      return Card.Q;
    case "J":
      return Card.J;
    case "T":
      return Card.T;
    case "9":
      return Card.Nine;
    case "8":
      return Card.Eight;
    case "7":
      return Card.Seven;
    case "6":
      return Card.Six;
    case "5":
      return Card.Five;
    case "4":
      return Card.Four;
    case "3":
      return Card.Three;
    case "2":
      return Card.Two;
    default:
      throw new Error("unknown card");
  }
}

enum Card {
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  T,
  J,
  Q,
  K,
  A,
}

export type Hand = {
  cards: Card[];
  bid: number;
};

export enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

export function getHandType(h: Hand): HandType {
  const cardCounts = getCardCounts(h);
  const counts = Object.values(cardCounts);

  if (counts.length === 1) {
    return HandType.FiveOfAKind;
  }

  if (counts.some((c) => c === 4)) {
    return HandType.FourOfAKind;
  }

  if (counts.length === 2 && counts.some((c) => c === 3)) {
    return HandType.FullHouse;
  }

  if (counts.some((c) => c === 3)) {
    return HandType.ThreeOfAKind;
  }

  if (counts.length === 3 && counts.some((c) => c >= 2)) {
    return HandType.TwoPair;
  }

  if (counts.length === 4 && counts.some((c) => c >= 2)) {
    return HandType.OnePair;
  }

  return HandType.HighCard;
}

export async function parseInput() {
  const hands = (await readInput(import.meta.dir))
    .split("\n")
    .map((h): Hand => {
      const [cards, bid] = h.split(" ");
      return { cards: cards.split("").map(cardMapper), bid: Number(bid) };
    });

  return hands;
}
