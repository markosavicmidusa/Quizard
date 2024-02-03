export interface Commercial{
    label: string;
    link:string;
    picturePath:string
}

export const commercials: Commercial[] = [
  { label: "COCA-COLA", link: "https://rs.coca-colahellenic.com/", picturePath: "coca-cola.png" },
  { label: "DRAGON-FURNITURE", link: "https://www.pinterest.com/dragonwishe/dragon-furniture/", picturePath: "dragon.png" },
  { label: "MC-DONALDS", link: "https://www.mcdonalds.rs/", picturePath: "mek.png" },
  { label: "PEPSI", link: "https://www.pepsi.com/", picturePath: "pepsi.png" },
  { label: "TRPKOVIC", link: "https://pekaratrpkovic.rs/", picturePath: "trpkovic.png" }
]