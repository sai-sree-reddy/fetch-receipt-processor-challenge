
import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';


const app = express();


app.use(bodyParser.json());

const receipts = new Map();

function calculatePoints(receipt) {
  let points = 0;

  // Rule 1: One point for every alphanumeric character in the retailer name.
  points += receipt.retailer.replace(/[^a-z0-9]/gi, '').length;
 

  // Rule 2: 50 points if the total is a round dollar amount with no cents.
  if (parseFloat(receipt.total) === Math.floor(parseFloat(receipt.total))) {
    points += 50;
  }
  
  //Rule 3:  25 points if the total is a multiple of 0.25.
  if (parseFloat(receipt.total) % 0.25 === 0) {
    points += 25;
  }
  
  //Rule 4:  5 points for every two items on the receipt.
  points += Math.floor(receipt.items.length / 2) * 5;
  
  //Rule 5:  If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer.
  receipt.items.forEach(item => {
    if (item.shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(parseFloat(item.price) * 0.2);   
    }
  });

  //Rule 6:  6 points if the day in the purchase date is odd.
  const day = parseInt(receipt.purchaseDate.split('-')[2]);
  if (day % 2 !== 0) {
    points += 6;
  }


  //Rule 7:  10 points if the time of purchase is after 2:00pm and before 4:00pm.
  const hour = parseInt(receipt.purchaseTime.split(':')[0]);
  if (hour >= 14 && hour < 16) {
    points += 10;
  }


  return points;
}

app.post('/receipts/process', (req, res) => {
  const receipt = req.body;
  const id = uuidv4();
  const points = calculatePoints(receipt);
  receipts.set(id, points);
  res.json({ id });
});

app.get('/receipts/:id/points', (req, res) => {
  const id = req.params.id;
  if (!receipts.has(id)) {
    return res.status(404).json({ error: 'Receipt not found' });
  }
  res.json({ points: receipts.get(id) });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Receipt processor app listening at http://localhost:${port}`);
});
