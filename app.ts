import inquirer from "inquirer";
/*Create Basic Lotto Service following this requirement

This Basic Lotto Service implements a simple lottery system where users can buy lotto tickets and win based on the drawn result. The lotto service allows users to select the number of digits (from 1 to 6 digits) they wish to bet on, and the system calculates the winnings based on how many digits match the last digits of the randomly drawn 6-digit result. The service should support the purchase of multiple tickets with different numbers and amounts, and users can choose to buy random numbers based on their selected digit length. Additionally, users can specify fixed digits for specific positions in the generated random numbers. The system should also allow users to set the draw result, check winning tickets, and return the corresponding prize based on matching digits.


given: 
- customer can choose to buy ticket that contain many number with different digit example: 123456 for 1000baht, 124 for 500baht
- lotto has 6 digits
- lotto result will draw 1 time which each digit payout is from the last digit example the draw of lotto result is 123456 the prize of 3 digit is 456
- ticket payout base on digit
 1 digit = 10 times of bet example customer buy number 6 for 100 baht and the result is 123456 then the prize is 1000 baht
 2 digit = 100 times of bet example customer buy number 56 for 100 baht and the result is 123456 then the prize is 10000 baht
 3 digit = 1000 times of bet example customer buy number 456 for 100 baht and the result is 123456 then the prize is 100000 baht
 4 digit = 10000 times of bet example customer buy number 3456 for 100 baht and the result is 123456 then the prize is 1000000 baht
 5 digit = 100000 times of bet example customer buy number 23456 for 100 baht and the result is 123456 then the prize is 10000000 baht
 6 digit = 1000000 times of bet example customer buy number 123456 for 100 baht and the result is 123456 then the prize is 100000000 baht


key features:
- buy ticket: buy lotto by input number and amount of money and add to customer ticket
- get ticket: get all ticket that customer buy
- get random number: select digit that want to buy from 1-6 digits, how many numbers to buy, how much money for each number, and optional customer can select fixed number of digit (example: 5 digits, 10 number, 1000 baht and 4th digit is 5 and 5th digit is 6 then output must be random 10 number that last 2 digit is 56)
- set draw: set payout randomly one munber and used for the current draw result
- check win ticket: check winning prize by input all ticket that customer buy and return which number is win and prize
*/

//Example data
const buyTicket = [
  {
    number: 1234,
    amount: 1000,
  },
  {
    number: 58,
    amount: 1000,
  },
];

//Example data for buy random number
const buyDigit = 4;
const buyNumber = 10;
const buyAmount = 1000;
const fixedDigit = [
  {
    digit: 3,
    number: 8,
  },
  {
    digit: 2,
    number: 6,
  },
];
// mean that customer want to buy 4 digits, 10 number, each 1000 baht,fxied third digit is 8 and fixed second digit is 6

type Ticket = {
  number: number;
  amount: number;
};

type FixedDigit = {
  digit: number;
  number: number;
};

class LottoService {
  customerTicket: Ticket[];
  drawResult: string | null;

  constructor() {
    this.customerTicket = [];
    this.drawResult = null;
  }

  buyTicket(number: number, amount: number): void {
    let numberStr = number.toString();
    while (numberStr.length < 6) {
      numberStr = Math.floor(Math.random() * 10).toString() + numberStr;
    }
    this.customerTicket.push({ number: parseInt(numberStr, 10), amount });
  }

  getTicket(): Ticket[] {
    return this.customerTicket;
  }

  getRandomNumber(
    digitLength: number,
    numberCount: number,
    amount: number,
    fixedDigits: FixedDigit[] = []
  ): Ticket[] {
    const tickets: Ticket[] = [];

    while (tickets.length < numberCount) {
      let randomNum = "";

      for (let i = 1; i <= digitLength; i++) {
        const fixedDigit = fixedDigits.find((fd) => fd.digit === i);
        randomNum += fixedDigit
          ? fixedDigit.number
          : Math.floor(Math.random() * 10);
      }

      while (randomNum.length < 6) {
        randomNum = Math.floor(Math.random() * 10) + randomNum;
      }

      tickets.push({ number: parseInt(randomNum), amount });
    }

    this.customerTicket.push(...tickets);
    return tickets;
  }

