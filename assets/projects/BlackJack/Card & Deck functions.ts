// cardUtils.js
export const suits = ['♠', '♣', '♥', '♦'];
export const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const createDeck = () => {
  return suits.flatMap(suit => 
    values.map(value => ({ 
      suit, 
      value, 
      id: Math.random().toString(36).substr(2, 9) 
    }))
  );
};

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const calculateHandValue = (hand) => {
  let value = 0;
  let aces = 0;

  hand.forEach(card => {
    if (['J', 'Q', 'K'].includes(card.value)) {
      value += 10;
    } else if (card.value === 'A') {
      aces += 1;
      value += 11;
    } else {
      value += parseInt(card.value);
    }
  });

  // Adjust for aces
  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }

  return value;
};