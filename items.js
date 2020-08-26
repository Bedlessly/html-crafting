const items = [{
    name: "Air",
    id: 0,
    text: "(Air)"
},
{
    name: "Iron", 
    id: 1, 
    text: "(Iron)" 
},
{
    name: "Gold", 
    id: 2, 
    text: "(Gold)" 
},
{
    name: "Diamond", 
    id: 3, 
    text: "(Diamond)" 
},
{
    name: "Emerald", 
    id: 4, 
    text: "(Emerald)" 
},
{
    name: "Golden Chestplate", 
    id: 5, 
    text: "(Golden Chestplate)" 
}];

const recipes = [{
    items: [
        items[0].text, items[0].text, items[0].text, 
        items[1].text, items[1].text, items[1].text, 
        items[0].text, items[0].text, items[0].text
    ],
    result: items[2].text,
    count: 1
},
{
    items: [
        items[2].text, items[2].text, items[2].text, 
        items[0].text, items[2].text, items[2].text, 
        items[2].text, items[2].text, items[2].text
    ],
    result: items[5].text,
    count: 1
}]