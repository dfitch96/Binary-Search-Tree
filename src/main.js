const {Node, BST} = require('./bst');

let bst = new BST([]);
bst.insert(10);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(8);
bst.insert(11);
bst.insert(18);
bst.insert(9);
bst.insert(6);
bst.print();
bst.preOrder((node) => {
    console.log(node.value);
});




