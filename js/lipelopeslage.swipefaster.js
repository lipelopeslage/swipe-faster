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
; (function(root) {
	var touchValue = {begin: 0, end: 0, fingers: 0};

	root.SwipeFaster = function () {
		this.DOMElement = arguments[0];
		this.handler = arguments[1];
	}


	root.SwipeFaster.prototype.init = function (o) {
		var self = this;
		if(!this.DOMElement.addEventListener) return;
	    this.orientation = o || "horizontal";
	    
	    this.touchStartHandler = function (e) {
			var touch = e.targetTouches;
			touchValue = {begin:(self.orientation == "horizontal") ? touch[0].pageX : touch[0].pageY, fingers:touch.length};
		}
		
		this.touchMoveHandler = function (e) {
			if(!touchValue) return;
			var touch = e.targetTouches;						
			touchValue.end = (self.orientation == "horizontal") ? touch[0].pageX : touch[0].pageY;
			touchValue.fingers = touch.length;
			e.preventDefault();
			return false;
		}
		
		this.touchEndHandler = function (e) {
			if(!touchValue) return;
			var target = touchValue.begin - touchValue.end, amount = touchValue.fingers;			
			touchValue = null;
			
			if(target > 50 && target > 0){
				self.handler(amount);
			}else if(target < 50 && target < 0){
				self.handler(amount*-1);
			}
			else{
				return;
			}
		}
	    this.DOMElement.addEventListener('touchstart', this.touchStartHandler, false);
		this.DOMElement.addEventListener('touchmove', this.touchMoveHandler, false);
		this.DOMElement.addEventListener('touchend', this.touchEndHandler, false);

	}

	root.SwipeFaster.prototype.kill = function () {
		this.DOMElement.removeEventListener('touchstart', this.touchStartHandler);
		this.DOMElement.removeEventListener('touchmove', this.touchMoveHandler);
		this.DOMElement.removeEventListener('touchend', this.touchEndHandler);			
		this.DOMElement = null;
		this.handler = null;
		this.orientation = null;
		this.touchStartBinder = null;
	    this.touchMoveBinder = null;
	    this.endMoveBinder = null;
	}

})(window)