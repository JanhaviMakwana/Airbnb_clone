const Property = require('../models/property');

exports.addProperty = async (req, res) => {

    if (!req.isAuth) {
        throw new Error('Not authenticated  !');
    }
    const userId = req.userId;
    const { title, facilities, description, price, image, location, star } = req.body;

    try {
        const property = new Property({
            title,
            facilities,
            description,
            price,
            image,
            location,
            star,
            userId
        });
        const createdProperty = await property.save();

        return res.send({
            ...createdProperty._doc,
            _id: createdProperty._id.toString(),
            createdAt: createdProperty.createdAt.toISOString(),
            updatedAt: createdProperty.updatedAt.toISOString()
        })
    } catch (e) {
        console.log(e);
    }
}

exports.getProperties = async (req, res) => {
    const properties = await Property.find().sort({ createdAt: -1 });

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

exports.getFullProperty = async (req, res) => {
    const { propertyId } = req.params;
   
    const property = await Property.findById(propertyId);
   
    return res.send({
        ...property._doc,
        _id: property._id.toString(),
        createdAt: property.createdAt.toISOString(),
        updatedAt: property.updatedAt.toISOString()
    })

}

