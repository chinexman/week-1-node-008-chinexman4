import FileTree from './fileTree';

export function createFileTree(input) {

  let localcopy = input.slice();
  //sort localcopy using the last digit of the nodeID
  
  localcopy.sort((a,b)=>{
    return +a.id.toString().slice(-1) - +b.id.toString().slice(-1)
  }  )
  console.log(localcopy);
  const fileTree = new FileTree();

  for (const inputNode of localcopy) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}