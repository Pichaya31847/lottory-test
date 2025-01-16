## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx run dev
   ```

## How To Play
1. When the program starts, you will be presented with several options, including buying tickets, generating random tickets, setting the draw result, and checking for winning tickets.
2. To buy a ticket, choose the "Buy Ticket" option and enter the number you want to bet on, followed by the amount of money you wish to bet.
    - If you enter fewer than 6 digits, the system will pad the number with random digits at the front to make it a 6-digit number.
3. To generate random tickets, select the "Buy Random Numbers" option. Specify the digit length (1-6), the number of tickets to generate, the amount for each ticket, and any fixed digits you want in specific positions.
4. To set the draw result, choose the "Set Draw Result" option. The system will randomly generate a 6-digit lottery result.
5. To check if your tickets have won, select the "Check Winning Tickets" option. The program will evaluate your tickets against the draw result and display the winning tickets and total prize.
6. Use the "Get Tickets" option to view all tickets you have purchased.

## Ticket Payout Calculation

- 1 digit = 10 times of bet example customer buy number 6 for 100 baht and the result is 123456 then the prize is 1000 baht
- 2 digit = 100 times of bet example customer buy number 56 for 100 baht and the result is 123456 then the prize is 10000 baht
- 3 digit = 1000 times of bet example customer buy number 456 for 100 baht and the result is 123456 then the prize is 100000 baht
- 4 digit = 10000 times of bet example customer buy number 3456 for 100 baht and the result is 123456 then the prize is 1000000 baht
- 5 digit = 100000 times of bet example customer buy number 23456 for 100 baht and the result is 123456 then the prize is 10000000 baht
- 6 digit = 1000000 times of bet example customer buy number 123456 for 100 baht and the result is 123456 then the prize is 100000000 baht

## Assumptions Made During Development

1. Buy Ticket
    - Input: Number: 456, Amount: 1000
    - System will pad the number to 000456 and save the ticket.
2. Generate Random Numbers
    - Input: Digit Length: 4, Number Count: 5, Amount: 500, Digits: 2, Fixed Digits: [3rd=8, 4th=6]
    - Output: Random tickets such as xxxx86 (e.g., 283186, 149486, etc.).
3. Set Draw Result
    - System generates a random draw result, 123456.
4. Check Winning Tickets
    - System evaluates purchased tickets against the draw result and displays winning tickets and their prizes.
5. View Tickets
    - System displays all tickets you have purchased.