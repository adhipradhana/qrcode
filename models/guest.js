const Sequelize = require('sequelize');
const qr = require('qr-image');
const fs = require('fs');
const crypto = require('crypto');

const Event = require('./event')
const db = require('./db');

const Guest = db.define('guest', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    token: { type: Sequelize.STRING, allowNull: false},
    file: { type: Sequelize.STRING, allowNull: false },
    attended: { type: Sequelize.BOOLEAN, allowNull: false }
});

Event.hasMany(Guest, { onDelete: 'restrict', onUpdate: 'cascade'});

function createQRCode(guestName, eventId) {
    let tokenCode = crypto.randomBytes(32).toString("hex");

    let qrcode = qr.image(tokenCode, { type : "pdf"});
    let fileName = `${guestName}-${eventId}.pdf`;

    qrcode.pipe(fs.createWriteStream(`files/${fileName}`));

    return {
        name: guestName,
        token: tokenCode,
        eventId: eventId,
        file: fileName,
        attended: false
    };
}

Guest.createGuest = (data, callback) => {
    let guestData = createQRCode(data.name, data.eventId); 

    Guest.create({
        name: guestData.name,
        token: guestData.token,
        file: guestData.file,
        eventId: guestData.eventId,
        attended: guestData.attended
    }).then((guest) => {
        return callback(null, guest);
    }).catch((err) => {
        return callback(err);
    });
}

Guest.updateGuest = (data, callback) => {
    Guest.findOne({
        where: { id: data.id }
    }).then((guest) => {
        let fileName = `${guest.name}-${guest.eventId}.pdf`;

        // delete file
        fs.unlinkSync(`files/${fileName}`);
        updateData = createQRCode(data.name, data.eventId);

        guest.update({
            name: updateData.name,
            eventId: updateData.eventId,
            token: updateData.token,
            file: updateData.file,
            attended: updateData.attended
        }).then((guest) => {
            return callback(null, guest);
        }).catch((err) => {
            return callback(err);
        });
    }).catch((err) => {
        return callback(err);
    });
}

Guest.deleteGuest = (data, callback) => {
    Guest.findOne({
        where: {id: data.id}
    }).then((guest) => {
        let fileName = `${guest.name}-${guest.eventId}.pdf`;

        // delete file
        fs.unlinkSync(`files/${fileName}`);

        // delete from database
        guest.destroy().then(() => {
            return callback(null);
        }).catch((err) => {
            return callback(err);
        });
    }).catch((err) => {
        return callback(err);
    }); 
}

module.exports = Guest;