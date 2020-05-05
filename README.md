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

Always be on the same page. Live view shows you where other collaborators are at all times. It makes it easy to collaborate without stepping on anyone's toes.

#### Smart Rests

Spend more time writing music, and less time on formatting. Smart rests find the most appropriate and accurate rest combination between the notes that are added. Smart rests use [binary space partitioning](https://en.wikipedia.org/wiki/Binary_space_partitioning) to arrange rests in a way that assists musicians in their reading speed. If you'd like to see how this is implemented take a look at the [measure score model](https://github.com/d-rowe/musyn/blob/9fb11ce45a8bfccb8aca6e4cd91801c2265c4357/client/src/editor/score/components/measure/models/score.js).

#### Full Edit History

Make a mistake? No worries. Musyn keeps track of all your edits, so you can always go back to a previous version of the composition.

# Installation

1. Clone this repository from your terminal

   `$ git clone https://github.com/d-rowe/musyn.git`

2. Install dependencies with `npm install`

3. Create a database in PostgreSQL

4. Execute the database schema located in `database/schema.sql`

5. Copy `.env.example` to `.env`

   `$ cp .env.example .env`

6. Edit `.env` to reflect your database information

7. Start with `npm run dev`

# Contributing

Want to help? Great! Checkout the [issue](https://github.com/d-rowe/musyn/issues) tracker and find something you'd like to tackle.
