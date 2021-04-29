export class Art {
  constructor(private _id: string, private _position: string, private _title: string, private _description: string, private _imgSrc: string, private _dimensions: { width: number, height: number }, private _author: string) { }

  get id(): string {
    return this._id;
  }

  get position(): string {
    return this._position;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get imgSrc(): string {
    return this._imgSrc;
  }

  get dimensions(): { width: number; height: number } {
    return this._dimensions;
  }

  get author(): string {
    return this._author;
  }
}
