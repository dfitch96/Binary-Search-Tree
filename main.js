const {Node, BST} = require('./bst');



const bstSize = 15;

// add random values < 100 to the tree
const arr = [];
for(let i = 0; i < bstSize; i++){
    arr.push(Math.floor(Math.random() * 100));
}

const bst = new BST(arr);


bst.print();
console.log(`isBalanced: ${bst.isBalanced()}`);

// add random values greater than 100 to unbalance the tree
for(i = 0; i < 5; i++){
    bst.insert(Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 100) + 100));
}

bst.print();
console.log(`isBalanced: ${bst.isBalanced()}`);
bst.rebalance();
bst.print();
console.log(`isBalanced: ${bst.isBalanced()}`);





