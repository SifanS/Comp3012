function wordPosition(words) {
   const mapOfPositions = new Map();
   for (let i = 0; i < words.length; i++)
   {
     let word=words[i];
     if(mapOfPositions.has(word)){
        mapOfPositions.get(word).push(i);
     }else{
        mapOfPositions.set(word,[i]);
     }
    }
   return mapOfPositions;
}
    
    var input = [
      "buy",
      "it",
      "use",
      "it",
      "break",
      "it",
      "fix",
      "it",
      "trash",
      "it",
      "change",
      "it",
      "mail",
      "upgrade",
      "it",
    ];
    
    var output = wordPosition(input);
    console.log(output);