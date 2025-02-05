
class Node{

    constructor(val){
        this.value = val;
        this.left = null;
        this.right = null;
    }

}

class BST {

    constructor(arr){
        this.root = this.buildTree(arr);
    }

    buildTree(arr){
        arr = this.removeDuplicates(arr);
        return this.buildTreeRec(arr, 0, arr.length - 1);
    }

    buildTreeRec(arr, start, end){
        
        if (start > end){
            return null;
        }

        const mid = start + Math.floor((end - start) / 2);

        const root = new Node(arr[mid]);

        root.left = this.buildTreeRec(arr, start, mid - 1);
        root.right = this.buildTreeRec(arr, mid + 1, end);

        return root;

    }

    removeDuplicates(arr){
        const newArr = [];
        arr.sort();

        for (const el of arr){
            if (!newArr.includes(el)){
                newArr.push(el);
            }
        }

        return newArr;
    }

    print(){

        const prettyPrintRec = (node, prefix = "", isLeft = true) => {
            if (node === null) {
                return;
            }
            if (node.right !== null) {
                prettyPrintRec(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
            if (node.left !== null) {
                prettyPrintRec(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
        };

        prettyPrintRec(this.root);
    }
}




module.exports = {
    Node,
    BST,
};