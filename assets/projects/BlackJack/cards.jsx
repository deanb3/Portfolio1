import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Deck and card utility functions (same as previous implementation)
const suits = ['♠', '♣', '♥', '♦'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const createDeck = () => {
  return suits.flatMap(suit => 
    values.map(value => ({ suit, value, id: Math.random().toString(36).substr(2, 9) }))
  );
};

const calculateHandValue = (hand) => {
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

const BlackjackGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('start');
  const [message, setMessage] = useState('');
  const [dealingAnimation, setDealingAnimation] = useState(false);


  const [balance, setBalance] = React.useState(1000); // Starting balance
  const [bet, setBet] = React.useState(0); // Current bet
  const [betError, setBetError] = React.useState('');

  <div className="d-flex justify-content-center align-items-center mb-3">
    <input 
        type="number" 
        className="form-control w-25" 
        placeholder="Enter Bet" 
        value={bet} 
        onChange={(e) => setBet(Number(e.target.value))} 
        disabled={gameStatus !== 'start'}
    />
    <button 
        className="btn btn-success ms-2" 
        onClick={() => {
            if (bet <= 0 || bet > balance) {
                setBetError('Invalid bet amount.');
            } else {
                setBetError('');
                startGame();
                setBalance(balance - bet);
            }
        }}
        disabled={gameStatus !== 'start'}
    >
        Place Bet
    </button>
</div>
{betError && <p className="text-danger text-center">{betError}</p>}

  // Ref for tracking dealing state
  const cardDeckRef = useRef(null);

  // Initialize game with animation
  const startGame = () => {
const [balance, setBalance] = React.useState(1000); // Starting balance
const [bet, setBet] = React.useState(0); // Current bet
const [betError, setBetError] = React.useState('');

    setDealingAnimation(true);
    const newDeck = createDeck();
    // Shuffle deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    const initialPlayerHand = [newDeck.pop(), newDeck.pop()];
    const initialDealerHand = [newDeck.pop(), newDeck.pop()];

    // Simulate dealing animation
    setTimeout(() => {
      setDeck(newDeck);
      setPlayerHand(initialPlayerHand);
      setDealerHand(initialDealerHand);
      setGameStatus('playing');
      setMessage('');
      setDealingAnimation(false);
    }, 1500);
  };

  // Player hits with animation
  const hit = () => {
    if (gameStatus !== 'playing' || dealingAnimation) return;

    if (dealerValue > 21 || playerValue > dealerValue) {
    setBalance(balance + bet * 2); // Player wins
    setGameStatus('player-win');
    setMessage('You win!');
} else if (dealerValue === playerValue) {
    setBalance(balance + bet); // Return the bet for a draw
    setGameStatus('draw');
    setMessage('It\'s a draw!');
} else {
    setGameStatus('dealer-win');
    setMessage('Dealer wins!');
}


    setDealingAnimation(true);
    const newDeck = [...deck];
    const dealtCard = newDeck.pop();

    // Animate card dealing
    setTimeout(() => {
      const newPlayerHand = [...playerHand, dealtCard];
      setPlayerHand(newPlayerHand);
      setDeck(newDeck);
      setDealingAnimation(false);

      const playerValue = calculateHandValue(newPlayerHand);
      if (playerValue > 21) {
        setGameStatus('dealer-win');
        setMessage('Bust! Dealer wins.');
      }
    }, 500);
  };

  // Player stands with dealer card reveal animation
  const stand = () => {
    if (gameStatus !== 'playing' || dealingAnimation) return;
    

    setDealingAnimation(true);
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];

    // Dealer draws with animation
    const dealDealerCard = () => {
      if (calculateHandValue(newDealerHand) < 17) {
        newDealerHand.push(newDeck.pop());
        setTimeout(() => {
          setDealerHand([...newDealerHand]);
          dealDealerCard();
        }, 500);
      } else {
        // Finalize game after dealing
        setTimeout(() => {
          setDeck(newDeck);
          setDealerHand(newDealerHand);
          setDealingAnimation(false);

          const playerValue = calculateHandValue(playerHand);
          const dealerValue = calculateHandValue(newDealerHand);

          if (dealerValue > 21) {
            setGameStatus('player-win');
            setMessage('Dealer busts! You win!');
          } else if (dealerValue > playerValue) {
            setGameStatus('dealer-win');
            setMessage('Dealer wins!');
          } else if (dealerValue < playerValue) {
            setGameStatus('player-win');
            setMessage('You win!');
          } else {
            setGameStatus('draw');
            setMessage('It\'s a draw!');
          }
        }, 1000);
      }
    };

    // Start dealer card dealing process
    dealDealerCard();
  };

  // Render card with animation classes
  const renderCard = (card, hidden = false, index = 0) => {
    if (hidden) {
      return (
        <div 
          key={card.id || 'hidden'}
          className={`card m-1 bg-secondary text-white card-deal-animation`} 
          style={{ 
            width: '100px', 
            animationDelay: `${index * 0.2}s`
          }}
        >
          <div className="card-body text-center">
            <h5 className="card-title">🃏</h5>
          </div>
        </div>
      );
    }

    const color = ['♥', '♦'].includes(card.suit) ? 'text-danger' : 'text-dark';
    return (
      <div 
        key={card.id}
        className={`card m-1 ${color} card-deal-animation`} 
        style={{ 
          width: '100px', 
          animationDelay: `${index * 0.2}s`
        }}
      >
        <div className="card-body text-center">
          <h5 className="card-title">{card.value}</h5>
          <p className="card-text">{card.suit}</p>
        </div>
      </div>
    );
  };

  // Initial game setup
  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes dealCard {
          0% { 
            transform: translateX(-100px) rotate(-20deg); 
            opacity: 0;
          }
          70% { 
            transform: translateX(10px) rotate(5deg); 
            opacity: 0.7;
          }
          100% { 
            transform: translateX(0) rotate(0); 
            opacity: 1;
          }
        }

        .card-deal-animation {
          animation: dealCard 0.5s ease-out forwards;
          opacity: 0;
        }

        .card-deck-source {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 100px;
          height: 150px;
          border: 2px dashed #6c757d;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
      `}</style>

      {/* Card deck source indicator */}
      <div ref={cardDeckRef} className="card-deck-source">
        <span className="text-muted">Deck</span>
      </div>

      <Card className="w-full max-w-xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-center">Blackjack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="container">
            {/* Dealer's Hand */}
            <div className="mb-4">
              <h3 className="mb-2">Dealer's Hand</h3>
              <div className="d-flex justify-content-center">
                {gameStatus === 'playing' 
                  ? dealerHand.map((card, index) => 
                      index === 0 ? renderCard(card, true) : renderCard(card, false, 1)
                    )
                  : dealerHand.map((card, index) => renderCard(card, false, index))
                }
              </div>
              {gameStatus !== 'playing' && 
                <p className="text-center mt-2">
                  Dealer's Total: {calculateHandValue(dealerHand)}
                </p>
              }
            </div>

            {/* Player's Hand */}
            <div className="mb-4">
              <h3 className="mb-2">Your Hand</h3>
              <div className="d-flex justify-content-center">
                {playerHand.map((card, index) => renderCard(card, false, index))}
              </div>
              <p className="text-center mt-2">
                Your Total: {calculateHandValue(playerHand)}
              </p>
            </div>

            {/* Game Message */}
            {message && (
              <div className={`alert ${
                gameStatus === 'player-win' ? 'alert-success' : 
                gameStatus === 'dealer-win' ? 'alert-danger' : 
                'alert-secondary'
              } text-center`}>
                {message}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="d-flex justify-content-center gap-3">
            {gameStatus === 'playing' ? (
              <>
                <Button 
                  variant="secondary" 
                  onClick={hit} 
                  disabled={dealingAnimation}
                  className="btn-lg"
                >
                  Hit
                </Button>
                <Button 
                  variant="primary" 
                  onClick={stand} 
                  disabled={dealingAnimation}
                  className="btn-lg"
                >
                  Stand
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                onClick={startGame} 
                className="btn-lg"
              >
                New Game
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BlackjackGame;