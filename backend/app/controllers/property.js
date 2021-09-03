const Property = require('../models/property');

exports.addProperty = async (req, res) => {

    if (!req.isAuth) {
        throw new Error('Not authenticated  !');
    }
    const userId = req.userId;
    const { title, facilities, description, price, image, location, star, city, freeCancellation, guests } = req.body;

    try {
        const property = new Property({
            title,
            facilities,
            description,
            price,
            image,
            location,
            star,
            userId,
            city,
            freeCancellation,
            guests
        });
        const createdProperty = await property.save();

        return res.send({
            ...createdProperty._doc,
            _id: createdProperty._id.toString(),
            createdAt: createdProperty.createdAt.toISOString(),
            updatedAt: createdProperty.updatedAt.toISOString()
        })
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

exports.getProperties = async (req, res) => {
    const { keyword } = req.query;

    try {
        let properties;
        if (keyword) {
            properties = await Property.find({ "$text": { "$search": `\"${keyword}\"` } }).sort({ createdAt: -1 });
        }
        else {
            properties = await Property.find().sort({ createdAt: -1 });
        }

        if (properties) {
            return res.send({
                properties: properties.map(p => {
                    return {
                        ...p._doc,
                        _id: p._id.toString(),
                        createdAt: p.createdAt.toISOString(),
                        updatedAt: p.updatedAt.toISOString()
                    }
                })
            });
        }

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }

}

exports.getFullProperty = async (req, res) => {
    const { propertyId } = req.params;

    try {
        const property = await Property.findById(propertyId);

        return res.send({
            ...property._doc,
            _id: property._id.toString(),
            createdAt: property.createdAt.toISOString(),
            updatedAt: property.updatedAt.toISOString()
        })

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }

}

exports.search = async (req, res) => {
    let { guests, startDate, endDate, city, price, cancellation } = req.body;
    const existsGuests = guests ? false : true;
    /* const existsDateRange = startDate ? false : true;
    console.log(existsDateRange); */
    const date1 = new Date(startDate).setHours(24, 0, 0, 0);
    const date2 = new Date(endDate).setHours(24, 0, 0, 0);
    /* console.log(startDate);
    console.log(new Date(date1));
    console.log(endDate);
    console.log(new Date(date2));
    console.log(price);
    console.log(guests);
    console.log(city); */
    try {
        const properties = await Property.find({
           /*  "$or": [
                { */
                    "booking": {
                        "$not": {
                            "$elemMatch": {
                                "$or": [
                                    { "startDate": { "$lte": new Date(date1) }, "endDate": { "$gt": new Date(date1) } },
                                    { "startDate": { "$lt": new Date(date2) }, "endDate": { "$gte": new Date(date2) } },
                                    { "startDate": { "$gt": new Date(date1) }, "endDate": { "$lt": new Date(date2) } },
                                    { "startDate": new Date(date2) },
                                    { "endDate": new Date(date1) }
                                ]
                            }
                        }
                    }
               /*  },
                {
                    "booking": { "$exists": { "$in": [existsDateRange, false] } }
                }
            ] */
            ,
            "city": { "$regex": ".*" + city + ".*" },
            "price": { "$gt": price },
            "freeCancellation": { "$in": [cancellation, true] },
            "$or": [{ "guests": parseInt(guests) }, { "guests": { "$exists": existsGuests } }]
        });

        return res.send({
            properties: properties.map(p => {
                return {
                    ...p._doc,
                    _id: p._id.toString(),
                    createdAt: p.createdAt.toISOString(),
                    updatedAt: p.updatedAt.toISOString()
                }
            })
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

