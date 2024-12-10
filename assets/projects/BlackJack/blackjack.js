import React, { useState, useEffect } from 'react';
import { createDeck, shuffleDeck, calculateHandValue } from './cardUtils';

const CasinoBlackjackTable = () => {
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [balance, setBalance] = useState(1000);
    const [currentBet, setCurrentBet] = useState(0);
    const [gameStatus, setGameStatus] = useState('betting');
    const [message, setMessage] = useState('Place your bet');

    const chipDenominations = [
        { value: 5, color: '#FFFFFF' },   // White
        { value: 10, color: '#FF0000' },  // Red
        { value: 25, color: '#0000FF' },  // Blue
        { value: 100, color: '#000000' }, // Black
        { value: 500, color: '#008000' }  // Green
    ];

    const placeBet = (amount) => {
        if (amount <= balance) {
            setCurrentBet(amount);
            setGameStatus('dealing');
            startGame();
        } else {
            setMessage('Insufficient funds!');
        }
    };

    const startGame = () => {
        const newDeck = shuffleDeck(createDeck());
        
        const initialPlayerHand = [
            newDeck.pop(), 
            newDeck.pop()
        ];
        
        const initialDealerHand = [
            newDeck.pop(), 
            { ...newDeck.pop(), hidden: true }
        ];

        setDeck(newDeck);
        setPlayerHand(initialPlayerHand);
        setDealerHand(initialDealerHand);
        setGameStatus('playing');
    };

    const renderCard = (card, index) => {
        if (card.hidden) {
            return (
                <div 
                    key={`hidden-${index}`} 
                    className="card hidden-card"
                    style={{
                        backgroundColor: 'saddlebrown',
                        transform: `rotate(${index * 5}deg)`
                    }}
                >
                    🃏
                </div>
            );
        }

        const isRedSuit = ['♥', '♦'].includes(card.suit);
        return (
            <div 
                key={card.id} 
                className={`card ${isRedSuit ? 'red' : 'black'}`}
                style={{
                    transform: `rotate(${index * 5}deg)`
                }}
            >
                <div className="card-top">{card.value}</div>
                <div className="card-center">{card.suit}</div>
                <div className="card-bottom">{card.value}</div>
            </div>
        );
    };

    const renderChips = () => {
        return chipDenominations.map(chip => (
            <div 
                key={chip.value}
                className="casino-chip" 
                style={{ 
                    backgroundColor: chip.color,
                    color: chip.value > 25 ? 'white' : 'black'
                }}
                onClick={() => placeBet(chip.value)}
            >
                ${chip.value}
            </div>
        ));
    };

    return (
        <div className="casino-table">
            <div className="table-felt"></div>
            
            <div className="dealer-area">
                <div className="card-table">
                    {dealerHand.map((card, index) => renderCard(card, index))}
                </div>
            </div>

            <div className="player-area">
                <div className="card-table">
                    {playerHand.map((card, index) => renderCard(card, index))}
                </div>
            </div>

            <div className="betting-chips">
                {renderChips()}
            </div>

            <div className="game-controls">
                {gameStatus === 'playing' && (
                    <>
                        <button className="control-button">Hit</button>
                        <button className="control-button">Stand</button>
                    </>
                )}
            </div>

            <div className="game-message">
                {message}
            </div>
        </div>
    );
};

export default CasinoBlackjackTable;