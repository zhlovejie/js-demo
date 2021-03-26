function BinaryTree(){
  let Node = function(key){
    this.key = key
    this.left = null
    this.right = null
  }

  let root = null

  let insertNode = function(Node,newNode){
    if(newNode.key < Node.key){
      if(Node.left === null){
        Node.left = newNode
      }else{
        insertNode(Node.left,newNode)
      }
    }else{
      if(Node.right === null){
        Node.right = newNode
      }else{
        insertNode(Node.right,newNode)
      }
    }
  }

  //中序遍历
  let inOrderTraverseNode = function(node,cb){
    if(node !== null){
      inOrderTraverseNode(node.left,cb)
      cb(node.key)
      inOrderTraverseNode(node.right,cb)
    }
  }
  //前序遍历
  let prevOrderTraverseNode = function(node,cb){
    if(node !== null){
      cb(node.key)
      prevOrderTraverseNode(node.left,cb)
      prevOrderTraverseNode(node.right,cb)
    }
  }
  //后序遍历
  let postOrderTraverseNode = function(node,cb){
    if(node !== null){
      postOrderTraverseNode(node.left,cb)
      postOrderTraverseNode(node.right,cb)
      cb(node.key)
    }
  }

  let minNode = function(node){
    if(node !== null){
      while(node && node.left !== null){
        node = node.left
      }
      return node
    }
    return null
  }

  let maxNode = function(node){
    if(node !== null){
      while(node && node.right !== null){
        node = node.right
      }
      return node
    }
    return null
  }

  let searchNode = function(node,key){
    if(node === null){
      return null
    }
    if(key < node.key){
      return searchNode(node.left,key)
    }else if(key > node.key){
      return searchNode(node.right,key)
    }else{
      return node
    }
  }

  let removeNode = function(node,key){
     if(node === null){
       return null
     }
     if(key < node.key){
       node.left = removeNode(node.left,key)
       return node
     }else if(key > node.key){
       node.right = removeNode(node.right,key)
       return node
     }else{
       if(node.left === null && node.right === null){
         node = null
         return node
       }else if(node.left === null){
        node = node.right
        return node
       }else if(node.right === null){
        node = node.left
        return node
       }
       let aux = minNode(node.right)
       node.key = aux.key
       node.right = removeNode(node.right,aux.key)
       return node
     }
  }

  this.inset = function(key){
    let newNode = new Node(key)
    if(root === null){
      root = newNode
    }else{
      insertNode(root,newNode)
    }
  }

  this.inOrderTraverse = function(cb){
    inOrderTraverseNode(root,cb)
  }

  this.prevOrderTraverse = function(cb){
    prevOrderTraverseNode(root,cb)
  }

  this.postOrderTraverse = function(cb){
    postOrderTraverseNode(root,cb)
  }

  this.min = function(){
    return minNode(root)
  }

  this.max = function(){
    return maxNode(root)
  }

  this.search = function(key){
    return searchNode(root,key)
  }

  this.remove = function(key){
    return removeNode(root,key)
  }
}

let nodes = [8,3,10, 1,6,14, 4,7,13]
let binaryTree = new BinaryTree()

nodes.forEach(key => binaryTree.inset(key))

// let cb = function(key){
//   console.log(key)
// }
// console.log('----中序遍历')
// binaryTree.inOrderTraverse(cb)
// console.log('----中序遍历 END')

// console.log('----前序遍历')
// binaryTree.prevOrderTraverse(cb)
// console.log('----前序遍历 END')

// console.log('----后序遍历')
// binaryTree.postOrderTraverse(cb)
// console.log('----后序遍历 END')
//console.log(binaryTree.min())
//console.log(binaryTree.max())
//console.log(binaryTree.search(15))

console.log(binaryTree.remove(3))