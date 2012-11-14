/*The MIT License

Copyright (c) 2012 Felipe Lopes Lage. http://www.lipelopeslage.com.br

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
; (function(root, undefined) {
	var touchValue = {begin: 0, end: 0, fingers: 0}, DOMElement, handler;

	root.SwipeFaster = function () {
		DOMElement = arguments[0];
		handler = arguments[1];
	}

	root.SwipeFaster.prototype.init = function () {
	    if(!DOMElement.addEventListener) return;

		DOMElement.addEventListener('touchstart', touchStartHandler, false);
		DOMElement.addEventListener('touchmove', touchMoveHandler, false);
		DOMElement.addEventListener('touchend', touchEndHandler, false);

		function touchStartHandler (e) {
			var touch = e.targetTouches;
			touchValue = {begin:touch[0].pageX, fingers:touch.length};
		}
		
		function touchMoveHandler (e) {
			var touch = e.targetTouches;			
			touchValue.end = touch[0].pageX;
			touchValue.fingers = touch.length;
			e.preventDefault();
			return false;
		}
		
		function touchEndHandler (e) {
			if(!touchValue.end) return;
			var target = touchValue.begin - touchValue.end, amount = touchValue.fingers;
			touchValue = null;
			if(target > 50 && target > 0){
				handler(amount);
			}else if(target < 50 && target < 0){
				handler(amount*-1);
			}
			else{
				return;
			}
		}
	}

	root.SwipeFaster.prototype.kill = function () {
	    DOMElement.removeEventListener('touchstart');
		DOMElement.removeEventListener('touchmove');
		DOMElement.removeEventListener('touchend');			
		DOMElement = null;
		handler = null;
	}

})(window)