const {Node, BST} = require('./bst');

let bst = new BST([0, 1, 3, 4, 6, 7, 10, 12]);
bst.print();
console.log('\n');
bst.insert(11);
bst.print();
console.log('\n');
bst.insert(2);
bst.print();
console.log('\n');
bst.insert(-1);
bst.print();
