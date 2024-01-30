const { Schema, model } = require("mongoose");

const beerSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },    
    abv: { 
      type: String, 
      required: true },      
    country: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    ratings: [
      {
       type: Schema.Types.ObjectId,
       ref: "Rating",
      },
      ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Beer = model("Beer", beerSchema);

module.exports = Beer;