  setDraw(): string {
    const randomResult = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    this.drawResult = randomResult;
    return randomResult;
  }

  checkWinTicket(): { winningTickets: Ticket[]; totalPrize: number } {
    if (!this.drawResult) {
      throw new Error("Draw result is not set.");
    }

    const winningTickets: Ticket[] = [];
    let totalPrize = 0;

    this.customerTicket.forEach((ticket) => {
      const ticketNumber = ticket.number.toString();
      const resultSuffix = this.drawResult!.slice(-ticketNumber.length);

      if (ticketNumber === resultSuffix) {
        const prize = ticket.amount * Math.pow(10, ticketNumber.length);
        totalPrize += prize;
        winningTickets.push({ ...ticket, amount: prize });
      }
    });

    return { winningTickets, totalPrize };
  }
}

const lottoService = new LottoService();
async function main() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Buy Ticket",
          "Get Tickets",
          "Buy Random Numbers",
          "Set Draw Result",
          "Check Winning Tickets",
          "Exit",
        ],
      },
    ]);

    if (action === "Buy Ticket") {
      const { number, amount } = await inquirer.prompt([
        {
          type: "input",
          name: "number",
          message: "Enter the ticket number:",
          validate: (input) =>
            (input && /^[0-9]+$/.test(input)) || "Please enter a valid number.",
        },
        {
          type: "number",
          name: "amount",
          message: "Enter the amount:",
          validate: (input) =>
            (input !== undefined && input > 0) ||
            "Amount must be greater than 0.",
        },
      ]);
      lottoService.buyTicket(parseInt(number), amount);
      console.log("Ticket purchased successfully.");
    }

    if (action === "Get Tickets") {
      console.log("Customer Tickets:", lottoService.getTicket());
    }

    if (action === "Buy Random Numbers") {
      const { digitLength, numberCount, amount, fixedDigitsCount } =
        await inquirer.prompt([
          {
            type: "number",
            name: "digitLength",
            message: "Enter the digit length (1-6):",
            validate: (input) =>
              (input !== undefined && input >= 1 && input <= 6) ||
              "Digit length must be between 1 and 6.",
          },
          {
            type: "number",
            name: "numberCount",
            message: "Enter the number of tickets to generate:",
            validate: (input) =>
              (input !== undefined && input > 0) ||
              "Number count must be greater than 0.",
          },
          {
            type: "number",
            name: "amount",
            message: "Enter the amount for each ticket:",
            validate: (input) =>
              (input !== undefined && input > 0) ||
              "Amount must be greater than 0.",
          },
          {
            type: "number",
            name: "fixedDigitsCount",
            message: "Enter the number of digits you want to fix (0 for none, 0-6):",
            validate: (input) =>
              (input !== undefined && input >= 0 && input <= 6) ||
              "Please enter a number between 0 and 6.",
          },
        ]);

      const fixedDigits: FixedDigit[] = [];
      for (let i = 0; i < fixedDigitsCount; i++) {
        const { digit, number } = await inquirer.prompt([
          {
            type: "number",
            name: "digit",
            message: `Enter the position of fixed digit #${
              i + 1
            } (1-${digitLength}):`,
            validate: (input) =>
              (input !== undefined && input >= 1 && input <= digitLength) ||
              `Position must be between 1 and ${digitLength}.`,
          },
          {
            type: "number",
            name: "number",
            message: `Enter the value for fixed digit #${i + 1} (0-9):`,
            validate: (input) =>
              (input !== undefined && input >= 0 && input <= 9) ||
              "Value must be between 0 and 9.",
          },
        ]);
        fixedDigits.push({ digit, number });
      }

      const randomTickets = lottoService.getRandomNumber(
        digitLength,
        numberCount,
        amount,
        fixedDigits
      );
      console.log("Random Tickets:", randomTickets);
    }

    if (action === "Set Draw Result") {
      const drawResult = lottoService.setDraw();
      console.log("Draw Result Set:", drawResult);
    }

    if (action === "Check Winning Tickets") {
      try {
        const result = lottoService.checkWinTicket();
        console.log("Winning Tickets:", result.winningTickets);
        console.log("Total Prize:", result.totalPrize);
      } catch (error) {
        console.error(error);
      }
    }

    if (action === "Exit") {
      console.log("Goodbye!");
      break;
    }
  }
}

main();
