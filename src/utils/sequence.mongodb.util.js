async function getNextVal(db, name) {
  await db.collection("sequence").updateOne({ _id: name }, { $inc: { value: 1 } });
  const sequence = await db.collection("sequence").findOne({ _id: name });
  return sequence.value;
}

async function createSeq(db, name) {
    const sequence = await db.collection("sequence").findOne({ _id: name });
    if(!sequence) await db.collection("sequence").insertOne({ _id: name, value: 0 });
}

exports.getNextVal = getNextVal;
exports.createSeq = createSeq;
