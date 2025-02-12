
class Node{

    constructor(val){
        if(typeof val !== "number"){
            throw new Error("BST only supports numbers");
        }

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


    find(value){

        let cur = this.root;
        while(cur){
            if (value < cur.value){
                cur = cur.left;
            } else if (value > cur.value){
                cur = cur.right;
            } else {
                return cur;
            }
        }

        return null;

    }


    insert(value){

        if(typeof value !== "number"){
            throw new Error("BST only supports numbers");
        }

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
            
            let p = null;
            let successor = cur.right;
            while(successor.left){
                p = successor;
                successor = successor.left;
            }

            if(p !== null){
                p.left = successor.right;
            } else{ 
                cur.right = successor.right;
            }
            
            cur.value = successor.value;
        }

    }

    levelOrder(callback){
        if(!this.root){
            return;
        }

        const queue = [this.root];
        while(queue.length > 0){

            const cur = queue.shift();
            if(cur.left){
                queue.push(cur.left);
            } 
            if(cur.right){
                queue.push(cur.right);
            }
            callback(cur);
        }

    }

    height(root){
        if(!root){
            return 0;
        }
        
        const dfs = function(node){
            if(!node){
                return 0;
            }

            return 1 + Math.max(dfs(node.left), dfs(node.right));

        }

        return Math.max(dfs(root.left), dfs(root.right));
        
    }

    depth(node){
        if(!node){
            return null;
        }

        let numEdges = 0;
        let cur = this.root;
        while(cur && cur.value !== node.value){
            if (node.value < cur.value){
                cur = cur.left;
            } else if (node.value > cur.value){
                cur = cur.right;
            }
            numEdges++;
        }

        return numEdges++;

    }


    inOrder(callback){
        if(!callback){
            throw new Error("callback undefined");
        }
       
       const inOrderRec = function(node, callback){
            if(!node){
                return;
            }

            inOrderRec(node.left, callback);
            callback(node);
            inOrderRec(node.right, callback);
       }

        inOrderRec(this.root, callback);

    }

    postOrder(callback){
        if(!callback){
            throw new Error("callback undefined");
        }

        const postOrderRec = function(node, callback){
            if(!node){
                return;
            }
            postOrderRec(node.left, callback);
            postOrderRec(node.right, callback);
            callback(node);
       }

        postOrderRec(this.root, callback);

    }

    preOrder(callback){
        if(!callback){
            throw new Error("callback undefined");
        }

        const preOrderRec = function(node, callback){
            if(!node){
                return;
            }
            callback(node);
            preOrderRec(node.left, callback);
            preOrderRec(node.right, callback);
        }

        preOrderRec(this.root, callback);

    }

    isBalanced(){
        if(!this.root){
            return true;
        }

        return Math.abs(this.height(this.root.left) - this.height(this.root.right)) <= 1 ? true : false;
    }

    rebalance(){

        if(!this.root){
            return;
        }

        const dfs = function(node, arr){
            if(!node){
                return;
            }

            dfs(node.left, arr);
            arr.push(node.value);
            dfs(node.right, arr);
        }

        const res = [];
        dfs(this.root, res);
        this.root = this.buildTree(res);
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