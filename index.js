let inventory;
let crafting_grid;
let crafting_grid_output;
let previous_selected_item = null;
let current_selected_item = null;
let crafting_grid_size = 0;
let inventory_size = 0;
let mosueItem = items[0];

document.addEventListener("DOMContentLoaded", function() {
    inventory = document.getElementById("inventory-container");
    crafting_grid = document.getElementById("crafting_grid-container");
    crafting_grid_output = document.getElementById("crafting_grid-output");

    DOMTokenList.prototype.forEach = function(cb) {
        if (cb && typeof cb == "function") {
            for (var i = 0; i < this.length; ++i) {
                cb(this[i], i, this);
            }
        }
        return;
    }

    DOMTokenList.prototype.includes = function(d) {
        let m = false;
        let result = false;
        this.forEach(item => {
            result = String(item) === String(d);
            if (result == true) 
                m = true;
        });
        return m;
    }

    HTMLCollection.prototype.forEach = function(cb) {
        if (cb && typeof cb == "function") {
            for (var i = 0; i < this.length; ++i) {
                cb(this[i], i, this);
            }
        }
        return;
    }

    window.addEventListener("mousedown", handle_mouse_down);
    fill_crafting_grid();
    fill_inventory();
    update();
});

function fill_crafting_grid() {
    function addItem(td = null, item = {}, className = null) {
        let tr = document.createElement("tr");
        let div = document.createElement("div");

        div.classList.add("item");
        if (className !== null && typeof className == "string")
            div.classList.add(className);
        
        div.itemData = item;
        div.innerHTML = item.text || "{text}";
        tr.append(div);
        td.append(tr);
        crafting_grid.append(td);
    }

    let td;
    for (var j = 0; j < 3; ++j) {
        td = document.createElement("td");
        for (var i = 0; i < 3; ++i) {
            crafting_grid_size++;
            addItem(td, items[0], String(crafting_grid_size - 1));
        }
        crafting_grid.append(td);
    }

    return console.log("Crafting Grid Initialized:  ", crafting_grid);
}

function fill_inventory() {
    function addItem(td = null, item = {}, className = null) {
        let tr = document.createElement("tr");
        let div = document.createElement("div");

        div.classList.add("item");
        if (className !== null && typeof className == "string")
            div.classList.add(className);

        div.itemData = item;
        div.innerHTML = item.text || "{text}";
        tr.append(div);
        td.append(tr);
    }

    let td;
    for (var j = 0; j < 6; ++j) {
        td = document.createElement("td");
        for (var i = 0; i < 4; ++i) {
            inventory_size++;
            addItem(td, items[0], String(inventory_size - 1));
        }
        inventory.append(td);
    }

    /* Temporary Items */
    set_inventory_slot(inventory_size - 1, items[1]);
    set_inventory_slot(inventory_size - 2, items[1]);
    set_inventory_slot(inventory_size - 3, items[1]);
    set_inventory_slot(inventory_size - 4, items[1]);

    return console.log("Inventory Initialized:  ", inventory);
}

function get_inventory_slot(index = 0) {
    return inventory.getElementsByClassName(index)[0];
}

function set_inventory_slot(index = 0, item = {}) {
    let inventory_slot = get_inventory_slot(index);
    if (!inventory_slot) return console.log("No Slot Found.");
    inventory_slot.itemData = item;
    inventory_slot.innerText = item.text;
    return update();
}

function get_crafting_grid_slot(index = 0) {
    return crafting_grid.getElementsByClassName(index)[0];
}

function set_crafting_grid_slot(index = 0, item = {}) {
    let crafting_grid_slot = get_crafting_grid_slot(index);
    if (!crafting_grid_slot) return console.log("No Slot Found.");
    crafting_grid_slot.itemData = item;
    crafting_grid_slot.innerText = item.text;
    return update();
}

function swap_item_to(item, object_1, event = null) {
    if (!item || !object_1) return new TypeError("swap_item_to is missing a argument.");
    if (!(item instanceof HTMLElement)) return new TypeError("swap_item_to passed non HTMLElement argument.");

    let old_object_item_data = object_1.itemData;
    object_1.itemData = item.itemData;
    object_1.innerHTML = item.innerHTML;
    item.innerHTML = old_object_item_data.text;
    item.itemData = old_object_item_data;

    // Somehow Check if Crafting Grid Output is not items[0](Air)
    if (previous_selected_item == crafting_grid_output)
        clear_crafting_grid();

    return update();
}

