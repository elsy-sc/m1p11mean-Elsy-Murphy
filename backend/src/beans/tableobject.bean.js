const { filterNullColumn, combineObject } = require("../utils/object.util");
const { getNextVal, createSeq } = require("../utils/sequence.mongodb.util");
const { sanitizedObject } = require("../utils/tableobject.util");

class TableObject {

    _id = undefined;
    _state = 1;
    tableName = this.constructor.name.toLowerCase();
    sequence = {
        name: this.constructor.name.toLowerCase() + "_seq",
        start: this.constructor.name.substring(0, 4).toUpperCase(),
    };
    linkedTableId = [];

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
        await connection.collection(this.tableName).insertOne(this.getSanitizedObject());
    }

    async read(connection, afterWhereString) {
        let whereObject = this.getSanitizedObject();
        if (this._id) whereObject._id = this._id;
        if (this._state) whereObject._state = this._state;
        let combinedWhere = combineObject(filterNullColumn(whereObject));
        if (afterWhereString) combinedWhere = combineObject(combinedWhere, afterWhereString);
        if (this.linkedTableId.length > 0) {
            return await connection.collection(this.tableName).aggregate([
                { $match: combinedWhere },
                ...this.linkedTableId.map((linkedTable) => {
                    return {
                        $lookup: {
                            from: linkedTable.tableName,
                            localField: linkedTable.localField,
                            foreignField: linkedTable.foreignField,
                            as: linkedTable.as,
                        },
                    };
                }),
            ]).toArray();
        }
        return await connection.collection(this.tableName).find(combinedWhere).toArray();
    }

    async readWithAddFieldAndGroupBy(connection, afterWhereString, afterGroupByString, afterAddFieldsString) {
        let whereObject = this.getSanitizedObject();
        if (this._id) whereObject._id = this._id;
        if (this._state) whereObject._state = this._state;
        let combinedWhere = combineObject(filterNullColumn(whereObject));
        if (afterWhereString) combinedWhere = combineObject(combinedWhere, afterWhereString);
        let aggregation = [];
        if (afterAddFieldsString) {
            aggregation.push({ $addFields: afterAddFieldsString });
        }
        aggregation.push({ $match: combinedWhere });
        if (this.linkedTableId.length > 0) {
            aggregation.push(
                ...this.linkedTableId.map((linkedTable) => {
                    return {
                        $lookup: {
                            from: linkedTable.tableName,
                            localField: linkedTable.localField,
                            foreignField: linkedTable.foreignField,
                            as: linkedTable.as,
                        },
                    };
                })
            );
        }
        if (afterGroupByString) {
            aggregation.push({ $group: afterGroupByString });
        }
        return await connection.collection(this.tableName).aggregate(aggregation).toArray();
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
