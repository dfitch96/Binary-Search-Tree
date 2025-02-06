const {Node, BST} = require('./bst');

let bst = new BST([]);
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(80);
bst.print();
bst.delete(70);
bst.print();

