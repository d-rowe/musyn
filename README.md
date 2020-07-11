<h1 align="center">
  <img src="https://i.imgur.com/4RZYKjf.png" alt="musyn" width="300">
</h1>
<h4 align="center">A collaborative music notation editor</h4>

<p align="center">
  <a href="http://musyn.danielrowetech.com">Demo</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#contributing">Contributing</a>
</p>

# Features
 
#### Live View

Work with your collaborators on the same composition and see their work in real-time with Live View. Collaborating is easy and you can edit with confidence without any interference.

#### Smart Rests

Leave the _rests_ to us. Smart Rests find the best rest combination between notes so you can spend more time writing music. 

#### Full Edit History

Make a mistake? Change your mind? No worries. We’ll keep track of your edits so you don’t have to.

# Installation

1. Clone this repository from your terminal

   `$ git clone https://github.com/d-rowe/musyn.git`

2. Install dependencies with `npm install`

3. Create a database in PostgreSQL. These instructions and the `.env.example` assume a database and user named `musyn`.

4. Execute the database schema 

   `$ psql -d musyn -U musyn -f database/schema.sql`

5. Copy `.env.example` to `.env`

   `$ cp .env.example .env`

6. Edit `.env` to reflect your database information

7. Start with `npm run dev`

# Contributing

Want to help? Great! Checkout the [issue tracker](https://github.com/d-rowe/musyn/issues) and find something you'd like to tackle.
