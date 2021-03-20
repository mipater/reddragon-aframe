export class Art {
    constructor(_id, _title, _description, _imgSrc, _author) {
        this._id = _id;
        this._title = _title;
        this._description = _description;
        this._imgSrc = _imgSrc;
        this._author = _author;
      }
    
      get id() {
        return this._id;
      }
    
      get title() {
        return this._title;
      }
    
      get description() {
        return this._description;
      }
    
      get imgSrc() {
        return this._imgSrc;
      }
    
      get author() {
        return this._author;
      }
}
