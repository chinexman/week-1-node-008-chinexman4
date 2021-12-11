import FileTree from './fileTree';

export function createFileTree(input) {

  let localFileCopy = input.slice();
  //sort localFileCopy using the last digit of the nodeID
  
  localFileCopy.sort((a,b)=>{
    return +a.id.toString().slice(-1) - +b.id.toString().slice(-1)
  }  )
  console.log(localFileCopy);
  const fileTree = new FileTree();

  for (const inputNode of localFileCopy) {
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