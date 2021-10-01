const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TYPE:   Symbol("type"),
    APPETIZER:   Symbol("appetizer"),
    DESSERT:   Symbol("dessert"),
    DRINKS:  Symbol("drinks")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sType = "";
        this.sAppetizer = "";
        this.sDessert = "";
        this.sDrinks = "";
        this.sItem = "ramen";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Jon's Ramen House.");
                aReturn.push("What size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TYPE
                this.sSize = sInput;
                aReturn.push("What type of Ramen would you like? (Shio | Shoyu | Miso | Tonkotsu)");
                break;
            case OrderState.TYPE:
                this.stateCur = OrderState.APPETIZER
                this.sType = sInput;
                aReturn.push("Would you like appetizer? (Edamame | Agedashi Tofu | Chicken Karaage | Shrimp Karaage | Ebi Shumai)");
                break;
            case OrderState.APPETIZER:
                this.stateCur = OrderState.DESSERT
                aReturn.push("How about Dessert? (Almond Tofu | Chocolate Cream Bun)");
                if(sInput.toLowerCase() != "no"){
                    this.sAppetizer = sInput;
                }
                break;
            case OrderState.DESSERT:
                this.stateCur = OrderState.DRINKS
                if(sInput.toLowerCase() != "no"){
                    this.sDessert = sInput;
                }
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank you for your order of");
                aReturn.push(`${this.sSize} ${this.sType} ${this.sItem}`);
                
                if ( this.sAppetizer && this.sDessert) {
                    aReturn.push(`with Appetizer of ${this.sAppetizer} and ${this.sDessert} Dessert`);
                } else if (this.sAppetizer) {
                    aReturn.push(`and Appetizer of ${this.sAppetizer}`);
                } else if (this.sDessert) {
                    aReturn.push(`and Dessert of ${this.sDessert}`);
                } 
                
                if (this.sDrinks){
                    aReturn.push(`plus ${this.sDrinks}`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}