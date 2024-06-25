# Receipt Processor Challenge

## Steps to Run the Application:

Clone the project
git clone `git@github.com:sai-sree-reddy/fetch-receipt-processor-challenge.git`

1. Move to **receipt-processor** folder
    - cd receipt-processor

3. Use the command `docker-compose up` to start the application.

4. Test the endpoints:

   - **POST Endpoint:**
     - Method Type: POST
     - URL: http://localhost:3000/receipts/process
     - Note: Parse JSON body as input.

   - **GET Endpoint:**
     - Method Type: GET
     - URL: http://localhost:3000/{id}/points
     - Note: Replace `{id}` with the ID obtained from the POST request response.

## Steps to run the application in Local

1. Move to **receipt-processor** folder
2. Run commands `npm install`
3. Do `npm start`
4. Test the endpoints:

   - **POST Endpoint:**
     - Method Type: POST
     - URL: http://localhost:3000/receipts/process
     - Note: Parse JSON body as input.

   - **GET Endpoint:**
     - Method Type: GET
     - URL: http://localhost:3000/{id}/points
     - Note: Replace `{id}` with the ID obtained from the POST request response.

