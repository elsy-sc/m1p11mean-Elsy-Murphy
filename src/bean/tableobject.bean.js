const { filterNullColumn, combineObject } = require("../utils/object.util");
const { getNextVal, createSeq } = require("../utils/sequence.mongodb.util");
const { sanitizedObject } = require("../utils/tableobject.util");

class TableObject {

    _id = undefined;
    _state = undefined;
    tableName = this.constructor.name.toLowerCase();
    sequence = {
        name: this.constructor.name.toLowerCase() + "_seq",
        start: this.constructor.name.substring(0, 4).toUpperCase(),
    };

    getSanitizedObject() {
        return sanitizedObject(this); 
    }

    async setId(connection) {
        await getNextVal(connection, this.sequence.name).then((value) => {
            this._id = this.sequence.start + value;
        });
    }

    async create(connection) {
        await createSeq(connection, this.sequence.name);
        await this.setId(connection);
        this._state = 1;
        await connection.collection(this.tableName).insertOne(this.getSanitizedObject());
    }

    async read(connection, afterWhereString) {
        let whereObject = this.getSanitizedObject();
        if (this._id) whereObject._id = this._id;
        if (this._state) whereObject._state = this._state;
        let combinedWhere = combineObject(filterNullColumn(whereObject));
        if (afterWhereString) combinedWhere = combineObject(combinedWhere, afterWhereString);
        return await connection.collection(this.tableName).find(combinedWhere).toArray();
    }

    async update(connection, setObject, afterWhereString, afterSetString) {    
        let whereObject = this.getSanitizedObject();
        if (this._id) whereObject._id = this._id;
        if (this._state) whereObject._state = this._state;
        if (setObject) setObject = sanitizedObject(setObject);
        let combinedWhere = combineObject(filterNullColumn(whereObject));
        let combinedSet = combineObject(filterNullColumn(setObject));
        if (afterWhereString) combinedWhere = combineObject(combinedWhere, afterWhereString);
        if (afterSetString) combinedSet = combineObject(combinedSet, afterSetString);
        await connection.collection(this.tableName).updateMany(combinedWhere, { $set: combinedSet });
    }

    async delete(connection, afterWhereString) {
        let whereObject = this.getSanitizedObject();
        if (this._id) whereObject._id = this._id;
        if (this._state) whereObject._state = this._state;
        let combinedWhere = combineObject(filterNullColumn(whereObject));
        if (afterWhereString) combinedWhere = combineObject(combinedWhere, afterWhereString);
        await connection.collection(this.tableName).deleteMany(combinedWhere);
    }
}

exports.TableObject = TableObject;
