export const CATEGORY = {
    all: 'All',
    electronics:'Electronics',
    jewelery:'Jewelery',
    menClothing:"Men's clothing",
    womenClothing: "Women's clothing"
}

export const lessMoreString = (str:string, charCount:number)=>{
    if(str.length > charCount){
        return str.slice(0,charCount) + '...'
    }
    else{
        return str
    }
}   