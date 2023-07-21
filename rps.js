const readline = require('readline');

const rockPaperScissors = () => {
    const arr = ['Rock', 'Paper', 'Scissors'];

    const getMachineChoice = () => {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    const getUserChoice = () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => {
            rl.question(`Choose one: ${arr.join(', ')} `, userChoice => {
                rl.close();
                userChoice = userChoice.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
                if (!arr.includes(userChoice)) {
                    console.log(`Sorry, ${userChoice} is not an option. Please pick from: ${arr.join(', ')}.`);
                    return resolve(getUserChoice());
                }
                resolve(userChoice);
            });
        });
    };

    const playRound = async () => {
        const userChoice = await getUserChoice();
        const machineChoice = getMachineChoice();

        if (userChoice === machineChoice) {
            console.log(`Draw! You both picked ${userChoice}!`);
        } else if (
            (userChoice === 'Rock' && machineChoice === 'Scissors') ||
            (userChoice === 'Paper' && machineChoice === 'Rock') ||
            (userChoice === 'Scissors' && machineChoice === 'Paper')
        ) {
            console.log(`You win! ${userChoice} beats ${machineChoice}`);
        } else {
            console.log(`You lose! ${machineChoice} beats ${userChoice}`);
        }

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Do you want to play again? (Y/N):', answer => {
            rl.close();
            if (answer.toLowerCase() === 'y') {
                playRound();
            } else {
                console.log('Thank you for playing!');
            }
        });
    };

    playRound();
};

rockPaperScissors()
