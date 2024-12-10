import random

random.seed()

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value
    
    def __str__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
        
        self.cards = [Card(suit, value) for suit in suits for value in values]
        self.shuffle()
    
    def shuffle(self):
        random.shuffle(self.cards)
    
    def deal(self):
        if len(self.cards) > 0:
            return self.cards.pop()
        else:
            raise ValueError("No cards left in the deck")

class Hand:
    def __init__(self):
        self.cards = []
        self.value = 0
        self.aces = 0
    
    def add_card(self, card):
        self.cards.append(card)
        
        # Update hand value
        if card.value in ['Jack', 'Queen', 'King']:
            self.value += 10
        elif card.value == 'Ace':
            self.aces += 1
            self.value += 11
        else:
            self.value += int(card.value)
        
        # Adjust for Aces
        while self.value > 21 and self.aces:
            self.value -= 10
            self.aces -= 1
    
    def __str__(self):
        return ", ".join(str(card) for card in self.cards)

class BlackjackGame:
    def __init__(self):
        self.deck = Deck()
        self.player_hand = Hand()
        self.dealer_hand = Hand()
        self.player_chips = 100
    
    def initial_deal(self):
        # Deal two cards to player and dealer
        for _ in range(2):
            self.player_hand.add_card(self.deck.deal())
            self.dealer_hand.add_card(self.deck.deal())
    
    def player_hit(self):
        self.player_hand.add_card(self.deck.deal())
        return self.player_hand.value
    
    def dealer_play(self):
        # Dealer hits until 17 or higher
        while self.dealer_hand.value < 17:
            self.dealer_hand.add_card(self.deck.deal())
    
    def determine_winner(self):
        # Check for busts
        if self.player_hand.value > 21:
            return "Dealer Wins (Player Bust)"
        if self.dealer_hand.value > 21:
            return "Player Wins (Dealer Bust)"
        
        # Compare hand values
        if self.player_hand.value > self.dealer_hand.value:
            return "Player Wins"
        elif self.player_hand.value < self.dealer_hand.value:
            return "Dealer Wins"
        else:
            return "It's a Tie"

def play_blackjack():
    game = BlackjackGame()
    game.initial_deal()
    
    print("Welcome to Blackjack!")
    print(f"Your current chips: {game.player_chips}")
    
    # Display initial hands
    print("\nYour hand:")
    print(game.player_hand)
    print(f"Your hand value: {game.player_hand.value}")
    
    print("\nDealer's first card:")
    print(game.dealer_hand.cards[0])
    
    # Player's turn
    while True:
        action = input("\nDo you want to (H)it or (S)tand? ").lower()
        
        if action == 'h':
            new_value = game.player_hit()
            print("\nYour hand:")
            print(game.player_hand)
            print(f"Your hand value: {new_value}")
            
            if new_value > 21:
                print("Bust! You lose.")
                break
        elif action == 's':
            break
    
    # Dealer's turn
    if game.player_hand.value <= 21:
        print("\nDealer's turn:")
        game.dealer_play()
        print("Dealer's hand:")
        print(game.dealer_hand)
        print(f"Dealer's hand value: {game.dealer_hand.value}")
        
        # Determine winner
        result = game.determine_winner()
        print(f"\n{result}")

# Run the game
if __name__ == "__main__":
    play_blackjack()