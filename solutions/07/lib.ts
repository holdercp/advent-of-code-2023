import { readInput } from "../../lib/helpers";

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

type Hand = {
  cards: Card[];
  bid: number;
};

enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

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

function getTypeWithWild(cardCounts: Record<Card, number>): HandType {
  const { [Card.J]: wilds, ...nonWild } = cardCounts;

  const nonWildCounts = Object.values(nonWild);

  if (nonWildCounts.length === 1) {
    return HandType.FiveOfAKind;
  }

  if (nonWildCounts.length === 2) {
    if (wilds === 3) {
      return HandType.FourOfAKind;
    }
    if (wilds === 2) {
      return HandType.FourOfAKind;
    }
    if (wilds === 1) {
      if (nonWildCounts.some((c) => c === 3)) {
        return HandType.FourOfAKind;
      }
      return HandType.FullHouse;
    }
  }

  if (nonWildCounts.length === 3) {
    return HandType.ThreeOfAKind;
  }

  if (nonWildCounts.length === 4) {
    return HandType.OnePair;
  }

  return HandType.FiveOfAKind;
}

function checkHandType(cardCounts: Record<Card, number>) {
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

function getHandTypeWithWild(h: Hand): HandType {
  const cardCounts = getCardCounts(h);
  if (Object.keys(cardCounts).includes(`${Card.J}`)) {
    return getTypeWithWild(cardCounts);
  }
  return checkHandType(cardCounts);
}

function getHandType(h: Hand): HandType {
  const cardCounts = getCardCounts(h);
  return checkHandType(cardCounts);
}

function findStronger(h1: Hand, h2: Hand): Hand | null {
  const { cards: h1Cards } = h1;
  const { cards: h2Cards } = h2;

  for (let i = 0; i < h1Cards.length; i++) {
    const h1Card = h1Cards[i];
    const h2Card = h2Cards[i];

    if (h1Card > h2Card) {
      return h1;
    }

    if (h1Card < h2Card) {
      return h2;
    }
  }

  return null;
}

function createHandSorter(typeChecker: (h: Hand) => HandType) {
  return function sorter(h1: Hand, h2: Hand) {
    const h1Type = typeChecker(h1);
    const h2Type = typeChecker(h2);

    const result = h1Type - h2Type;

    // Hands are same type so compare individual cards
    if (result === 0) {
      const stronger = findStronger(h1, h2);
      if (stronger === h1) {
        return 1;
      }

      if (stronger === h2) {
        return -1;
      }

      return 0;
    }

    return result;
  };
}

export const handSorter = createHandSorter(getHandType);
export const wildHandSorter = createHandSorter(getHandTypeWithWild);

export async function parseInput(example: boolean | undefined, part2 = false) {
  if (part2) {
    // @ts-expect-error: Set the enum object at runtime so J is the weakest card
    Card.J = -1;
  }

  const hands = (await readInput(import.meta.dir, example))
    .split("\n")
    .map((h): Hand => {
      const [cards, bid] = h.split(" ");
      return { cards: cards.split("").map(cardMapper), bid: Number(bid) };
    });

  return hands;
}
