# Musyn

Musyn is the Google Docs of music notation. It allows for multiple users collaborate on music composition in real time.

## Features
#### Live View
Always be on the same page. Live view shows you where other collaborators are at all times. It makes it easy to collaborate without stepping on anyone's toes.

#### Smart Rests
Spend more time writing music, and less time on formatting. Smart rests find the most appropriate and accurate rest combination between the notes that are added. Smart rests use [binary space partitioning](https://en.wikipedia.org/wiki/Binary_space_partitioning) to arrange rests in a way that assists musicians in their reading speed. If you'd like to see how this is implemented take a look at the [measure score model](https://github.com/d-rowe/musyn/blob/9fb11ce45a8bfccb8aca6e4cd91801c2265c4357/client/src/editor/score/components/measure/models/score.js).
