# Carribean Quest

The goal of the project is to create an interactive puzzle that can be accessed on a website, which aims to evaluate users' soft skills such as attention to detail, persistence, and curiosity. The puzzle will incorporate both obvious and subtle methods to assess these skills.

## Feature List
- [x] Authentication System - JWT
- [x] 5 clues (levels)
- [x] 2 deadends
- [x] 1 solution
- [x] User progress tracked
- [x] Resume from where you left off and option to restart the game
- [x] Admin Dashboard 

**Additional Features**
- User Analytics
- Data Analysis using different graphs
- User leaderboard

**Theme** - Pirates and Treasure Hunt

### Soft Skills Evaluated
1. Level 1 : Memory, Organizational skills 
2. Level 2 : Pattern recognition, Perseverence
3. Level 3 : Active Listening, Decision-making skills
4. Level 4 : Attention to detail, Logical Reasoning
5. Level 5 : Problem-solving, Adaptibility

## Gameplay Logic

The game gets progressively more difficult as you move through each level

**Level 1**

"Captain's Challenge" is a memory game. The player is presented with five random two-digit numbers on the screen and has five seconds to memorize them. After the time is up, the numbers disappear, and the player is presented with five empty input fields. The player must then recall and input the five numbers in the correct order. The player's score is based on the number of correct answers they provide.

**Level 2**

This is a game where the player is presented with a sequence of numbers, and they must find the mistake on the page to progress to the next level. The numbers in the sequence are chosen randomly from four different sequences - cube numbers, fibonacci numbers, prime numbers, and triangular numbers. The player's task is to identify the mistake in the page and click on the it. If the player correctly identifies the mistake, their score increases, and they move on to the next level. If they make a mistake, they will not progress to the next level.

**Level 3**

This is a game where the player is presented with three doors and a clue in the form of a poem. The player's task is to use their senses, specifically their hearing, to identify which door is correct. The player can hover their mouse over the doors to listen for any sounds that might indicate where the treasure is located. Once the player has identified which door they believe has the treasure, they can click on it to submit their choice. If they have chosen the correct door, they advance to the next level and score points. If they choose the wrong door, they lose the game and lead to game over.

**Level 4**

This is a game called "Pirate Cipher Quest" where the player needs to solve a code to proceed to the next level. The game presents a clue in the form of a poem and a code written in ASCII code. The player needs to decipher the code to find the correct word and type it into an input field. If the typed word matches the correct word, the player proceeds to the next level. If the typed word is incorrect, an error message is displayed, and the player needs to try again. The clue leads to a link embedded in the 'ship' image found in the footer.

**Level 5**

In the final game, the user must click on three numbers in a specific order to unlock a treasure chest. The numbers are randomly generated and displayed to the user when the game starts. The user is also presented with a clue in the form of a riddle. The user then clicks on a 10x10 grid to select numbers in the order they were displayed. If the button on the grid clicked matches one of the numbers then it turns green else red. The user has 5 tries to unlock the chest. If the user is successful, they win. If the user is unsuccessful after 5 tries, they are redirected to game over. There is also an option to display a clue (compass), which displays all of the possible number coordinates on the grid.

**Deadends**
1. Level 2
2. Level 4

**Scoring System**

1. Level 1 - Each correct guess is equal to 4 points
2. Level 2 - Correct guess is equal to 20 points
3. Level 3 - Correct guess is equal to 20 points, incorrect guess resets the score to 0
4. Level 4 - Correct input is equal to 20 points
5. Level 5 - Correct order is equal to 20 points, after 5 incorrect tries the score is reset to 0

**Admin Dashboard Features**
- User Leaderboard
- Average High Score
- Number of users
- Distribution of users by gender - pie chart
- Distribution of users by age groups - pie chart
- Average high score of genders - bar chart
- Relationship between age and high score - scatter plot
- Correlation between age, gender and high score - heatmap

## Steps to reach the Solution

1. The user must guess as many correct numbers in order to move to next level
2. Click the word 'TRAESURE' which is misspelled
3. Click on the door on which you can hear music playing when being hovered over
4. Click on the ship icon in the footer which takes you to the ASCII codes website - Decrypt the word which is encoded using ASCII
5. Click on the compass icon to see the grid with all the numbers - Click on the 3 corresponding buttons on the grid in the given order

## Tech Stack

**Client:** React, Axios, TailwindCSS

**Server:** Django Rest Framework, SQLite

## Getting Started

Clone the project

```bash
  git clone https://github.com/sahil-gidwani/treasure-hunt.git
```

Go to the backend project directory

```bash
  cd backend
```

Install backend dependencies - you might want to set up a virtual environment first

```bash
  pip install requirements.txt
```

Start the backend server

```bash
  py manage.py runserver
```

On another terminal

Go to the frontend project directory

```bash
  cd frontend
```

Install frontend dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm run start
```

## Running Tests

To run backend tests, run the following command

```bash
  cd backend
  py manage.py test
```

## Deployment

To view the deployed app, visit [https://endearing-gumption-97fd43.netlify.app/](https://endearing-gumption-97fd43.netlify.app/)
