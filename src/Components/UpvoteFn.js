export const UpvoteFn = (i, array, collection, UID, storeVal, db) => {
  const collRef = db.collection(collection);
  array.map((item, o) => {
    if (
      i === o &&
      !item.downvoters.includes(UID) &&
      !item.upvoters.includes(UID)
    ) {
      collRef.doc(item.key).update({
        votes: storeVal.increment(1),
        upvoters: storeVal.arrayUnion(UID),
        totalUpvotes: storeVal.increment(1)
      });
    } else if (
      i === o &&
      !item.downvoters.includes(UID) &&
      item.upvoters.includes(UID)
    ) {
      collRef.doc(item.key).update({
        votes: storeVal.increment(-1),
        upvoters: storeVal.arrayRemove(UID),
        totalUpvotes: storeVal.increment(-1)
      });
    } else if (
      i === o &&
      item.downvoters.includes(UID) &&
      !item.upvoters.includes(UID)
    ) {
      collRef.doc(item.key).update({
        votes: storeVal.increment(2),
        upvoters: storeVal.arrayUnion(UID),
        downvoters: storeVal.arrayRemove(UID),
        totalUpvotes: storeVal.increment(1),
        totalDownvotes: storeVal.increment(-1)
      });
    }
    return item;
  });
};
