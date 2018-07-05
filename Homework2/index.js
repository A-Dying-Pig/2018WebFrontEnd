//Poo Lei @2018.7.5
//All Copyrights Reserved

'use strict';

//Problem 1
function ip_table(ip_addresses){
	const ip_num = ip_addresses.length;
	for (let z = 0; z < ip_num; z++){
		this[ip_addresses[z]] = ip_addresses[z].split('.').map(value => parseInt(value));
	}
}

function ip_sort(ip_addresses) {
	const table = new ip_table(ip_addresses);
	ip_addresses.sort((a,b) => {
		for(let z = 0; z < 4; z++){
			if(table[a][z] < table[b][z]) return -1;
			else if (table[a][z] > table[b][z]) return 1;
		}
		return 0;
	});
	return ip_addresses;
}

//Problem 2
function * order (cur_node) {
    if (cur_node.left != null)
        yield* order(cur_node.left);
    yield cur_node.val;
    if (cur_node.right != null)
        yield* order(cur_node.right);
}

class TreeIterator {
	constructor(root) {
        this.next_exist = false;
		if(root != null){
			this.g = order(root);
            const result = this.g.next();
            [this.next_exist , this.next_val] = [!result.done , result.value];
		}
	}

	has_next() {
		return this.next_exist;
	}

	next_value() {
		const temp = this.next_val;
        const result = this.g.next();
        [this.next_exist , this.next_val] = [!result.done , result.value];
		return temp;
	}
}

//Problem 3
function equal(o1, o2) {
    const [type1, type2] = [typeof(o1),typeof(o2)];
    if (type1 === type2)
    	return o1 === o2;
    if (type1 === null && type2 === undefined)
    	return true;
    if (type1 === undefined && type2 === null)
    	return true;
    if (type1 === 'number' && type2 === 'string')
    	return equal(o1,Number(o2));
    if (type1 === 'string' && type2 === 'number')
		return equal(Number(o1),o2);
    if (type1 === 'boolean')
    	return equal(Number(o1),o2);
    if (type2 === 'boolean')
    	return equal(o1,Number(o2));
    if ((type1 === 'string' || type1 === 'number' || type1 === 'symbol') && type2 === 'object')
    	return equal(o1,o2.toPrimitive);
    if (type1 === 'object' && ((type2 === 'string' || type2 === 'number' || type2 === 'symbol')))
    	return equal(o1.toPrimitive,o2);
    return false;
}
