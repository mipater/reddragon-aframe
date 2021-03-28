export class Art {
  constructor(private _id: string, private _title: string, private _description: string, private _imgSrc: string, private _author: string) { }

  get id(): string {
    return this._id;
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

  get author(): string {
    return this._author;
  }
}