// DEPRECATED
function move_item_to(item, object_1, event = null) {
    if (!item || !object_1) return new TypeError("move_to is missing a argument.");
    if (!(item instanceof HTMLElement)) return new TypeError("move_to passed non HTMLElement argument.");

    if (!object_1.innerText == items[0].text) return console.log("Don't do that!");

    object_1.itemData = item.itemData;
    object_1.innerHTML = item.innerHTML;
    item.itemData = items;
    item.innerHTML = items[0].text;
    // BROKEN: object_1.itemData = items.find(a => a == object_1.innerHTML);

    return update();
}

function get_crafting_grid_items(useArray = true) {
    if (useArray == true) {
        let trs = [];
        for (var i = 0; i <  crafting_grid.children.length; ++i) {
            trs.push(crafting_grid.children[i]);
        }
        let crafting_grid_items = [];
        trs.forEach(e => {
            for (var i = 0; i < e.children.length; ++i) {
                crafting_grid_items.push(e.children[i].innerText);
            }
        });
        return crafting_grid_items;
    } else {
        let arr = [];
        for (var i = 0; i < crafting_grid_size; ++i) {
            arr.push(get_crafting_grid_slot(i));
        }
        return arr;
    }
}

function get_inventory_items() {
    let arr = [];
    for (var i = 0; i < inventory_size; ++i) {
        arr.push(get_inventory_slot(i));
    }
    return arr;
}

function clear_crafting_grid() {
    crafting_grid.children.forEach(row => {
        row.children.forEach(collumn => {
            collumn.children[0].itemData = items[0];
            collumn.children[0].innerText = items[0].text;
        });
    });
    return true;
}

function isArraySame(array1, array2) {
    if (array1.length !== array2.length) return false;
    for (var i = 0; i < array1.length; ++i) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
}

function update() {
    console.log("Update Function Called.");
    if (!(current_selected_item == null)) {
        if (previous_selected_item) previous_selected_item.classList.remove("selected");
        current_selected_item.classList.add("selected");
    } 

    let crafting_grid_items = get_crafting_grid_items();

    let b = false;
    recipes.forEach(recipe => {
        console.log("Recipes IsArraySame Check:", isArraySame(recipe.items, crafting_grid_items));
        if (b == false) {
            if (isArraySame(recipe.items, crafting_grid_items)) {
                crafting_grid_output.innerText = recipe.result;
                b = true;
            } else {
                crafting_grid_output.innerText = items[0].text;
                b = false;
            }
        }
    });
}

let unused_var = 0;
function handle_mouse_down(event) {
    event.preventDefault();
    let target = event.target;
    let isItem = event.target.classList[0] == "item";
    if (!isItem) {
        if (current_selected_item) current_selected_item.classList.remove("selected");
        previous_selected_item = null;
        current_selected_item = null;
        mosueItem = items[0];
        console.log("Item Select Canceled.");
        return;
    }
    
    if (current_selected_item == target) {
        console.log("You already selected that!");
        return;
    }

    if (unused_var !== 0) {
        unused_var--;
        previous_selected_item = current_selected_item;
    }

    unused_var++;
    current_selected_item = target;
    mosueItem = current_selected_item.itemData;

    // Need to figure out how to make it so you can move the crafting output into the crafting table
    // function check_if_not_in_crafting_grid() {
    //     let crafting_grid_items = get_crafting_grid_items();
    //     crafting_grid_items.forEach(item => {
    //         if (current_selected_item === item) return true;
    //     });
    //     return false;
    // }

    if (event.shiftKey && current_selected_item !== crafting_grid_output) {
        if (current_selected_item.itemData && current_selected_item.itemData.text == "(Air)") {
            swap_item_to(previous_selected_item, current_selected_item);
            if (previous_selected_item == crafting_grid_output && crafting_grid_output.itemData.text !== items[0].text)
                clear_crafting_grid();
        }
    } 

    update();
    return console.log("Selected Item: ", current_selected_item);
}