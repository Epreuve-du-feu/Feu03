#! node

// Script qui trouve si un fichier texte est présente dans un autre.
// En cas de doublon, l'élément le plus haut à droite sera affiché

const fs = require("fs");

// Gestion d'erreur
if (process.argv.length !== 4) {
  console.log("Veuillez indiquer au script, deux fichier .txt.");
  return;
}

// Parsing
const plateau = fs.readFileSync(`${process.argv[2]}`, "utf-8");
const forme = fs.readFileSync(`${process.argv[3]}`, "utf-8");

const board = fs.readFileSync(`${process.argv[2]}`, "utf-8").split("\n");
const tofind = fs.readFileSync(`${process.argv[3]}`, "utf-8").split("\n");

console.log("Le plateau est :");
console.log(plateau + "\n");
console.log("La forme à trouver est :");
console.log(forme + "\n");

function long(tab) {
  let nb = 0;
  for (let x = 0; x < tab.length; x++) {
    for (let y = 0; y < tab[x].length; y++) {
      nb++;
    }
  }
  return nb;
}
let findLength = long(tofind);

for (let line = 0; line < board.length; line++) {
  for (let column = 0; column < board[line].length; column++) {
    if (tofind[0][0] === board[line][column] || tofind[0][0] === " ") {
      let l = 0;
      let c = 0;
      let L = line;
      let C = column;
      let check = 0;

      while (l < tofind.length) {
        while (c < tofind[l].length) {
          if (L >= board.length || C >= board[L].length) {
            break;
          }

          if (tofind[l][c] !== board[L][C] && tofind[l][c] !== " ") {
            break;
          }
          check++;
          c++;
          C++;
        }

        l++;
        L++;
        c = 0;
        C = column;
      }

      if (check === findLength) {
        console.log("La forme est dans le plateau aux coordonées suivantes :");
        if (tofind[0][0] === " ") {
          console.log("ligne " + line, " colonne " + (Number(column) + 1));
        } else {
          console.log("ligne " + line, " colonne " + column);
        }
      }
    }
  }
}
