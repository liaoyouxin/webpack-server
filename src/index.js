import './css/index.css';
import './css/main.less';
import {Text0} from './js/text-0.js';
import {Text1} from './js/text-1.js';

const textFun = (...arg) =>{
	let P = document.createElement("p");
	P.innerHTML = arg.join('');
	document.getElementById('root').appendChild(P)
}
console.log(Text0)
textFun(Text0,Text1);