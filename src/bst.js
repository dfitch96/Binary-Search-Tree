
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
        arr.sort((a, b) => a - b);

        for (const el of arr){
            if (!newArr.includes(el)){
                newArr.push(el);
            }
        }

        return newArr;
    }


    insert(value){

        if(this.root === null){
            this.root = new Node(value);
            return;
        }
        
        let cur = this.root;
        let prev = null;

        while(cur && cur.val !== value){
            prev = cur;
            if (value < cur.value){
                cur = cur.left;
            } else if (value > cur.value){
                cur = cur.right;
            } 
        }

        const node = new Node(value);
        value < prev.value ? prev.left = node : prev.right = node;
    }   

    delete(value){
        if (this.root === null){
            return;
        }

        let cur = this.root;
        let prev = null;
        while(cur && cur.value !== value){
            prev = cur;
            if(value < cur.value){
                cur = cur.left;
            } else if ( value > cur.value){
                cur = cur.right;
            } 
        }

        if(cur.left === null || cur.right === null){
            const subTree = cur.left === null ? cur.right : cur.left;

            if(prev === null){
                this.root = subTree;
            }

            if(cur === prev.left){
                prev.left = subTree;
            } else if (cur === prev.right){
                prev.right = subTree;
            }
        } else{
            // find inorder successor

        }

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