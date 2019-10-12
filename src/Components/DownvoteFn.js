export const DownvoteFn = (i, array, collection, UID, storeVal, db) => {
  const collRef = db.collection(collection);

  array.map((item, o) => {
    if (
      i === o &&
      !item.downvoters.includes(UID) &&
      !item.upvoters.includes(UID)
    ) {
      collRef.doc(item.key).update({
        votes: storeVal.increment(-1),
        downvoters: storeVal.arrayUnion(UID),
        totalDownvotes: storeVal.increment(1)
      });
    } else if (
      i === o &&
      item.downvoters.includes(UID) &&
      !item.upvoters.includes(UID)
    ) {
      collRef.doc(item.key).update({
        votes: storeVal.increment(1),
        downvoters: storeVal.arrayRemove(UID),
        totalDownvotes: storeVal.increment(-1)
      });
    } else if (
      i === o &&
      !item.downvoters.includes(UID) &&
      item.upvoters.includes(UID)
    ) {
      collRef.doc(item.key).update({
        votes: storeVal.increment(-2),
        downvoters: storeVal.arrayUnion(UID),
        upvoters: storeVal.arrayRemove(UID),
        totalDownvotes: storeVal.increment(1),
        totalUpvotes: storeVal.increment(-1)
      });
    }
    return item;
  });
};
