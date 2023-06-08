import Hotel from "../models/hotel.js";
import mongoose from "mongoose";

// Path     :   /api/hotel/addHotel
// Method   :   Post
// Access   :   Private
// Desc     :   Create new hotel

export const addHotel = async (req, res) => {
    const {name,description,qty,price,category,img,discount } = req.body
    const newItem = await new Hotel({
        name: name,
        address: description,
        city: qty,                     
        country: price,
        stayDuration: category,
        phone: img,
        discount: discount,
    }).save()
    res.status(200).json({newItem, success: true, error: false, message: "Item Added Successfully" })
}
// Path     :   /api/items/getAllItems
// Method   :   Get
// Access   :   Private
// Desc     :   Get All Items
export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json({ success: true, error: false, items })
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
}

// Path     :   /api/items/updateItem
// Method   :   Put
// Access   :   Private
// Desc     :   Update Item
export const updateItem = async (req, res) => {
    // Extract the itemId from the request params
    const { itemId } = req.params;

    // Extract the updated item data from the request body
    const { name,description,qty,price,category,img,discount } = req.body

    try {
        // Find the item in the database by its ID
        let itemData = await Item.findOne({ id: itemId });
        console.log(itemData)
        // If the item doesn't exist, return a 404 error
        if (!itemData) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        // Update the resturant's info with the new values
        itemData.name = name,
        itemData.description = description,
        itemData.qty = qty,
        itemData.price = price,
        itemData.category = category,
        itemData.img = img,
        itemData.discount = discount
        // Save the updated item data to the database
         await itemData.save();

        // Return a success response
        return res.status(200).json({itemData, message: 'Item updated successfully.' });
    } catch (error) {
        // Return an error response if an error occurs
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

// Path     :   /api/items/deleteItem
// Method   :   Delete
// Access   :   Private
// Desc     :   Delete Item

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params.id;
        //const objectId = mongoose.Types.ObjectId(id);
        let item = await Item.findOne({ id: id });
        //console.log(item)
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await item.remove();
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Path     :   /api/items/addOffer
// Method   :   Post
// Access   :   Private
// Desc     :   Add discount on items

export const addDiscount = async (req, res) => {
    
  
    try {
        const {discount } = req.body;
        const {id} = req.params.id;
        const objectId = mongoose.Types.ObjectId(id)
        const item = await Item.findOne({ id: id });
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      console.log(item);
      console.log(id)
      console.log(objectId)

     
    
    // Update the price of the item based on the discount
      if (discount) {
        const newPrice = calculateDiscountedPrice(item.price , discount);
        console.log(`Price: ${item.price} ,Discount : ${discount} , New Price: ${newPrice} `)
        item.discount = discount;
        item.price = newPrice;
      }
  
      await item.save();
     
      res.json({item, message:"Discount Added Sucessfully "});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

// Function to calculate the discounted price for an item  
const calculateDiscountedPrice= (originalPrice, discountPercentage)=> {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    console.log(discountAmount)
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice;
  }
 