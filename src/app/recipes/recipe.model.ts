export class Recipe{
  public name: string;
  public description: string;
  public imagePath: string; // utilizzero immagini da internet quindi basta un url

  constructor (name: string, desc: string, imagePath: string){
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
  }
}
