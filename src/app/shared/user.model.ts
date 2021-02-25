export class userModel {
    constructor(
        public email,
        public id,
        private _token,
        private _tokenExpiryDate
    ){

    }

    get token(){
        if(this._tokenExpiryDate && new Date() < this._tokenExpiryDate){
            return this._token;
        }else return null;
    }
}