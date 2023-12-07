import { Hand, getHandType, parseInput } from "./lib";

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

function handSorter(h1: Hand, h2: Hand) {
  const h1Type = getHandType(h1);
  const h2Type = getHandType(h2);

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
}

export async function solve() {
  const hands = await parseInput();

  const sortedHands = hands.sort(handSorter);

  return sortedHands.reduce((total, { bid }, i) => total + bid * (i + 1), 0);
}
