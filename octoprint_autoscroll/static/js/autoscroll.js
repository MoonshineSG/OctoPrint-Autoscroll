$(function() {
	function AutoscrollViewModel(models) {
		var self = this;
		self.terminal = models[0];
		self.program = false;
		
		self.onAllBound = function () {
			self.terminal.autoscrollEnabled.subscribe(function(newValue) {
				if (newValue) {
					self.terminal.scrollToEnd();
					self.rename("Autoscroll");
				} else {
					self.rename("Now");
				}
			});
			
			//overwrite the method to set program tag
			self.terminal.scrollToEnd = function() {
				self.program = true;
				if (self.container.length) {
					self.container.scrollTop(self.container[0].scrollHeight);
				}
			}

			self.container = $("#terminal-output");
			
			$("#terminal-output").on("scroll", self.scrollhandle);
		}
			
		self.scrollhandle = function(event) {
			if (!self.program) {
				var auto = false;
				if (self.container.length) {
					auto = self._almost_equal(self.container[0].scrollHeight - self.container[0].scrollTop, self.container[0].clientHeight)
				}
				if ( auto ) {
					self.terminal.autoscrollEnabled(true);
				} else {
					self.terminal.autoscrollEnabled(false);
				}
			}
			self.program = false;
		}	

		self.rename = function(name) {
			$(".terminal  button").text(name);
		}

		self._almost_equal = function(a, b){
			if(Math.abs(a - b) < 5) return true;
			return false;
		}	
		
	}
	ADDITIONAL_VIEWMODELS.push([AutoscrollViewModel, ["terminalViewModel"], []]);
});

