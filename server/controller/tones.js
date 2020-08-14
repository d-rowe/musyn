const  { getTones } = require('../entity/tones');

module.exports = {
  get: (req, res) => {
    getTones((err, tones)=>{
      if(err){
        res.status(500).send(err);
      }else{
        res.status(200).send(tones);
      }
    })
  },

};