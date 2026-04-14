export const detectCategory = (text) => {

 const t = text.toLowerCase();

 if(t.includes("amazon") || t.includes("flipkart"))
 return "Shopping"

 if(t.includes("swiggy") || t.includes("zomato"))
 return "Food"

 if(t.includes("petrol") || t.includes("fuel"))
 return "Transport"

 if(t.includes("electricity") || t.includes("bill"))
 return "Bills"

 return "Other"

}